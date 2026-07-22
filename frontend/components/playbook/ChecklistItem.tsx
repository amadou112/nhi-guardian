"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function ChecklistItem({
  label,
  checked,
  onToggle,
}: {
  label: string;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={checked}
      data-testid="checklist-item"
      className="group flex w-full items-start gap-2 rounded-md py-0.5 text-left transition-colors"
    >
      <span
        className={cn(
          "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors",
          checked
            ? "border-accent-500 bg-accent-500"
            : "border-ink-600 bg-transparent group-hover:border-accent-ink"
        )}
      >
        {checked && <Check className="h-3 w-3 text-ink-950" strokeWidth={3} />}
      </span>
      <span
        className={cn(
          "text-sm transition-colors",
          checked ? "text-ink-600 line-through" : "text-ink-400 group-hover:text-ink-200"
        )}
      >
        {label}
      </span>
    </button>
  );
}
