import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Check, CreditCard, Smartphone, Wallet, Banknote, ShieldCheck, Tag, Loader2, ChevronRight,
} from "lucide-react";
import { MobileShell, PageHeader } from "@/components/MobileShell";
import { tailors } from "@/lib/mock-data";
import design1 from "@/assets/design-1.jpg";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Secure checkout — Stitch" },
      { name: "description", content: "Review your tailoring order and pay securely with card, UPI, wallet or cash on delivery." },
      { property: "og:title", content: "Secure checkout — Stitch" },
      { property: "og:description", content: "Review your tailoring order and pay securely with card, UPI, wallet or cash on delivery." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Checkout,
});

const methods = [
  { id: "card", label: "Visa •••• 4242", meta: "Expires 08/28", icon: CreditCard },
  { id: "upi", label: "UPI", meta: "alex@okbank", icon: Smartphone },
  { id: "wallet", label: "Stitch wallet", meta: "$64.00 balance", icon: Wallet },
  { id: "cod", label: "Pay on delivery", meta: "Cash or card at doorstep", icon: Banknote },
] as const;

const PROMOS: Record<string, number> = { STITCH10: 0.1, FIRSTFIT: 0.15 };

function Checkout() {
  const nav = useNavigate();
  const tailor = tailors[0]!;

  const [method, setMethod] = useState<string>("card");
  const [promo, setPromo] = useState("");
  const [applied, setApplied] = useState<{ code: string; rate: number } | null>(null);
  const [promoError, setPromoError] = useState("");
  const [status, setStatus] = useState<"idle" | "processing" | "done">("idle");

  const subtotal = 420;
  const stitching = 35;
  const delivery = method === "cod" ? 0 : 8;
  const discount = applied ? Math.round(subtotal * applied.rate) : 0;
  const tax = Math.round((subtotal + stitching - discount) * 0.05);
  const total = subtotal + stitching + delivery + tax - discount;

  function applyPromo() {
    const code = promo.trim().toUpperCase();
    const rate = PROMOS[code];
    if (rate) {
      setApplied({ code, rate });
      setPromoError("");
    } else {
      setApplied(null);
      setPromoError("That code isn't valid.");
    }
  }

  function pay() {
    setStatus("processing");
    setTimeout(() => setStatus("done"), 1900);
  }

  if (status === "done") {
    return (
      <MobileShell hideNav>
        <div className="min-h-screen flex flex-col items-center justify-center px-8 text-center">
          <div className="w-24 h-24 rounded-full bg-primary grid place-items-center shadow-[var(--shadow-glow)] mb-6">
            <Check className="w-12 h-12 text-primary-foreground" strokeWidth={3} />
          </div>
          <h1 className="text-3xl font-bold">Payment successful</h1>
          <p className="text-muted-foreground mt-2 max-w-xs">
            ${total} paid to {tailor.name}. Your order STC-2418 is confirmed and heads to the studio now.
          </p>

          <div className="mt-8 w-full max-w-xs bg-card rounded-[28px] border border-border/50 p-5 text-left shadow-[var(--shadow-soft)]">
            {[
              ["Receipt", "RCP-88214"],
              ["Method", methods.find((m) => m.id === method)?.label ?? "Card"],
              ["Amount", `$${total}`],
            ].map(([k, v]) => (
              <div key={k} className="flex items-center justify-between py-1.5 text-sm">
                <span className="text-muted-foreground">{k}</span>
                <span className="font-semibold">{v}</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => nav({ to: "/orders/$id", params: { id: "STC-2418" } })}
            className="mt-8 w-full max-w-xs h-14 rounded-full bg-primary text-primary-foreground font-semibold shadow-[var(--shadow-glow)]"
          >
            Track your order
          </button>
          <Link to="/" className="mt-3 text-sm text-muted-foreground font-medium">
            Back to home
          </Link>
        </div>
      </MobileShell>
    );
  }

  return (
    <MobileShell hideNav>
      <PageHeader title="Checkout" subtitle="Review and pay securely" back />

      <div className="px-6 space-y-6">
        <section className="bg-card rounded-[28px] border border-border/50 p-4 shadow-[var(--shadow-soft)]">
          <div className="flex items-center gap-4">
            <img src={design1} alt="Magenta silk suit preview" className="w-16 h-16 rounded-2xl object-cover" />
            <div className="flex-1 min-w-0">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">STC-2418</p>
              <p className="font-bold truncate">Magenta silk suit</p>
              <p className="text-xs text-muted-foreground">by {tailor.name} · ready Nov 3</p>
            </div>
            <p className="font-bold">${subtotal}</p>
          </div>
        </section>

        <section>
          <p className="font-semibold text-sm mb-3">Payment method</p>
          <div className="bg-card rounded-[28px] border border-border/50 overflow-hidden">
            {methods.map((m, i) => {
              const active = method === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => setMethod(m.id)}
                  className={`w-full flex items-center gap-4 p-4 text-left transition ${i > 0 ? "border-t border-border/50" : ""} ${active ? "bg-primary-soft" : "hover:bg-secondary/50"}`}
                >
                  <div className={`w-10 h-10 rounded-xl grid place-items-center ${active ? "bg-primary text-primary-foreground" : "bg-secondary"}`}>
                    <m.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm">{m.label}</p>
                    <p className="text-xs text-muted-foreground">{m.meta}</p>
                  </div>
                  <span className={`w-5 h-5 rounded-full border-2 grid place-items-center ${active ? "border-primary bg-primary" : "border-border"}`}>
                    {active && <Check className="w-3 h-3 text-primary-foreground" strokeWidth={3} />}
                  </span>
                </button>
              );
            })}
          </div>
          <button className="mt-3 w-full flex items-center gap-3 px-4 py-3 rounded-2xl bg-secondary text-sm font-semibold">
            <CreditCard className="w-4 h-4 text-primary" />
            <span className="flex-1 text-left">Add a new card</span>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>
        </section>

        <section>
          <p className="font-semibold text-sm mb-3">Promo code</p>
          <div className="flex gap-2">
            <div className="flex-1 flex items-center gap-2 bg-secondary rounded-2xl px-4">
              <Tag className="w-4 h-4 text-primary" />
              <input
                value={promo}
                onChange={(e) => setPromo(e.target.value)}
                placeholder="STITCH10"
                className="flex-1 h-12 bg-transparent text-sm outline-none uppercase placeholder:normal-case placeholder:text-muted-foreground"
              />
            </div>
            <button onClick={applyPromo} className="h-12 px-5 rounded-2xl bg-foreground text-background text-sm font-semibold">
              Apply
            </button>
          </div>
          {applied && <p className="text-xs text-primary font-semibold mt-2 ml-1">{applied.code} applied — you save ${discount}</p>}
          {promoError && <p className="text-xs text-destructive mt-2 ml-1">{promoError}</p>}
        </section>

        <section className="bg-card rounded-[28px] border border-border/50 p-5 shadow-[var(--shadow-soft)]">
          {[
            ["Garment", `$${subtotal}`],
            ["Stitching & finishing", `$${stitching}`],
            ["Delivery", delivery === 0 ? "Free" : `$${delivery}`],
            ["Taxes", `$${tax}`],
            ...(applied ? [["Discount", `−$${discount}`]] : []),
          ].map(([k, v]) => (
            <div key={k} className="flex items-center justify-between py-1.5 text-sm">
              <span className="text-muted-foreground">{k}</span>
              <span className="font-medium">{v}</span>
            </div>
          ))}
          <div className="mt-3 pt-3 border-t border-border/50 flex items-center justify-between">
            <span className="font-semibold">Total</span>
            <span className="text-2xl font-bold">${total}</span>
          </div>
        </section>

        <div className="flex items-start gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="w-4 h-4 text-primary flex-shrink-0 mt-px" />
          <p>Payment is held safely and released to your tailor only after delivery is confirmed.</p>
        </div>

        <button
          onClick={pay}
          disabled={status === "processing"}
          className="w-full h-14 rounded-full bg-primary text-primary-foreground font-semibold shadow-[var(--shadow-glow)] disabled:opacity-70 flex items-center justify-center gap-2"
        >
          {status === "processing" ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" /> Processing payment…
            </>
          ) : method === "cod" ? (
            `Confirm order · $${total}`
          ) : (
            `Pay $${total}`
          )}
        </button>
      </div>
    </MobileShell>
  );
}
