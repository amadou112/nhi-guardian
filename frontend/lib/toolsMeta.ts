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
  PhoneOff,
  MessageSquareWarning,
  Droplet,
  Ghost,
  Gauge,
  Database,
  Cpu,
  BrainCircuit,
  Scale,
  ShieldEllipsis,
  ClipboardCheck,
  Siren,
  Lightbulb,
  FileBarChart2,
  MessageCircle,
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
  spamCall: "/tools/spam-call-detector",
  siem: "/tools/siem",
  edr: "/tools/edr",
  xdr: "/tools/xdr",
  ndr: "/tools/ndr",
  pentest: "/tools/pentest",
  dfir: "/tools/dfir",
  sase: "/tools/sase",
  encryption: "/tools/encryption",
  promptInjection: "/tools/prompt-injection-detector",
  aiDataLeakage: "/tools/ai-data-leakage-detector",
  hallucination: "/tools/hallucination-detector",
  aiRiskScoring: "/tools/ai-risk-scoring",
  aiThreatIntel: "/tools/ai-threat-intelligence",
  ragSecurity: "/tools/rag-security",
  aiAgentMonitoring: "/tools/ai-agent-monitoring",
  llmSecurity: "/tools/llm-security",
  guardrails: "/tools/guardrails-monitoring",
  aiGovernance: "/tools/ai-governance",
  aiCompliance: "/tools/ai-compliance-monitoring",
  aiIncidents: "/tools/ai-incident-detection",
  aiRecommendations: "/tools/ai-recommendations",
  aiExecReporting: "/tools/ai-executive-reporting",
  aiChatbot: "/tools/ai-security-chatbot",
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
  spamCall: PhoneOff,
  siem: Activity,
  edr: Laptop,
  xdr: Layers,
  ndr: Network,
  pentest: Swords,
  dfir: ScanSearch,
  sase: Globe,
  encryption: KeyRound,
  promptInjection: MessageSquareWarning,
  aiDataLeakage: Droplet,
  hallucination: Ghost,
  aiRiskScoring: Gauge,
  aiThreatIntel: Radar,
  ragSecurity: Database,
  aiAgentMonitoring: Cpu,
  llmSecurity: BrainCircuit,
  guardrails: ShieldEllipsis,
  aiGovernance: Scale,
  aiCompliance: ClipboardCheck,
  aiIncidents: Siren,
  aiRecommendations: Lightbulb,
  aiExecReporting: FileBarChart2,
  aiChatbot: MessageCircle,
};

// The Security Tools that are genuine paste-and-analyze engines (rule-based, interactive).
// The rest are platform-style capability overviews with a mock dashboard.
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
  "spamCall",
];

export const CAPABILITY_TOOL_KEYS: ToolKey[] = TOOL_KEYS.filter(
  (k) => !INTERACTIVE_TOOL_KEYS.includes(k)
);

// The "AI Features" section is its own distinct category (separate from
// the general Security Tools list above), covering AI/LLM-specific
// security concerns. Within it, 5 tools are genuine interactive engines
// and the remaining 10 are capability overview pages — the same mixed
// depth split as the Security Tools section, just grouped separately.
export const AI_FEATURE_TOOL_KEYS: ToolKey[] = [
  "promptInjection",
  "aiDataLeakage",
  "hallucination",
  "aiRiskScoring",
  "aiThreatIntel",
  "ragSecurity",
  "aiAgentMonitoring",
  "llmSecurity",
  "guardrails",
  "aiGovernance",
  "aiCompliance",
  "aiIncidents",
  "aiRecommendations",
  "aiExecReporting",
  "aiChatbot",
];

export const AI_INTERACTIVE_TOOL_KEYS: ToolKey[] = [
  "promptInjection",
  "aiDataLeakage",
  "hallucination",
  "aiRiskScoring",
  "aiThreatIntel",
];

export const AI_CAPABILITY_TOOL_KEYS: ToolKey[] = AI_FEATURE_TOOL_KEYS.filter(
  (k) => !AI_INTERACTIVE_TOOL_KEYS.includes(k)
);
