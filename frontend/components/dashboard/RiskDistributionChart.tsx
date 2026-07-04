"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { RiskSeverity } from "@/lib/types";

const COLORS: Record<RiskSeverity, string> = {
  Critical: "#f1495c",
  High: "#f2a93b",
  Medium: "#22c3b6",
  Low: "#4ade80",
};

export function RiskDistributionChart({ data }: { data: Record<RiskSeverity, number> }) {
  const chartData = (Object.keys(data) as RiskSeverity[]).map((severity) => ({
    name: severity,
    value: data[severity],
  }));

  return (
    <div className="flex items-center gap-6">
      <div className="h-44 w-44 shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={48}
              outerRadius={72}
              paddingAngle={3}
              stroke="none"
            >
              {chartData.map((entry) => (
                <Cell key={entry.name} fill={COLORS[entry.name as RiskSeverity]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: "#121019",
                border: "1px solid #262233",
                borderRadius: 8,
                fontSize: 12,
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="space-y-2">
        {chartData.map((entry) => (
          <div key={entry.name} className="flex items-center gap-2 text-sm">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ background: COLORS[entry.name as RiskSeverity] }}
            />
            <span className="text-ink-400">{entry.name}</span>
            <span className="ml-auto font-mono font-medium text-ink-200 font-tabular">{entry.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
