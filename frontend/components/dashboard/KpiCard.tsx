import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

type Tone = "accent" | "critical" | "high" | "medium" | "low" | "ink";

const toneClasses: Record<Tone, string> = {
  accent: "text-accent-400 bg-accent-500/10 border-accent-800/40",
  critical: "text-critical-400 bg-critical-500/10 border-critical-500/30",
  high: "text-high-400 bg-high-500/10 border-high-500/30",
  medium: "text-medium-400 bg-medium-500/10 border-medium-500/30",
  low: "text-low-400 bg-low-500/10 border-low-500/30",
  ink: "text-ink-300 bg-ink-500/10 border-ink-700/40",
};

interface KpiCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  tone?: Tone;
  hint?: string;
}

export function KpiCard({ label, value, icon: Icon, tone = "accent", hint }: KpiCardProps) {
  return (
    <Card className="group p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-ink-600">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-ink-500">{label}</p>
          <p className="mt-2 font-mono text-3xl font-semibold text-ink-50 font-tabular">{value}</p>
          {hint && <p className="mt-1 text-xs text-ink-500">{hint}</p>}
        </div>
        <div
          className={cn(
            "rounded-lg border p-2.5 transition-transform duration-200 group-hover:scale-110",
            toneClasses[tone]
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </Card>
  );
}
