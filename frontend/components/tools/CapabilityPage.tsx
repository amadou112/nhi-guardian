import { ReactNode } from "react";
import { LucideIcon, CheckCircle2, Link2 } from "lucide-react";
import { Topbar } from "@/components/layout/Topbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

interface CapabilityPageProps {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  description: string;
  capabilitiesLabel: string;
  capabilities: string[];
  dashboardLabel: string;
  tieInLabel: string;
  tieIn: string;
  mockLabel: string;
  children: ReactNode;
}

// Shared layout for the eight "platform-style" security tool pages
// (SIEM, EDR, XDR, NDR, Pentest, DFIR, SASE/SSE, Encryption & Key Mgmt).
// These describe a category of enterprise platform rather than a single
// paste-and-analyze action, so the honest representation is a capability
// overview plus a realistic mock dashboard — not a fake analyzer engine.
export function CapabilityPage({
  title,
  subtitle,
  icon: Icon,
  description,
  capabilitiesLabel,
  capabilities,
  dashboardLabel,
  tieInLabel,
  tieIn,
  mockLabel,
  children,
}: CapabilityPageProps) {
  return (
    <>
      <Topbar title={title} subtitle={subtitle} />
      <main className="flex-1 space-y-6 p-6">
        <Card className="p-6 sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <div className="inline-flex shrink-0 rounded-lg border border-accent-800/40 bg-accent-500/10 p-3 text-accent-400">
              <Icon className="h-6 w-6" />
            </div>
            <div>
              <h2 className="font-display text-xl font-semibold text-ink-50 sm:text-2xl">{title}</h2>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-400">{description}</p>
            </div>
          </div>

          <div className="mt-6 grid gap-2 border-t border-ink-800 pt-6 sm:grid-cols-2">
            <p className="col-span-full text-xs font-semibold uppercase tracking-wide text-ink-600">
              {capabilitiesLabel}
            </p>
            {capabilities.map((c) => (
              <div key={c} className="flex items-start gap-2 text-sm text-ink-400">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent-ink" />
                {c}
              </div>
            ))}
          </div>
        </Card>

        <div>
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold text-ink-100">{dashboardLabel}</h3>
            <span className="rounded-full border border-ink-700 bg-ink-900 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-ink-500">
              {mockLabel}
            </span>
          </div>
          {children}
        </div>

        <Card className="flex items-start gap-3 p-5">
          <Link2 className="mt-0.5 h-4 w-4 shrink-0 text-accent-ink" />
          <div>
            <CardHeader className="p-0">
              <CardTitle className="normal-case tracking-normal text-ink-200">{tieInLabel}</CardTitle>
            </CardHeader>
            <CardContent className="p-0 pt-1.5">
              <p className="text-sm text-ink-400">{tieIn}</p>
            </CardContent>
          </div>
        </Card>
      </main>
    </>
  );
}
