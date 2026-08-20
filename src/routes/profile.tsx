import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileShell } from "@/components/MobileShell";
import { ChevronRight, Ruler, Sparkles, MapPin, CreditCard, HelpCircle, Settings, LogOut, LayoutDashboard } from "lucide-react";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Your profile — Stitch" },
      { name: "description", content: "Your Stitch profile, saved designs, measurements, and settings." },
    ],
  }),
  component: Profile,
});

const items = [
  { icon: Ruler, label: "Saved measurements", to: "/profile", meta: "4 saved" },
  { icon: Sparkles, label: "Saved AI designs", to: "/designer", meta: "12" },
  { icon: MapPin, label: "Addresses", to: "/profile", meta: "2" },
  { icon: CreditCard, label: "Payment methods", to: "/checkout", meta: "•• 4242" },
];

const dashboards = [
  { label: "Tailor dashboard", to: "/dashboard/tailor" },
  { label: "Assistant dashboard", to: "/dashboard/assistant" },
  { label: "Admin dashboard", to: "/dashboard/admin" },
];

function Profile() {
  return (
    <MobileShell>
      <header className="px-6 pt-14">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/60 grid place-items-center text-primary-foreground text-2xl font-bold">
            A
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">Alex Chen</h1>
            <p className="text-sm text-muted-foreground">alex@stitch.com</p>
          </div>
          <button className="text-xs text-primary font-semibold">Edit</button>
        </div>

        <div className="grid grid-cols-3 gap-3 mt-6">
          {[
            { v: "12", l: "Orders" },
            { v: "4", l: "Saved" },
            { v: "$1.2k", l: "Spent" },
          ].map((s) => (
            <div key={s.l} className="bg-secondary rounded-2xl p-3 text-center">
              <p className="text-lg font-bold">{s.v}</p>
              <p className="text-xs text-muted-foreground">{s.l}</p>
            </div>
          ))}
        </div>
      </header>

      <section className="px-6 mt-8">
        <div className="bg-card rounded-[28px] border border-border/50 overflow-hidden">
          {items.map((it, i) => (
            <Link key={it.label} to={it.to} className={`flex items-center gap-4 p-4 hover:bg-secondary/50 transition ${i > 0 && "border-t border-border/50"}`}>
              <div className="w-10 h-10 rounded-xl bg-primary-soft grid place-items-center">
                <it.icon className="w-5 h-5 text-primary" />
              </div>
              <span className="flex-1 font-medium text-sm">{it.label}</span>
              <span className="text-xs text-muted-foreground">{it.meta}</span>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </Link>
          ))}
        </div>
      </section>

      <section className="px-6 mt-6">
        <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2 ml-2">Workspace</p>
        <div className="bg-card rounded-[28px] border border-border/50 overflow-hidden">
          {dashboards.map((d, i) => (
            <Link key={d.to} to={d.to} className={`flex items-center gap-4 p-4 hover:bg-secondary/50 transition ${i > 0 && "border-t border-border/50"}`}>
              <div className="w-10 h-10 rounded-xl bg-secondary grid place-items-center">
                <LayoutDashboard className="w-5 h-5" />
              </div>
              <span className="flex-1 font-medium text-sm">{d.label}</span>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </Link>
          ))}
        </div>
      </section>

      <section className="px-6 mt-6">
        <div className="bg-card rounded-[28px] border border-border/50 overflow-hidden">
          {[
            { icon: HelpCircle, label: "Help center" },
            { icon: Settings, label: "Settings" },
            { icon: LogOut, label: "Sign out", to: "/auth" as const },
          ].map((it, i) => (
            <Link
              key={it.label}
              to={"to" in it ? it.to! : "/profile"}
              className={`flex items-center gap-4 p-4 hover:bg-secondary/50 transition ${i > 0 && "border-t border-border/50"}`}
            >
              <div className="w-10 h-10 rounded-xl bg-secondary grid place-items-center">
                <it.icon className="w-5 h-5" />
              </div>
              <span className="flex-1 font-medium text-sm">{it.label}</span>
            </Link>
          ))}
        </div>
        <p className="text-center text-xs text-muted-foreground mt-6">Stitch v1.0.0</p>
      </section>
    </MobileShell>
  );
}
