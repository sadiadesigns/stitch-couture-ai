import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, Check, MessageCircle, Star } from "lucide-react";
import { orderStages, tailors, orderPayments } from "@/lib/mock-data";

export const Route = createFileRoute("/orders/$id")({
  head: ({ params }) => ({
    meta: [
      { title: `Order ${params.id} — Stitch` },
      { name: "description", content: `Track order ${params.id} on Stitch.` },
    ],
  }),
  component: OrderDetail,
});

const current = 4;
const times = [
  "Oct 18 · 09:12",
  "Oct 18 · 11:40",
  "Oct 20 · 10:15",
  "Oct 21 · 16:22",
  "Oct 23 · Now",
  "",
  "",
  "",
];

function OrderDetail() {
  const { id } = Route.useParams();
  const t = tailors[0];
  const pay = orderPayments[id];
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-md min-h-screen pb-32 relative">
        <header className="px-6 pt-14 flex items-center justify-between">
          <Link to="/orders" className="w-10 h-10 rounded-full bg-secondary grid place-items-center">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <p className="text-sm font-semibold">{id}</p>
          <button className="w-10 h-10 rounded-full bg-secondary grid place-items-center">
            <MessageCircle className="w-5 h-5" />
          </button>
        </header>

        <div className="px-6 mt-6">
          <div className="rounded-[28px] bg-primary text-primary-foreground p-6 shadow-[var(--shadow-glow)]">
            <p className="text-xs uppercase tracking-wider opacity-80">Current status</p>
            <p className="text-2xl font-bold mt-1">{orderStages[current]}</p>
            <p className="text-sm opacity-90 mt-1">Arjun is stitching your outfit with care.</p>
            <div className="mt-4 h-1.5 rounded-full bg-white/25 overflow-hidden">
              <div className="h-full bg-white rounded-full" style={{ width: `${((current + 1) / orderStages.length) * 100}%` }} />
            </div>
          </div>
        </div>

        <div className="px-6 mt-6">
          {pay && (
            <div className="bg-card rounded-2xl p-4 border border-border/50 mb-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold">Payment</p>
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold ${
                    pay.status === "Paid" ? "bg-emerald-500/12 text-emerald-600" : "bg-amber-500/15 text-amber-600"
                  }`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${pay.status === "Paid" ? "bg-emerald-500" : "bg-amber-500"}`} />
                  {pay.status === "Paid" ? "Paid" : "Pending"}
                </span>
              </div>
              <div className="mt-2 flex items-end justify-between">
                <p className="text-xs text-muted-foreground">{pay.method}</p>
                <p className="text-xl font-bold">${pay.amount}</p>
              </div>
              {pay.status === "Pending" && (
                <Link to="/checkout" className="mt-4 grid h-11 place-items-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                  Pay now
                </Link>
              )}
            </div>
          )}
          <div className="bg-card rounded-2xl p-4 flex items-center gap-3 border border-border/50">
            <img src={t.photo} alt="" className="w-12 h-12 rounded-xl object-cover" />
            <div className="flex-1">
              <p className="font-semibold text-sm">{t.name}</p>
              <p className="text-xs text-muted-foreground">{t.specialty}</p>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{t.rating}</span>
            </div>
          </div>
        </div>


        <section className="px-6 mt-8">
          <h3 className="text-lg font-bold mb-4">Progress timeline</h3>
          <div className="relative">
            <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-border" />
            <div className="space-y-5">
              {orderStages.map((s, i) => {
                const done = i <= current;
                const active = i === current;
                return (
                  <div key={s} className="flex gap-4 relative">
                    <div
                      className={`w-8 h-8 rounded-full grid place-items-center flex-shrink-0 z-10 ${
                        active
                          ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                          : done
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      {done ? <Check className="w-4 h-4" strokeWidth={3} /> : <span className="text-xs font-bold">{i + 1}</span>}
                    </div>
                    <div className="flex-1 pb-1">
                      <p className={`font-semibold text-sm ${!done && "text-muted-foreground"}`}>{s}</p>
                      {times[i] && <p className="text-xs text-muted-foreground mt-0.5">{times[i]}</p>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-sm z-50">
          <button className="w-full h-14 rounded-full bg-foreground text-background font-semibold shadow-[0_20px_60px_-15px_oklch(0_0_0/0.35)]">
            Contact tailor
          </button>
        </div>
      </div>
    </div>
  );
}
