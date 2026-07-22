// Simulated threat intelligence enrichment for the Threat Intelligence
// Platform (TIP) tool. This runs entirely locally against a small,
// deterministic reference set — it is NOT connected to a real feed like
// VirusTotal or AbuseIPDB, and the UI says so explicitly, the same way
// the AI Security Analyst discloses its local mock mode.

export type IocType = "IP Address" | "Domain" | "URL" | "File Hash" | "Unknown";
export type IocVerdict = "Malicious" | "Suspicious" | "Clean" | "Unrecognized";

export interface IocResult {
  type: IocType;
  verdict: IocVerdict;
  confidence: number;
  tags: string[];
  summary: string;
}

function detectType(input: string): IocType {
  const v = input.trim();
  if (/^[a-f0-9]{32}$|^[a-f0-9]{40}$|^[a-f0-9]{64}$/i.test(v)) return "File Hash";
  if (/^https?:\/\//i.test(v)) return "URL";
  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(v)) return "IP Address";
  if (/^[a-z0-9.-]+\.[a-z]{2,}$/i.test(v)) return "Domain";
  return "Unknown";
}

// Simple deterministic string hash so the same indicator always returns
// the same simulated verdict, rather than random noise on every lookup.
function hashString(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h * 31 + s.charCodeAt(i)) >>> 0;
  }
  return h;
}

const MALICIOUS_TAGS = ["Generic Phishing Kit", "Known C2 Infrastructure", "Credential Harvesting", "Malware Distribution", "Botnet Node"];
const SUSPICIOUS_TAGS = ["Newly Registered Domain", "Bulletproof Hosting Range", "Tor Exit Node", "Dynamic DNS Provider"];

export function lookupIoc(raw: string): IocResult {
  const input = raw.trim();
  const type = detectType(input);

  if (type === "Unknown") {
    return {
      type,
      verdict: "Unrecognized",
      confidence: 0,
      tags: [],
      summary: "This doesn't match a recognized IOC format (IP address, domain, URL, or MD5/SHA1/SHA256 hash).",
    };
  }

  const h = hashString(input.toLowerCase());
  const bucket = h % 10;

  if (bucket <= 1) {
    const tag = MALICIOUS_TAGS[h % MALICIOUS_TAGS.length];
    return {
      type,
      verdict: "Malicious",
      confidence: 85 + (h % 15),
      tags: [tag],
      summary: `Matches known-bad indicator patterns associated with "${tag}" in this simulation's reference set.`,
    };
  }
  if (bucket <= 4) {
    const tag = SUSPICIOUS_TAGS[h % SUSPICIOUS_TAGS.length];
    return {
      type,
      verdict: "Suspicious",
      confidence: 40 + (h % 30),
      tags: [tag],
      summary: `Shares characteristics with "${tag}" indicators. Not confirmed malicious.`,
    };
  }
  return {
    type,
    verdict: "Clean",
    confidence: 70 + (h % 25),
    tags: [],
    summary: "No association with known threat indicators in this simulation's reference set.",
  };
}
