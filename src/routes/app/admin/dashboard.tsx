import { createFileRoute, Link } from "@tanstack/react-router";
import { Users, Scissors, Package, CheckCircle2, BadgeCheck, DollarSign, ArrowRight } from "lucide-react";
import { AdminShell } from "@/components/web/nav";
import { PageTitle } from "@/components/web/WebShell";
import { StatCard, Panel, Pill, statusTone } from "@/components/web/kit";
import { revenueSeries, orders, complaints, applications } from "@/lib/web-data";
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export const Route = createFileRoute("/app/admin/dashboard")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — Stitch Workspace" },
      { name: "description", content: "Platform-wide overview of customers, tailors, orders, verifications and revenue." },
      { property: "og:title", content: "Admin Dashboard — Stitch Workspace" },
      { property: "og:description", content: "Platform-wide overview of customers, tailors, orders, verifications and revenue." },
    ],
  }),
  component: AdminDashboard,
});

function AdminDashboard() {
  return (
    <AdminShell>
      <PageTitle
        title="Platform overview"
        subtitle="August 2026 · everything happening across Stitch"
        action={
          <Link to="/app/admin/analytics" className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90">
            Full analytics <ArrowRight className="h-4 w-4" />
          </Link>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard icon={DollarSign} label="Monthly revenue" value="$38,900" delta="+16% vs July" accent />
        <StatCard icon={Users} label="Total customers" value="9,204" delta="+662 this month" />
        <StatCard icon={Scissors} label="Total tailors" value="412" delta="38 joined this month" />
        <StatCard icon={Package} label="Active orders" value="187" delta="24 due this week" />
        <StatCard icon={CheckCircle2} label="Completed orders" value="1,842" delta="96% completion rate" />
        <StatCard icon={BadgeCheck} label="Pending verifications" value={String(applications.length)} delta="oldest 6 days" />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[2fr_1fr]">
        <Panel title="Revenue growth">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueSeries} margin={{ left: -18, right: 6, top: 6 }}>
                <defs>
                  <linearGradient id="adminGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} stroke="var(--muted-foreground)" />
                <YAxis tickLine={false} axisLine={false} fontSize={12} stroke="var(--muted-foreground)" />
                <Tooltip contentStyle={{ borderRadius: 16, border: "1px solid var(--border)" }} />
                <Area type="monotone" dataKey="revenue" stroke="var(--primary)" strokeWidth={2.5} fill="url(#adminGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel title="Open complaints" action={<Link to="/app/admin/complaints" className="text-sm font-semibold text-primary">All</Link>}>
          <ul className="space-y-3">
            {complaints.slice(0, 4).map((c) => (
              <li key={c.id} className="rounded-2xl border border-border/60 p-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-sm font-semibold">{c.subject}</p>
                  <Pill tone={statusTone(c.status)}>{c.status}</Pill>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{c.customer} · {c.opened}</p>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <div className="mt-6">
        <Panel title="Latest orders" action={<Link to="/app/admin/orders" className="text-sm font-semibold text-primary">Manage orders</Link>}>
          <ul className="divide-y divide-border">
            {orders.slice(0, 5).map((o) => (
              <li key={o.id} className="flex flex-wrap items-center gap-3 py-3">
                <img src={o.preview} alt="" className="h-11 w-11 rounded-xl object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{o.item}</p>
                  <p className="truncate text-xs text-muted-foreground">{o.customer} · {o.tailor} · {o.id}</p>
                </div>
                <Pill tone={statusTone(o.stage)}>{o.stage}</Pill>
                <span className="w-20 text-right text-sm font-semibold">${o.amount}</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </AdminShell>
  );
}
