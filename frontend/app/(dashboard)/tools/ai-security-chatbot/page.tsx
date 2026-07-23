"use client";

import { MessageCircle } from "lucide-react";
import { CapabilityPage } from "@/components/tools/CapabilityPage";
import { CapabilityDashboard } from "@/components/tools/CapabilityDashboard";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export default function AiSecurityChatbotPage() {
  const { dict } = useLanguage();
  const t = dict.tools.aiChatbot;
  const c = dict.tools.common;

  return (
    <CapabilityPage
      title={t.title}
      subtitle={t.subtitle}
      icon={MessageCircle}
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
