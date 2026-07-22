// Rule-based static application security testing (SAST) scanner.
// Paste a code snippet (any language) and it's checked line-by-line
// against common vulnerable coding patterns.

export interface SastFinding {
  factor: string;
  description: string;
  weight: number;
  line: number;
}

export type SastVerdict = "Critical" | "Needs Attention" | "Clean";

export interface SastResult {
  score: number;
  verdict: SastVerdict;
  findings: SastFinding[];
  recommendations: string[];
}

const CHECKS: { pattern: RegExp; factor: string; description: string; weight: number; rec: string }[] = [
  {
    pattern: /(api[_-]?key|secret|password|token)\s*[:=]\s*["'][A-Za-z0-9+/_\-]{12,}["']/i,
    factor: "Hardcoded Secret",
    description: "A credential or API key appears to be hardcoded directly in source.",
    weight: 25,
    rec: "Move secrets to environment variables or a managed vault",
  },
  {
    pattern: /\beval\s*\(/,
    factor: "Use of eval()",
    description: "eval() executes arbitrary strings as code — a common injection vector.",
    weight: 20,
    rec: "Avoid eval(); use JSON.parse or explicit parsing instead",
  },
  {
    pattern: /child_process\.exec\([^)]*\+|exec\s*\(\s*["'`][^)]*\$\{/,
    factor: "Command Injection Risk",
    description: "A shell command appears to be built via string concatenation or interpolation with external input.",
    weight: 25,
    rec: "Use parameterized subprocess APIs (execFile/spawn with an argument array)",
  },
  {
    pattern: /(SELECT|INSERT|UPDATE|DELETE)\s.*["'`]\s*\+|f["'](SELECT|INSERT|UPDATE|DELETE)/i,
    factor: "SQL Injection Risk",
    description: "A SQL query appears to be built via string concatenation instead of parameterized queries.",
    weight: 25,
    rec: "Use parameterized queries or an ORM instead of string concatenation",
  },
  {
    pattern: /\.innerHTML\s*=/,
    factor: "Potential XSS via innerHTML",
    description: "Assigning to innerHTML with unsanitized input can enable cross-site scripting.",
    weight: 15,
    rec: "Use textContent, or sanitize input before rendering HTML",
  },
  {
    pattern: /\bmd5\b|\bsha1\b/i,
    factor: "Weak Hashing Algorithm",
    description: "MD5/SHA-1 are cryptographically broken for security-sensitive use such as password hashing.",
    weight: 15,
    rec: "Use bcrypt, scrypt, or Argon2 for password hashing",
  },
  {
    pattern: /verify\s*=\s*False|rejectUnauthorized\s*:\s*false|NODE_TLS_REJECT_UNAUTHORIZED/i,
    factor: "TLS Verification Disabled",
    description: "Certificate verification is explicitly disabled, allowing man-in-the-middle attacks.",
    weight: 25,
    rec: "Never disable TLS certificate verification in production code",
  },
  {
    pattern: /pickle\.loads|yaml\.load\s*\((?!.*Loader)/i,
    factor: "Unsafe Deserialization",
    description: "Deserializing untrusted data with pickle or unsafe yaml.load can lead to code execution.",
    weight: 20,
    rec: "Use yaml.safe_load or a safe serialization format such as JSON",
  },
];

export function scanCode(raw: string): SastResult {
  const lines = raw.split("\n");
  const findings: SastFinding[] = [];
  const recommendations = new Set<string>();

  lines.forEach((line, idx) => {
    for (const check of CHECKS) {
      if (check.pattern.test(line)) {
        findings.push({ factor: check.factor, description: check.description, weight: check.weight, line: idx + 1 });
        recommendations.add(check.rec);
      }
    }
  });

  const score = Math.min(100, findings.reduce((sum, f) => sum + f.weight, 0));
  const verdict: SastVerdict = score >= 50 ? "Critical" : score >= 20 ? "Needs Attention" : "Clean";

  if (findings.length === 0) {
    recommendations.add("No common vulnerable patterns detected in this snippet");
  }

  return { score, verdict, findings, recommendations: Array.from(recommendations) };
}
