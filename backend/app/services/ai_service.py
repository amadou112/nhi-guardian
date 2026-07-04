"""AI Security Analyst service.

Runs in local rule-based "mock AI" mode by default so the project works
with zero API keys. If an OPENAI_API_KEY environment variable is present,
this is the place to route questions to a real LLM (e.g. via the OpenAI
SDK or LangChain) instead of the rule-based fallback below. Mirrors
frontend/lib/aiService.ts.
"""

import os

from app.models.identity import NonHumanIdentity
from app.services.risk_engine import assess_all, assess_identity, days_since
from app.services.report_service import generate_executive_report

AI_MODE = "openai" if os.getenv("OPENAI_API_KEY") else "mock"


def _find_identity_by_name(identities: list[NonHumanIdentity], query: str) -> NonHumanIdentity | None:
    q = query.lower()
    for identity in identities:
        if identity.name.lower() in q:
            return identity
    for identity in identities:
        for word in identity.name.lower().split("-"):
            if len(word) > 3 and word in q:
                return identity
    return None


def _answer_highest_risk(identities: list[NonHumanIdentity]) -> str:
    assessments = {a.identity_id: a for a in assess_all(identities)}
    ranked = sorted(identities, key=lambda i: assessments[i.id].score, reverse=True)[:5]
    lines = []
    for idx, identity in enumerate(ranked, start=1):
        a = assessments[identity.id]
        top_factor = a.findings[0].factor if a.findings else "N/A"
        lines.append(f"{idx}. {identity.name} ({identity.system.value}) — Risk score {a.score}/100, {a.severity.value}. Top factor: {top_factor}.")
    return "Here are the highest-risk non-human identities right now:\n\n" + "\n".join(lines)


def _answer_explain(identities: list[NonHumanIdentity], query: str) -> str:
    identity = _find_identity_by_name(identities, query)
    if not identity:
        return (
            "I couldn't match that to a specific identity in the inventory. Try asking, for example: "
            "\"Explain why aws-root-automation-key is critical.\""
        )
    a = assess_identity(identity)
    factor_lines = "\n".join(f"- {f.factor} (+{f.weight}): {f.description}" for f in a.findings) or "- No significant risk factors found."
    recs = ", ".join(a.recommendations) or "None — this identity is well managed."
    return (
        f"{identity.name} ({identity.type.value} on {identity.system.value}) scores {a.score}/100 — "
        f"{a.severity.value} risk.\n\nContributing factors:\n{factor_lines}\n\nRecommended actions: {recs}."
    )


def _answer_remediation_plan(identities: list[NonHumanIdentity]) -> str:
    report = generate_executive_report(identities)
    phases = []
    for phase in report["remediation_roadmap"]:
        actions = "\n".join(f"- {a}" for a in phase["actions"])
        phases.append(f"{phase['phase']} ({phase['timeframe']})\n{actions}")
    return "Here's a prioritized remediation plan based on the current inventory:\n\n" + "\n\n".join(phases)


def _answer_executive_summary(identities: list[NonHumanIdentity]) -> str:
    report = generate_executive_report(identities)
    return f"{report['summary']}\n\n{report['business_impact']}"


def _answer_fix_first(identities: list[NonHumanIdentity]) -> str:
    report = generate_executive_report(identities)
    lines = []
    for idx, f in enumerate(report["top_findings"], start=1):
        rec = f["assessment"]["recommendations"][0] if f["assessment"]["recommendations"] else "Review manually"
        lines.append(f"{idx}. {f['identity']['name']} — {f['assessment']['severity']} (score {f['assessment']['score']}). Fix: {rec}.")
    return "Based on current risk scores, prioritize these first:\n\n" + "\n".join(lines)


def _answer_stale(identities: list[NonHumanIdentity]) -> str:
    stale = [i for i in identities if days_since(i.last_used_date) > 180]
    if not stale:
        return "No identities are currently stale beyond the 180-day threshold."
    stale.sort(key=lambda i: days_since(i.last_used_date), reverse=True)
    lines = [f"- {i.name} — last used {i.last_used_date} ({days_since(i.last_used_date)} days ago)" for i in stale]
    return f"{len(stale)} identities have not been used in over 180 days:\n\n" + "\n".join(lines) + "\n\nThese are candidates for disablement."


def _answer_default(identities: list[NonHumanIdentity]) -> str:
    critical = sum(1 for a in assess_all(identities) if a.severity.value == "Critical")
    return (
        "I'm the NHI Guardian AI Security Analyst (local mock mode). I can help with questions like:\n\n"
        "- \"Which identities are highest risk?\"\n"
        "- \"Explain why <identity-name> is critical.\"\n"
        "- \"Generate a remediation plan.\"\n"
        "- \"Write an executive risk summary.\"\n"
        "- \"What should we fix first?\"\n"
        "- \"Which identities are stale or orphaned?\"\n\n"
        f"Right now the inventory has {len(identities)} identities, {critical} of which are Critical risk."
    )


def ask_ai_analyst(question: str, identities: list[NonHumanIdentity]) -> str:
    q = question.lower()

    if "highest risk" in q or "most risky" in q or "top risk" in q:
        return _answer_highest_risk(identities)
    if "explain" in q or "why" in q:
        return _answer_explain(identities, q)
    if "remediation" in q or "plan" in q:
        return _answer_remediation_plan(identities)
    if "executive" in q or "summary" in q:
        return _answer_executive_summary(identities)
    if "fix first" in q or "prioritize" in q or "priority" in q:
        return _answer_fix_first(identities)
    if "stale" in q or "orphan" in q:
        return _answer_stale(identities)
    return _answer_default(identities)
