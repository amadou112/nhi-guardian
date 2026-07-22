"use client";

import { Badge } from "@/components/ui/Badge";
import { RiskSeverity } from "@/lib/types";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { AlertTriangle, ShieldAlert, ShieldCheck, ShieldQuestion } from "lucide-react";

const config: Record<RiskSeverity, { tone: "critical" | "high" | "medium" | "low"; icon: React.ReactNode }> = {
  Critical: { tone: "critical", icon: <ShieldAlert className="h-3 w-3" /> },
  High: { tone: "high", icon: <AlertTriangle className="h-3 w-3" /> },
  Medium: { tone: "medium", icon: <ShieldQuestion className="h-3 w-3" /> },
  Low: { tone: "low", icon: <ShieldCheck className="h-3 w-3" /> },
};

export function RiskBadge({ severity }: { severity: RiskSeverity }) {
  const { dict } = useLanguage();
  const { tone, icon } = config[severity];
  return (
    <Badge tone={tone}>
      {icon}
      {dict.severity[severity]}
    </Badge>
  );
}
