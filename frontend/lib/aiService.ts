import { NonHumanIdentity } from "@/lib/types";
import { assessAll, assessIdentity } from "@/lib/riskEngine";
import { generateExecutiveReport } from "@/lib/reportGenerator";
import { daysSince, formatDate } from "@/lib/utils";

// Local rule-based "AI Security Analyst".
// This mirrors the interface a real LLM-backed service (OpenAI + LangChain)
// would expose, so it can be swapped for a live model without changing the UI.
// See backend/app/services/ai_service.py for the equivalent server-side stub.

export interface AiAnswer {
  text: string;
}

function findIdentityByName(identities: NonHumanIdentity[], query: string): NonHumanIdentity | undefined {
  const q = query.toLowerCase();
  return identities.find((i) => q.includes(i.name.toLowerCase())) ?? identities.find((i) => {
    const words = i.name.toLowerCase().split("-");
    return words.some((w) => w.length > 3 && q.includes(w));
  });
}

function answerHighestRisk(identities: NonHumanIdentity[]): string {
  const assessments = assessAll(identities);
  const byId = new Map(assessments.map((a) => [a.identityId, a]));
  const ranked = [...identities]
    .map((i) => ({ i, a: byId.get(i.id)! }))
    .sort((x, y) => y.a.score - x.a.score)
    .slice(0, 5);

  const lines = ranked.map(
    (r, idx) =>
      `${idx + 1}. **${r.i.name}** (${r.i.system}) — Risk score ${r.a.score}/100, ${r.a.severity}. ` +
      `Top factor: ${r.a.findings[0]?.factor ?? "N/A"}.`
  );

  return (
    `Here are the highest-risk non-human identities right now:\n\n${lines.join("\n")}\n\n` +
    `These accounts combine high privilege, missing rotation, or exposed secrets. I'd recommend starting remediation with #1.`
  );
}

function answerExplainIdentity(identities: NonHumanIdentity[], query: string): string {
  const identity = findIdentityByName(identities, query);
  if (!identity) {
    return (
      "I couldn't match that to a specific identity in the inventory. Try asking, for example: " +
      "\"Explain why aws-root-automation-key is critical.\""
    );
  }
  const assessment = assessIdentity(identity);
  const factorLines = assessment.findings.map((f) => `- **${f.factor}** (+${f.weight}): ${f.description}`);

  return (
    `**${identity.name}** (${identity.type} on ${identity.system}) scores ${assessment.score}/100 — ` +
    `${assessment.severity} risk.\n\nContributing factors:\n${factorLines.join("\n") || "- No significant risk factors found."}\n\n` +
    `Recommended actions: ${assessment.recommendations.join(", ") || "None — this identity is well managed."}.`
  );
}

function answerRemediationPlan(identities: NonHumanIdentity[]): string {
  const report = generateExecutiveReport(identities);
  const roadmap = report.remediationRoadmap
    .map((phase) => `**${phase.phase}** (${phase.timeframe})\n${phase.actions.map((a) => `- ${a}`).join("\n")}`)
    .join("\n\n");
  return `Here's a prioritized remediation plan based on the current inventory:\n\n${roadmap}`;
}

function answerExecutiveSummary(identities: NonHumanIdentity[]): string {
  const report = generateExecutiveReport(identities);
  return `${report.summary}\n\n${report.businessImpact}`;
}

function answerWhatToFixFirst(identities: NonHumanIdentity[]): string {
  const report = generateExecutiveReport(identities);
  const lines = report.topFindings.map(
    (f, idx) =>
      `${idx + 1}. **${f.identity.name}** — ${f.assessment.severity} (score ${f.assessment.score}). ` +
      `Fix: ${f.assessment.recommendations[0] ?? "Review manually"}.`
  );
  return `Based on current risk scores, prioritize these first:\n\n${lines.join("\n")}`;
}

function answerStale(identities: NonHumanIdentity[]): string {
  const stale = identities.filter((i) => daysSince(i.lastUsedDate) > 180);
  if (stale.length === 0) return "No identities are currently stale beyond the 180-day threshold.";
  const lines = stale
    .sort((a, b) => daysSince(b.lastUsedDate) - daysSince(a.lastUsedDate))
    .map((i) => `- **${i.name}** — last used ${formatDate(i.lastUsedDate)} (${daysSince(i.lastUsedDate)} days ago)`);
  return `${stale.length} identities have not been used in over 180 days:\n\n${lines.join("\n")}\n\nThese are candidates for disablement.`;
}

function answerDefault(identities: NonHumanIdentity[]): string {
  const assessments = assessAll(identities);
  const critical = assessments.filter((a) => a.severity === "Critical").length;
  return (
    `I'm the NHI Guardian AI Security Analyst (local mock mode). I can help with questions like:\n\n` +
    `- "Which identities are highest risk?"\n` +
    `- "Explain why <identity-name> is critical."\n` +
    `- "Generate a remediation plan."\n` +
    `- "Write an executive risk summary."\n` +
    `- "What should we fix first?"\n` +
    `- "Which identities are stale or orphaned?"\n\n` +
    `Right now the inventory has ${identities.length} identities, ${critical} of which are Critical risk.`
  );
}

export function askAiAnalyst(question: string, identities: NonHumanIdentity[]): AiAnswer {
  const q = question.toLowerCase();

  if (q.includes("highest risk") || q.includes("most risky") || q.includes("top risk")) {
    return { text: answerHighestRisk(identities) };
  }
  if (q.includes("explain") || q.includes("why")) {
    return { text: answerExplainIdentity(identities, q) };
  }
  if (q.includes("remediation") || q.includes("plan")) {
    return { text: answerRemediationPlan(identities) };
  }
  if (q.includes("executive") || q.includes("summary")) {
    return { text: answerExecutiveSummary(identities) };
  }
  if (q.includes("fix first") || q.includes("prioritize") || q.includes("priority")) {
    return { text: answerWhatToFixFirst(identities) };
  }
  if (q.includes("stale") || q.includes("orphan")) {
    return { text: answerStale(identities) };
  }
  return { text: answerDefault(identities) };
}
