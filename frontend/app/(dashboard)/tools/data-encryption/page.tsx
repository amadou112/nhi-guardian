"use client";

import { useState } from "react";
import { AlertTriangle, Check, Copy, Eye, EyeOff, Loader2, Lock, ShieldCheck, Unlock } from "lucide-react";
import { Topbar } from "@/components/layout/Topbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { encryptText, decryptText } from "@/lib/cryptoTool";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

type Mode = "encrypt" | "decrypt";

export default function DataEncryptionPage() {
  const { dict } = useLanguage();
  const t = dict.tools.cryptoTool;

  const [mode, setMode] = useState<Mode>("encrypt");
  const [passphrase, setPassphrase] = useState("");
  const [showPassphrase, setShowPassphrase] = useState(false);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);

  function switchMode(next: Mode) {
    setMode(next);
    setInput("");
    setOutput("");
    setError("");
    setCopied(false);
  }

  async function run() {
    setError("");
    setOutput("");
    setCopied(false);

    if (!passphrase.trim()) {
      setError(t.errorPassphrase);
      return;
    }
    if (!input.trim()) return;

    setBusy(true);
    try {
      const result =
        mode === "encrypt" ? await encryptText(input, passphrase) : await decryptText(input, passphrase);
      setOutput(result);
    } catch {
      setError(mode === "decrypt" ? t.errorDecrypt : t.errorDecrypt);
    } finally {
      setBusy(false);
    }
  }

  function copyOutput() {
    if (!output) return;
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }

  return (
    <>
      <Topbar title={t.title} subtitle={t.subtitle} />
      <main className="flex-1 space-y-6 p-6">
        <Card className="p-6">
          <div className="mb-2 inline-flex rounded-lg border border-accent-800/40 bg-accent-500/10 p-2 text-accent-400">
            <Lock className="h-4 w-4" />
          </div>
          <p className="max-w-2xl text-sm text-ink-500">{t.heroDesc}</p>
        </Card>

        <Card className="p-6">
          <div className="mb-5 inline-flex items-center rounded-lg border border-ink-800 bg-ink-950 p-0.5 text-sm font-medium">
            {(["encrypt", "decrypt"] as const).map((m) => (
              <button
                key={m}
                type="button"
                aria-pressed={mode === m}
                onClick={() => switchMode(m)}
                className={cn(
                  "flex items-center gap-1.5 rounded-md px-4 py-1.5 transition-colors",
                  mode === m ? "bg-accent-500 text-ink-950" : "text-ink-400 hover:text-ink-100"
                )}
              >
                {m === "encrypt" ? <Lock className="h-3.5 w-3.5" /> : <Unlock className="h-3.5 w-3.5" />}
                {m === "encrypt" ? t.encryptTab : t.decryptTab}
              </button>
            ))}
          </div>

          <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink-500">
            {t.passphraseLabel}
          </label>
          <div className="relative mb-4">
            <input
              type={showPassphrase ? "text" : "password"}
              value={passphrase}
              onChange={(e) => setPassphrase(e.target.value)}
              placeholder={t.passphrasePlaceholder}
              className="w-full rounded-lg border border-ink-800 bg-ink-950 p-3 pr-10 text-sm text-ink-200 placeholder:text-ink-600 focus:border-accent-600 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassphrase((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-500 hover:text-ink-200"
              aria-label={showPassphrase ? "Hide passphrase" : "Show passphrase"}
            >
              {showPassphrase ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink-500">
            {mode === "encrypt" ? t.inputLabelEncrypt : t.inputLabelDecrypt}
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === "encrypt" ? t.inputPlaceholderEncrypt : t.inputPlaceholderDecrypt}
            rows={6}
            className="w-full resize-none rounded-lg border border-ink-800 bg-ink-950 p-4 font-mono text-sm text-ink-200 placeholder:font-sans placeholder:text-ink-600 focus:border-accent-600 focus:outline-none"
          />

          <div className="mt-3 flex justify-end">
            <Button onClick={run} disabled={!input.trim() || busy} data-testid="crypto-run-button">
              {busy ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : mode === "encrypt" ? (
                <Lock className="h-4 w-4" />
              ) : (
                <Unlock className="h-4 w-4" />
              )}
              {mode === "encrypt" ? t.encryptButton : t.decryptButton}
            </Button>
          </div>
        </Card>

        {error && (
          <Card className="flex items-center gap-3 border-critical-500/30 bg-critical-950/40 p-4">
            <AlertTriangle className="h-4 w-4 shrink-0 text-critical-ink" />
            <p className="text-sm text-critical-300">{error}</p>
          </Card>
        )}

        {output && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{t.outputLabel}</CardTitle>
              <button
                onClick={copyOutput}
                className="inline-flex items-center gap-1.5 rounded-md border border-ink-700 bg-ink-900 px-2.5 py-1 text-xs font-medium text-ink-300 transition-colors hover:border-accent-700 hover:text-accent-ink"
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? t.copiedLabel : t.copyButton}
              </button>
            </CardHeader>
            <CardContent>
              <p className="break-all rounded-lg border border-ink-800 bg-ink-950/60 p-3 font-mono text-sm text-ink-200">
                {output}
              </p>
            </CardContent>
          </Card>
        )}

        <Card className="flex items-start gap-3 p-5">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent-ink" />
          <div className="space-y-1">
            <p className="text-sm text-ink-400">{t.disclaimer}</p>
            <p className="font-mono text-xs text-ink-600">{t.algorithmNote}</p>
          </div>
        </Card>
      </main>
    </>
  );
}
