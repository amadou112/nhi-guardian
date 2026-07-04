import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "glow-accent bg-accent-500 text-ink-950 hover:bg-accent-400 hover:-translate-y-0.5 font-semibold",
  secondary:
    "bg-ink-800 text-ink-100 hover:bg-ink-700 hover:-translate-y-0.5 border border-ink-700 hover:border-ink-600",
  ghost: "bg-transparent text-ink-300 hover:bg-ink-800/60 hover:text-ink-100",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0",
        variantClasses[variant],
        className
      )}
      {...props}
    />
  );
}
