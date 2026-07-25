import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, Users, ShoppingBag, DollarSign, Shield, Check, X } from "lucide-react";
import { tailors } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard/admin")({
  head: () => ({
    meta: [
      { title: "Admin dashboard — Stitch" },
      { name: "description", content: "Admin console for approvals, orders, and platform analytics." },
    ],
  }),
  component: Admin,
});

function Admin() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-md min-h-screen pb-10">
        <header className="px-6 pt-14 flex items-center gap-3">
          <Link to="/profile" className="w-10 h-10 rounded-full bg-secondary grid place-items-center"><ChevronLeft className="w-5 h-5" /></Link>
          <div className="flex-1">
            <p className="text-xs text-muted-foreground">Overview</p>
            <h1 className="text-xl font-bold">Admin console</h1>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground grid place-items-center"><Shield className="w-4 h-4" /></div>
        </header>

        <div className="px-6 mt-6 grid grid-cols-2 gap-3">
          {[
            { icon: DollarSign, v: "$128k", l: "Revenue" },
            { icon: ShoppingBag, v: "1,842", l: "Orders" },
            { icon: Users, v: "9,204", l: "Customers" },
            { icon: Shield, v: "12", l: "Pending approvals", accent: true },
          ].map((s, i) => (
            <div key={i} className={`rounded-2xl p-4 ${s.accent ? "bg-primary text-primary-foreground" : "bg-secondary"}`}>
              <s.icon className={`w-5 h-5 ${s.accent ? "opacity-90" : "text-primary"}`} />
              <p className="text-2xl font-bold mt-2">{s.v}</p>
              <p className={`text-xs ${s.accent ? "opacity-80" : "text-muted-foreground"}`}>{s.l}</p>
            </div>
          ))}
        </div>

        <section className="px-6 mt-8">
          <h3 className="text-lg font-bold mb-3">Tailor approvals</h3>
          <div className="space-y-3">
            {tailors.map((t) => (
              <div key={t.id} className="bg-card p-3 rounded-2xl border border-border/50 flex items-center gap-3">
                <img src={t.photo} alt="" className="w-12 h-12 rounded-xl object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.specialty} · {t.experience}y exp</p>
                </div>
                <button className="w-9 h-9 rounded-full bg-secondary grid place-items-center"><X className="w-4 h-4" /></button>
                <button className="w-9 h-9 rounded-full bg-primary text-primary-foreground grid place-items-center"><Check className="w-4 h-4" strokeWidth={3} /></button>
              </div>
            ))}
          </div>
        </section>

        <section className="px-6 mt-8">
          <h3 className="text-lg font-bold mb-3">Quality flags</h3>
          <div className="bg-card p-4 rounded-2xl border border-border/50">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold">3 orders in QA review</p>
              <span className="text-xs bg-primary-soft text-primary px-2 py-1 rounded-full font-semibold">Review</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Awaiting final inspection before dispatch.</p>
          </div>
        </section>
      </div>
    </div>
  );
}
