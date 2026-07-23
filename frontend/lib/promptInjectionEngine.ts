// Rule-based scanner for the Prompt Injection Detection tool. Paste a
// prompt, user message, or chatbot input and it's checked against common
// prompt-injection and jailbreak patterns — the same transparent,
// explainable approach as lib/phishingEngine.ts.

export type PromptInjectionVerdict = "Critical" | "Suspicious" | "Clean";

export interface PromptInjectionFinding {
  factor: string;
  description: string;
  weight: number;
}

export interface PromptInjectionResult {
  score: number;
  verdict: PromptInjectionVerdict;
  findings: PromptInjectionFinding[];
  recommendations: string[];
}

export function scanPrompt(raw: string): PromptInjectionResult {
  const text = raw.toLowerCase();
  const findings: PromptInjectionFinding[] = [];
  const recommendations = new Set<string>();

  if (/ignore (all )?(previous|prior|the above)|disregard (all )?(previous|prior|the above)/.test(text)) {
    findings.push({
      factor: "Instruction Override Attempt",
      description: 'Contains language explicitly trying to override or discard prior system instructions.',
      weight: 30,
    });
    recommendations.add("Treat instruction-override phrases as untrusted input, never as new system instructions");
  }

  if (/you are now|act as (if )?|pretend (you are|to be)|you have no (restrictions|rules|limits)/.test(text)) {
    findings.push({
      factor: "Persona / Jailbreak Reframing",
      description: "Attempts to reassign the model a new unrestricted persona to bypass its safety configuration.",
      weight: 25,
    });
    recommendations.add("Pin the system persona server-side and ignore user-supplied persona reassignment");
  }

  if (/repeat (your|the) system prompt|print your (initial|system) prompt|what (are|were) your instructions/.test(text)) {
    findings.push({
      factor: "System Prompt Exfiltration Attempt",
      description: "Asks the model to reveal its confidential system prompt or configuration.",
      weight: 25,
    });
    recommendations.add("Never place secrets in a system prompt that could be disclosed if leaked");
  }

  if (/###\s*system|\[inst\]|<\|system\|>|<\|im_start\|>/.test(text)) {
    findings.push({
      factor: "Fake Delimiter / Role Injection",
      description: "Contains fabricated role or system delimiters designed to impersonate a trusted message segment.",
      weight: 25,
    });
    recommendations.add("Strip or escape role-delimiter tokens from untrusted user input before building the prompt");
  }

  if (/hypothetical(ly)?.{0,40}(no rules|no restrictions|anything goes)|in a fictional world where/.test(text)) {
    findings.push({
      factor: "Hypothetical Framing Bypass",
      description: "Uses a fictional or hypothetical framing device to try to bypass safety guidelines indirectly.",
      weight: 20,
    });
    recommendations.add("Apply safety filtering to model output regardless of fictional/hypothetical framing in the input");
  }

  if (/base64|decode this and (run|execute)|rot13/.test(text)) {
    findings.push({
      factor: "Encoded Payload Obfuscation",
      description: "References an encoded payload paired with an instruction to decode and execute it.",
      weight: 20,
    });
    recommendations.add("Decode and re-scan any encoded content before it reaches the model, don't trust it blindly");
  }

  if (/do anything now|\bdan\b mode|developer mode enabled/.test(text)) {
    findings.push({
      factor: "Known Jailbreak Persona Name",
      description: 'Matches a publicly documented jailbreak persona pattern (e.g. "DAN") used to bypass safety training.',
      weight: 30,
    });
    recommendations.add("Maintain an updated blocklist of known public jailbreak persona names");
  }

  const score = Math.min(100, findings.reduce((sum, f) => sum + f.weight, 0));
  const verdict: PromptInjectionVerdict = score >= 50 ? "Critical" : score >= 20 ? "Suspicious" : "Clean";

  if (findings.length === 0) {
    recommendations.add("No common prompt-injection patterns detected in this input");
  }
  recommendations.add("Always separate trusted system instructions from untrusted user input in the prompt structure");

  return { score, verdict, findings, recommendations: Array.from(recommendations) };
}
