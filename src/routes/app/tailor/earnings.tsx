import { createFileRoute } from "@tanstack/react-router";
import { Wallet, TrendingUp, Percent, Clock, CheckCircle2 } from "lucide-react";
import { TailorShell } from "@/components/web/nav";
import { PageTitle } from "@/components/web/WebShell";
import { StatCard, Panel, Pill, statusTone } from "@/components/web/kit";
import { revenueSeries, payouts } from "@/lib/web-data";
import { BarChart, Bar, LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export const Route = createFileRoute("/app/tailor/earnings")({
  head: () => ({
    meta: [
      { title: "Earnings — Stitch Tailor Workspace" },
      { name: "description", content: "Revenue, commission, pending and completed payments for your tailoring studio." },
      { property: "og:title", content: "Earnings — Stitch Tailor Workspace" },
      { property: "og:description", content: "Revenue, commission, pending and completed payments for your tailoring studio." },
    ],
  }),
  component: EarningsPage,
});

function EarningsPage() {
  return (
    <TailorShell>
      <PageTitle title="Earnings" subtitle="Payouts, commission and revenue analytics" />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard icon={TrendingUp} label="Revenue (YTD)" value="$188,800" delta="+22% YoY" accent />
        <StatCard icon={Wallet} label="Monthly earnings" value="$4,280" delta="August 2026" />
        <StatCard icon={Percent} label="Commission deducted" value="$642" delta="15% platform fee" />
        <StatCard icon={Clock} label="Pending payments" value="$2,960" delta="2 payouts queued" />
        <StatCard icon={CheckCircle2} label="Completed payments" value="$10,400" delta="last 30 days" />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <Panel title="Monthly revenue">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueSeries} margin={{ left: -18, right: 6, top: 6 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} stroke="var(--muted-foreground)" />
                <YAxis tickLine={false} axisLine={false} fontSize={12} stroke="var(--muted-foreground)" />
                <Tooltip contentStyle={{ borderRadius: 16, border: "1px solid var(--border)" }} />
                <Bar dataKey="revenue" fill="var(--primary)" radius={[10, 10, 4, 4]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>
        <Panel title="Orders completed">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueSeries} margin={{ left: -18, right: 6, top: 6 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} stroke="var(--muted-foreground)" />
                <YAxis tickLine={false} axisLine={false} fontSize={12} stroke="var(--muted-foreground)" />
                <Tooltip contentStyle={{ borderRadius: 16, border: "1px solid var(--border)" }} />
                <Line type="monotone" dataKey="orders" stroke="var(--primary)" strokeWidth={2.5} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Panel>
      </div>

      <div className="mt-6">
        <Panel title="Transaction history">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="py-3 pr-4 font-semibold">Transaction</th>
                  <th className="py-3 pr-4 font-semibold">Type</th>
                  <th className="py-3 pr-4 font-semibold">Date</th>
                  <th className="py-3 pr-4 font-semibold">Status</th>
                  <th className="py-3 text-right font-semibold">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {payouts.map((p) => (
                  <tr key={p.id} className="hover:bg-secondary/50">
                    <td className="py-3 pr-4 font-semibold">{p.id}</td>
                    <td className="py-3 pr-4 text-muted-foreground">{p.type}</td>
                    <td className="py-3 pr-4 text-muted-foreground">{p.date}</td>
                    <td className="py-3 pr-4"><Pill tone={statusTone(p.status)}>{p.status}</Pill></td>
                    <td className="py-3 text-right font-semibold">${Math.abs(p.amount).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      </div>
    </TailorShell>
  );
}
