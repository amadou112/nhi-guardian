// Rule-based Cloud Security Posture Management (CSPM) scanner.
// Paste a cloud resource config (Terraform-like, CloudFormation-like, or
// plain JSON) and it's checked against common cloud misconfiguration
// patterns — the same transparent, explainable approach as lib/riskEngine.ts.

export type CspmVerdict = "Critical" | "Warning" | "Compliant";

export interface CspmFinding {
  factor: string;
  description: string;
  weight: number;
}

export interface CspmResult {
  score: number;
  verdict: CspmVerdict;
  findings: CspmFinding[];
  recommendations: string[];
}

const SENSITIVE_PORTS = [22, 3389, 3306, 5432, 1433, 6379, 27017, 9200];

export function scanCloudConfig(raw: string): CspmResult {
  const text = raw;
  const lower = text.toLowerCase();
  const findings: CspmFinding[] = [];
  const recommendations = new Set<string>();

  if (/0\.0\.0\.0\/0/.test(text)) {
    const hasSensitivePort = SENSITIVE_PORTS.some((port) => new RegExp(`\\b${port}\\b`).test(text));
    findings.push({
      factor: "Open Ingress to the Internet",
      description: hasSensitivePort
        ? "A security group or firewall rule allows inbound traffic from 0.0.0.0/0 on a sensitive port."
        : "A rule allows inbound traffic from 0.0.0.0/0 (any IP address).",
      weight: hasSensitivePort ? 30 : 15,
    });
    recommendations.add("Restrict ingress rules to known IP ranges or a VPN/bastion host");
  }

  if (/"acl"\s*:\s*"public-read(-write)?"|acl\s*=\s*"public-read(-write)?"/i.test(text)) {
    findings.push({
      factor: "Publicly Readable/Writable Storage",
      description: "The storage resource ACL grants public read or write access.",
      weight: 25,
    });
    recommendations.add("Remove public ACLs and use signed URLs or bucket policies scoped to specific principals");
  }

  if (/block_public_acls"?\s*[:=]\s*false/i.test(text)) {
    findings.push({
      factor: "Public Access Block Disabled",
      description: "Public access block settings are explicitly disabled on this storage resource.",
      weight: 20,
    });
    recommendations.add("Enable public access block settings by default on all storage resources");
  }

  if (/"encrypted"\s*:\s*false|encrypted\s*=\s*false|encryption\s*=\s*"?none"?/i.test(text)) {
    findings.push({
      factor: "Encryption at Rest Disabled",
      description: "This resource does not have encryption at rest enabled.",
      weight: 20,
    });
    recommendations.add("Enable encryption at rest using a managed or customer-managed key");
  }

  if (/"versioning"\s*:\s*false|versioning\s*=\s*"?disabled"?|status\s*=\s*"suspended"/i.test(text)) {
    findings.push({
      factor: "Versioning Disabled",
      description: "Object versioning is disabled, increasing the risk of accidental or malicious data loss.",
      weight: 10,
    });
    recommendations.add("Enable versioning to protect against accidental deletion or overwrite");
  }

  if (/"logging"\s*:\s*false|logging\s*=\s*"?disabled"?|enable_logging\s*=\s*false/i.test(text)) {
    findings.push({
      factor: "Access Logging Disabled",
      description: "Access logging is not enabled for this resource, limiting audit visibility.",
      weight: 10,
    });
    recommendations.add("Enable access logging to a centralized, access-controlled log destination");
  }

  if (/"action"\s*:\s*"\*"|action\s*=\s*"\*"/i.test(text)) {
    findings.push({
      factor: "Wildcard Actions in Resource Policy",
      description: "The attached policy grants wildcard (*) actions rather than least-privilege permissions.",
      weight: 25,
    });
    recommendations.add("Scope policy actions to only the specific operations required");
  }

  if (/mfa_delete\s*=\s*false|"mfadelete"\s*:\s*"?disabled"?/i.test(text)) {
    findings.push({
      factor: "MFA Delete Not Enforced",
      description: "MFA delete protection is not enforced for this resource.",
      weight: 10,
    });
    recommendations.add("Enable MFA delete on resources holding sensitive or business-critical data");
  }

  if (/database|rds|sql|postgres|mysql/i.test(lower) && /publicly_accessible"?\s*[:=]\s*true/i.test(text)) {
    findings.push({
      factor: "Publicly Accessible Database",
      description: "The database instance is configured as publicly accessible.",
      weight: 30,
    });
    recommendations.add("Disable public accessibility and place databases in a private subnet");
  }

  const score = Math.min(100, findings.reduce((sum, f) => sum + f.weight, 0));
  const verdict: CspmVerdict = score >= 60 ? "Critical" : score >= 25 ? "Warning" : "Compliant";

  if (findings.length === 0) {
    recommendations.add("No misconfigurations detected in the patterns this scanner checks for");
  } else {
    recommendations.add("Run this scan as part of every pull request touching infrastructure-as-code");
  }

  return { score, verdict, findings, recommendations: Array.from(recommendations) };
}
