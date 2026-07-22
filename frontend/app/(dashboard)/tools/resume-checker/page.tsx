"use client";

import { useState } from "react";
import { DuotoneImage } from "@/components/ui/DuotoneImage";
import { FileSearch, Loader2, CheckCircle2 } from "lucide-react";
import { Topbar } from "@/components/layout/Topbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge, BadgeTone } from "@/components/ui/Badge";
import { analyzeResume, ResumeBand, ResumeResult } from "@/lib/resumeEngine";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

const BAND_TONE: Record<ResumeBand, BadgeTone> = {
  Excellent: "low",
  Good: "medium",
  "Needs Work": "high",
  Poor: "critical",
};

export default function ResumeCheckerPage() {
  const { dict } = useLanguage();
  const [resumeText, setResumeText] = useState("");
  const [keywords, setKeywords] = useState("");
  const [result, setResult] = useState<ResumeResult | null>(null);
  const [checking, setChecking] = useState(false);

  function runCheck() {
    if (!resumeText.trim()) return;
    setChecking(true);
    setTimeout(() => {
      setResult(analyzeResume(resumeText, keywords));
      setChecking(false);
    }, 450);
  }

  return (
    <>
      <Topbar title={dict.resume.title} subtitle={dict.resume.subtitle} />
      <main className="flex-1 space-y-6 p-6">
        <Card className="flex flex-col items-center gap-6 p-6 sm:flex-row">
          <DuotoneImage
            src="/security-scan-illustration.webp"
            alt="Illustration of a document being scanned for analysis"
            width={160}
            height={160}
            className="w-32 shrink-0 rounded-lg sm:w-40"
            intensity="medium"
          />
          <div>
            <div className="mb-2 inline-flex rounded-lg border border-accent-800/40 bg-accent-500/10 p-2.5 text-accent-400">
              <FileSearch className="h-4 w-4" />
            </div>
            <h2 className="font-display font-medium text-ink-100">{dict.resume.heroTitle}</h2>
            <p className="mt-1.5 max-w-2xl text-sm text-ink-500">{dict.resume.heroDesc}</p>
          </div>
        </Card>

        <Card className="space-y-4 p-6">
          <div>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink-500">
              {dict.resume.resumeTextLabel}
            </label>
            <textarea
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder={dict.resume.resumeTextPlaceholder}
              rows={10}
              className="w-full resize-none rounded-lg border border-ink-800 bg-ink-950 p-4 text-sm text-ink-200 placeholder:text-ink-600 focus:border-accent-600 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink-500">
              {dict.resume.keywordsLabel}
            </label>
            <input
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder={dict.resume.keywordsPlaceholder}
              className="w-full rounded-lg border border-ink-800 bg-ink-950 px-4 py-2.5 text-sm text-ink-200 placeholder:text-ink-600 focus:border-accent-600 focus:outline-none"
            />
          </div>
          <div className="flex justify-end">
            <Button onClick={runCheck} disabled={!resumeText.trim() || checking}>
              {checking ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileSearch className="h-4 w-4" />}
              {dict.resume.checkButton}
            </Button>
          </div>
        </Card>

        {result && (
          <div className="grid gap-4 lg:grid-cols-3">
            <Card className="p-6">
              <CardHeader className="px-0 pt-0">
                <CardTitle>{dict.resume.atsScore}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-3 px-0 pb-0 pt-2">
                <div className="font-mono text-4xl font-semibold text-ink-50 font-tabular">
                  {result.score}
                </div>
                <Badge tone={BAND_TONE[result.band]}>{dict.resume.bandLabels[result.band]}</Badge>
                <dl className="mt-3 grid w-full grid-cols-2 gap-2 text-center text-xs text-ink-500">
                  <div className="rounded-lg border border-ink-800 bg-ink-950/60 p-2">
                    <dt className="font-mono text-base text-ink-200 font-tabular">{result.stats.wordCount}</dt>
                    <dd>{dict.resume.words}</dd>
                  </div>
                  <div className="rounded-lg border border-ink-800 bg-ink-950/60 p-2">
                    <dt className="font-mono text-base text-ink-200 font-tabular">{result.stats.bulletCount}</dt>
                    <dd>{dict.resume.bulletPoints}</dd>
                  </div>
                  {result.stats.keywordTotal !== undefined && (
                    <div className="col-span-2 rounded-lg border border-ink-800 bg-ink-950/60 p-2">
                      <dt className="font-mono text-base text-ink-200 font-tabular">
                        {result.stats.keywordMatches} / {result.stats.keywordTotal}
                      </dt>
                      <dd>{dict.resume.keywordsMatched}</dd>
                    </div>
                  )}
                </dl>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>{dict.resume.findings(result.findings.length)}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {result.findings.length === 0 ? (
                  <p className="flex items-center gap-2 text-sm text-low-ink">
                    <CheckCircle2 className="h-4 w-4" /> {dict.resume.noFindings}
                  </p>
                ) : (
                  result.findings.map((f, i) => (
                    <div key={i} className="rounded-lg border border-ink-800 bg-ink-950/60 p-3">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-ink-200">{f.factor}</p>
                        <Badge tone="high">-{f.weight}</Badge>
                      </div>
                      <p className="mt-1 text-xs text-ink-500">{f.description}</p>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>

            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>{dict.resume.recommendations}</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-2 sm:grid-cols-2">
                {result.recommendations.map((r) => (
                  <div
                    key={r}
                    className="flex items-center gap-2 rounded-lg border border-ink-800 bg-ink-950/60 p-3 text-sm text-ink-300"
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-accent-ink" />
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
