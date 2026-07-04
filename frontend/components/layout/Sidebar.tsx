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
  Fish,
  FileSearch,
} from "lucide-react";
import { cn } from "@/lib/utils";

const programNav = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/identities", label: "Identity Inventory", icon: KeyRound },
  { href: "/ai-assistant", label: "AI Security Analyst", icon: Bot },
  { href: "/reports", label: "Executive Reports", icon: FileText },
];

const toolsNav = [
  { href: "/tools/phishing-scanner", label: "Phishing & Malware Scanner", icon: Fish },
  { href: "/tools/resume-checker", label: "ATS Resume Checker", icon: FileSearch },
];

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
        "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150",
        active
          ? "bg-accent-500/10 text-accent-300"
          : "text-ink-400 hover:text-ink-100 hover:bg-ink-900 hover:translate-x-0.5"
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
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <aside className="hidden md:flex w-64 shrink-0 flex-col border-r border-ink-800 bg-ink-950/60 min-h-screen">
      <Link href="/" className="flex items-center gap-2.5 px-5 h-16 border-b border-ink-800 group">
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
            Security Program
          </p>
          {programNav.map((item) => (
            <NavLink key={item.href} {...item} active={isActive(item.href)} />
          ))}
        </div>

        <div className="space-y-1">
          <p className="px-3 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-ink-600">
            Security Tools
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
          Back to overview
        </Link>
      </div>
    </aside>
  );
}
