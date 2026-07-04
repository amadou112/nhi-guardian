"""Rule-based risk scoring engine.

Mirrors frontend/lib/riskEngine.ts. Each risk factor contributes a fixed
weight; the total is capped at 100 and mapped to a severity band.
"""

from datetime import datetime

from app.models.identity import NonHumanIdentity, RiskAssessment, RiskFinding, RiskSeverity, RotationStatus

WEIGHTS = {
    "rotation_overdue": 20,
    "no_owner": 15,
    "high_privilege": 15,
    "stale_usage": 20,
    "production_access": 10,
    "secret_exposed": 25,
    "no_expiration": 10,
    "shared_account": 10,
    "missing_documentation": 5,
}

ROTATION_THRESHOLD_DAYS = 90
STALE_USAGE_THRESHOLD_DAYS = 180


def days_since(date_str: str) -> int:
    then = datetime.strptime(date_str, "%Y-%m-%d")
    return (datetime.utcnow() - then).days


def get_rotation_status(days_since_rotation: int | None) -> RotationStatus:
    if days_since_rotation is None:
        return RotationStatus.NEVER_ROTATED
    if days_since_rotation > ROTATION_THRESHOLD_DAYS:
        return RotationStatus.OVERDUE
    return RotationStatus.ROTATED_RECENTLY


def get_severity(score: int) -> RiskSeverity:
    if score >= 70:
        return RiskSeverity.CRITICAL
    if score >= 45:
        return RiskSeverity.HIGH
    if score >= 20:
        return RiskSeverity.MEDIUM
    return RiskSeverity.LOW


def assess_identity(identity: NonHumanIdentity) -> RiskAssessment:
    findings: list[RiskFinding] = []
    recommendations: list[str] = []

    rotation_overdue = (
        identity.days_since_rotation is None or identity.days_since_rotation > ROTATION_THRESHOLD_DAYS
    )
    if rotation_overdue:
        description = (
            "This credential has never been rotated."
            if identity.days_since_rotation is None
            else f"Not rotated in {identity.days_since_rotation} days (policy limit: {ROTATION_THRESHOLD_DAYS} days)."
        )
        findings.append(RiskFinding(factor="Rotation Overdue", description=description, weight=WEIGHTS["rotation_overdue"]))
        recommendations.append("Rotate credential immediately")

    if not identity.owner:
        findings.append(RiskFinding(
            factor="No Owner Assigned",
            description="No individual or team is accountable for this identity.",
            weight=WEIGHTS["no_owner"],
        ))
        recommendations.append("Assign an accountable owner")

    high_privilege = identity.permission_level.value in ("Admin", "Owner")
    if high_privilege:
        findings.append(RiskFinding(
            factor="High Privilege",
            description=f"Identity holds {identity.permission_level.value}-level permissions, exceeding least-privilege norms.",
            weight=WEIGHTS["high_privilege"],
        ))
        recommendations.append("Reduce permissions to least privilege required")

    days_unused = days_since(identity.last_used_date)
    if days_unused > STALE_USAGE_THRESHOLD_DAYS:
        findings.append(RiskFinding(
            factor="Stale / Orphaned Usage",
            description=f"Last used {days_unused} days ago, exceeding the {STALE_USAGE_THRESHOLD_DAYS}-day activity threshold.",
            weight=WEIGHTS["stale_usage"],
        ))
        recommendations.append("Disable unused identity")

    if identity.environment.value == "Production":
        findings.append(RiskFinding(
            factor="Production Access",
            description="Identity has direct access to production systems or data.",
            weight=WEIGHTS["production_access"],
        ))
        recommendations.append("Review production access scope")

    if identity.secret_exposed:
        findings.append(RiskFinding(
            factor="Secret Exposed",
            description="Credential material was found exposed (e.g. in code, logs, or config).",
            weight=WEIGHTS["secret_exposed"],
        ))
        recommendations.append("Move secret to a managed vault")

    if not identity.has_expiration:
        findings.append(RiskFinding(
            factor="No Expiration Date",
            description="Credential does not expire and can remain valid indefinitely.",
            weight=WEIGHTS["no_expiration"],
        ))
        recommendations.append("Add an expiration date")

    if identity.is_shared:
        findings.append(RiskFinding(
            factor="Shared Account",
            description="Identity is shared across multiple users or systems, reducing traceability.",
            weight=WEIGHTS["shared_account"],
        ))
        recommendations.append("Split into individually attributable identities")

    if not identity.has_documentation:
        findings.append(RiskFinding(
            factor="Missing Documentation",
            description="No documented business purpose or justification on file.",
            weight=WEIGHTS["missing_documentation"],
        ))
        recommendations.append("Document business purpose")

    score = min(100, sum(f.weight for f in findings))
    severity = get_severity(score)

    return RiskAssessment(
        identity_id=identity.id,
        score=score,
        severity=severity,
        findings=findings,
        recommendations=recommendations,
    )


def assess_all(identities: list[NonHumanIdentity]) -> list[RiskAssessment]:
    return [assess_identity(i) for i in identities]
