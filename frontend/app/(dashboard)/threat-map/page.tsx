"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Globe2, KeyRound, Radar, ShieldCheck } from "lucide-react";
import { Topbar } from "@/components/layout/Topbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge, BadgeTone } from "@/components/ui/Badge";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { AttackGlobe } from "@/components/threat-map/AttackGlobe";
import {
  AttackEvent,
  AttackOutcome,
  AttackSeverity,
  generateAttackEvent,
  generateInitialFeed,
} from "@/lib/threatMapEngine";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

const SEVERITY_TONE: Record<AttackSeverity, BadgeTone> = {
  Critical: "critical",
  High: "high",
  Medium: "medium",
  Low: "low",
};

const OUTCOME_TONE: Record<AttackOutcome, BadgeTone> = {
  Blocked: "low",
  Mitigated: "medium",
  Investigating: "high",
};

const FEED_DISPLAY_LIMIT = 12;
const FEED_STATE_CAP = 40;
const TICK_MS = 2600;

export default function ThreatMapPage() {
  const { dict } = useLanguage();
  const t = dict.threatMap;
  const reduceMotion = useReducedMotion();

  const [mounted, setMounted] = useState(false);
  const [events, setEvents] = useState<AttackEvent[]>([]);

  useEffect(() => {
    setMounted(true);
    setEvents(generateInitialFeed(10));
    const interval = setInterval(() => {
      setEvents((prev) => [generateAttackEvent(), ...prev].slice(0, FEED_STATE_CAP));
    }, TICK_MS);
    return () => clearInterval(interval);
  }, []);

  const activeRegions = new Set(events.map((e) => e.target.name)).size;
  const blockedRate =
    events.length === 0
      ? "—"
      : `${Math.round((events.filter((e) => e.outcome !== "Investigating").length / events.length) * 100)}%`;
  const topIdentityType = (() => {
    if (events.length === 0) return "—";
    const counts = new Map<string, number>();
    for (const e of events) counts.set(e.identityType, (counts.get(e.identityType) ?? 0) + 1);
    return Array.from(counts.entries()).sort((a, b) => b[1] - a[1])[0][0];
  })();

  return (
    <>
      <Topbar title={t.title} subtitle={t.subtitle} />
      <main className="flex-1 space-y-6 p-6">
        <Card className="p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="inline-flex shrink-0 rounded-lg border border-critical-500/30 bg-critical-950 p-2.5 text-critical-400">
                <Radar className="h-5 w-5" />
              </div>
              <p className="max-w-2xl text-sm leading-relaxed text-ink-400">{t.heroDesc}</p>
            </div>
            <div className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-critical-500/25 bg-critical-950/40 px-3 py-1 text-xs font-medium text-critical-300">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-critical-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-critical-400" />
              </span>
              {t.liveLabel}
            </div>
          </div>
        </Card>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <KpiCard label={t.kpiAttacksToday} value={mounted ? events.length : "—"} icon={Radar} tone="critical" />
          <KpiCard label={t.kpiActiveRegions} value={mounted ? activeRegions : "—"} icon={Globe2} tone="accent" />
          <KpiCard label={t.kpiBlockedRate} value={mounted ? blockedRate : "—"} icon={ShieldCheck} tone="low" />
          <KpiCard label={t.kpiTopIdentityType} value={mounted ? topIdentityType : "—"} icon={KeyRound} tone="medium" />
        </div>

        <div className="grid gap-6 xl:grid-cols-[640px_1fr]">
          <Card className="flex flex-col items-center gap-4 p-6">
            <AttackGlobe events={events} />
            <div className="flex items-center gap-4 text-xs text-ink-500">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-critical-400" />
                {t.mapLegendSource}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-accent-400" />
                {t.mapLegendTarget}
              </span>
            </div>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t.liveFeedTitle}</CardTitle>
            </CardHeader>
            <CardContent className="px-0 pb-0">
              <div className="max-h-[520px] overflow-y-auto overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-y border-ink-800 text-left text-xs uppercase tracking-wide text-ink-500">
                      <th className="px-4 py-3 font-medium">{t.colTime}</th>
                      <th className="px-4 py-3 font-medium">{t.colSource}</th>
                      <th className="px-4 py-3 font-medium">{t.colTarget}</th>
                      <th className="px-4 py-3 font-medium">{t.colAttackType}</th>
                      <th className="px-4 py-3 font-medium">{t.colIdentityType}</th>
                      <th className="px-4 py-3 font-medium">{t.colSeverity}</th>
                      <th className="px-4 py-3 font-medium">{t.colStatus}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ink-800/70">
                    <AnimatePresence initial={false}>
                      {events.slice(0, FEED_DISPLAY_LIMIT).map((e) => (
                        <motion.tr
                          key={e.id}
                          initial={reduceMotion ? false : { opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className="hover:bg-ink-900/50"
                        >
                          <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-ink-500 font-tabular">
                            {e.time}
                          </td>
                          <td className="whitespace-nowrap px-4 py-3 text-ink-300">{e.source.name}</td>
                          <td className="whitespace-nowrap px-4 py-3 text-ink-300">{e.target.name}</td>
                          <td className="px-4 py-3 text-ink-400">{e.attackType}</td>
                          <td className="whitespace-nowrap px-4 py-3 text-ink-400">{e.identityType}</td>
                          <td className="whitespace-nowrap px-4 py-3">
                            <Badge tone={SEVERITY_TONE[e.severity]}>{dict.severity[e.severity]}</Badge>
                          </td>
                          <td className="whitespace-nowrap px-4 py-3">
                            <Badge tone={OUTCOME_TONE[e.outcome]}>{t.statusLabels[e.outcome]}</Badge>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="flex items-start gap-3 p-5">
          <Radar className="mt-0.5 h-4 w-4 shrink-0 text-accent-ink" />
          <p className="text-sm text-ink-500">{t.simulatedNote}</p>
        </Card>
      </main>
    </>
  );
}
