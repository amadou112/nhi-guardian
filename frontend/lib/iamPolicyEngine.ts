// Rule-based IAM policy analyzer for the IAM & Zero-Trust tool.
// Paste an IAM policy document (AWS-style Effect/Action/Resource/Principal
// JSON, or similar) and it's checked against common over-permissioning
// and privilege-escalation patterns.

export type IamVerdict = "High Risk" | "Needs Review" | "Least Privilege";

export interface IamFinding {
  factor: string;
  description: string;
  weight: number;
}

export interface IamResult {
  score: number;
  verdict: IamVerdict;
  findings: IamFinding[];
  recommendations: string[];
}

const HIGH_RISK_ACTIONS = ["iam:*", "*:*", "iam:createaccesskey", "iam:attachuserpolicy", "iam:putuserpolicy"];
const PRIV_ESC_PAIRS: [string, string][] = [
  ["iam:passrole", "ec2:runinstances"],
  ["iam:passrole", "lambda:createfunction"],
  ["iam:passrole", "cloudformation:createstack"],
];

export function analyzeIamPolicy(raw: string): IamResult {
  const lower = raw.toLowerCase();
  const findings: IamFinding[] = [];
  const recommendations = new Set<string>();

  if (/"action"\s*:\s*"\*"|"action"\s*:\s*\[\s*"\*"/i.test(raw)) {
    findings.push({
      factor: "Wildcard Action",
      description: 'The policy grants all actions ("*") rather than a specific, scoped set.',
      weight: 30,
    });
    recommendations.add("Replace wildcard actions with the specific API calls the role actually needs");
  }

  if (/"resource"\s*:\s*"\*"|"resource"\s*:\s*\[\s*"\*"/i.test(raw)) {
    findings.push({
      factor: "Wildcard Resource",
      description: 'The policy applies to all resources ("*") instead of specific ARNs.',
      weight: 20,
    });
    recommendations.add("Scope the resource element to specific ARNs");
  }

  if (/"principal"\s*:\s*"\*"|"aws"\s*:\s*"\*"/i.test(lower)) {
    findings.push({
      factor: "Unrestricted Principal",
      description: 'The principal is set to "*", allowing any AWS account or the public to assume this policy.',
      weight: 30,
    });
    recommendations.add("Restrict the principal to specific account IDs, roles, or services");
  }

  const matchedHighRisk = HIGH_RISK_ACTIONS.find((a) => lower.includes(a));
  if (matchedHighRisk) {
    findings.push({
      factor: "Administrative Action Granted",
      description: `Grants a high-privilege action ("${matchedHighRisk}") capable of expanding permissions or creating new identities.`,
      weight: 25,
    });
    recommendations.add("Require a break-glass or approval workflow for administrative actions");
  }

  const privEscMatch = PRIV_ESC_PAIRS.find(([a, b]) => lower.includes(a) && lower.includes(b));
  if (privEscMatch) {
    findings.push({
      factor: "Privilege Escalation Path",
      description: `Combining "${privEscMatch[0]}" with "${privEscMatch[1]}" is a known privilege-escalation pattern.`,
      weight: 30,
    });
    recommendations.add("Add a permissions boundary restricting which roles this identity can pass");
  }

  if (!/"condition"/i.test(lower)) {
    findings.push({
      factor: "No Conditions Applied",
      description: "The statement has no condition block — no MFA, IP, or time restriction is enforced.",
      weight: 10,
    });
    recommendations.add("Add condition keys such as aws:MultiFactorAuthPresent or aws:SourceIp");
  }

  if (/"effect"\s*:\s*"allow"/i.test(lower) && /notaction/i.test(lower)) {
    findings.push({
      factor: "NotAction with Allow Effect",
      description: "Using NotAction with an Allow effect grants everything except the listed actions — a common source of unintended access.",
      weight: 20,
    });
    recommendations.add("Prefer explicit Action allow-lists over NotAction");
  }

  const score = Math.min(100, findings.reduce((sum, f) => sum + f.weight, 0));
  const verdict: IamVerdict = score >= 55 ? "High Risk" : score >= 20 ? "Needs Review" : "Least Privilege";

  if (findings.length === 0) {
    recommendations.add("No common over-permissioning patterns detected in this statement");
  }
  recommendations.add("Validate this policy with a policy simulator before attaching it to a live identity");

  return { score, verdict, findings, recommendations: Array.from(recommendations) };
}
