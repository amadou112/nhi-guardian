import { NonHumanIdentity, RiskAssessment } from "@/lib/types";
import { assessAll } from "@/lib/riskEngine";

export interface ExecutiveReport {
  generatedDate: string;
  summary: string;
  keyMetrics: {
    label: string;
    value: number;
  }[];
  topFindings: {
    identity: NonHumanIdentity;
    assessment: RiskAssessment;
  }[];
  remediationRoadmap: {
    phase: string;
    timeframe: string;
    actions: string[];
  }[];
  businessImpact: string;
  nextActions: string[];
}

export function generateExecutiveReport(identities: NonHumanIdentity[]): ExecutiveReport {
  const assessments = assessAll(identities);
  const byId = new Map(assessments.map((a) => [a.identityId, a]));

  const critical = assessments.filter((a) => a.severity === "Critical");
  const high = assessments.filter((a) => a.severity === "High");
  const medium = assessments.filter((a) => a.severity === "Medium");
  const noOwner = identities.filter((i) => !i.owner);
  const secretsExposed = identities.filter((i) => i.secretExposed);
  const overdueRotation = identities.filter(
    (i) => i.daysSinceRotation === null || i.daysSinceRotation > 90
  );

  const ranked = [...identities]
    .map((identity) => ({ identity, assessment: byId.get(identity.id)! }))
    .sort((a, b) => b.assessment.score - a.assessment.score);

  const topFindings = ranked.slice(0, 5);

  const summary =
    `A review of ${identities.length} non-human identities identified ${critical.length} critical and ` +
    `${high.length} high-risk findings. The most significant exposures involve ${secretsExposed.length} ` +
    `identities with exposed secrets and ${overdueRotation.length} credentials that are overdue for rotation ` +
    `or have never been rotated. ${noOwner.length} identities currently have no assigned owner, limiting ` +
    `accountability and slowing incident response. Immediate remediation of the critical findings below is ` +
    `recommended to reduce the organization's non-human identity attack surface.`;

  const businessImpact =
    `Unmanaged non-human identities are a leading cause of cloud breaches and lateral movement incidents. ` +
    `Each critical finding represents a credential that, if compromised, could grant an attacker production ` +
    `access with minimal detection. Addressing the ${critical.length + high.length} critical and high-risk ` +
    `identities materially reduces breach likelihood, supports audit and compliance readiness (SOC 2, ISO 27001), ` +
    `and lowers the operational burden of incident investigation.`;

  const nextActions = [
    `Rotate or revoke all ${secretsExposed.length} identities with exposed secrets within 48 hours.`,
    `Assign accountable owners to all ${noOwner.length} unowned identities within one week.`,
    `Enforce a 90-day rotation policy across all production credentials.`,
    `Disable or archive orphaned identities unused for more than 180 days.`,
    `Stand up a recurring quarterly non-human identity access review.`,
  ];

  return {
    generatedDate: new Date().toISOString(),
    summary,
    keyMetrics: [
      { label: "Total Identities", value: identities.length },
      { label: "Critical Risk", value: critical.length },
      { label: "High Risk", value: high.length },
      { label: "Medium Risk", value: medium.length },
      { label: "No Owner Assigned", value: noOwner.length },
      { label: "Secrets Exposed", value: secretsExposed.length },
      { label: "Rotation Overdue", value: overdueRotation.length },
    ],
    topFindings,
    remediationRoadmap: [
      {
        phase: "Phase 1 — Contain",
        timeframe: "0–2 days",
        actions: [
          "Revoke or rotate all identities with exposed secrets",
          "Disable orphaned identities with no recent activity",
        ],
      },
      {
        phase: "Phase 2 — Remediate",
        timeframe: "1–2 weeks",
        actions: [
          "Assign owners to all unowned identities",
          "Rotate all credentials overdue by more than 90 days",
          "Reduce standing admin/owner privileges to least privilege",
        ],
      },
      {
        phase: "Phase 3 — Harden",
        timeframe: "2–6 weeks",
        actions: [
          "Add expiration policies to all long-lived credentials",
          "Migrate shared secrets into a managed vault",
          "Document business justification for all remaining identities",
        ],
      },
      {
        phase: "Phase 4 — Sustain",
        timeframe: "Ongoing",
        actions: [
          "Establish quarterly non-human identity access reviews",
          "Alert on new identities created without an owner or expiration",
        ],
      },
    ],
    businessImpact,
    nextActions,
  };
}
