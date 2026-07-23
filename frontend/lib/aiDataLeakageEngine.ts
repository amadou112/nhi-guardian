// Rule-based scanner for the AI Data Leakage Detection tool. Paste text
// an AI system generated or is about to send, and it's checked for
// sensitive data and AI-specific leakage patterns — extends the same
// pattern-matching approach as lib/dlpEngine.ts to AI-output-specific risks.

export interface AiLeakMatch {
  category: string;
  count: number;
  sample: string;
}

export interface AiDataLeakageResult {
  matches: AiLeakMatch[];
  totalFindings: number;
}

const PATTERNS: { category: string; regex: RegExp }[] = [
  { category: "Social Security Number", regex: /\b\d{3}-\d{2}-\d{4}\b/g },
  { category: "Credit Card Number", regex: /\b(?:\d[ -]*?){13,16}\b/g },
  { category: "AWS Access Key", regex: /\bAKIA[0-9A-Z]{16}\b/g },
  { category: "Private Key Block", regex: /-----BEGIN (RSA |EC )?PRIVATE KEY-----/g },
  { category: "Email Address", regex: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g },
  { category: "System Prompt Leakage", regex: /(my (system prompt|instructions) (say|are|is)|as an ai language model, my instructions)/gi },
  { category: "Internal Configuration Reference", regex: /\b(api[_-]?key\s*=|internal use only|confidential[:\s]|do not (distribute|share externally))\b/gi },
  { category: "Customer/User Record Reference", regex: /\b(user_id|customer_id|account_number)\s*[:=]\s*\S+/gi },
];

function redact(sample: string): string {
  if (sample.length <= 4) return "••••";
  return sample.slice(0, 2) + "•".repeat(Math.max(2, sample.length - 4)) + sample.slice(-2);
}

export function scanAiOutput(raw: string): AiDataLeakageResult {
  const matches: AiLeakMatch[] = [];

  for (const { category, regex } of PATTERNS) {
    const found = Array.from(raw.matchAll(regex)).map((m) => m[0]);
    if (found.length > 0) {
      matches.push({ category, count: found.length, sample: redact(found[0]) });
    }
  }

  const totalFindings = matches.reduce((sum, m) => sum + m.count, 0);
  return { matches, totalFindings };
}
