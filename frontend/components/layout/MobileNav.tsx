"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bot, FileText, Globe2, KeyRound, LayoutDashboard, LayoutGrid, Map } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export function MobileNav() {
  const pathname = usePathname();
  const { dict } = useLanguage();

  const items = [
    { href: "/dashboard", label: dict.nav.short.dashboard, icon: LayoutDashboard },
    { href: "/identities", label: dict.nav.short.identities, icon: KeyRound },
    { href: "/threat-map", label: dict.nav.short.threatMap, icon: Globe2 },
    { href: "/ai-assistant", label: dict.nav.short.aiAnalyst, icon: Bot },
    { href: "/reports", label: dict.nav.short.reports, icon: FileText },
    { href: "/playbook", label: dict.nav.short.playbook, icon: Map },
    { href: "/tools", label: dict.nav.short.tools, icon: LayoutGrid },
  ];

  return (
    <nav
      aria-label="Primary navigation"
      className="fixed inset-x-0 bottom-0 z-30 flex snap-x snap-mandatory gap-0.5 overflow-x-auto border-t border-ink-800 bg-ink-950/95 px-1 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden"
    >
      {items.map(({ href, label, icon: Icon }) => {
        const active = pathname === href || pathname.startsWith(`${href}/`);
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex min-h-16 w-[68px] shrink-0 snap-start flex-col items-center justify-center gap-1 px-0.5 text-center text-[9px] font-medium leading-tight",
              active ? "text-accent-ink" : "text-ink-500"
            )}
          >
            <Icon className="h-4 w-4 shrink-0" />
            <span className="line-clamp-2 break-words">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
