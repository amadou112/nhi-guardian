// Rule-based sensitive-data scanner for the Data Loss Prevention (DLP)
// tool. Paste text or document content and it's checked for common PII
// and secret patterns. Pattern-based detection has false positives, same
// as real DLP products — this is disclosed in the tool's own copy.

export interface DlpMatch {
  category: string;
  count: number;
  sample: string;
}

export interface DlpResult {
  matches: DlpMatch[];
  totalFindings: number;
}

const PATTERNS: { category: string; regex: RegExp }[] = [
  { category: "Social Security Number", regex: /\b\d{3}-\d{2}-\d{4}\b/g },
  { category: "Credit Card Number", regex: /\b(?:\d[ -]*?){13,16}\b/g },
  { category: "AWS Access Key", regex: /\bAKIA[0-9A-Z]{16}\b/g },
  { category: "Private Key Block", regex: /-----BEGIN (RSA |EC )?PRIVATE KEY-----/g },
  { category: "Email Address", regex: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g },
  { category: "Phone Number", regex: /\b\(?\d{3}\)?[-.\s]\d{3}[-.\s]\d{4}\b/g },
  { category: "IBAN", regex: /\b[A-Z]{2}\d{2}[A-Z0-9]{10,30}\b/g },
];

function redact(sample: string): string {
  if (sample.length <= 4) return "••••";
  return sample.slice(0, 2) + "•".repeat(Math.max(2, sample.length - 4)) + sample.slice(-2);
}

export function scanForSensitiveData(raw: string): DlpResult {
  const matches: DlpMatch[] = [];

  for (const { category, regex } of PATTERNS) {
    const found = Array.from(raw.matchAll(regex)).map((m) => m[0]);
    if (found.length > 0) {
      matches.push({ category, count: found.length, sample: redact(found[0]) });
    }
  }

  const totalFindings = matches.reduce((sum, m) => sum + m.count, 0);
  return { matches, totalFindings };
}
