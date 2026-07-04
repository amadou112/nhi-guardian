"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { IdentityTable } from "@/components/identities/IdentityTable";
import { NonHumanIdentity, RiskSeverity } from "@/lib/types";
import { assessIdentity } from "@/lib/riskEngine";

const SEVERITIES: (RiskSeverity | "All")[] = ["All", "Critical", "High", "Medium", "Low"];

export function IdentityInventoryClient({ identities }: { identities: NonHumanIdentity[] }) {
  const [search, setSearch] = useState("");
  const [severity, setSeverity] = useState<RiskSeverity | "All">("All");
  const [type, setType] = useState<string>("All");

  const types = useMemo(
    () => ["All", ...Array.from(new Set(identities.map((i) => i.type)))],
    [identities]
  );

  const rows = useMemo(() => {
    return identities
      .map((identity) => ({ identity, assessment: assessIdentity(identity) }))
      .filter(({ identity, assessment }) => {
        const matchesSearch =
          search.trim() === "" ||
          identity.name.toLowerCase().includes(search.toLowerCase()) ||
          (identity.owner ?? "").toLowerCase().includes(search.toLowerCase());
        const matchesSeverity = severity === "All" || assessment.severity === severity;
        const matchesType = type === "All" || identity.type === type;
        return matchesSearch && matchesSeverity && matchesType;
      })
      .sort((a, b) => b.assessment.score - a.assessment.score);
  }, [identities, search, severity, type]);

  return (
    <div>
      <div className="flex flex-col gap-3 border-b border-ink-800 p-4 sm:flex-row sm:items-center">
        <div className="flex flex-1 items-center gap-2 rounded-lg border border-ink-800 bg-ink-950 px-3 py-2">
          <Search className="h-4 w-4 text-ink-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by identity name or owner…"
            className="w-full bg-transparent text-sm text-ink-200 placeholder:text-ink-600 focus:outline-none"
          />
        </div>
        <select
          value={severity}
          onChange={(e) => setSeverity(e.target.value as RiskSeverity | "All")}
          className="rounded-lg border border-ink-800 bg-ink-950 px-3 py-2 text-sm text-ink-300 focus:outline-none"
        >
          {SEVERITIES.map((s) => (
            <option key={s} value={s}>
              {s === "All" ? "All Severities" : s}
            </option>
          ))}
        </select>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="rounded-lg border border-ink-800 bg-ink-950 px-3 py-2 text-sm text-ink-300 focus:outline-none"
        >
          {types.map((t) => (
            <option key={t} value={t}>
              {t === "All" ? "All Types" : t}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center justify-between px-4 py-2 text-xs text-ink-500">
        <span>
          Showing {rows.length} of {identities.length} identities
        </span>
      </div>
      <IdentityTable rows={rows} />
    </div>
  );
}
