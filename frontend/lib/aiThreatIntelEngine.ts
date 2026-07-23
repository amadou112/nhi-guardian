// Simulated AI threat intelligence lookup. Paste a prompt, technique
// name, or jailbreak label and it's checked against a small local
// reference set of publicly documented AI jailbreak/attack techniques —
// the same disclosed-local-mock approach as lib/threatIntelEngine.ts.
// The technique names referenced are real, publicly documented by AI
// security researchers, the same way the vulnerability scanner references
// real historical CVEs — not exploit-capable content.

export type AiThreatVerdict = "Known Attack Pattern" | "Suspicious Pattern" | "Clean" | "Unrecognized";

export interface AiThreatResult {
  verdict: AiThreatVerdict;
  confidence: number;
  matchedTechnique: string | null;
  tags: string[];
  summary: string;
}

const KNOWN_TECHNIQUES: { keywords: string[]; name: string; tags: string[] }[] = [
  { keywords: ["dan", "do anything now"], name: "DAN (Do Anything Now)", tags: ["Jailbreak Persona"] },
  { keywords: ["grandma", "grandmother exploit"], name: "Grandma Exploit", tags: ["Roleplay Bypass"] },
  { keywords: ["skeleton key"], name: "Skeleton Key", tags: ["Guardrail Bypass"] },
  { keywords: ["many-shot", "many shot jailbreak"], name: "Many-Shot Jailbreaking", tags: ["Context Stuffing"] },
  { keywords: ["crescendo"], name: "Crescendo Attack", tags: ["Gradual Escalation"] },
  { keywords: ["translate this to bypass", "prompt leaking via translation"], name: "Prompt Leaking via Translation", tags: ["Prompt Exfiltration"] },
  { keywords: ["dev mode", "developer mode enabled"], name: "Developer Mode Jailbreak", tags: ["Jailbreak Persona"] },
];

function hashString(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h * 31 + s.charCodeAt(i)) >>> 0;
  }
  return h;
}

export function lookupAiThreat(raw: string): AiThreatResult {
  const input = raw.trim();
  const lower = input.toLowerCase();

  if (!input) {
    return { verdict: "Unrecognized", confidence: 0, matchedTechnique: null, tags: [], summary: "No input provided." };
  }

  const matched = KNOWN_TECHNIQUES.find((t) => t.keywords.some((k) => lower.includes(k)));
  if (matched) {
    return {
      verdict: "Known Attack Pattern",
      confidence: 90 + (hashString(lower) % 10),
      matchedTechnique: matched.name,
      tags: matched.tags,
      summary: `Matches the publicly documented "${matched.name}" technique in this simulation's reference set.`,
    };
  }

  const h = hashString(lower);
  const bucket = h % 10;

  if (bucket <= 2) {
    return {
      verdict: "Suspicious Pattern",
      confidence: 40 + (h % 30),
      matchedTechnique: null,
      tags: ["Unclassified Anomaly"],
      summary: "Shares structural characteristics with known jailbreak attempts, but doesn't match a named technique.",
    };
  }

  return {
    verdict: "Clean",
    confidence: 70 + (h % 25),
    matchedTechnique: null,
    tags: [],
    summary: "No association with known AI attack techniques in this simulation's reference set.",
  };
}
