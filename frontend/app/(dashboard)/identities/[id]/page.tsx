import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Topbar } from "@/components/layout/Topbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { RiskBadge } from "@/components/identities/RiskBadge";
import { StatusBadge, RotationBadge } from "@/components/identities/StatusBadge";
import { Badge } from "@/components/ui/Badge";
import { identities } from "@/data/identities";
import { assessIdentity, getRotationStatus } from "@/lib/riskEngine";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return identities.map((identity) => ({ id: identity.id }));
}

export default async function IdentityDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const identity = identities.find((i) => i.id === id);

  if (!identity) {
    notFound();
  }

  const assessment = assessIdentity(identity);

  const meta: { label: string; value: string }[] = [
    { label: "Owner", value: identity.owner ?? "Unassigned" },
    { label: "System", value: identity.system },
    { label: "Environment", value: identity.environment },
    { label: "Permission Level", value: identity.permissionLevel },
    { label: "Created", value: formatDate(identity.createdDate) },
    { label: "Last Used", value: formatDate(identity.lastUsedDate) },
    { label: "Has Expiration", value: identity.hasExpiration ? "Yes" : "No" },
    { label: "Shared Account", value: identity.isShared ? "Yes" : "No" },
    { label: "Documented", value: identity.hasDocumentation ? "Yes" : "No" },
    { label: "Secret Exposed", value: identity.secretExposed ? "Yes" : "No" },
  ];

  return (
    <>
      <Topbar title={identity.name} subtitle={`${identity.type} · ${identity.id}`} />
      <main className="flex-1 space-y-6 p-6">
        <Link
          href="/identities"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-500 hover:text-ink-300"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to inventory
        </Link>

        <div className="grid gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Risk Score</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-3 py-4">
              <div className="text-5xl font-semibold text-ink-50">{assessment.score}</div>
              <RiskBadge severity={assessment.severity} />
              <div className="mt-2 flex flex-wrap justify-center gap-2">
                <StatusBadge status={identity.status} />
                <RotationBadge status={getRotationStatus(identity.daysSinceRotation)} />
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Identity Details</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3">
                {meta.map((m) => (
                  <div key={m.label}>
                    <dt className="text-xs uppercase tracking-wide text-ink-500">{m.label}</dt>
                    <dd className="mt-0.5 text-sm font-medium text-ink-200">{m.value}</dd>
                  </div>
                ))}
              </dl>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Risk Findings ({assessment.findings.length})</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {assessment.findings.length === 0 ? (
                <p className="flex items-center gap-2 text-sm text-emerald-400">
                  <CheckCircle2 className="h-4 w-4" /> No risk factors detected.
                </p>
              ) : (
                assessment.findings.map((f) => (
                  <div
                    key={f.factor}
                    className="rounded-lg border border-ink-800 bg-ink-950/60 p-3"
                  >
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

          <Card>
            <CardHeader>
              <CardTitle>Recommended Remediation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {assessment.recommendations.length === 0 ? (
                <p className="text-sm text-ink-500">
                  No remediation required — this identity follows best practices.
                </p>
              ) : (
                assessment.recommendations.map((r) => (
                  <div
                    key={r}
                    className="flex items-center gap-2 rounded-lg border border-ink-800 bg-ink-950/60 p-3 text-sm text-ink-300"
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-accent-400" />
                    {r}
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
