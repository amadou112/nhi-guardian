"use client";

import { Topbar } from "@/components/layout/Topbar";
import { ChatWindow } from "@/components/ai/ChatWindow";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export default function AiAssistantPage() {
  const { dict } = useLanguage();
  return (
    <>
      <Topbar title={dict.aiAssistant.title} subtitle={dict.aiAssistant.subtitle} />
      <ChatWindow />
    </>
  );
}
