import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, LayoutDashboard, Shield } from "lucide-react";
import logo from "@/assets/stitch-logo.png";

export const Route = createFileRoute("/app/")({
  head: () => ({
    meta: [
      { title: "Stitch Workspace — Choose your dashboard" },
      { name: "description", content: "Sign in to the Stitch web workspace as a tailor or platform administrator." },
      { property: "og:title", content: "Stitch Workspace — Choose your dashboard" },
      { property: "og:description", content: "Sign in to the Stitch web workspace as a tailor or platform administrator." },
    ],
  }),
  component: WorkspacePicker,
});

function WorkspacePicker() {
  return (
    <div className="min-h-screen bg-secondary/40 px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <img src={logo} alt="Stitch" className="mx-auto h-9 w-auto" />
        <h1 className="mt-8 text-center text-3xl font-bold tracking-tight sm:text-4xl">Welcome to the Stitch workspace</h1>
        <p className="mx-auto mt-2 max-w-lg text-center text-muted-foreground">
          The desktop console for tailors and administrators. Choose the workspace you want to open.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {[
            { to: "/app/tailor/dashboard", icon: LayoutDashboard, title: "Tailor workspace", desc: "Orders, appointments, customers, earnings and reviews." },
            { to: "/app/admin/dashboard", icon: Shield, title: "Admin console", desc: "Verification, users, disputes, payments and analytics." },
          ].map((c) => (
            <Link
              key={c.to}
              to={c.to}
              className="group rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] transition hover:border-primary/40 hover:shadow-[var(--shadow-card)]"
            >
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary-soft text-primary">
                <c.icon className="h-5 w-5" />
              </span>
              <h2 className="mt-4 text-lg font-semibold">{c.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{c.desc}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                Open <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
