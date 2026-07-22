// Simulated global attack feed for the Global Attack Map page. Every event
// here is randomly generated client-side for demonstration — this is NOT
// connected to a real threat feed, the same disclosed-mock approach used by
// the Threat Intelligence Lookup tool. Attack type names and location labels
// are intentionally left untranslated, consistent with the rest of this
// app's dynamically-generated content (see lib/i18n README note).

export interface GeoPoint {
  name: string;
  lat: number;
  lng: number;
}

export type AttackSeverity = "Critical" | "High" | "Medium" | "Low";
export type AttackOutcome = "Blocked" | "Mitigated" | "Investigating";

export interface AttackEvent {
  id: string;
  time: string;
  source: GeoPoint;
  target: GeoPoint;
  attackType: string;
  identityType: string;
  severity: AttackSeverity;
  outcome: AttackOutcome;
}

export const SOURCE_LOCATIONS: GeoPoint[] = [
  { name: "Moscow, RU", lat: 55.75, lng: 37.62 },
  { name: "Beijing, CN", lat: 39.9, lng: 116.4 },
  { name: "Lagos, NG", lat: 6.52, lng: 3.38 },
  { name: "São Paulo, BR", lat: -23.55, lng: -46.63 },
  { name: "Tehran, IR", lat: 35.69, lng: 51.39 },
  { name: "Bucharest, RO", lat: 44.43, lng: 26.1 },
  { name: "Jakarta, ID", lat: -6.21, lng: 106.85 },
  { name: "Mumbai, IN", lat: 19.08, lng: 72.88 },
  { name: "Kyiv, UA", lat: 50.45, lng: 30.52 },
  { name: "Hanoi, VN", lat: 21.03, lng: 105.85 },
  { name: "Manila, PH", lat: 14.6, lng: 120.98 },
  { name: "Sofia, BG", lat: 42.7, lng: 23.32 },
];

export const TARGET_LOCATIONS: GeoPoint[] = [
  { name: "AWS us-east-1 (Virginia)", lat: 39.04, lng: -77.49 },
  { name: "AWS us-west-2 (Oregon)", lat: 45.59, lng: -121.18 },
  { name: "AWS eu-west-1 (Ireland)", lat: 53.35, lng: -6.26 },
  { name: "Azure eu-central (Frankfurt)", lat: 50.11, lng: 8.68 },
  { name: "AWS ap-southeast-1 (Singapore)", lat: 1.35, lng: 103.82 },
  { name: "AWS ap-northeast-1 (Tokyo)", lat: 35.68, lng: 139.65 },
  { name: "AWS ap-southeast-2 (Sydney)", lat: -33.87, lng: 151.21 },
  { name: "GitHub Actions CI (US-West)", lat: 37.77, lng: -122.42 },
];

export const ATTACK_TYPES = [
  "Leaked API Key Exploitation",
  "Service Account Credential Stuffing",
  "OAuth Token Replay",
  "CI/CD Secret Exfiltration",
  "SSH Key Brute Force",
  "Cloud Access Key Abuse",
  "Machine Certificate Spoofing Attempt",
  "Overprivileged Service Account Abuse",
];

export const IDENTITY_TYPES = [
  "API Key",
  "Service Account",
  "OAuth Token",
  "SSH Key",
  "Cloud Access Key",
  "Database Credential",
  "CI/CD Secret",
  "Machine Certificate",
];

const SEVERITY_WEIGHTS: [AttackSeverity, number][] = [
  ["Critical", 15],
  ["High", 35],
  ["Medium", 35],
  ["Low", 15],
];

const OUTCOME_WEIGHTS: [AttackOutcome, number][] = [
  ["Blocked", 55],
  ["Mitigated", 32],
  ["Investigating", 13],
];

function pick<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function weightedPick<T extends string>(weights: [T, number][]): T {
  const total = weights.reduce((sum, [, w]) => sum + w, 0);
  let roll = Math.random() * total;
  for (const [value, weight] of weights) {
    roll -= weight;
    if (roll <= 0) return value;
  }
  return weights[0][0];
}

let counter = 0;

export function generateAttackEvent(now: Date = new Date()): AttackEvent {
  counter += 1;
  return {
    id: `atk-${now.getTime()}-${counter}`,
    time: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
    source: pick(SOURCE_LOCATIONS),
    target: pick(TARGET_LOCATIONS),
    attackType: pick(ATTACK_TYPES),
    identityType: pick(IDENTITY_TYPES),
    severity: weightedPick(SEVERITY_WEIGHTS),
    outcome: weightedPick(OUTCOME_WEIGHTS),
  };
}

export function generateInitialFeed(count: number): AttackEvent[] {
  const now = Date.now();
  return Array.from({ length: count }, (_, i) => generateAttackEvent(new Date(now - i * 4000)));
}
