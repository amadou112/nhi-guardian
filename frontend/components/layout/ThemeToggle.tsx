"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isLight = mounted && resolvedTheme === "light";

  return (
    <button
      type="button"
      aria-label={isLight ? "Switch to dark theme" : "Switch to light theme"}
      onClick={() => setTheme(isLight ? "dark" : "light")}
      className="rounded-lg border border-ink-800 bg-ink-900 p-2 text-ink-400 transition-colors hover:border-ink-600 hover:text-ink-100"
    >
      {mounted ? (
        isLight ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />
      ) : (
        <span className="block h-4 w-4" />
      )}
    </button>
  );
}
