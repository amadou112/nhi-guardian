// Rule-based phishing & malware indicator scanner.
// Mirrors the style of lib/riskEngine.ts: transparent, explainable rules
// rather than a black-box classifier — every point on the score traces
// back to a named, human-readable indicator.

export type ScanVerdict = "Malicious" | "Suspicious" | "Safe";

export interface ScanIndicator {
  factor: string;
  description: string;
  weight: number;
}

export interface ScanResult {
  score: number;
  verdict: ScanVerdict;
  indicators: ScanIndicator[];
  recommendations: string[];
}

const URL_SHORTENERS = ["bit.ly", "tinyurl.com", "t.co", "goo.gl", "ow.ly", "is.gd", "buff.ly", "rebrand.ly"];
const SUSPICIOUS_TLDS = [".zip", ".xyz", ".top", ".click", ".gq", ".tk", ".men", ".work", ".review", ".country", ".support", ".loan"];
const DANGEROUS_EXTENSIONS = [".exe", ".scr", ".js", ".vbs", ".bat", ".jar", ".iso", ".docm", ".xlsm", ".msi"];
const BRAND_NAMES = ["paypal", "amazon", "microsoft", "apple", "netflix", "bankofamerica", "chase", "irs", "docusign", "google", "facebook", "wellsfargo"];
const URGENCY_PHRASES = [
  "act now", "verify your account", "account suspended", "account has been limited",
  "immediately", "within 24 hours", "confirm your identity", "unusual activity",
  "click here", "limited time", "will be closed", "update your payment",
  "your account will be locked", "final notice", "urgent action required",
];
const CREDENTIAL_REQUESTS = [
  "password", "social security", "ssn", "credit card", "bank account",
  "one-time code", "otp", "verification code", "wire transfer", "cvv", "pin number",
];
const GENERIC_GREETINGS = ["dear customer", "dear user", "dear sir/madam", "dear valued customer", "dear account holder"];

function extractUrls(text: string): string[] {
  const matches = text.match(/\b((?:https?:\/\/)?[a-z0-9.-]+\.[a-z]{2,}(?:\/[^\s]*)?)/gi);
  return matches ?? [];
}

