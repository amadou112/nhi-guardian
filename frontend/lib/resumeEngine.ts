// Rule-based ATS (Applicant Tracking System) resume readiness checker.
// Starts at 100 and deducts for missing best practices — mirrors the
// transparency of lib/riskEngine.ts, just inverted (deductions, not risk).

export interface ResumeFinding {
  factor: string;
  description: string;
  weight: number;
}

export type ResumeBand = "Excellent" | "Good" | "Needs Work" | "Poor";

export interface ResumeResult {
  score: number;
  band: ResumeBand;
  findings: ResumeFinding[];
  recommendations: string[];
  stats: {
    wordCount: number;
    bulletCount: number;
    keywordMatches?: number;
    keywordTotal?: number;
  };
}

const ACTION_VERBS = [
  "led", "built", "managed", "developed", "launched", "implemented", "designed",
  "increased", "reduced", "created", "delivered", "optimized", "negotiated",
  "spearheaded", "drove", "improved", "architected", "automated", "streamlined",
  "mentored", "owned", "shipped", "scaled",
];

function getBand(score: number): ResumeBand {
  if (score >= 85) return "Excellent";
  if (score >= 65) return "Good";
  if (score >= 40) return "Needs Work";
  return "Poor";
}

export function analyzeResume(rawText: string, targetKeywords?: string): ResumeResult {
  const text = rawText.trim();
  const lower = text.toLowerCase();
  const findings: ResumeFinding[] = [];
  const recommendations = new Set<string>();

  let score = 100;
  const deduct = (factor: string, description: string, weight: number) => {
    findings.push({ factor, description, weight });
    score -= weight;
  };

  const wordCount = text.split(/\s+/).filter(Boolean).length;
  const bulletCount = (text.match(/^\s*[-•*]\s+/gm) ?? []).length;

  if (!/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i.test(text)) {
    deduct("Missing Email Address", "No email address detected — ATS systems and recruiters need a way to contact you.", 15);
    recommendations.add("Add a professional email address near the top of the resume");
  }

  if (!/(\+?\d[\d\s().-]{7,}\d)/.test(text)) {
    deduct("Missing Phone Number", "No phone number detected in a standard format.", 10);
    recommendations.add("Add a phone number in a standard format, e.g. (555) 123-4567");
  }

  const sectionChecks: { key: string; patterns: RegExp[] }[] = [
    { key: "Experience", patterns: [/experience/i, /employment history/i, /work history/i] },
    { key: "Education", patterns: [/education/i] },
    { key: "Skills", patterns: [/skills/i] },
  ];
  for (const section of sectionChecks) {
    if (!section.patterns.some((p) => p.test(text))) {
      deduct(
        `Missing "${section.key}" Section`,
        `No "${section.key}" section header detected. ATS parsers rely on standard section headers to categorize content.`,
        10
      );
      recommendations.add(`Add a clearly labeled "${section.key}" section header`);
    }
  }

  if (wordCount > 0 && wordCount < 200) {
    deduct("Resume Too Short", `At ${wordCount} words, this resume is likely too thin for ATS parsing and recruiter context.`, 15);
    recommendations.add("Expand on responsibilities and achievements — aim for 400-800 words");
  } else if (wordCount > 1200) {
    deduct("Resume Too Long", `At ${wordCount} words, this resume is longer than the 1-2 page norm most ATS and recruiters expect.`, 10);
    recommendations.add("Tighten the resume toward 1-2 pages by cutting older or less relevant roles");
  }

  if (bulletCount < 3) {
    deduct("Few Bullet Points", "Fewer than 3 bullet points detected. ATS and recruiters both favor scannable, bullet-point achievements over paragraphs.", 10);
    recommendations.add("Convert paragraph descriptions into concise bullet points starting with an action verb");
  }

  const actionVerbHits = ACTION_VERBS.filter((v) => new RegExp(`\\b${v}\\b`, "i").test(lower));
  if (actionVerbHits.length === 0) {
    deduct("No Strong Action Verbs", "No strong action verbs (e.g. led, built, launched, optimized) detected.", 15);
    recommendations.add("Start bullet points with strong action verbs like 'Led', 'Built', or 'Reduced'");
  }

  if (/\b(i|me|my)\b/i.test(lower)) {
    deduct("First-Person Pronouns", "Contains first-person pronouns (I, me, my), which are conventionally omitted from resumes.", 10);
    recommendations.add("Remove first-person pronouns — resumes conventionally use implied subject, e.g. 'Led a team of 5' not 'I led a team of 5'");
  }

  if (!/\d/.test(text) || !/%|\$|\d+\s?(users|customers|hours|days|weeks|months|years|million|thousand|k\b)/i.test(lower)) {
    deduct("No Quantified Achievements", "No numbers, percentages, or metrics detected. Quantified impact is one of the strongest ATS and recruiter signals.", 10);
    recommendations.add("Quantify achievements with numbers, e.g. 'Reduced deployment time by 40%'");
  }

  let keywordMatches: number | undefined;
  let keywordTotal: number | undefined;
  if (targetKeywords && targetKeywords.trim()) {
    const keywords = targetKeywords
      .split(/[,\n]/)
      .map((k) => k.trim().toLowerCase())
      .filter(Boolean);
    keywordTotal = keywords.length;
    const missing = keywords.filter((k) => !lower.includes(k));
    keywordMatches = keywordTotal - missing.length;
    const ratio = keywordTotal > 0 ? keywordMatches / keywordTotal : 1;
    if (ratio < 0.8 && missing.length > 0) {
      const weight = Math.round((1 - ratio) * 20);
      deduct(
        "Missing Target Keywords",
        `Missing ${missing.length} of ${keywordTotal} target keywords: ${missing.slice(0, 6).join(", ")}${missing.length > 6 ? "…" : ""}.`,
        weight
      );
      recommendations.add("Work missing keywords naturally into your experience and skills sections");
    }
  }

  recommendations.add("Avoid tables, columns, text boxes, headers/footers, and images — many ATS systems cannot parse them");
  recommendations.add("Save and submit as a standard .docx or text-based PDF, not a scanned image");

  score = Math.max(0, Math.min(100, score));

  return {
    score,
    band: getBand(score),
    findings,
    recommendations: Array.from(recommendations),
    stats: { wordCount, bulletCount, keywordMatches, keywordTotal },
  };
}
