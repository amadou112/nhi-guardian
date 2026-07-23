// Heuristic scanner for the Hallucination Detection tool. Paste an
// AI-generated response and it's checked against textual patterns that
// often correlate with unverified or fabricated claims — overconfident
// absolute language, suspiciously precise unsourced statistics, and vague
// citations. This is an illustrative heuristic, NOT genuine fact-checking
// or ground-truth verification — the tool discloses this explicitly,
// the same way the Threat Intelligence Lookup discloses its mock mode.

export type HallucinationVerdict = "Likely Hallucinated" | "Needs Verification" | "Well-Grounded";

export interface HallucinationFinding {
  factor: string;
  description: string;
  weight: number;
}

export interface HallucinationResult {
  score: number;
  verdict: HallucinationVerdict;
  findings: HallucinationFinding[];
  recommendations: string[];
}

export function scanResponse(raw: string): HallucinationResult {
  const findings: HallucinationFinding[] = [];
  const recommendations = new Set<string>();

  if (/\b(definitely|guaranteed|100% certain|without (a )?doubt|always true|never fails)\b/i.test(raw)) {
    findings.push({
      factor: "Overconfident Absolute Language",
      description: 'Uses absolute certainty ("definitely", "guaranteed") for a claim that likely has real-world exceptions or nuance.',
      weight: 20,
    });
    recommendations.add("Ask the model to state its confidence level and cite sources for factual claims");
  }

  if (/\b\d{1,3}\.\d{1,2}%\s+of\b|\bexactly\s+\d{3,}\b/i.test(raw)) {
    findings.push({
      factor: "Suspiciously Precise Unsourced Statistic",
      description: "Contains an oddly precise number or percentage with no cited source — a common hallucination pattern.",
      weight: 25,
    });
    recommendations.add("Cross-check precise statistics against a named, verifiable source before trusting them");
  }

  if (/according to (a |an )?(study|research|report)(?!.{0,60}(university|journal|20\d{2}\s|https?:\/\/))/i.test(raw)) {
    findings.push({
      factor: "Vague Citation Without a Named Source",
      description: '"According to a study..." with no named institution, author, or publication is unverifiable as written.',
      weight: 20,
    });
    recommendations.add("Require the model to name a specific, checkable source, not a vague reference");
  }

  if (/\b(as (we|I) (all )?know|it('s| is) common knowledge that|obviously)\b/i.test(raw)) {
    findings.push({
      factor: "Unearned Appeal to Common Knowledge",
      description: 'Phrases like "as we all know" often substitute for an actual citation on a non-obvious claim.',
      weight: 10,
    });
  }

  if (/https?:\/\/[a-z0-9.-]+\.(com|org|net)\/[a-z0-9-]{20,}/i.test(raw)) {
    findings.push({
      factor: "Suspiciously Specific Fabricated-Looking URL",
      description: "Contains a long, oddly specific URL pattern consistent with a fabricated citation link.",
      weight: 20,
    });
    recommendations.add("Verify any cited URL actually resolves and supports the claim before trusting it");
  }

  if (!/\b(may|might|could|it's possible|likely|approximately|around|I'm not certain|I don't have access to)\b/i.test(raw) && raw.trim().length > 200) {
    findings.push({
      factor: "No Uncertainty Language in a Long, Detailed Response",
      description: "A long, detailed response with zero hedging language is a mild signal worth a second look.",
      weight: 10,
    });
  }

  const score = Math.min(100, findings.reduce((sum, f) => sum + f.weight, 0));
  const verdict: HallucinationVerdict = score >= 45 ? "Likely Hallucinated" : score >= 15 ? "Needs Verification" : "Well-Grounded";

  if (findings.length === 0) {
    recommendations.add("No common hallucination-correlated patterns detected in this response");
  }
  recommendations.add("This is a heuristic screen, not fact-checking — always verify factual claims against a primary source");

  return { score, verdict, findings, recommendations: Array.from(recommendations) };
}
