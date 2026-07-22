"use client";

import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Topbar } from "@/components/layout/Topbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { RiskBadge } from "@/components/identities/RiskBadge";
import { StatusBadge, RotationBadge } from "@/components/identities/StatusBadge";
import { Badge } from "@/components/ui/Badge";
import { NonHumanIdentity, RiskAssessment } from "@/lib/types";
import { getRotationStatus } from "@/lib/riskEngine";
import { formatDate } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export function IdentityDetailView({
  identity,
  assessment,
}: {
  identity: NonHumanIdentity;
  assessment: RiskAssessment;
}) {
  const { dict } = useLanguage();

  const meta: { key: string; label: string; value: string }[] = [
    { key: "owner", label: dict.identityDetail.metaOwner, value: identity.owner ?? dict.identities.unassigned },
    { key: "system", label: dict.identityDetail.metaSystem, value: identity.system },
    { key: "environment", label: dict.identityDetail.metaEnvironment, value: identity.environment },
    { key: "permission", label: dict.identityDetail.metaPermission, value: identity.permissionLevel },
    { key: "created", label: dict.identityDetail.metaCreated, value: formatDate(identity.createdDate) },
    { key: "lastUsed", label: dict.identityDetail.metaLastUsed, value: formatDate(identity.lastUsedDate) },
    { key: "hasExpiration", label: dict.identityDetail.metaHasExpiration, value: identity.hasExpiration ? dict.identityDetail.yes : dict.identityDetail.no },
    { key: "shared", label: dict.identityDetail.metaShared, value: identity.isShared ? dict.identityDetail.yes : dict.identityDetail.no },
    { key: "documented", label: dict.identityDetail.metaDocumented, value: identity.hasDocumentation ? dict.identityDetail.yes : dict.identityDetail.no },
    { key: "secretExposed", label: dict.identityDetail.metaSecretExposed, value: identity.secretExposed ? dict.identityDetail.yes : dict.identityDetail.no },
  ];

  return (
    <>
      <Topbar title={identity.name} subtitle={`${identity.type} · ${identity.id}`} />
      <main className="flex-1 space-y-6 p-6">
        <Link
          href="/identities"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-500 hover:text-ink-300"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> {dict.identityDetail.backToInventory}
        </Link>

        <div className="grid gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>{dict.identityDetail.riskScore}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-3 py-4">
              <div className="font-mono text-5xl font-semibold text-ink-50 font-tabular">{assessment.score}</div>
              <RiskBadge severity={assessment.severity} />
              <div className="mt-2 flex flex-wrap justify-center gap-2">
                <StatusBadge status={identity.status} />
                <RotationBadge status={getRotationStatus(identity.daysSinceRotation)} />
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>{dict.identityDetail.identityDetails}</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3">
                {meta.map((m) => (
                  <div key={m.key}>
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
              <CardTitle>{dict.identityDetail.riskFindings(assessment.findings.length)}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {assessment.findings.length === 0 ? (
                <p className="flex items-center gap-2 text-sm text-low-ink">
                  <CheckCircle2 className="h-4 w-4" /> {dict.identityDetail.noRiskFactors}
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
              <CardTitle>{dict.identityDetail.recommendedRemediation}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {assessment.recommendations.length === 0 ? (
                <p className="text-sm text-ink-500">{dict.identityDetail.noRemediationNeeded}</p>
              ) : (
                assessment.recommendations.map((r) => (
                  <div
                    key={r}
                    className="flex items-center gap-2 rounded-lg border border-ink-800 bg-ink-950/60 p-3 text-sm text-ink-300"
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-accent-ink" />
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
