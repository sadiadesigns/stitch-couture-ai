import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Search, Sparkles, Package, User } from "lucide-react";
import type { ReactNode } from "react";

const nav = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/tailors", icon: Search, label: "Tailors" },
  { to: "/designer", icon: Sparkles, label: "Design" },
  { to: "/orders", icon: Package, label: "Orders" },
  { to: "/profile", icon: User, label: "Profile" },
];

export function MobileShell({ children, hideNav = false }: { children: ReactNode; hideNav?: boolean }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-md min-h-screen bg-background relative pb-28">
        {children}
        {!hideNav && (
          <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-sm z-50">
            <div className="bg-foreground/95 backdrop-blur-xl rounded-full px-2 py-2 flex items-center justify-between shadow-[0_20px_60px_-15px_oklch(0_0_0/0.35)]">
              {nav.map(({ to, icon: Icon, label }) => {
                const active = to === "/" ? path === "/" : path.startsWith(to);
                return (
                  <Link
                    key={to}
                    to={to}
                    className={`flex-1 flex flex-col items-center justify-center py-2 rounded-full transition-all ${
                      active ? "bg-primary text-primary-foreground" : "text-white/70 hover:text-white"
                    }`}
                  >
                    <Icon className="w-5 h-5" strokeWidth={active ? 2.5 : 2} />
                  </Link>
                );
              })}
            </div>
          </nav>
        )}
      </div>
    </div>
  );
}

export function PageHeader({
  title,
  subtitle,
  back,
  right,
}: {
  title?: string;
  subtitle?: string;
  back?: boolean;
  right?: ReactNode;
}) {
  return (
    <header className="px-6 pt-14 pb-4 flex items-start justify-between gap-4">
      <div className="flex-1">
        {back && (
          <Link
            to=".."
            className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-secondary text-foreground mb-4 hover:bg-accent transition"
          >
            <span className="text-lg">←</span>
          </Link>
        )}
        {title && <h1 className="text-3xl font-bold tracking-tight text-foreground">{title}</h1>}
        {subtitle && <p className="text-muted-foreground mt-1 text-sm">{subtitle}</p>}
      </div>
      {right}
    </header>
  );
}
