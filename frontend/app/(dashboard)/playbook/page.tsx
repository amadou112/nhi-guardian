"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Target,
  Search,
  Radar,
  Wrench,
  FileText,
  Workflow,
  ShieldCheck,
  ArrowRight,
  Flag,
  ChevronDown,
  RotateCcw,
} from "lucide-react";
import { Topbar } from "@/components/layout/Topbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { ChecklistItem } from "@/components/playbook/ChecklistItem";
import { ProgressBar } from "@/components/playbook/ProgressBar";
import { usePlaybookProgress } from "@/lib/playbook/useProgress";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

const PHASE_ICONS = [Target, Search, Radar, Wrench, FileText, Workflow, ShieldCheck];

function itemIds(phaseKey: string, activityCount: number, deliverableCount: number) {
  return [
    ...Array.from({ length: activityCount }, (_, i) => `${phaseKey}:activity:${i}`),
    ...Array.from({ length: deliverableCount }, (_, i) => `${phaseKey}:deliverable:${i}`),
  ];
}

export default function PlaybookPage() {
  const { dict } = useLanguage();
  const p = dict.playbook;
  const reduceMotion = useReducedMotion();
  const { hydrated, isChecked, toggle, reset, countChecked } = usePlaybookProgress();
  const [expanded, setExpanded] = useState<Set<string>>(new Set([p.phases[0]?.key]));

  const phaseStats = p.phases.map((phase) => {
    const ids = itemIds(phase.key, phase.activities.length, phase.deliverables.length);
    const done = countChecked(ids);
    return { key: phase.key, done, total: ids.length, percent: ids.length ? (done / ids.length) * 100 : 0 };
  });
  const overallDone = phaseStats.reduce((sum, s) => sum + s.done, 0);
  const overallTotal = phaseStats.reduce((sum, s) => sum + s.total, 0);
  const overallPercent = overallTotal ? Math.round((overallDone / overallTotal) * 100) : 0;

  function togglePhase(key: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  function jumpToPhase(key: string) {
    setExpanded((prev) => new Set(prev).add(key));
    requestAnimationFrame(() => {
      document.getElementById(key)?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    });
  }

  return (
    <>
      <Topbar title={p.title} subtitle={p.subtitle} />
      <main className="flex-1 space-y-8 p-6">
        <Reveal>
          <Card className="p-6 sm:p-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent-800/50 bg-accent-500/10 px-4 py-1.5 text-xs font-medium text-accent-ink">
              <Flag className="h-3.5 w-3.5" />
              {p.heroEyebrow}
            </div>
            <h2 className="font-display mt-4 max-w-3xl text-2xl font-semibold text-ink-50 sm:text-3xl">
              {p.heroTitle}
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ink-400 sm:text-base">
              {p.heroDesc}
            </p>

            <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
              {[
                { label: p.statDuration, value: p.statDurationValue },
                { label: p.statPhases, value: p.statPhasesValue },
                { label: p.statRiskReduction, value: p.statRiskReductionValue },
                { label: p.statSystems, value: p.statSystemsValue },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-lg border border-ink-800 bg-ink-950/60 p-4 text-center"
                >
                  <p className="font-mono text-xl font-semibold text-ink-50 font-tabular sm:text-2xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs text-ink-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </Card>
        </Reveal>

        <Reveal>
          <Card className="p-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex-1 min-w-[220px]">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-wide text-ink-500">
                    {p.yourProgress}
                  </p>
                  <p className="font-mono text-sm font-semibold text-ink-100 font-tabular">
                    {hydrated ? `${overallPercent}%` : "—"}
                  </p>
                </div>
                <ProgressBar percent={hydrated ? overallPercent : 0} className="mt-2" />
                <p className="mt-1.5 text-xs text-ink-500">
                  {hydrated ? p.stepsComplete(overallDone, overallTotal) : ""}
                </p>
              </div>
              <button
                type="button"
                onClick={reset}
                className="flex items-center gap-1.5 rounded-lg border border-ink-800 bg-ink-900 px-3 py-1.5 text-xs text-ink-500 transition-colors hover:border-ink-600 hover:text-ink-200"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                {p.resetProgress}
              </button>
            </div>

            <div className="mt-5 flex flex-wrap gap-2 border-t border-ink-800 pt-4">
              {p.phases.map((phase, i) => {
                const Icon = PHASE_ICONS[i] ?? Target;
                const stat = phaseStats[i];
                const complete = stat.total > 0 && stat.done === stat.total;
                return (
                  <button
                    key={phase.key}
                    type="button"
                    onClick={() => jumpToPhase(phase.key)}
                    title={`${p.jumpToPhase} ${phase.title}`}
                    className={cn(
                      "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                      complete
                        ? "border-low-500/40 bg-low-950 text-low-400"
                        : stat.done > 0
                          ? "border-accent-700/60 bg-accent-500/10 text-accent-ink"
                          : "border-ink-800 bg-ink-900 text-ink-500 hover:border-ink-600 hover:text-ink-200"
                    )}
                  >
                    <Icon className="h-3.5 w-3.5 shrink-0" />
                    {phase.number}
                  </button>
                );
              })}
            </div>
          </Card>
        </Reveal>

        <Reveal>
          <div>
            <h3 className="font-display text-xl font-semibold text-ink-100">{p.timelineTitle}</h3>
            <p className="mt-1 text-sm text-ink-500">{p.timelineSubtitle}</p>
          </div>
        </Reveal>

        <RevealGroup className="relative space-y-5">
          <div
            className="absolute left-[27px] top-4 bottom-4 hidden w-px bg-ink-800 sm:block"
            aria-hidden="true"
          />
          {p.phases.map((phase, i) => {
            const Icon = PHASE_ICONS[i] ?? Target;
            const stat = phaseStats[i];
            const isOpen = expanded.has(phase.key);

            return (
              <RevealItem key={phase.key} id={phase.key} className="relative scroll-mt-20 sm:pl-[70px]">
                <div className="absolute left-0 top-0 hidden h-14 w-14 items-center justify-center rounded-full border border-accent-800/40 bg-ink-950 text-accent-ink sm:flex">
                  <Icon className="h-5 w-5" />
                </div>
                <Card className="overflow-hidden p-0">
                  <button
                    type="button"
                    onClick={() => togglePhase(phase.key)}
                    aria-expanded={isOpen}
                    aria-label={isOpen ? p.collapsePhase : p.expandPhase}
                    className="flex w-full items-start justify-between gap-4 p-6 text-left"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge tone="accent">{phase.number}</Badge>
                        <span className="text-xs text-ink-500">{phase.timeframe}</span>
                      </div>
                      <h4 className="font-display mt-3 text-lg font-semibold text-ink-50">{phase.title}</h4>
                      <p className="mt-1 text-sm text-ink-400">
                        <span className="font-medium text-ink-300">{p.goalLabel}: </span>
                        {phase.goal}
                      </p>
                      <div className="mt-4 flex items-center gap-3">
                        <ProgressBar percent={stat.percent} className="max-w-[160px]" />
                        <span className="shrink-0 text-xs text-ink-500">
                          {hydrated ? p.stepsComplete(stat.done, stat.total) : ""}
                        </span>
                      </div>
                    </div>
                    <ChevronDown
                      className={cn(
                        "mt-1 h-5 w-5 shrink-0 text-ink-500 transition-transform duration-200",
                        isOpen && "rotate-180"
                      )}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6">
                          <div className="grid gap-5 border-t border-ink-800 pt-5 sm:grid-cols-2">
                            <div>
                              <p className="text-xs font-semibold uppercase tracking-wide text-ink-600">
                                {p.activitiesLabel}
                              </p>
                              <div className="mt-2 space-y-1">
                                {phase.activities.map((a, idx) => {
                                  const id = `${phase.key}:activity:${idx}`;
                                  return (
                                    <ChecklistItem
                                      key={id}
                                      label={a}
                                      checked={isChecked(id)}
                                      onToggle={() => toggle(id)}
                                    />
                                  );
                                })}
                              </div>
                            </div>
                            <div>
                              <p className="text-xs font-semibold uppercase tracking-wide text-ink-600">
                                {p.deliverablesLabel}
                              </p>
                              <div className="mt-2 space-y-1">
                                {phase.deliverables.map((d, idx) => {
                                  const id = `${phase.key}:deliverable:${idx}`;
                                  return (
                                    <ChecklistItem
                                      key={id}
                                      label={d}
                                      checked={isChecked(id)}
                                      onToggle={() => toggle(id)}
                                    />
                                  );
                                })}
                              </div>
                            </div>
                          </div>

                          <div className="mt-5 flex items-center gap-2 rounded-lg border border-low-500/30 bg-low-950 px-3 py-2">
                            <ShieldCheck className="h-4 w-4 shrink-0 text-low-400" />
                            <p className="text-xs text-low-400">
                              <span className="font-semibold">{p.metricLabel}: </span>
                              {phase.metric}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </RevealItem>
            );
          })}
        </RevealGroup>

        <Reveal>
          <Card>
            <CardHeader>
              <CardTitle>{p.raciTitle}</CardTitle>
              <p className="mt-1 text-xs normal-case tracking-normal text-ink-500">{p.raciSubtitle}</p>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-ink-800 text-left text-xs uppercase tracking-wide text-ink-500">
                    <th className="py-2 pr-4 font-medium">{p.raciColRole}</th>
                    <th className="py-2 font-medium">{p.raciColResponsibility}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink-800/70">
                  {p.raciRoles.map((r) => (
                    <tr key={r.role} className="transition-colors hover:bg-ink-900/50">
                      <td className="py-3 pr-4 font-medium text-ink-200 whitespace-nowrap">{r.role}</td>
                      <td className="py-3 text-ink-400">{r.responsibility}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </Reveal>

        <Reveal>
          <Card className="flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-display font-medium text-ink-100">{p.ctaTitle}</h3>
              <p className="mt-1 max-w-xl text-sm text-ink-500">{p.ctaDesc}</p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <Link href="/dashboard">
                <Button className="text-sm">
                  {p.ctaDashboard} <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/reports">
                <Button variant="secondary" className="text-sm">
                  {p.ctaReports}
                </Button>
              </Link>
            </div>
          </Card>
        </Reveal>
      </main>
    </>
  );
}
