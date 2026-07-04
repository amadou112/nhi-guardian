import { Badge } from "@/components/ui/Badge";
import { RiskSeverity } from "@/lib/types";
import { AlertTriangle, ShieldAlert, ShieldCheck, ShieldQuestion } from "lucide-react";

const config: Record<RiskSeverity, { tone: "critical" | "high" | "medium" | "low"; icon: React.ReactNode }> = {
  Critical: { tone: "critical", icon: <ShieldAlert className="h-3 w-3" /> },
  High: { tone: "high", icon: <AlertTriangle className="h-3 w-3" /> },
  Medium: { tone: "medium", icon: <ShieldQuestion className="h-3 w-3" /> },
  Low: { tone: "low", icon: <ShieldCheck className="h-3 w-3" /> },
};

export function RiskBadge({ severity }: { severity: RiskSeverity }) {
  const { tone, icon } = config[severity];
  return (
    <Badge tone={tone}>
      {icon}
      {severity}
    </Badge>
  );
}
