"use client";

import Link from "next/link";
import { Topbar } from "@/components/layout/Topbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { RiskBadge } from "@/components/identities/RiskBadge";
import { PrintButton } from "@/components/reports/PrintButton";
import { identities } from "@/data/identities";
import { generateExecutiveReport } from "@/lib/reportGenerator";
import { formatDate } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export default function ReportsPage() {
  const { dict } = useLanguage();
  const report = generateExecutiveReport(identities);

  return (
    <>
      <Topbar title={dict.reports.title} subtitle={dict.reports.subtitle} />
      <main className="flex-1 space-y-6 p-6 print:bg-white print:text-black">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wide text-ink-500">
              {dict.reports.generated} {formatDate(report.generatedDate)}
            </p>
            <h2 className="text-xl font-semibold text-ink-100">{dict.reports.heading}</h2>
          </div>
          <PrintButton label={dict.reports.exportPrint} />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{dict.reports.riskSummary}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed text-ink-300">{report.summary}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{dict.reports.keyMetrics}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {report.keyMetrics.map((m) => (
                <div
                  key={m.label}
                  className="rounded-lg border border-ink-800 bg-ink-950/60 p-3 text-center"
                >
                  <p className="text-2xl font-semibold text-ink-50">{m.value}</p>
                  <p className="mt-1 text-xs text-ink-500">{m.label}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{dict.reports.top5}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {report.topFindings.map((f, idx) => (
              <Link
                key={f.identity.id}
                href={`/identities/${f.identity.id}`}
                className="flex items-center justify-between rounded-lg border border-ink-800 bg-ink-950/60 p-3 hover:border-accent-800/60"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-ink-600">#{idx + 1}</span>
                  <div>
                    <p className="text-sm font-medium text-ink-200">{f.identity.name}</p>
                    <p className="text-xs text-ink-500">
                      {f.identity.system} · {f.identity.type}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-ink-500">Score {f.assessment.score}</span>
                  <RiskBadge severity={f.assessment.severity} />
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{dict.reports.remediationRoadmap}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {report.remediationRoadmap.map((phase) => (
                <div
                  key={phase.phase}
                  className="rounded-lg border border-ink-800 bg-ink-950/60 p-4"
                >
                  <p className="text-sm font-semibold text-accent-ink">{phase.phase}</p>
                  <p className="mb-2 text-xs text-ink-500">{phase.timeframe}</p>
                  <ul className="space-y-1.5 text-xs text-ink-400">
                    {phase.actions.map((a) => (
                      <li key={a} className="flex gap-1.5">
                        <span className="text-accent-ink">•</span>
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>{dict.reports.businessImpact}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-ink-300">{report.businessImpact}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>{dict.reports.nextActions}</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-2 text-sm text-ink-300">
                {report.nextActions.map((a, i) => (
                  <li key={a} className="flex gap-2">
                    <span className="font-mono text-xs text-accent-ink">{i + 1}.</span>
                    {a}
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
