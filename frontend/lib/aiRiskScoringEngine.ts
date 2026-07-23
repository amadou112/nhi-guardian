// Rule-based risk scoring for the AI Risk Scoring tool. Paste a
// description of an AI system, agent, or deployment and it's scored
// against AI-specific risk factors — the same transparent, weighted
// scoring philosophy as the core NHI risk engine in lib/riskEngine.ts,
// applied to AI systems instead of non-human identities.

export type AiRiskSeverity = "Critical" | "High" | "Medium" | "Low";

export interface AiRiskFinding {
  factor: string;
  description: string;
  weight: number;
}

export interface AiRiskResult {
  score: number;
  severity: AiRiskSeverity;
  findings: AiRiskFinding[];
  recommendations: string[];
}

export function scoreAiSystem(raw: string): AiRiskResult {
  const text = raw.toLowerCase();
  const findings: AiRiskFinding[] = [];
  const recommendations = new Set<string>();

  if (/autonomous(ly)?|without human (review|oversight|approval)|no human in the loop/.test(text)) {
    findings.push({
      factor: "Autonomous Action Without Human Review",
      description: "The system takes actions autonomously without a human-in-the-loop approval step.",
      weight: 25,
    });
    recommendations.add("Add a human approval gate before high-impact autonomous actions");
  }

  if (/production database|customer data|pii|personal(ly)? identifiable|financial data|health (data|records)/.test(text)) {
    findings.push({
      factor: "Access to Sensitive or Production Data",
      description: "The system has access to sensitive production, customer, or regulated data.",
      weight: 25,
    });
    recommendations.add("Scope data access to the minimum required fields, not full production datasets");
  }

  if (/execute code|shell access|file system access|can delete|admin access|root access/.test(text)) {
    findings.push({
      factor: "Broad Tool or System Permissions",
      description: "The system can execute code or take destructive/administrative actions on connected systems.",
      weight: 25,
    });
    recommendations.add("Apply least-privilege scoping to every tool or function the model can call");
  }

  if (/public internet|publicly accessible|external users|customer-facing|exposed to the internet/.test(text)) {
    findings.push({
      factor: "Public or External Exposure",
      description: "The system is reachable by external or public users rather than being internal-only.",
      weight: 15,
    });
    recommendations.add("Rate-limit and authenticate all externally-facing AI endpoints");
  }

  if (/third-party (api|llm|model)|external (llm|model) provider/.test(text)) {
    findings.push({
      factor: "Third-Party Model or Data Dependency",
      description: "The system depends on a third-party model or API provider outside direct organizational control.",
      weight: 10,
    });
    recommendations.add("Review the third-party provider's data retention and training-use policy");
  }

  if (/no logging|not monitored|no monitoring|no audit trail/.test(text)) {
    findings.push({
      factor: "No Logging or Monitoring",
      description: "No logging or monitoring is mentioned for this system's actions or outputs.",
      weight: 15,
    });
    recommendations.add("Log every model input, output, and tool call for audit and incident response");
  }

  if (/no (content filter|guardrails)|unfiltered|no safety (filter|layer)/.test(text)) {
    findings.push({
      factor: "No Guardrails or Content Filtering",
      description: "No guardrail or content-filtering layer is mentioned in front of the model.",
      weight: 15,
    });
    recommendations.add("Add an input/output guardrail layer independent of the base model's built-in safety training");
  }

  const score = Math.min(100, findings.reduce((sum, f) => sum + f.weight, 0));
  const severity: AiRiskSeverity = score >= 60 ? "Critical" : score >= 35 ? "High" : score >= 15 ? "Medium" : "Low";

  if (findings.length === 0) {
    recommendations.add("No common AI risk factors detected in this description");
  }
  recommendations.add("Re-assess this score whenever the system's data access, autonomy, or exposure changes");

  return { score, severity, findings, recommendations: Array.from(recommendations) };
}
