"""Executive report generation.

Mirrors frontend/lib/reportGenerator.ts.
"""

from datetime import datetime

from app.models.identity import NonHumanIdentity
from app.services.risk_engine import assess_all


def generate_executive_report(identities: list[NonHumanIdentity]) -> dict:
    assessments = assess_all(identities)
    by_id = {a.identity_id: a for a in assessments}

    critical = [a for a in assessments if a.severity.value == "Critical"]
    high = [a for a in assessments if a.severity.value == "High"]
    medium = [a for a in assessments if a.severity.value == "Medium"]
    no_owner = [i for i in identities if not i.owner]
    secrets_exposed = [i for i in identities if i.secret_exposed]
    overdue_rotation = [
        i for i in identities if i.days_since_rotation is None or i.days_since_rotation > 90
    ]

    ranked = sorted(
        ({"identity": i, "assessment": by_id[i.id]} for i in identities),
        key=lambda r: r["assessment"].score,
        reverse=True,
    )
    top_findings = ranked[:5]

    summary = (
        f"A review of {len(identities)} non-human identities identified {len(critical)} critical and "
        f"{len(high)} high-risk findings. The most significant exposures involve {len(secrets_exposed)} "
        f"identities with exposed secrets and {len(overdue_rotation)} credentials that are overdue for "
        f"rotation or have never been rotated. {len(no_owner)} identities currently have no assigned "
        f"owner, limiting accountability and slowing incident response. Immediate remediation of the "
        f"critical findings below is recommended to reduce the organization's non-human identity attack "
        f"surface."
    )

    business_impact = (
        f"Unmanaged non-human identities are a leading cause of cloud breaches and lateral movement "
        f"incidents. Each critical finding represents a credential that, if compromised, could grant an "
        f"attacker production access with minimal detection. Addressing the {len(critical) + len(high)} "
        f"critical and high-risk identities materially reduces breach likelihood, supports audit and "
        f"compliance readiness (SOC 2, ISO 27001), and lowers the operational burden of incident "
        f"investigation."
    )

    next_actions = [
        f"Rotate or revoke all {len(secrets_exposed)} identities with exposed secrets within 48 hours.",
        f"Assign accountable owners to all {len(no_owner)} unowned identities within one week.",
        "Enforce a 90-day rotation policy across all production credentials.",
        "Disable or archive orphaned identities unused for more than 180 days.",
        "Stand up a recurring quarterly non-human identity access review.",
    ]

    return {
        "generated_date": datetime.utcnow().isoformat(),
        "summary": summary,
        "key_metrics": [
            {"label": "Total Identities", "value": len(identities)},
            {"label": "Critical Risk", "value": len(critical)},
            {"label": "High Risk", "value": len(high)},
            {"label": "Medium Risk", "value": len(medium)},
            {"label": "No Owner Assigned", "value": len(no_owner)},
            {"label": "Secrets Exposed", "value": len(secrets_exposed)},
            {"label": "Rotation Overdue", "value": len(overdue_rotation)},
        ],
        "top_findings": [
            {"identity": r["identity"].model_dump(by_alias=True), "assessment": r["assessment"].model_dump()}
            for r in top_findings
        ],
        "remediation_roadmap": [
            {
                "phase": "Phase 1 — Contain",
                "timeframe": "0–2 days",
                "actions": [
                    "Revoke or rotate all identities with exposed secrets",
                    "Disable orphaned identities with no recent activity",
                ],
            },
            {
                "phase": "Phase 2 — Remediate",
                "timeframe": "1–2 weeks",
                "actions": [
                    "Assign owners to all unowned identities",
                    "Rotate all credentials overdue by more than 90 days",
                    "Reduce standing admin/owner privileges to least privilege",
                ],
            },
            {
                "phase": "Phase 3 — Harden",
                "timeframe": "2–6 weeks",
                "actions": [
                    "Add expiration policies to all long-lived credentials",
                    "Migrate shared secrets into a managed vault",
                    "Document business justification for all remaining identities",
                ],
            },
            {
                "phase": "Phase 4 — Sustain",
                "timeframe": "Ongoing",
                "actions": [
                    "Establish quarterly non-human identity access reviews",
                    "Alert on new identities created without an owner or expiration",
                ],
            },
        ],
        "business_impact": business_impact,
        "next_actions": next_actions,
    }
