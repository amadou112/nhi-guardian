"use client";

import { useState } from "react";
import { FileWarning, Loader2, ShieldCheck } from "lucide-react";
import { Topbar } from "@/components/layout/Topbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { scanForSensitiveData, DlpResult } from "@/lib/dlpEngine";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export default function DlpScannerPage() {
  const { dict } = useLanguage();
  const t = dict.tools.dlp;
  const c = dict.tools.common;
  const [input, setInput] = useState("");
  const [result, setResult] = useState<DlpResult | null>(null);
  const [scanning, setScanning] = useState(false);

  function runScan(value: string) {
    if (!value.trim()) return;
    setScanning(true);
    setInput(value);
    setTimeout(() => {
      setResult(scanForSensitiveData(value));
      setScanning(false);
    }, 450);
  }

  return (
    <>
      <Topbar title={t.title} subtitle={t.subtitle} />
      <main className="flex-1 space-y-6 p-6">
        <Card className="p-6">
          <div className="mb-2 inline-flex rounded-lg border border-accent-800/40 bg-accent-500/10 p-2 text-accent-400">
            <FileWarning className="h-4 w-4" />
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
              {scanning ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileWarning className="h-4 w-4" />}
              {c.scanButton}
            </Button>
          </div>
        </Card>

        {result && (
          <Card>
            <CardHeader>
              <CardTitle>{t.categoriesFound(result.matches.length)}</CardTitle>
            </CardHeader>
            <CardContent className="px-0 pb-0">
              {result.matches.length === 0 ? (
                <p className="flex items-center gap-2 px-5 pb-5 text-sm text-low-ink">
                  <ShieldCheck className="h-4 w-4" /> {t.noMatches}
                </p>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-y border-ink-800 text-left text-xs uppercase tracking-wide text-ink-500">
                          <th className="px-5 py-3 font-medium">{t.colCategory}</th>
                          <th className="px-5 py-3 font-medium">{t.colCount}</th>
                          <th className="px-5 py-3 font-medium">{t.colSample}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-ink-800/70">
                        {result.matches.map((m, i) => (
                          <tr key={i} className="hover:bg-ink-900/50 transition-colors">
                            <td className="px-5 py-3 font-medium text-ink-200">{m.category}</td>
                            <td className="px-5 py-3">
                              <Badge tone="critical">{m.count}</Badge>
                            </td>
                            <td className="px-5 py-3 font-mono text-xs text-ink-400">{m.sample}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="px-5 pb-5 pt-3 text-xs text-ink-600">{t.falsePositiveNote}</p>
                </>
              )}
            </CardContent>
          </Card>
        )}
      </main>
    </>
  );
}
