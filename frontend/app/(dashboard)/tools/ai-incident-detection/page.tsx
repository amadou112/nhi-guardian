"use client";

import { Siren } from "lucide-react";
import { CapabilityPage } from "@/components/tools/CapabilityPage";
import { CapabilityDashboard } from "@/components/tools/CapabilityDashboard";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export default function AiIncidentDetectionPage() {
  const { dict } = useLanguage();
  const t = dict.tools.aiIncidents;
  const c = dict.tools.common;

  return (
    <CapabilityPage
      title={t.title}
      subtitle={t.subtitle}
      icon={Siren}
      description={t.description}
      capabilitiesLabel={c.capabilitiesLabel}
      capabilities={t.capabilities}
      dashboardLabel={c.dashboardLabel}
      tieInLabel={c.tieInLabel}
      tieIn={t.tieIn}
      mockLabel={c.mockLabel}
    >
      <CapabilityDashboard
        kpis={t.kpis}
        tableTitle={t.tableTitle}
        tableCols={t.tableCols}
        tableRows={t.tableRows}
      />
    </CapabilityPage>
  );
}
