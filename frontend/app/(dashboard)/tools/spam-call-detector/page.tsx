"use client";

import { useState } from "react";
import { AlertTriangle, Loader2, PhoneOff, ShieldCheck, ShieldX } from "lucide-react";
import { Topbar } from "@/components/layout/Topbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge, BadgeTone } from "@/components/ui/Badge";
import { analyzeCall, SpamCallResult, SpamCallVerdict } from "@/lib/spamCallEngine";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

const VERDICT_TONE: Record<SpamCallVerdict, BadgeTone> = {
  "Likely Scam": "critical",
  Suspicious: "high",
  "Likely Safe": "low",
};

const VERDICT_ICON: Record<SpamCallVerdict, typeof ShieldX> = {
  "Likely Scam": ShieldX,
  Suspicious: AlertTriangle,
  "Likely Safe": ShieldCheck,
};

const VERDICT_ICON_COLOR: Record<SpamCallVerdict, string> = {
  "Likely Scam": "text-critical-ink",
  Suspicious: "text-high-ink",
  "Likely Safe": "text-low-ink",
};

export default function SpamCallDetectorPage() {
  const { dict } = useLanguage();
  const t = dict.tools.spamCall;
  const c = dict.tools.common;
  const [phone, setPhone] = useState("");
  const [callerInfo, setCallerInfo] = useState("");
  const [result, setResult] = useState<SpamCallResult | null>(null);
  const [scanning, setScanning] = useState(false);

  function runScan(p: string, info: string) {
    if (!p.trim()) return;
    setScanning(true);
    setPhone(p);
    setCallerInfo(info);
    setTimeout(() => {
      setResult(analyzeCall(p, info));
      setScanning(false);
    }, 450);
  }

  const VerdictIcon = result ? VERDICT_ICON[result.verdict] : null;

  return (
    <>
      <Topbar title={t.title} subtitle={t.subtitle} />
      <main className="flex-1 space-y-6 p-6">
        <Card className="p-6">
          <div className="mb-2 inline-flex rounded-lg border border-critical-500/30 bg-critical-950 p-2 text-critical-400">
            <PhoneOff className="h-4 w-4" />
          </div>
          <p className="max-w-2xl text-sm text-ink-500">{t.heroDesc}</p>
        </Card>

        <Card className="p-6">
          <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink-500">
            {t.phoneLabel}
          </label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder={t.phonePlaceholder}
            className="mb-4 w-full rounded-lg border border-ink-800 bg-ink-950 p-3 font-mono text-sm text-ink-200 placeholder:font-sans placeholder:text-ink-600 focus:border-accent-600 focus:outline-none"
          />

          <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink-500">
            {t.callerInfoLabel}
          </label>
          <textarea
            value={callerInfo}
            onChange={(e) => setCallerInfo(e.target.value)}
            placeholder={t.callerInfoPlaceholder}
            rows={5}
            className="w-full resize-none rounded-lg border border-ink-800 bg-ink-950 p-4 text-sm text-ink-200 placeholder:text-ink-600 focus:border-accent-600 focus:outline-none"
          />

          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              {t.examples.map((ex, i) => (
                <button
                  key={i}
                  onClick={() => runScan(ex.phone, ex.callerInfo)}
                  className="rounded-full border border-ink-800 bg-ink-900 px-3 py-1.5 text-xs text-ink-500 transition-colors hover:border-accent-700 hover:text-accent-ink"
                >
                  {ex.label}
                </button>
              ))}
            </div>
            <Button onClick={() => runScan(phone, callerInfo)} disabled={!phone.trim() || scanning}>
              {scanning ? <Loader2 className="h-4 w-4 animate-spin" /> : <PhoneOff className="h-4 w-4" />}
              {c.analyzeButton}
            </Button>
          </div>
        </Card>

        {result && VerdictIcon && (
          <div className="grid gap-4 lg:grid-cols-3">
            <Card className="p-6">
              <CardHeader className="px-0 pt-0">
                <CardTitle>{c.verdict}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-3 px-0 pb-0 pt-2">
                <VerdictIcon className={`h-10 w-10 ${VERDICT_ICON_COLOR[result.verdict]}`} />
                <div className="font-mono text-4xl font-semibold text-ink-50 font-tabular">
                  {result.score}
                </div>
                <Badge tone={VERDICT_TONE[result.verdict]}>{t.verdictLabels[result.verdict]}</Badge>
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

        <Card className="p-6">
          <h3 className="font-display font-medium text-ink-100">{t.whatChecks}</h3>
          <div className="mt-4 grid gap-3 text-sm text-ink-400 sm:grid-cols-2">
            {t.checks.map((ch) => (
              <p key={ch}>• {ch}</p>
            ))}
          </div>
        </Card>
      </main>
    </>
  );
}
