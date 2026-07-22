"use client";

import { Activity } from "lucide-react";
import { CapabilityPage } from "@/components/tools/CapabilityPage";
import { CapabilityDashboard } from "@/components/tools/CapabilityDashboard";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export default function SiemPage() {
  const { dict } = useLanguage();
  const t = dict.tools.siem;
  const c = dict.tools.common;

  return (
    <CapabilityPage
      title={t.title}
      subtitle={t.subtitle}
      icon={Activity}
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
