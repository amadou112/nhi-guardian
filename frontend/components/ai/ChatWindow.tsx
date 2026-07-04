"use client";

import { FormEvent, useRef, useState } from "react";
import { Bot, Send, Sparkles, User } from "lucide-react";
import { askAiAnalyst, SUGGESTED_QUESTIONS } from "@/lib/aiService";
import { identities } from "@/data/identities";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  text: string;
}

const INTRO: Message = {
  role: "assistant",
  text:
    "Hi, I'm the NHI Guardian AI Security Analyst (running in local mock mode). Ask me about your " +
    "highest-risk identities, request an executive summary, or ask for a remediation plan.",
};

function renderText(text: string) {
  return text.split("\n").map((line, i) => {
    const parts = line.split(/(\*\*[^*]+\*\*)/g);
    return (
      <p key={i} className={line.trim() === "" ? "h-2" : ""}>
        {parts.map((part, j) =>
          part.startsWith("**") && part.endsWith("**") ? (
            <strong key={j} className="text-ink-100">
              {part.slice(2, -2)}
            </strong>
          ) : (
            <span key={j}>{part}</span>
          )
        )}
      </p>
    );
  });
}

export function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([INTRO]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  function ask(question: string) {
    if (!question.trim()) return;
    setMessages((prev) => [...prev, { role: "user", text: question }]);
    setInput("");
    setThinking(true);
    setTimeout(() => {
      const answer = askAiAnalyst(question, identities);
      setMessages((prev) => [...prev, { role: "assistant", text: answer.text }]);
      setThinking(false);
      setTimeout(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
    }, 500);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    ask(input);
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col">
      <div className="flex-1 space-y-4 overflow-y-auto p-6">
        {messages.map((m, i) => (
          <div
            key={i}
            className={cn("flex gap-3", m.role === "user" ? "flex-row-reverse" : "flex-row")}
          >
            <div
              className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                m.role === "user" ? "bg-ink-800 text-ink-300" : "bg-accent-500/15 text-accent-400"
              )}
            >
              {m.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
            </div>
            <div
              className={cn(
                "max-w-2xl space-y-1 rounded-xl border px-4 py-3 text-sm leading-relaxed",
                m.role === "user"
                  ? "border-ink-700 bg-ink-800 text-ink-100"
                  : "border-ink-800 bg-ink-900/70 text-ink-300"
              )}
            >
              {renderText(m.text)}
            </div>
          </div>
        ))}
        {thinking && (
          <div className="flex items-center gap-2 pl-11 text-xs text-ink-500">
            <Sparkles className="h-3.5 w-3.5 animate-pulse text-accent-400" />
            Analyzing identity inventory…
          </div>
        )}
        <div ref={endRef} />
      </div>

      <div className="border-t border-ink-800 p-4">
        <div className="mb-3 flex flex-wrap gap-2">
          {SUGGESTED_QUESTIONS.map((q) => (
            <button
              key={q}
              onClick={() => ask(q)}
              className="rounded-full border border-ink-800 bg-ink-900 px-3 py-1.5 text-xs text-ink-400 hover:border-accent-800 hover:text-accent-300"
            >
              {q}
            </button>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask the AI Security Analyst about your non-human identities…"
            className="flex-1 rounded-lg border border-ink-800 bg-ink-950 px-4 py-2.5 text-sm text-ink-200 placeholder:text-ink-600 focus:outline-none focus:ring-1 focus:ring-accent-700"
          />
          <Button type="submit" disabled={!input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
