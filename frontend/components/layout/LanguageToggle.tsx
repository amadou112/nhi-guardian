"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

export function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex items-center rounded-lg border border-ink-800 bg-ink-900 p-0.5 text-xs font-medium">
      {(["en", "fr"] as const).map((code) => (
        <button
          key={code}
          type="button"
          aria-pressed={lang === code}
          onClick={() => setLang(code)}
          className={cn(
            "rounded-md px-2 py-1 uppercase tracking-wide transition-colors",
            lang === code ? "bg-accent-500 text-ink-950" : "text-ink-400 hover:text-ink-100"
          )}
        >
          {code}
        </button>
      ))}
    </div>
  );
}
