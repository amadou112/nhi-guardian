"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  KeyRound,
  Bot,
  FileText,
  ArrowLeftToLine,
  LayoutGrid,
  Map,
  Globe2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { TOOL_KEYS } from "@/lib/i18n/dictionary";
import { TOOL_ROUTES, TOOL_ICONS } from "@/lib/toolsMeta";

function NavLink({
  href,
  label,
  icon: Icon,
  active,
}: {
  href: string;
  label: string;
  icon: typeof LayoutDashboard;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex items-center gap-3 rounded-lg border px-3 py-2.5 text-sm font-medium transition-all duration-150",
        active
          ? "border-accent-800/40 bg-accent-500/10 text-accent-ink"
          : "border-transparent text-ink-400 hover:translate-x-0.5 hover:border-ink-800 hover:bg-ink-900 hover:text-ink-100"
      )}
    >
      <span
        className={cn(
          "absolute left-0 top-1/2 h-4 w-0.5 -translate-y-1/2 rounded-full bg-accent-400 transition-transform duration-150",
          active ? "scale-y-100" : "scale-y-0 group-hover:scale-y-50"
        )}
      />
      <Icon className="h-4 w-4 shrink-0" />
      <span className="truncate">{label}</span>
    </Link>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const { dict } = useLanguage();
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  const programNav = [
    { href: "/dashboard", label: dict.nav.dashboard, icon: LayoutDashboard },
    { href: "/identities", label: dict.nav.identities, icon: KeyRound },
    { href: "/threat-map", label: dict.nav.threatMap, icon: Globe2 },
    { href: "/ai-assistant", label: dict.nav.aiAnalyst, icon: Bot },
    { href: "/reports", label: dict.nav.reports, icon: FileText },
    { href: "/playbook", label: dict.nav.playbook, icon: Map },
  ];

  const toolsNav = [
    { href: "/tools", label: dict.nav.toolsHub, icon: LayoutGrid },
    ...TOOL_KEYS.map((key) => ({
      href: TOOL_ROUTES[key],
      label: dict.nav.toolLabels[key],
      icon: TOOL_ICONS[key],
    })),
  ];

  return (
    <aside className="hidden md:flex w-64 shrink-0 flex-col border-r border-ink-800 bg-ink-950/60 min-h-screen">
      <Link href="/" className="relative flex items-center gap-2.5 px-5 h-16 border-b border-ink-800 group">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent-500/60 to-transparent"
        />
        <Image
          src="/brand/logo-mark.svg"
          alt="NHI Guardian"
          width={28}
          height={28}
          className="transition-transform duration-200 group-hover:scale-110"
        />
        <div className="leading-tight">
          <p className="font-display font-semibold tracking-tight text-ink-50 text-sm">NHI Guardian</p>
          <p className="text-[10px] uppercase tracking-wider text-gold-500">Sidibe Enterprises</p>
        </div>
      </Link>

      <nav className="flex-1 px-3 py-4 space-y-6 overflow-y-auto">
        <div className="space-y-1">
          <p className="px-3 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-ink-600">
            {dict.nav.securityProgram}
          </p>
          {programNav.map((item) => (
            <NavLink key={item.href} {...item} active={isActive(item.href)} />
          ))}
        </div>

        <div className="space-y-1">
          <p className="px-3 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-ink-600">
            {dict.nav.securityTools}
          </p>
          {toolsNav.map((item) => (
            <NavLink key={item.href} {...item} active={isActive(item.href)} />
          ))}
        </div>
      </nav>

      <div className="p-3 border-t border-ink-800">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-ink-500 hover:text-ink-300 hover:bg-ink-900 transition-colors"
        >
          <ArrowLeftToLine className="h-4 w-4" />
          {dict.nav.backToOverview}
        </Link>
      </div>
    </aside>
  );
}