export function scanForThreats(rawInput: string): ScanResult {
  const input = rawInput.trim();
  const lower = input.toLowerCase();
  const indicators: ScanIndicator[] = [];
  const recommendations = new Set<string>();

  const urls = extractUrls(input);

  for (const url of urls) {
    const hostMatch = url.match(/^(?:https?:\/\/)?([^/]+)/i);
    const host = (hostMatch?.[1] ?? url).toLowerCase();

    if (/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/.test(host)) {
      indicators.push({
        factor: "Raw IP Address",
        description: `The link points to a raw IP address (${host}) instead of a named domain — a common technique to hide the real destination.`,
        weight: 25,
      });
      recommendations.add("Do not click the link — hover to inspect the true destination first");
    }

    if (URL_SHORTENERS.some((s) => host.includes(s))) {
      indicators.push({
        factor: "URL Shortener",
        description: `The link uses a shortening service (${host}), which can mask a malicious destination.`,
        weight: 15,
      });
      recommendations.add("Expand shortened links with a preview tool before clicking");
    }

    if (SUSPICIOUS_TLDS.some((tld) => host.endsWith(tld))) {
      indicators.push({
        factor: "Suspicious Domain Extension",
        description: `The domain uses a top-level domain (${host.split(".").pop()}) frequently abused for phishing and malware distribution.`,
        weight: 15,
      });
      recommendations.add("Verify the domain independently before visiting");
    }

    if (host.includes("xn--")) {
      indicators.push({
        factor: "Punycode / Homograph Domain",
        description: "The domain uses punycode encoding, often used to impersonate a trusted brand with lookalike characters.",
        weight: 20,
      });
      recommendations.add("Treat the domain as untrustworthy — punycode is rarely used legitimately");
    }

    if (/^http:\/\//i.test(url)) {
      indicators.push({
        factor: "Unencrypted Link",
        description: "The link uses plain HTTP rather than HTTPS, so any submitted data is unencrypted.",
        weight: 10,
      });
    }

    if (url.includes("@")) {
      indicators.push({
        factor: "'@' Symbol in URL",
        description: "The URL contains an '@' symbol, a classic trick to disguise the real destination after it.",
        weight: 20,
      });
      recommendations.add("Do not click the link or enter any credentials");
    }

    if ((host.match(/\./g) ?? []).length >= 4) {
      indicators.push({
        factor: "Excessive Subdomains",
        description: `The domain (${host}) chains many subdomains together, often used to bury the real domain out of view.`,
        weight: 10,
      });
    }

    if ((host.match(/-/g) ?? []).length >= 3) {
      indicators.push({
        factor: "Hyphen-Heavy Domain",
        description: `The domain (${host}) contains an unusually high number of hyphens, common in lookalike domains.`,
        weight: 10,
      });
    }

    const mentionedBrand = BRAND_NAMES.find((brand) => host.includes(brand));
    if (mentionedBrand && !host.endsWith(`${mentionedBrand}.com`)) {
      indicators.push({
        factor: "Brand Impersonation",
        description: `The domain references "${mentionedBrand}" but is not the brand's official domain — a common lookalike-domain tactic.`,
        weight: 20,
      });
      recommendations.add(`Go directly to ${mentionedBrand}.com by typing it yourself instead of clicking the link`);
    }
  }

  const matchedUrgency = URGENCY_PHRASES.filter((p) => lower.includes(p));
  if (matchedUrgency.length > 0) {
    indicators.push({
      factor: "Urgency / Pressure Language",
      description: `Contains high-pressure language ("${matchedUrgency[0]}") designed to rush you into acting without thinking.`,
      weight: 15,
    });
    recommendations.add("Slow down — legitimate organizations rarely demand immediate action by email or text");
  }

  const matchedCredentials = CREDENTIAL_REQUESTS.filter((p) => lower.includes(p));
  if (matchedCredentials.length > 0) {
    indicators.push({
      factor: "Requests Sensitive Information",
      description: `Asks for sensitive information ("${matchedCredentials[0]}"), which legitimate institutions rarely request via message or email.`,
      weight: 20,
    });
    recommendations.add("Never share passwords, codes, or financial details in response to an unsolicited message");
  }

  if (GENERIC_GREETINGS.some((g) => lower.includes(g))) {
    indicators.push({
      factor: "Generic Greeting",
      description: "Uses a generic greeting instead of your name, suggesting a mass-sent message rather than a personal one.",
      weight: 10,
    });
  }

  if ((input.match(/!{2,}/g) ?? []).length > 0) {
    indicators.push({
      factor: "Unusual Formatting",
      description: "Uses repeated exclamation marks or urgent styling typical of phishing and spam campaigns.",
      weight: 10,
    });
  }

  const matchedExtension = DANGEROUS_EXTENSIONS.find((ext) => lower.includes(ext));
  if (matchedExtension) {
    indicators.push({
      factor: "Dangerous Attachment Type",
      description: `References a "${matchedExtension}" file — an executable file type frequently used to deliver malware.`,
      weight: 25,
    });
    recommendations.add("Do not open the attachment — run an antivirus scan if it was already opened");
  }

  const score = Math.min(100, indicators.reduce((sum, i) => sum + i.weight, 0));
  const verdict: ScanVerdict = score >= 60 ? "Malicious" : score >= 30 ? "Suspicious" : "Safe";

  if (verdict !== "Safe") {
    recommendations.add("Report the message to your IT or security team");
    recommendations.add("Verify the sender through a separate, known-good channel before responding");
  } else if (indicators.length === 0) {
    recommendations.add("No indicators detected — still verify unexpected requests through a trusted channel");
  }

  return { score, verdict, indicators, recommendations: Array.from(recommendations) };
}
