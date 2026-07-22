import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge, BadgeTone } from "@/components/ui/Badge";

interface CapabilityDashboardProps {
  kpis: { label: string; value: string }[];
  tableTitle: string;
  tableCols: string[];
  tableRows: { cells: string[]; tone: BadgeTone }[];
}

// Renders the mock KPI + table dashboard shared by every capability-style
// tool page (SIEM, EDR, XDR, NDR, Pentest, DFIR, SASE/SSE, Encryption).
// The last column of each row is treated as the "status" cell and rendered
// as a badge in the row's tone; earlier columns render as plain text.
export function CapabilityDashboard({ kpis, tableTitle, tableCols, tableRows }: CapabilityDashboardProps) {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-3">
        {kpis.map((kpi) => (
          <Card key={kpi.label} className="p-5">
            <p className="text-xs font-medium uppercase tracking-wide text-ink-500">{kpi.label}</p>
            <p className="mt-2 font-mono text-2xl font-semibold text-ink-50 font-tabular">{kpi.value}</p>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{tableTitle}</CardTitle>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-y border-ink-800 text-left text-xs uppercase tracking-wide text-ink-500">
                  {tableCols.map((col) => (
                    <th key={col} className="px-5 py-3 font-medium">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-800/70">
                {tableRows.map((row, i) => (
                  <tr key={i} className="hover:bg-ink-900/50 transition-colors">
                    {row.cells.map((cell, j) => (
                      <td key={j} className="px-5 py-3 text-ink-300">
                        {j === row.cells.length - 1 ? <Badge tone={row.tone}>{cell}</Badge> : cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
