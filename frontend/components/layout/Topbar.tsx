"use client";

import Link from "next/link";
import { Bell, Search } from "lucide-react";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { LanguageToggle } from "@/components/layout/LanguageToggle";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export function Topbar({ title, subtitle }: { title: string; subtitle?: string }) {
  const { dict } = useLanguage();
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b border-ink-800 bg-ink-950/80 px-4 backdrop-blur-md sm:px-6">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent-500/60 to-transparent"
      />
      <div className="min-w-0">
        <h1 className="truncate font-display text-base font-semibold text-ink-100 sm:text-lg">{title}</h1>
        {subtitle && <p className="hidden truncate text-xs text-ink-500 sm:block">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="hidden items-center gap-2 rounded-full border border-low-500/25 bg-low-950/40 px-3 py-1 text-xs font-medium text-low-ink xl:flex">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-low-400 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-low-400" />
          </span>
          {dict.common.systemOperational}
        </div>
        <Link href="/identities" aria-label={dict.common.searchIdentities} className="hidden items-center gap-2 rounded-lg border border-ink-800 bg-ink-900 px-3 py-1.5 text-sm text-ink-500 transition-colors hover:border-accent-600 hover:text-ink-300 lg:flex">
          <Search className="h-4 w-4" />
          <span>{dict.common.searchIdentities}</span>
        </Link>
        <ThemeToggle />
        <LanguageToggle />
        <button type="button" aria-label={dict.common.notifications} className="relative rounded-lg border border-ink-800 bg-ink-900 p-2 text-ink-400 transition-colors hover:border-ink-600 hover:text-ink-100">
          <Bell className="h-4 w-4" />
          <span aria-hidden="true" className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-critical-500 ring-2 ring-ink-950" />
        </button>
        <div aria-label={dict.common.signedInAs} className="hidden h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent-400 to-glow-500 text-xs font-semibold text-ink-950 shadow-panel sm:flex">
          SA
        </div>
      </div>
    </header>
  );
}
