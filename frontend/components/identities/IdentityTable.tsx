"use client";

import Link from "next/link";
import { NonHumanIdentity, RiskAssessment } from "@/lib/types";
import { RiskBadge } from "@/components/identities/RiskBadge";
import { StatusBadge, RotationBadge } from "@/components/identities/StatusBadge";
import { getRotationStatus } from "@/lib/riskEngine";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { UserX } from "lucide-react";

interface Row {
  identity: NonHumanIdentity;
  assessment: RiskAssessment;
}

export function IdentityTable({ rows, compact = false }: { rows: Row[]; compact?: boolean }) {
  const { dict } = useLanguage();

  if (rows.length === 0) {
    return (
      <div className="py-16 text-center text-sm text-ink-500">{dict.identities.noMatches}</div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-ink-800 text-left text-xs uppercase tracking-wide text-ink-500">
            <th className="px-4 py-3 font-medium">{dict.identities.colIdentity}</th>
            <th className="px-4 py-3 font-medium">{dict.identities.colSystem}</th>
            <th className="px-4 py-3 font-medium">{dict.identities.colEnvironment}</th>
            <th className="px-4 py-3 font-medium">{dict.identities.colOwner}</th>
            {!compact && <th className="px-4 py-3 font-medium">{dict.identities.colLastUsed}</th>}
            {!compact && <th className="px-4 py-3 font-medium">{dict.identities.colPermission}</th>}
            <th className="px-4 py-3 font-medium">{dict.identities.colRotation}</th>
            <th className="px-4 py-3 font-medium">{dict.identities.colRisk}</th>
            {!compact && <th className="px-4 py-3 font-medium">{dict.identities.colStatus}</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-ink-800/70">
          {rows.map(({ identity, assessment }) => (
            <tr key={identity.id} className="hover:bg-ink-900/50 transition-colors">
              <td className="px-4 py-3">
                <Link href={`/identities/${identity.id}`} className="block">
                  <p className="font-medium text-ink-200 hover:text-accent-ink">{identity.name}</p>
                  <p className="text-xs text-ink-500">{identity.type}</p>
                </Link>
              </td>
              <td className="px-4 py-3 text-ink-400">{identity.system}</td>
              <td className="px-4 py-3">
                <Badge tone={identity.environment === "Production" ? "critical" : "ink"}>
                  {identity.environment}
                </Badge>
              </td>
              <td className="px-4 py-3 text-ink-400">
                {identity.owner ?? (
                  <span className="inline-flex items-center gap-1 text-high-ink">
                    <UserX className="h-3.5 w-3.5" /> {dict.identities.unassigned}
                  </span>
                )}
              </td>
              {!compact && (
                <td className="px-4 py-3 text-ink-400">{formatDate(identity.lastUsedDate)}</td>
              )}
              {!compact && (
                <td className="px-4 py-3 text-ink-400">{identity.permissionLevel}</td>
              )}
              <td className="px-4 py-3">
                <RotationBadge status={getRotationStatus(identity.daysSinceRotation)} />
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <RiskBadge severity={assessment.severity} />
                  <span className="font-mono text-xs text-ink-500 font-tabular">{assessment.score}</span>
                </div>
              </td>
              {!compact && (
                <td className="px-4 py-3">
                  <StatusBadge status={identity.status} />
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
