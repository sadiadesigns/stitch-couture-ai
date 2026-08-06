import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/web/nav";
import { PageTitle } from "@/components/web/WebShell";
import { StatCard, Panel } from "@/components/web/kit";
import { revenueSeries, categoryShare, customers } from "@/lib/web-data";
import { tailors } from "@/lib/mock-data";
import { DollarSign, Users, Repeat, TrendingUp } from "lucide-react";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend,
} from "recharts";

export const Route = createFileRoute("/app/admin/analytics")({
  head: () => ({
    meta: [
      { title: "Platform Analytics — Stitch Admin" },
      { name: "description", content: "Revenue, growth, category demand and top-performing tailors across Stitch." },
      { property: "og:title", content: "Platform Analytics — Stitch Admin" },
      { property: "og:description", content: "Revenue, growth, category demand and top-performing tailors across Stitch." },
    ],
  }),
  component: AnalyticsPage,
});

const SLICE = ["var(--primary)", "oklch(0.72 0.2 340)", "oklch(0.82 0.13 340)", "oklch(0.88 0.08 340)", "oklch(0.93 0.04 340)"];

function AnalyticsPage() {
  return (
    <AdminShell>
      <PageTitle title="Analytics" subtitle="Trends across revenue, demand and retention" />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={DollarSign} label="Revenue (YTD)" value="$248,400" delta="+22% YoY" accent />
        <StatCard icon={Users} label="New customers" value="662" delta="this month" />
        <StatCard icon={Repeat} label="Repeat rate" value="41%" delta="+4 pts" />
        <StatCard icon={TrendingUp} label="Avg order value" value="$164" delta="+$12" />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <Panel title="Revenue vs orders">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueSeries} margin={{ left: -18, right: 6, top: 6 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} stroke="var(--muted-foreground)" />
                <YAxis tickLine={false} axisLine={false} fontSize={12} stroke="var(--muted-foreground)" />
                <Tooltip contentStyle={{ borderRadius: 16, border: "1px solid var(--border)" }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="revenue" fill="var(--primary)" radius={[8, 8, 0, 0]} />
                <Bar dataKey="orders" fill="oklch(0.88 0.08 340)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel title="Category demand">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categoryShare} dataKey="value" nameKey="name" innerRadius={62} outerRadius={100} paddingAngle={3}>
                  {categoryShare.map((_, i) => <Cell key={i} fill={SLICE[i % SLICE.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 16, border: "1px solid var(--border)" }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel title="Customer growth">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueSeries} margin={{ left: -18, right: 6, top: 6 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} stroke="var(--muted-foreground)" />
                <YAxis tickLine={false} axisLine={false} fontSize={12} stroke="var(--muted-foreground)" />
                <Tooltip contentStyle={{ borderRadius: 16, border: "1px solid var(--border)" }} />
                <Line type="monotone" dataKey="orders" stroke="var(--primary)" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel title="Top tailors">
          <ul className="divide-y divide-border">
            {[...tailors].sort((a, b) => b.orders - a.orders).map((t, i) => (
              <li key={t.id} className="flex items-center gap-3 py-3">
                <span className="w-5 text-sm font-bold text-muted-foreground">{i + 1}</span>
                <img src={t.photo} alt="" className="h-10 w-10 rounded-xl object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.specialty} · {t.rating} ★</p>
                </div>
                <span className="text-sm font-semibold">{t.orders.toLocaleString()} orders</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-muted-foreground">Highest lifetime spend: {[...customers].sort((a, b) => b.spend - a.spend)[0]!.name}</p>
        </Panel>
      </div>
    </AdminShell>
  );
}
