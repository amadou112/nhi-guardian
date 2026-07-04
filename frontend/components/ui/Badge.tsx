import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

export type BadgeTone = "ink" | "accent" | "glow" | "critical" | "high" | "medium" | "low";

const toneClasses: Record<BadgeTone, string> = {
  ink: "bg-ink-800 text-ink-300 border-ink-700",
  accent: "bg-accent-950 text-accent-300 border-accent-800",
  glow: "bg-glow-600/20 text-glow-400 border-glow-600/40",
  critical: "bg-critical-950 text-critical-400 border-critical-500/30",
  high: "bg-high-950 text-high-400 border-high-500/30",
  medium: "bg-medium-950 text-medium-400 border-medium-500/30",
  low: "bg-low-950 text-low-400 border-low-500/30",
};

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
}

export function Badge({ className, tone = "ink", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium whitespace-nowrap transition-colors",
        toneClasses[tone],
        className
      )}
      {...props}
    />
  );
}
