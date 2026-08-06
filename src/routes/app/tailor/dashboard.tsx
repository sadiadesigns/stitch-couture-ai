import { createFileRoute, Link } from "@tanstack/react-router";
import { Package, Loader2, CheckCircle2, CalendarDays, Wallet, Star, ArrowRight } from "lucide-react";
import { TailorShell } from "@/components/web/nav";
import { PageTitle } from "@/components/web/WebShell";
import { StatCard, Panel, Pill, statusTone } from "@/components/web/kit";
import { orders, appointments, revenueSeries } from "@/lib/web-data";
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export const Route = createFileRoute("/app/tailor/dashboard")({
  head: () => ({
    meta: [
      { title: "Tailor Dashboard — Stitch Workspace" },
      { name: "description", content: "Track orders, appointments, earnings and ratings from your Stitch tailor dashboard." },
      { property: "og:title", content: "Tailor Dashboard — Stitch Workspace" },
      { property: "og:description", content: "Track orders, appointments, earnings and ratings from your Stitch tailor dashboard." },
    ],
  }),
  component: TailorDashboard,
});

function TailorDashboard() {
  const inProgress = orders.filter((o) => ["Accepted", "Measurement Completed", "Tailoring Started", "Quality Check"].includes(o.stage));
  const completed = orders.filter((o) => o.stage === "Delivered");
  const upcoming = appointments.filter((a) => a.status !== "Completed").slice(0, 4);

  return (
    <TailorShell>
      <PageTitle
        title="Rise and shine, Arjun"
        subtitle="Here's how your studio is performing this month."
        action={
          <Link to="/app/tailor/orders" className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90">
            View orders <ArrowRight className="h-4 w-4" />
          </Link>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard icon={Wallet} label="Monthly earnings" value="$4,280" delta="+18% vs last month" accent />
        <StatCard icon={Package} label="Total orders" value={String(orders.length * 12)} delta="24 this month" />
        <StatCard icon={Loader2} label="In progress" value={String(inProgress.length)} delta="2 due this week" />
        <StatCard icon={CheckCircle2} label="Completed" value={String(completed.length * 9)} delta="98% on-time rate" />
        <StatCard icon={CalendarDays} label="Upcoming appointments" value={String(upcoming.length)} delta="Next: today 10:00 AM" />
        <StatCard icon={Star} label="Customer rating" value="4.9" delta="from 412 reviews" />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[2fr_1fr]">
        <Panel title="Earnings trend" action={<Pill tone="brand">Last 7 months</Pill>}>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueSeries} margin={{ left: -18, right: 6, top: 6 }}>
                <defs>
                  <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} stroke="var(--muted-foreground)" />
                <YAxis tickLine={false} axisLine={false} fontSize={12} stroke="var(--muted-foreground)" />
                <Tooltip contentStyle={{ borderRadius: 16, border: "1px solid var(--border)" }} />
                <Area type="monotone" dataKey="revenue" stroke="var(--primary)" strokeWidth={2.5} fill="url(#grad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel title="Upcoming appointments" action={<Link to="/app/tailor/appointments" className="text-sm font-semibold text-primary">All</Link>}>
          <ul className="space-y-3">
            {upcoming.map((a) => (
              <li key={a.id} className="rounded-2xl border border-border/60 p-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-sm font-semibold">{a.customer}</p>
                  <Pill tone={statusTone(a.status)}>{a.status}</Pill>
                </div>
                <p className="mt-1 truncate text-xs text-muted-foreground">{a.address}</p>
                <p className="mt-1 text-xs font-medium">{a.date} · {a.time} · {a.assistant}</p>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <div className="mt-6">
        <Panel title="Recent activity" action={<Link to="/app/tailor/orders" className="text-sm font-semibold text-primary">View all orders</Link>}>
          <ul className="divide-y divide-border">
            {orders.slice(0, 5).map((o) => (
              <li key={o.id} className="flex flex-wrap items-center gap-3 py-3">
                <img src={o.preview} alt="" className="h-11 w-11 rounded-xl object-cover" />
                <div className="min-w-0 flex-1">
                  <Link to="/app/tailor/orders/$id" params={{ id: o.id }} className="truncate text-sm font-semibold hover:text-primary">
                    {o.item}
                  </Link>
                  <p className="truncate text-xs text-muted-foreground">{o.customer} · {o.id} · due {o.due}</p>
                </div>
                <Pill tone={statusTone(o.stage)}>{o.stage}</Pill>
                <span className="w-20 text-right text-sm font-semibold">${o.amount}</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </TailorShell>
  );
}
