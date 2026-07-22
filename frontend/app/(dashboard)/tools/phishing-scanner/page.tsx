"use client";

import { useState } from "react";
import { AlertTriangle, Fish, Loader2, ShieldCheck, ShieldX } from "lucide-react";
import { Topbar } from "@/components/layout/Topbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge, BadgeTone } from "@/components/ui/Badge";
import { DuotoneImage } from "@/components/ui/DuotoneImage";
import { scanForThreats, ScanResult, ScanVerdict } from "@/lib/phishingEngine";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

const VERDICT_TONE: Record<ScanVerdict, BadgeTone> = {
  Malicious: "critical",
  Suspicious: "high",
  Safe: "low",
};

const VERDICT_ICON: Record<ScanVerdict, typeof ShieldX> = {
  Malicious: ShieldX,
  Suspicious: AlertTriangle,
  Safe: ShieldCheck,
};

const VERDICT_ICON_COLOR: Record<ScanVerdict, string> = {
  Malicious: "text-critical-ink",
  Suspicious: "text-high-ink",
  Safe: "text-low-ink",
};

const EXAMPLES = [
  "Your account has been suspended! Verify immediately: http://paypa1-secure.xn--80ak6aa92e.com/login",
  "Hi team, please review the attached invoice update.docm before EOD, thanks!",
  "Dear valued customer, click here to claim your prize: bit.ly/claim-now-2024",
];

export default function PhishingScannerPage() {
  const { dict } = useLanguage();
  const [input, setInput] = useState("");
  const [result, setResult] = useState<ScanResult | null>(null);
  const [scanning, setScanning] = useState(false);

  function runScan(value: string) {
    if (!value.trim()) return;
    setScanning(true);
    setInput(value);
    setTimeout(() => {
      setResult(scanForThreats(value));
      setScanning(false);
    }, 450);
  }

  const VerdictIcon = result ? VERDICT_ICON[result.verdict] : null;

  return (
    <>
      <Topbar title={dict.phishing.title} subtitle={dict.phishing.subtitle} />
      <main className="flex-1 space-y-6 p-6">
        <Card className="relative flex flex-col items-center gap-6 overflow-hidden p-6 sm:flex-row">
          <DuotoneImage
            src="/phishing-illustration.webp"
            alt="Illustration of a phishing attack using a hook to steal data from a laptop"
            width={160}
            height={160}
            className="w-32 shrink-0 rounded-lg sm:w-40"
            intensity="medium"
          />
          <div>
            <div className="mb-2 inline-flex rounded-lg border border-critical-500/30 bg-critical-950 p-2 text-critical-400">
              <Fish className="h-4 w-4" />
            </div>
            <h2 className="font-display font-medium text-ink-100">{dict.phishing.heroTitle}</h2>
            <p className="mt-1.5 max-w-2xl text-sm text-ink-500">{dict.phishing.heroDesc}</p>
          </div>
        </Card>

        <Card className="p-6">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={dict.phishing.placeholder}
            rows={6}
            className="w-full resize-none rounded-lg border border-ink-800 bg-ink-950 p-4 text-sm text-ink-200 placeholder:text-ink-600 focus:border-accent-600 focus:outline-none"
          />
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              {EXAMPLES.map((ex, i) => (
                <button
                  key={i}
                  onClick={() => runScan(ex)}
                  className="rounded-full border border-ink-800 bg-ink-900 px-3 py-1.5 text-xs text-ink-500 transition-colors hover:border-accent-700 hover:text-accent-ink"
                >
                  {dict.phishing.tryExample} {i + 1}
                </button>
              ))}
            </div>
            <Button onClick={() => runScan(input)} disabled={!input.trim() || scanning}>
              {scanning ? <Loader2 className="h-4 w-4 animate-spin" /> : <Fish className="h-4 w-4" />}
              {dict.phishing.scanButton}
            </Button>
          </div>
        </Card>

        {result && VerdictIcon && (
          <div className="grid gap-4 lg:grid-cols-3">
            <Card className="p-6">
              <CardHeader className="px-0 pt-0">
                <CardTitle>{dict.phishing.verdict}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-3 px-0 pb-0 pt-2">
                <VerdictIcon className={`h-10 w-10 ${VERDICT_ICON_COLOR[result.verdict]}`} />
                <div className="font-mono text-4xl font-semibold text-ink-50 font-tabular">
                  {result.score}
                </div>
                <Badge tone={VERDICT_TONE[result.verdict]}>{dict.phishing.verdictLabels[result.verdict]}</Badge>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>{dict.phishing.indicatorsFound(result.indicators.length)}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {result.indicators.length === 0 ? (
                  <p className="flex items-center gap-2 text-sm text-low-ink">
                    <ShieldCheck className="h-4 w-4" /> {dict.phishing.noIndicators}
                  </p>
                ) : (
                  result.indicators.map((ind, i) => (
                    <div key={i} className="rounded-lg border border-ink-800 bg-ink-950/60 p-3">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-ink-200">{ind.factor}</p>
                        <Badge tone="critical">+{ind.weight}</Badge>
                      </div>
                      <p className="mt-1 text-xs text-ink-500">{ind.description}</p>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>

            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>{dict.phishing.recommendedActions}</CardTitle>
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

        <Card className="relative overflow-hidden border-ink-800 bg-[#08070c] p-6">
          <DuotoneImage
            src="/terminal-directory.webp"
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="absolute inset-0 opacity-20"
            imgClassName="object-cover"
            intensity="strong"
          />
          <div className="relative">
            <h3 className="font-display font-medium text-white">{dict.phishing.whatChecks}</h3>
            <div className="mt-4 grid gap-3 text-sm text-slate-400 sm:grid-cols-2">
              {dict.phishing.checks.map((c) => (
                <p key={c}>• {c}</p>
              ))}
            </div>
          </div>
        </Card>
      </main>
    </>
  );
}
