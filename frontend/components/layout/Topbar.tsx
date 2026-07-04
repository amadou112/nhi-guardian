import { Bell, Search } from "lucide-react";

export function Topbar({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="flex items-center justify-between gap-4 border-b border-ink-800 bg-ink-950/50 px-6 h-16 sticky top-0 z-10 backdrop-blur-md">
      <div>
        <h1 className="font-display text-lg font-semibold text-ink-100">{title}</h1>
        {subtitle && <p className="text-xs text-ink-500">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 rounded-lg border border-ink-800 bg-ink-900 px-3 py-1.5 text-sm text-ink-500 transition-colors focus-within:border-accent-600">
          <Search className="h-4 w-4" />
          <span>Search identities…</span>
        </div>
        <button className="relative rounded-lg border border-ink-800 bg-ink-900 p-2 text-ink-400 transition-colors hover:border-ink-600 hover:text-ink-100">
          <Bell className="h-4 w-4" />
          <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-critical-500 ring-2 ring-ink-950" />
        </button>
        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-accent-400 to-glow-500 flex items-center justify-center text-xs font-semibold text-ink-950 shadow-panel">
          SA
        </div>
      </div>
    </header>
  );
}
