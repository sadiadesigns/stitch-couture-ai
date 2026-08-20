import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileShell, PageHeader } from "@/components/MobileShell";
import { tailors, orderStages, orderPayments } from "@/lib/mock-data";
import { ChevronRight } from "lucide-react";

export const Route = createFileRoute("/orders/")({
  head: () => ({
    meta: [
      { title: "Your orders — Stitch" },
      { name: "description", content: "Track every stage of your Stitch tailoring orders in real time." },
    ],
  }),
  component: OrdersList,
});

const orders = [
  { id: "STC-2418", tailor: tailors[0], item: "Magenta silk suit", stage: 4, eta: "Nov 3" },
  { id: "STC-2410", tailor: tailors[1], item: "Ivory bridal lehenga", stage: 2, eta: "Nov 10" },
  { id: "STC-2401", tailor: tailors[2], item: "Navy 2-piece blazer", stage: 7, eta: "Delivered" },
];

function OrdersList() {
  return (
    <MobileShell>
      <PageHeader title="Your orders" subtitle="Track every stitch, live" />

      <div className="px-6 flex gap-2 mb-4">
        {["Active", "Completed", "Cancelled"].map((t, i) => (
          <button key={t} className={`px-5 h-10 rounded-full text-sm font-semibold ${i === 0 ? "bg-foreground text-background" : "bg-secondary"}`}>
            {t}
          </button>
        ))}
      </div>

      <div className="px-6 space-y-4">
        {orders.map((o) => {
          const pct = Math.round(((o.stage + 1) / orderStages.length) * 100);
          return (
            <Link
              key={o.id}
              to="/orders/$id"
              params={{ id: o.id }}
              className="block bg-card rounded-[28px] p-5 shadow-[var(--shadow-soft)] border border-border/50 active:scale-[0.99] transition"
            >
              <div className="flex items-start gap-4">
                <img src={o.tailor.photo} alt="" className="w-14 h-14 rounded-2xl object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">{o.id}</p>
                  <p className="font-bold truncate">{o.item}</p>
                  <p className="text-xs text-muted-foreground">by {o.tailor.name}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-primary">{orderStages[o.stage]}</span>
                  <span className="text-xs text-muted-foreground">ETA {o.eta}</span>
                </div>
                <div className="h-2 rounded-full bg-secondary overflow-hidden">
                  <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${pct}%` }} />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </MobileShell>
  );
}
