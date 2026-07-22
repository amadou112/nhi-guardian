"use client";

import Link from "next/link";
import {
  KeyRound,
  ShieldAlert,
  CalendarClock,
  Crown,
  RotateCcw,
  UserX,
  CloudCog,
  ArrowRight,
} from "lucide-react";
import { Topbar } from "@/components/layout/Topbar";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { RiskDistributionChart } from "@/components/dashboard/RiskDistributionChart";
import { SystemExposureChart } from "@/components/dashboard/SystemExposureChart";
import { IdentityTable } from "@/components/identities/IdentityTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { DuotoneImage } from "@/components/ui/DuotoneImage";
import { identities } from "@/data/identities";
import { assessIdentity } from "@/lib/riskEngine";
import { daysSince } from "@/lib/utils";
import { RiskSeverity, SystemName } from "@/lib/types";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export default function DashboardPage() {
  const { dict } = useLanguage();
  const assessed = identities.map((identity) => ({
    identity,
    assessment: assessIdentity(identity),
  }));

  const total = identities.length;
  const critical = assessed.filter((r) => r.assessment.severity === "Critical").length;
  const noExpiration = identities.filter((i) => !i.hasExpiration).length;
  const overprivileged = identities.filter(
    (i) => i.permissionLevel === "Admin" || i.permissionLevel === "Owner"
  ).length;
  const rotationOverdue = identities.filter(
    (i) => i.daysSinceRotation === null || i.daysSinceRotation > 90
  ).length;
  const orphaned = identities.filter((i) => !i.owner && daysSince(i.lastUsedDate) > 180).length;
  const cloudExposure = assessed.filter(
    (r) =>
      ["AWS", "Azure", "Kubernetes"].includes(r.identity.system) &&
      r.identity.environment === "Production" &&
      (r.assessment.severity === "Critical" || r.assessment.severity === "High")
  ).length;

  const severityCounts: Record<RiskSeverity, number> = {
    Critical: 0,
    High: 0,
    Medium: 0,
    Low: 0,
  };
  assessed.forEach((r) => severityCounts[r.assessment.severity]++);

  const systemCounts = new Map<SystemName, number>();
  identities.forEach((i) => systemCounts.set(i.system, (systemCounts.get(i.system) ?? 0) + 1));
  const systemChartData = Array.from(systemCounts.entries()).map(([system, count]) => ({
    system,
    count,
  }));

  const topRisk = [...assessed].sort((a, b) => b.assessment.score - a.assessment.score).slice(0, 8);

  return (
    <>
      <Topbar title={dict.dashboard.title} subtitle={dict.dashboard.subtitle} />
      <main className="flex-1 space-y-6 p-6">
        <Card className="relative flex h-28 items-center overflow-hidden px-6">
          <DuotoneImage
            src="/datacenter-network.webp"
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 896px"
            className="absolute inset-0"
            imgClassName="object-cover"
            intensity="strong"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#08070c] via-[#08070c]/80 to-[#08070c]/20" />
          <p className="relative max-w-lg text-sm text-slate-300">{dict.dashboard.banner(total)}</p>
        </Card>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <KpiCard label={dict.dashboard.kpiTotal} value={total} icon={KeyRound} tone="accent" />
          <KpiCard label={dict.dashboard.kpiCritical} value={critical} icon={ShieldAlert} tone="critical" />
          <KpiCard
            label={dict.dashboard.kpiNoExpiration}
            value={noExpiration}
            icon={CalendarClock}
            tone="high"
          />
          <KpiCard label={dict.dashboard.kpiOverprivileged} value={overprivileged} icon={Crown} tone="high" />
          <KpiCard
            label={dict.dashboard.kpiNoRotation}
            value={rotationOverdue}
            icon={RotateCcw}
            tone="critical"
          />
          <KpiCard label={dict.dashboard.kpiOrphaned} value={orphaned} icon={UserX} tone="ink" />
          <KpiCard
            label={dict.dashboard.kpiCloudExposure}
            value={cloudExposure}
            icon={CloudCog}
            tone="medium"
          />
          <KpiCard
            label={dict.dashboard.kpiHealthy}
            value={severityCounts.Low}
            icon={ShieldAlert}
            tone="low"
          />
        </div>

        <div className="grid gap-4 lg:grid-cols-5">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>{dict.dashboard.riskDistribution}</CardTitle>
            </CardHeader>
            <CardContent>
              <RiskDistributionChart data={severityCounts} />
            </CardContent>
          </Card>
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>{dict.dashboard.identitiesBySystem}</CardTitle>
            </CardHeader>
            <CardContent>
              <SystemExposureChart data={systemChartData} />
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{dict.dashboard.highestRisk}</CardTitle>
            <Link
              href="/identities"
              className="flex items-center gap-1 text-xs font-medium text-accent-ink transition-colors hover:opacity-80"
            >
              {dict.dashboard.viewFullInventory} <ArrowRight className="h-3 w-3" />
            </Link>
          </CardHeader>
          <CardContent className="px-0 sm:px-0">
            <IdentityTable rows={topRisk} compact />
          </CardContent>
        </Card>
      </main>
    </>
  );
}
