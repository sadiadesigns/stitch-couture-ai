import { Link, useRouterState } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Bell, Menu, Search, X, LogOut } from "lucide-react";
import logo from "@/assets/stitch-logo.png";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import tailor1 from "@/assets/tailor-1.jpg";

export type NavItem = { to: string; label: string; icon: React.ComponentType<{ className?: string }> };

function NavList({ items, onNavigate }: { items: NavItem[]; onNavigate?: () => void }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="flex flex-col gap-1 px-3">
      {items.map(({ to, label, icon: Icon }) => {
        const active = path === to || path.startsWith(to + "/");
        return (
          <Link
            key={to}
            to={to}
            onClick={onNavigate}
            className={`flex items-center gap-3 rounded-2xl px-3.5 py-2.5 text-sm font-medium transition-colors ${
              active
                ? "bg-primary-soft text-primary"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            }`}
          >
            <Icon className="h-[18px] w-[18px] shrink-0" />
            <span className="truncate">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export function WebShell({
  items,
  role,
  workspace,
  children,
}: {
  items: NavItem[];
  role: "Tailor" | "Admin";
  workspace: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  const sidebar = (onNavigate?: () => void) => (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 px-6 py-6">
        <img src={logo} alt="Stitch" className="h-7 w-auto" />
        <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          {role}
        </span>
      </div>
      <div className="flex-1 overflow-y-auto pb-6">
        <NavList items={items} onNavigate={onNavigate} />
      </div>
      <div className="border-t border-border p-3">
        <div className="flex items-center gap-3 rounded-2xl px-3 py-2">
          <Avatar className="h-9 w-9">
            <AvatarImage src={tailor1} alt="" />
            <AvatarFallback>ST</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{workspace}</p>
            <p className="truncate text-xs text-muted-foreground">{role} workspace</p>
          </div>
          <Link to="/auth" className="rounded-full p-2 text-muted-foreground hover:bg-secondary hover:text-foreground" aria-label="Sign out">
            <LogOut className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-secondary/40">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-border bg-background lg:block">
        {sidebar()}
      </aside>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-72 p-0">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          {sidebar(() => setOpen(false))}
        </SheetContent>
      </Sheet>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-xl sm:px-6">
          <button
            onClick={() => setOpen(true)}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full hover:bg-secondary lg:hidden"
            aria-label="Open navigation"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="relative hidden min-w-0 flex-1 sm:block">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search orders, customers, tailors…" className="h-10 rounded-full border-border bg-secondary/60 pl-10" />
          </div>
          <div className="flex-1 sm:hidden" />
          <button className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full hover:bg-secondary" aria-label="Notifications">
            <Bell className="h-5 w-5" />
            <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-primary" />
          </button>
          <Avatar className="h-9 w-9 shrink-0">
            <AvatarImage src={tailor1} alt="" />
            <AvatarFallback>ST</AvatarFallback>
          </Avatar>
        </header>
        <main className="mx-auto w-full max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</main>
      </div>
    </div>
  );
}

export function PageTitle({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="mb-6 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:flex-wrap sm:justify-between">
      <div className="min-w-0">
        <h1 className="truncate text-2xl font-bold tracking-tight sm:text-[28px]">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function CloseIcon() {
  return <X className="h-4 w-4" />;
}
