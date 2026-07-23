// Rule-based scanner for the Spam Call Detection tool. Paste a phone
// number and (optionally) what the caller said or their Caller ID name,
// and it's checked against common robocall/scam-call patterns — the same
// transparent, explainable approach as lib/phishingEngine.ts.

export type SpamCallVerdict = "Likely Scam" | "Suspicious" | "Likely Safe";

export interface SpamCallFinding {
  factor: string;
  description: string;
  weight: number;
}

export interface SpamCallResult {
  score: number;
  verdict: SpamCallVerdict;
  findings: SpamCallFinding[];
  recommendations: string[];
}

// Area codes publicly documented by the FTC/FCC as commonly abused in
// "one-ring" (Wangiri) call-back toll fraud scams, where a missed call
// lures the recipient into calling back a premium-rate international
// number billed at a high per-minute rate.
const ONE_RING_SCAM_AREA_CODES = ["232", "268", "284", "473", "649", "664", "767", "809", "829", "849", "876"];

function digitsOnly(input: string): string {
  return input.replace(/\D/g, "");
}

export function analyzeCall(phoneNumber: string, callerInfo: string): SpamCallResult {
  const findings: SpamCallFinding[] = [];
  const recommendations = new Set<string>();
  const digits = digitsOnly(phoneNumber);
  const info = callerInfo.toLowerCase();

  if (digits.length < 7) {
    findings.push({
      factor: "Incomplete or Invalid Number",
      description: "This doesn't look like a complete phone number, which makes it harder to verify or block.",
      weight: 10,
    });
  }

  if (/^1?900/.test(digits) || /^1?011/.test(digits)) {
    findings.push({
      factor: "Premium-Rate Number",
      description: "Numbers starting with 900 (or an international 011 prefix) are often billed at a high per-minute rate.",
      weight: 30,
    });
    recommendations.add("Never call back a premium-rate or unfamiliar international number");
  }

  const areaCode = digits.length === 11 && digits.startsWith("1") ? digits.slice(1, 4) : digits.slice(0, 3);
  if (ONE_RING_SCAM_AREA_CODES.includes(areaCode)) {
    findings.push({
      factor: "One-Ring (Wangiri) Scam Area Code",
      description: `Area code ${areaCode} is commonly associated with "one-ring" toll fraud scams that lure victims into returning a missed call to a high-cost international number.`,
      weight: 30,
    });
    recommendations.add("Do not call back a number after a single ring from an unfamiliar area code");
  }

  if (/^(\d)\1{6,}$/.test(digits) || digits === "1234567890" || digits === "0123456789") {
    findings.push({
      factor: "Fabricated Number Pattern",
      description: "The number is a repeating or sequential digit pattern often used by spoofed caller ID systems.",
      weight: 20,
    });
    recommendations.add("Treat obviously fake-looking caller ID numbers as spoofed, not a real callback number");
  }

  const GOV_IMPERSONATION = ["irs", "social security administration", "medicare", "arrest warrant", "immigration", "customs and border"];
  const matchedGov = GOV_IMPERSONATION.find((g) => info.includes(g));
  if (matchedGov) {
    findings.push({
      factor: "Government Agency Impersonation",
      description: `Mentions "${matchedGov}" — real government agencies do not threaten arrest or demand immediate payment by phone.`,
      weight: 30,
    });
    recommendations.add("Hang up and contact the agency directly using the number on its official website");
  }

  const TECH_SUPPORT = ["microsoft support", "windows support", "virus detected", "remote access to your computer", "apple support"];
  const matchedTech = TECH_SUPPORT.find((t) => info.includes(t));
  if (matchedTech) {
    findings.push({
      factor: "Tech Support Scam Language",
      description: "Unsolicited calls claiming to detect a virus or requesting remote computer access are a well-documented scam pattern.",
      weight: 25,
    });
    recommendations.add("Never grant remote access to your computer based on an unsolicited call");
  }

  const PAYMENT_RED_FLAGS = ["gift card", "wire transfer", "bitcoin", "cryptocurrency", "zelle", "prepaid card"];
  const matchedPayment = PAYMENT_RED_FLAGS.find((p) => info.includes(p));
  if (matchedPayment) {
    findings.push({
      factor: "Unusual Payment Request",
      description: `Requests payment via "${matchedPayment}" — legitimate organizations never demand gift cards, crypto, or wire transfers.`,
      weight: 30,
    });
    recommendations.add("No legitimate organization will ever demand payment by gift card, wire transfer, or cryptocurrency");
  }

  const PRIZE_SCAM = ["you have won", "claim your prize", "free cruise", "free vacation", "lottery"];
  const matchedPrize = PRIZE_SCAM.find((p) => info.includes(p));
  if (matchedPrize) {
    findings.push({
      factor: "Prize / Lottery Scam Language",
      description: "Unsolicited prize or lottery notifications are a classic advance-fee scam pattern.",
      weight: 20,
    });
    recommendations.add("Be skeptical of any unsolicited prize, lottery, or sweepstakes notification");
  }

  const URGENCY = ["immediately or", "act now", "final notice", "suspend your account", "legal action will be taken", "do not hang up"];
  const matchedUrgency = URGENCY.find((u) => info.includes(u));
  if (matchedUrgency) {
    findings.push({
      factor: "Urgency / Pressure Tactics",
      description: "Manufactured urgency is used to prevent the recipient from pausing to verify the caller's identity.",
      weight: 15,
    });
    recommendations.add("Take time to verify independently — legitimate matters rarely require an immediate phone decision");
  }

  if (/press\s*(1|one)\b/.test(info)) {
    findings.push({
      factor: "Robocall Script Pattern",
      description: '"Press 1 to..." prompts are a hallmark of mass-dialed robocall campaigns rather than a genuine personal call.',
      weight: 15,
    });
    recommendations.add("Do not press any keys in response to an unsolicited automated call");
  }

  const CARRIER_FLAGGED = ["scam likely", "spam risk", "potential fraud", "telemarketer"];
  const matchedCarrierFlag = CARRIER_FLAGGED.find((c) => info.includes(c));
  if (matchedCarrierFlag) {
    findings.push({
      factor: "Carrier-Flagged Caller ID",
      description: `Your carrier's caller ID already labeled this call "${matchedCarrierFlag}" — a strong signal on its own.`,
      weight: 25,
    });
    recommendations.add("Treat carrier-labeled Scam Likely/Spam Risk calls as confirmed spam");
  }

  const score = Math.min(100, findings.reduce((sum, f) => sum + f.weight, 0));
  const verdict: SpamCallVerdict = score >= 55 ? "Likely Scam" : score >= 20 ? "Suspicious" : "Likely Safe";

  if (findings.length === 0) {
    recommendations.add("No common spam or scam-call indicators detected in what was provided");
  }
  recommendations.add("When in doubt, hang up and call the organization back using a verified number");

  return { score, verdict, findings, recommendations: Array.from(recommendations) };
}
