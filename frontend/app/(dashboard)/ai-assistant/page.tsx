import { Topbar } from "@/components/layout/Topbar";
import { ChatWindow } from "@/components/ai/ChatWindow";

export default function AiAssistantPage() {
  return (
    <>
      <Topbar
        title="AI Security Analyst"
        subtitle="Local mock AI mode — swap in the OpenAI-backed /analyze endpoint for live inference"
      />
      <ChatWindow />
    </>
  );
}
