import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { TailorShell } from "@/components/web/nav";
import { PageTitle } from "@/components/web/WebShell";
import { Panel, Pill, statusTone, Toolbar, EmptyState } from "@/components/web/kit";
import { customers } from "@/lib/web-data";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/app/tailor/customers/")({
  head: () => ({
    meta: [
      { title: "Customers — Stitch Tailor Workspace" },
      { name: "description", content: "Browse your customers with saved measurements, fabrics and order history." },
      { property: "og:title", content: "Customers — Stitch Tailor Workspace" },
      { property: "og:description", content: "Browse your customers with saved measurements, fabrics and order history." },
    ],
  }),
  component: CustomersPage,
});

function CustomersPage() {
  const [q, setQ] = useState("");
  const rows = useMemo(
    () => customers.filter((c) => `${c.name} ${c.email} ${c.city}`.toLowerCase().includes(q.toLowerCase())),
    [q],
  );

  return (
    <TailorShell>
      <PageTitle title="Customers" subtitle={`${rows.length} customers in your studio`} />
      <Panel>
        <Toolbar>
          <div className="relative min-w-[220px] flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search customers" className="h-10 rounded-full pl-10" />
          </div>
        </Toolbar>
        {rows.length === 0 ? (
          <EmptyState title="No customers yet" description="Customers appear here once they place their first order with your studio." />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {rows.map((c) => (
              <Link
                key={c.id}
                to="/app/tailor/customers/$id"
                params={{ id: c.id }}
                className="rounded-3xl border border-border p-5 transition hover:border-primary/40 hover:shadow-[var(--shadow-soft)]"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary-soft text-sm font-bold text-primary">
                    {c.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                  <Pill tone={statusTone(c.status)}>{c.status}</Pill>
                </div>
                <p className="mt-3 truncate font-semibold">{c.name}</p>
                <p className="truncate text-xs text-muted-foreground">{c.email}</p>
                <div className="mt-4 flex justify-between text-sm">
                  <span className="text-muted-foreground">{c.ordersCount} orders</span>
                  <span className="font-semibold">${c.spend.toLocaleString()}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </Panel>
    </TailorShell>
  );
}
