"use client";

import { useState } from "react";
import { AlertTriangle, Gauge, Loader2, ShieldAlert, ShieldCheck, ShieldQuestion, ShieldX } from "lucide-react";
import { Topbar } from "@/components/layout/Topbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge, BadgeTone } from "@/components/ui/Badge";
import { scoreAiSystem, AiRiskResult, AiRiskSeverity } from "@/lib/aiRiskScoringEngine";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

const SEVERITY_TONE: Record<AiRiskSeverity, BadgeTone> = {
  Critical: "critical",
  High: "high",
  Medium: "medium",
  Low: "low",
};

const SEVERITY_ICON: Record<AiRiskSeverity, typeof ShieldX> = {
  Critical: ShieldX,
  High: AlertTriangle,
  Medium: ShieldQuestion,
  Low: ShieldCheck,
};

const SEVERITY_ICON_COLOR: Record<AiRiskSeverity, string> = {
  Critical: "text-critical-ink",
  High: "text-high-ink",
  Medium: "text-medium-ink",
  Low: "text-low-ink",
};

export default function AiRiskScoringPage() {
  const { dict } = useLanguage();
  const t = dict.tools.aiRiskScoring;
  const c = dict.tools.common;
  const [input, setInput] = useState("");
  const [result, setResult] = useState<AiRiskResult | null>(null);
  const [scanning, setScanning] = useState(false);

  function runScan(value: string) {
    if (!value.trim()) return;
    setScanning(true);
    setInput(value);
    setTimeout(() => {
      setResult(scoreAiSystem(value));
      setScanning(false);
    }, 450);
  }

  const SeverityIcon = result ? SEVERITY_ICON[result.severity] : null;

  return (
    <>
      <Topbar title={t.title} subtitle={t.subtitle} />
      <main className="flex-1 space-y-6 p-6">
        <Card className="p-6">
          <div className="mb-2 inline-flex rounded-lg border border-accent-800/40 bg-accent-500/10 p-2 text-accent-400">
            <Gauge className="h-4 w-4" />
          </div>
          <p className="max-w-2xl text-sm text-ink-500">{t.heroDesc}</p>
        </Card>

        <Card className="p-6">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t.placeholder}
            rows={8}
            className="w-full resize-none rounded-lg border border-ink-800 bg-ink-950 p-4 text-sm text-ink-200 placeholder:text-ink-600 focus:border-accent-600 focus:outline-none"
          />
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              {t.examples.map((ex, i) => (
                <button
                  key={i}
                  onClick={() => runScan(ex)}
                  className="rounded-full border border-ink-800 bg-ink-900 px-3 py-1.5 text-xs text-ink-500 transition-colors hover:border-accent-700 hover:text-accent-ink"
                >
                  {c.tryExample} {i + 1}
                </button>
              ))}
            </div>
            <Button onClick={() => runScan(input)} disabled={!input.trim() || scanning}>
              {scanning ? <Loader2 className="h-4 w-4 animate-spin" /> : <Gauge className="h-4 w-4" />}
              {c.analyzeButton}
            </Button>
          </div>
        </Card>

        {result && SeverityIcon && (
          <div className="grid gap-4 lg:grid-cols-3">
            <Card className="p-6">
              <CardHeader className="px-0 pt-0">
                <CardTitle>{t.riskScoreLabel}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-3 px-0 pb-0 pt-2">
                <SeverityIcon className={`h-10 w-10 ${SEVERITY_ICON_COLOR[result.severity]}`} />
                <div className="font-mono text-4xl font-semibold text-ink-50 font-tabular">
                  {result.score}
                </div>
                <Badge tone={SEVERITY_TONE[result.severity]}>{dict.severity[result.severity]}</Badge>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>{c.findingsFound(result.findings.length)}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {result.findings.length === 0 ? (
                  <p className="flex items-center gap-2 text-sm text-low-ink">
                    <ShieldCheck className="h-4 w-4" /> {c.noFindings}
                  </p>
                ) : (
                  result.findings.map((f, i) => (
                    <div key={i} className="rounded-lg border border-ink-800 bg-ink-950/60 p-3">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-ink-200">{f.factor}</p>
                        <Badge tone="critical">+{f.weight}</Badge>
                      </div>
                      <p className="mt-1 text-xs text-ink-500">{f.description}</p>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>

            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>{c.recommendedActions}</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-2 sm:grid-cols-2">
                {result.recommendations.map((r) => (
                  <div
                    key={r}
                    className="flex items-center gap-2 rounded-lg border border-ink-800 bg-ink-950/60 p-3 text-sm text-ink-300"
                  >
                    <ShieldCheck className="h-4 w-4 shrink-0 text-accent-ink" />
                    {r}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </>
  );
}
