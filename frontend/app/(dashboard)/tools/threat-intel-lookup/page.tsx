"use client";

import { useState } from "react";
import { AlertTriangle, HelpCircle, Loader2, Radar, ShieldCheck, ShieldX } from "lucide-react";
import { Topbar } from "@/components/layout/Topbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge, BadgeTone } from "@/components/ui/Badge";
import { lookupIoc, IocResult, IocVerdict } from "@/lib/threatIntelEngine";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

const VERDICT_TONE: Record<IocVerdict, BadgeTone> = {
  Malicious: "critical",
  Suspicious: "high",
  Clean: "low",
  Unrecognized: "ink",
};

const VERDICT_ICON: Record<IocVerdict, typeof ShieldX> = {
  Malicious: ShieldX,
  Suspicious: AlertTriangle,
  Clean: ShieldCheck,
  Unrecognized: HelpCircle,
};

const VERDICT_ICON_COLOR: Record<IocVerdict, string> = {
  Malicious: "text-critical-ink",
  Suspicious: "text-high-ink",
  Clean: "text-low-ink",
  Unrecognized: "text-ink-500",
};

export default function ThreatIntelLookupPage() {
  const { dict } = useLanguage();
  const t = dict.tools.threatIntel;
  const c = dict.tools.common;
  const [input, setInput] = useState("");
  const [result, setResult] = useState<IocResult | null>(null);
  const [scanning, setScanning] = useState(false);

  function runLookup(value: string) {
    if (!value.trim()) return;
    setScanning(true);
    setInput(value);
    setTimeout(() => {
      setResult(lookupIoc(value));
      setScanning(false);
    }, 450);
  }

  const VerdictIcon = result ? VERDICT_ICON[result.verdict] : null;

  return (
    <>
      <Topbar title={t.title} subtitle={t.subtitle} />
      <main className="flex-1 space-y-6 p-6">
        <Card className="p-6">
          <div className="mb-2 inline-flex rounded-lg border border-accent-800/40 bg-accent-500/10 p-2 text-accent-400">
            <Radar className="h-4 w-4" />
          </div>
          <p className="max-w-2xl text-sm text-ink-500">{t.heroDesc}</p>
        </Card>

        <Card className="p-6">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t.placeholder}
            className="w-full rounded-lg border border-ink-800 bg-ink-950 p-4 font-mono text-sm text-ink-200 placeholder:font-sans placeholder:text-ink-600 focus:border-accent-600 focus:outline-none"
          />
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              {t.examples.map((ex, i) => (
                <button
                  key={i}
                  onClick={() => runLookup(ex)}
                  className="rounded-full border border-ink-800 bg-ink-900 px-3 py-1.5 text-xs text-ink-500 transition-colors hover:border-accent-700 hover:text-accent-ink"
                >
                  {c.tryExample} {i + 1}
                </button>
              ))}
            </div>
            <Button onClick={() => runLookup(input)} disabled={!input.trim() || scanning}>
              {scanning ? <Loader2 className="h-4 w-4 animate-spin" /> : <Radar className="h-4 w-4" />}
              {c.lookupButton}
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
                  {result.confidence}%
                </div>
                <Badge tone={VERDICT_TONE[result.verdict]}>{t.verdictLabels[result.verdict]}</Badge>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardContent className="space-y-3 pt-5">
                <div className="flex items-center justify-between border-b border-ink-800 pb-3">
                  <span className="text-xs uppercase tracking-wide text-ink-500">{t.typeLabel}</span>
                  <span className="text-sm font-medium text-ink-200">{result.type}</span>
                </div>
                <div className="flex items-center justify-between border-b border-ink-800 pb-3">
                  <span className="text-xs uppercase tracking-wide text-ink-500">{t.confidenceLabel}</span>
                  <span className="text-sm font-medium text-ink-200">{result.confidence}%</span>
                </div>
                {result.tags.length > 0 && (
                  <div className="flex items-center justify-between pb-1">
                    <span className="text-xs uppercase tracking-wide text-ink-500">{t.tagsLabel}</span>
                    <div className="flex flex-wrap justify-end gap-1.5">
                      {result.tags.map((tag) => (
                        <Badge key={tag} tone="accent">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                <p className="pt-2 text-sm text-ink-400">{result.summary}</p>
              </CardContent>
            </Card>

            <Card className="lg:col-span-3 flex items-center gap-3 p-5">
              <Radar className="h-4 w-4 shrink-0 text-accent-ink" />
              <p className="text-xs text-ink-500">{t.simulatedNote}</p>
            </Card>
          </div>
        )}
      </main>
    </>
  );
}
