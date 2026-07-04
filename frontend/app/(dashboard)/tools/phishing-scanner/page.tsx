"use client";

import { useState } from "react";
import Image from "next/image";
import { AlertTriangle, Fish, Loader2, ShieldCheck, ShieldX } from "lucide-react";
import { Topbar } from "@/components/layout/Topbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge, BadgeTone } from "@/components/ui/Badge";
import { scanForThreats, ScanResult, ScanVerdict } from "@/lib/phishingEngine";

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

const EXAMPLES = [
  "Your account has been suspended! Verify immediately: http://paypa1-secure.xn--80ak6aa92e.com/login",
  "Hi team, please review the attached invoice update.docm before EOD, thanks!",
  "Dear valued customer, click here to claim your prize: bit.ly/claim-now-2024",
];

export default function PhishingScannerPage() {
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
      <Topbar
        title="Phishing & Malware Scanner"
        subtitle="Rule-based threat indicator analysis — paste a link, email, or message"
      />
      <main className="flex-1 space-y-6 p-6">
        <Card className="relative flex flex-col items-center gap-6 overflow-hidden p-6 sm:flex-row">
          <Image
            src="/phishing-illustration.jpg"
            alt="Illustration of a phishing attack using a hook to steal data from a laptop"
            width={160}
            height={160}
            className="w-32 shrink-0 rounded-lg opacity-90 sm:w-40"
          />
          <div>
            <div className="mb-2 inline-flex rounded-lg border border-critical-500/30 bg-critical-950 p-2 text-critical-400">
              <Fish className="h-4 w-4" />
            </div>
            <h2 className="font-display font-medium text-ink-100">
              Check a suspicious link or message before you click
            </h2>
            <p className="mt-1.5 max-w-2xl text-sm text-ink-500">
              Paste the full text of a suspicious email, text message, or a link below. The
              scanner checks it against known phishing and malware indicators — lookalike
              domains, IP-based links, urgency language, credential requests, and dangerous
              attachment types — and explains exactly what it found.
            </p>
          </div>
        </Card>

        <Card className="p-6">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste a URL, email body, or text message here…"
            rows={6}
            className="w-full resize-none rounded-lg border border-ink-800 bg-ink-950 p-4 text-sm text-ink-200 placeholder:text-ink-600 focus:border-accent-600 focus:outline-none"
          />
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              {EXAMPLES.map((ex, i) => (
                <button
                  key={i}
                  onClick={() => runScan(ex)}
                  className="rounded-full border border-ink-800 bg-ink-900 px-3 py-1.5 text-xs text-ink-500 transition-colors hover:border-accent-700 hover:text-accent-300"
                >
                  Try example {i + 1}
                </button>
              ))}
            </div>
            <Button onClick={() => runScan(input)} disabled={!input.trim() || scanning}>
              {scanning ? <Loader2 className="h-4 w-4 animate-spin" /> : <Fish className="h-4 w-4" />}
              Scan for Threats
            </Button>
          </div>
        </Card>

        {result && VerdictIcon && (
          <div className="grid gap-4 lg:grid-cols-3">
            <Card className="p-6">
              <CardHeader className="px-0 pt-0">
                <CardTitle>Verdict</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-3 px-0 pb-0 pt-2">
                <VerdictIcon
                  className={
                    result.verdict === "Malicious"
                      ? "h-10 w-10 text-critical-400"
                      : result.verdict === "Suspicious"
                        ? "h-10 w-10 text-high-400"
                        : "h-10 w-10 text-low-400"
                  }
                />
                <div className="font-mono text-4xl font-semibold text-ink-50 font-tabular">
                  {result.score}
                </div>
                <Badge tone={VERDICT_TONE[result.verdict]}>{result.verdict}</Badge>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Indicators Found ({result.indicators.length})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {result.indicators.length === 0 ? (
                  <p className="flex items-center gap-2 text-sm text-low-400">
                    <ShieldCheck className="h-4 w-4" /> No known threat indicators detected.
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
                <CardTitle>Recommended Actions</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-2 sm:grid-cols-2">
                {result.recommendations.map((r) => (
                  <div
                    key={r}
                    className="flex items-center gap-2 rounded-lg border border-ink-800 bg-ink-950/60 p-3 text-sm text-ink-300"
                  >
                    <ShieldCheck className="h-4 w-4 shrink-0 text-accent-400" />
                    {r}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        <Card className="relative overflow-hidden p-6">
          <Image
            src="/terminal-directory.jpg"
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover opacity-[0.08]"
          />
          <div className="relative">
            <h3 className="font-display font-medium text-ink-100">What this scanner checks</h3>
            <div className="mt-4 grid gap-3 text-sm text-ink-400 sm:grid-cols-2">
              <p>• Raw IP addresses and punycode/homograph domains</p>
              <p>• URL shorteners and suspicious top-level domains</p>
              <p>• Brand impersonation in lookalike domains</p>
              <p>• Urgency language and pressure tactics</p>
              <p>• Requests for passwords, codes, or financial details</p>
              <p>• Dangerous executable attachment types</p>
            </div>
          </div>
        </Card>
      </main>
    </>
  );
}
