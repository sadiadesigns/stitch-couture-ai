import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, TrendingUp, Package, Calendar, MessageSquare, DollarSign, Star } from "lucide-react";
import { tailors } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard/tailor")({
  head: () => ({
    meta: [
      { title: "Tailor dashboard — Stitch" },
      { name: "description", content: "Manage your Stitch tailor profile, portfolio, orders, and earnings." },
    ],
  }),
  component: TailorDash,
});

function TailorDash() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-md min-h-screen pb-10">
        <header className="px-6 pt-14 flex items-center gap-3">
          <Link to="/profile" className="w-10 h-10 rounded-full bg-secondary grid place-items-center"><ChevronLeft className="w-5 h-5" /></Link>
          <div className="flex-1">
            <p className="text-xs text-muted-foreground">Welcome back</p>
            <h1 className="text-xl font-bold">Arjun's Studio</h1>
          </div>
          <img src={tailors[0].photo} alt="" className="w-10 h-10 rounded-full object-cover" />
        </header>

        <div className="px-6 mt-6">
          <div className="rounded-[28px] bg-primary text-primary-foreground p-6 shadow-[var(--shadow-glow)]">
            <p className="text-xs uppercase tracking-wider opacity-80">This month</p>
            <p className="text-4xl font-bold mt-1">$4,280</p>
            <div className="flex items-center gap-1 mt-1 text-sm opacity-90">
              <TrendingUp className="w-4 h-4" /> +18% vs last month
            </div>
            <div className="grid grid-cols-3 gap-2 mt-5">
              {[
                { v: "24", l: "Orders" },
                { v: "4.9", l: "Rating" },
                { v: "18", l: "New" },
              ].map((s) => (
                <div key={s.l} className="bg-white/15 backdrop-blur rounded-xl p-2.5 text-center">
                  <p className="font-bold">{s.v}</p>
                  <p className="text-[10px] uppercase opacity-80">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="px-6 mt-6 grid grid-cols-4 gap-3">
          {[
            { icon: Package, label: "Orders" },
            { icon: Calendar, label: "Calendar" },
            { icon: MessageSquare, label: "Chats" },
            { icon: DollarSign, label: "Payouts" },
          ].map((a) => (
            <button key={a.label} className="flex flex-col items-center gap-1.5 p-3 rounded-2xl bg-secondary hover:bg-accent">
              <a.icon className="w-5 h-5 text-primary" />
              <span className="text-[11px] font-medium">{a.label}</span>
            </button>
          ))}
        </div>

        <section className="px-6 mt-8">
          <h3 className="text-lg font-bold mb-3">Active orders</h3>
          <div className="space-y-3">
            {[
              { id: "STC-2418", item: "Magenta silk suit", client: "Alex C.", due: "Nov 3", pct: 60 },
              { id: "STC-2415", item: "Cream kurta set", client: "Kabir R.", due: "Oct 30", pct: 85 },
              { id: "STC-2409", item: "Navy blazer", client: "Priya M.", due: "Nov 8", pct: 25 },
            ].map((o) => (
              <div key={o.id} className="bg-card p-4 rounded-2xl border border-border/50">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-semibold text-sm">{o.item}</p>
                    <p className="text-xs text-muted-foreground">{o.client} · {o.id}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">Due {o.due}</span>
                </div>
                <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: `${o.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="px-6 mt-8">
          <h3 className="text-lg font-bold mb-3">Recent reviews</h3>
          <div className="bg-card p-4 rounded-2xl border border-border/50">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-bold text-sm">4.9</span>
              <span className="text-xs text-muted-foreground">from 412 reviews</span>
            </div>
            <p className="text-sm text-muted-foreground">"Perfect fit, delivered on time. Would recommend!"</p>
            <p className="text-xs mt-2 font-medium">— Priya M.</p>
          </div>
        </section>
      </div>
    </div>
  );
}
