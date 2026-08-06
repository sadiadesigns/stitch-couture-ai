import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { toast } from "sonner";
import { AdminShell } from "@/components/web/nav";
import { PageTitle } from "@/components/web/WebShell";
import { Panel, Pill, statusTone, Toolbar, Pagination, EmptyState } from "@/components/web/kit";
import { orders, workflow } from "@/lib/web-data";
import { tailors } from "@/lib/mock-data";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export const Route = createFileRoute("/app/admin/orders")({
  head: () => ({
    meta: [
      { title: "Order Management — Stitch Admin" },
      { name: "description", content: "Monitor every order, resolve disputes, cancel or reassign tailors." },
      { property: "og:title", content: "Order Management — Stitch Admin" },
      { property: "og:description", content: "Monitor every order, resolve disputes, cancel or reassign tailors." },
    ],
  }),
  component: AdminOrders,
});

const PER_PAGE = 5;

function AdminOrders() {
  const [q, setQ] = useState("");
  const [stage, setStage] = useState("all");
  const [page, setPage] = useState(1);

  const rows = useMemo(
    () =>
      orders
        .filter((o) => (stage === "all" ? true : o.stage === stage))
        .filter((o) => `${o.id} ${o.customer} ${o.tailor} ${o.item}`.toLowerCase().includes(q.toLowerCase())),
    [q, stage],
  );
  const view = rows.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <AdminShell>
      <PageTitle title="Orders" subtitle={`${rows.length} orders across the platform`} />
      <Panel>
        <Toolbar>
          <div className="relative min-w-[220px] flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={q} onChange={(e) => { setQ(e.target.value); setPage(1); }} placeholder="Search orders, customers or tailors" className="h-10 rounded-full pl-10" />
          </div>
          <Select value={stage} onValueChange={(v) => { setStage(v); setPage(1); }}>
            <SelectTrigger className="h-10 w-[220px] rounded-full"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All stages</SelectItem>
              {workflow.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
        </Toolbar>

        {view.length === 0 ? (
          <EmptyState title="No orders found" description="Adjust the filters to see platform orders." />
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[880px] text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted-foreground">
                    <th className="py-3 pr-4 font-semibold">Order</th>
                    <th className="py-3 pr-4 font-semibold">Customer</th>
                    <th className="py-3 pr-4 font-semibold">Tailor</th>
                    <th className="py-3 pr-4 font-semibold">Stage</th>
                    <th className="py-3 pr-4 font-semibold">Amount</th>
                    <th className="py-3 text-right font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {view.map((o) => (
                    <tr key={o.id} className="hover:bg-secondary/50">
                      <td className="py-3 pr-4">
                        <p className="font-semibold">{o.item}</p>
                        <p className="text-xs text-muted-foreground">{o.id} · {o.placed}</p>
                      </td>
                      <td className="py-3 pr-4">{o.customer}</td>
                      <td className="py-3 pr-4 text-muted-foreground">{o.tailor}</td>
                      <td className="py-3 pr-4"><Pill tone={statusTone(o.stage)}>{o.stage}</Pill></td>
                      <td className="py-3 pr-4 font-semibold">${o.amount}</td>
                      <td className="py-3 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger className="rounded-full border border-border px-4 py-1.5 text-sm font-medium hover:bg-secondary">
                            Manage
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="rounded-2xl">
                            {tailors.map((t) => (
                              <DropdownMenuItem key={t.id} onClick={() => toast.success(`${o.id} reassigned to ${t.name}`)}>
                                Reassign to {t.name}
                              </DropdownMenuItem>
                            ))}
                            <DropdownMenuItem onClick={() => toast.success(`Dispute on ${o.id} marked resolved`)}>Resolve dispute</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive" onClick={() => toast.error(`${o.id} cancelled`)}>Cancel order</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination page={page} pages={Math.ceil(rows.length / PER_PAGE)} onChange={setPage} />
          </>
        )}
      </Panel>
    </AdminShell>
  );
}
