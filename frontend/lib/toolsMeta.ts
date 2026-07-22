import {
  Fish,
  FileSearch,
  Cloud,
  Fingerprint,
  Bug,
  Code2,
  FileWarning,
  Container,
  Radar,
  Activity,
  Laptop,
  Layers,
  Network,
  Swords,
  ScanSearch,
  Globe,
  KeyRound,
  Lock,
  type LucideIcon,
} from "lucide-react";
import { ToolKey, TOOL_KEYS } from "@/lib/i18n/dictionary";

export const TOOL_ROUTES: Record<ToolKey, string> = {
  phishing: "/tools/phishing-scanner",
  resume: "/tools/resume-checker",
  cspm: "/tools/cspm-scanner",
  iam: "/tools/iam-policy-analyzer",
  vam: "/tools/vulnerability-scanner",
  sast: "/tools/sast-scanner",
  dlp: "/tools/dlp-scanner",
  container: "/tools/container-security-scanner",
  threatIntel: "/tools/threat-intel-lookup",
  cryptoTool: "/tools/data-encryption",
  siem: "/tools/siem",
  edr: "/tools/edr",
  xdr: "/tools/xdr",
  ndr: "/tools/ndr",
  pentest: "/tools/pentest",
  dfir: "/tools/dfir",
  sase: "/tools/sase",
  encryption: "/tools/encryption",
};

export const TOOL_ICONS: Record<ToolKey, LucideIcon> = {
  phishing: Fish,
  resume: FileSearch,
  cspm: Cloud,
  iam: Fingerprint,
  vam: Bug,
  sast: Code2,
  dlp: FileWarning,
  container: Container,
  threatIntel: Radar,
  cryptoTool: Lock,
  siem: Activity,
  edr: Laptop,
  xdr: Layers,
  ndr: Network,
  pentest: Swords,
  dfir: ScanSearch,
  sase: Globe,
  encryption: KeyRound,
};

// The 9 tools that are genuine paste-and-analyze engines (rule-based, interactive).
// The remaining 8 are platform-style capability overviews with a mock dashboard.
export const INTERACTIVE_TOOL_KEYS: ToolKey[] = [
  "phishing",
  "resume",
  "cspm",
  "iam",
  "vam",
  "sast",
  "dlp",
  "container",
  "threatIntel",
  "cryptoTool",
];

export const CAPABILITY_TOOL_KEYS: ToolKey[] = TOOL_KEYS.filter(
  (k) => !INTERACTIVE_TOOL_KEYS.includes(k)
);
