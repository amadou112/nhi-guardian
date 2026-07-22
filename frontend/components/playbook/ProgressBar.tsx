import { cn } from "@/lib/utils";

export function ProgressBar({ percent, className }: { percent: number; className?: string }) {
  return (
    <div className={cn("h-1.5 w-full overflow-hidden rounded-full bg-ink-800", className)}>
      <div
        className={cn(
          "h-full rounded-full transition-[width] duration-300 ease-out",
          percent >= 100 ? "bg-low-500" : "bg-accent-500"
        )}
        style={{ width: `${Math.min(100, Math.max(0, percent))}%` }}
      />
    </div>
  );
}
