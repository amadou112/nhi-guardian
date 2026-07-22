"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Topbar } from "@/components/layout/Topbar";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { INTERACTIVE_TOOL_KEYS, CAPABILITY_TOOL_KEYS, TOOL_ROUTES, TOOL_ICONS } from "@/lib/toolsMeta";
import { ToolKey } from "@/lib/i18n/dictionary";

export default function ToolsHubPage() {
  const { dict } = useLanguage();
  const t = dict.tools.hub;

  function ToolGrid({ keys, badge, tone }: { keys: ToolKey[]; badge: string; tone: "accent" | "ink" }) {
    return (
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {keys.map((key) => {
          const Icon = TOOL_ICONS[key];
          const card = t.cards[key];
          return (
            <Link key={key} href={TOOL_ROUTES[key]}>
              <Card className="group h-full p-6 transition-all duration-200 hover:-translate-y-1 hover:border-accent-600/50">
                <div className="flex items-start justify-between gap-3">
                  <div className="inline-flex rounded-lg border border-accent-800/40 bg-accent-500/10 p-2.5 text-accent-400">
                    <Icon className="h-5 w-5" />
                  </div>
                  <Badge tone={tone}>{badge}</Badge>
                </div>
                <h3 className="font-display mt-3 flex items-center gap-2 font-medium text-ink-100">
                  {card.title}
                  <ArrowRight className="h-4 w-4 -translate-x-1 text-ink-600 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
                </h3>
                <p className="mt-1.5 text-sm text-ink-500">{card.description}</p>
              </Card>
            </Link>
          );
        })}
      </div>
    );
  }

  return (
    <>
      <Topbar title={t.title} subtitle={t.subtitle} />
      <main className="flex-1 space-y-10 p-6">
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-ink-600">
            {t.interactiveLabel}
          </p>
          <ToolGrid keys={INTERACTIVE_TOOL_KEYS} badge={t.tryItBadge} tone="accent" />
        </div>

        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-ink-600">
            {t.capabilityLabel}
          </p>
          <ToolGrid keys={CAPABILITY_TOOL_KEYS} badge={t.overviewBadge} tone="ink" />
        </div>
      </main>
    </>
  );
}
