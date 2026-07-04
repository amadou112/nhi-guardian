import { NonHumanIdentity, RiskAssessment, RiskFinding, RiskSeverity, RotationStatus } from "@/lib/types";
import { daysSince } from "@/lib/utils";

// Rule-based risk scoring engine.
// Each risk factor contributes a fixed weight; the total is capped at 100.
const WEIGHTS = {
  rotationOverdue: 20,
  noOwner: 15,
  highPrivilege: 15,
  staleUsage: 20,
  productionAccess: 10,
  secretExposed: 25,
  noExpiration: 10,
  sharedAccount: 10,
  missingDocumentation: 5,
} as const;

const ROTATION_THRESHOLD_DAYS = 90;
const STALE_USAGE_THRESHOLD_DAYS = 180;

export function getRotationStatus(daysSinceRotation: number | null): RotationStatus {
  if (daysSinceRotation === null) return "Never Rotated";
  if (daysSinceRotation > ROTATION_THRESHOLD_DAYS) return "Overdue";
  return "Rotated Recently";
}

export function getSeverity(score: number): RiskSeverity {
  if (score >= 70) return "Critical";
  if (score >= 45) return "High";
  if (score >= 20) return "Medium";
  return "Low";
}

export function assessIdentity(identity: NonHumanIdentity): RiskAssessment {
  const findings: RiskFinding[] = [];
  const recommendations: string[] = [];

  const rotationOverdue =
    identity.daysSinceRotation === null || identity.daysSinceRotation > ROTATION_THRESHOLD_DAYS;
  if (rotationOverdue) {
    findings.push({
      factor: "Rotation Overdue",
      description:
        identity.daysSinceRotation === null
          ? "This credential has never been rotated."
          : `Not rotated in ${identity.daysSinceRotation} days (policy limit: ${ROTATION_THRESHOLD_DAYS} days).`,
      weight: WEIGHTS.rotationOverdue,
    });
    recommendations.push("Rotate credential immediately");
  }

  if (!identity.owner) {
    findings.push({
      factor: "No Owner Assigned",
      description: "No individual or team is accountable for this identity.",
      weight: WEIGHTS.noOwner,
    });
    recommendations.push("Assign an accountable owner");
  }

  const highPrivilege = identity.permissionLevel === "Admin" || identity.permissionLevel === "Owner";
  if (highPrivilege) {
    findings.push({
      factor: "High Privilege",
      description: `Identity holds ${identity.permissionLevel}-level permissions, exceeding least-privilege norms.`,
      weight: WEIGHTS.highPrivilege,
    });
    recommendations.push("Reduce permissions to least privilege required");
  }

  const daysSinceUse = daysSince(identity.lastUsedDate);
  const stale = daysSinceUse > STALE_USAGE_THRESHOLD_DAYS;
  if (stale) {
    findings.push({
      factor: "Stale / Orphaned Usage",
      description: `Last used ${daysSinceUse} days ago, exceeding the ${STALE_USAGE_THRESHOLD_DAYS}-day activity threshold.`,
      weight: WEIGHTS.staleUsage,
    });
    recommendations.push("Disable unused identity");
  }

  if (identity.environment === "Production") {
    findings.push({
      factor: "Production Access",
      description: "Identity has direct access to production systems or data.",
      weight: WEIGHTS.productionAccess,
    });
    recommendations.push("Review production access scope");
  }

  if (identity.secretExposed) {
    findings.push({
      factor: "Secret Exposed",
      description: "Credential material was found exposed (e.g. in code, logs, or config).",
      weight: WEIGHTS.secretExposed,
    });
    recommendations.push("Move secret to a managed vault");
  }

  if (!identity.hasExpiration) {
    findings.push({
      factor: "No Expiration Date",
      description: "Credential does not expire and can remain valid indefinitely.",
      weight: WEIGHTS.noExpiration,
    });
    recommendations.push("Add an expiration date");
  }

  if (identity.isShared) {
    findings.push({
      factor: "Shared Account",
      description: "Identity is shared across multiple users or systems, reducing traceability.",
      weight: WEIGHTS.sharedAccount,
    });
    recommendations.push("Split into individually attributable identities");
  }

  if (!identity.hasDocumentation) {
    findings.push({
      factor: "Missing Documentation",
      description: "No documented business purpose or justification on file.",
      weight: WEIGHTS.missingDocumentation,
    });
    recommendations.push("Document business purpose");
  }

  const rawScore = findings.reduce((sum, f) => sum + f.weight, 0);
  const score = Math.min(100, rawScore);
  const severity = getSeverity(score);

  return {
    identityId: identity.id,
    score,
    severity,
    findings,
    recommendations,
  };
}

export function assessAll(identities: NonHumanIdentity[]): RiskAssessment[] {
  return identities.map(assessIdentity);
}

export const RISK_ENGINE_INFO = {
  thresholds: {
    rotationDays: ROTATION_THRESHOLD_DAYS,
    staleUsageDays: STALE_USAGE_THRESHOLD_DAYS,
  },
  weights: WEIGHTS,
};
