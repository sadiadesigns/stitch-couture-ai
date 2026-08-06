import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, ArrowUpDown, Check, X } from "lucide-react";
import { toast } from "sonner";
import { TailorShell } from "@/components/web/nav";
import { PageTitle } from "@/components/web/WebShell";
import { Panel, Pill, statusTone, Toolbar, Pagination, EmptyState } from "@/components/web/kit";
import { orders, workflow } from "@/lib/web-data";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/app/tailor/orders/")({
  head: () => ({
    meta: [
      { title: "Orders — Stitch Tailor Workspace" },
      { name: "description", content: "Review, accept and progress every tailoring order assigned to your studio." },
      { property: "og:title", content: "Orders — Stitch Tailor Workspace" },
      { property: "og:description", content: "Review, accept and progress every tailoring order assigned to your studio." },
    ],
  }),
  component: OrdersPage,
});

const PER_PAGE = 5;

function OrdersPage() {
  const [q, setQ] = useState("");
  const [stage, setStage] = useState("all");
  const [asc, setAsc] = useState(false);
  const [page, setPage] = useState(1);

  const rows = useMemo(() => {
    const filtered = orders
      .filter((o) => (stage === "all" ? true : o.stage === stage))
      .filter((o) => `${o.id} ${o.customer} ${o.item}`.toLowerCase().includes(q.toLowerCase()))
      .sort((a, b) => (asc ? a.amount - b.amount : b.amount - a.amount));
    return filtered;
  }, [q, stage, asc]);

  const pages = Math.ceil(rows.length / PER_PAGE);
  const view = rows.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <TailorShell>
      <PageTitle title="Orders" subtitle={`${rows.length} orders matching your filters`} />

      <Panel>
        <Toolbar>
          <div className="relative min-w-[200px] flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => { setQ(e.target.value); setPage(1); }}
              placeholder="Search by order, customer or item"
              className="h-10 rounded-full pl-10"
            />
          </div>
          <Select value={stage} onValueChange={(v) => { setStage(v); setPage(1); }}>
            <SelectTrigger className="h-10 w-[220px] rounded-full"><SelectValue placeholder="Stage" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All stages</SelectItem>
              {workflow.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
          <button onClick={() => setAsc((a) => !a)} className="inline-flex h-10 items-center gap-2 rounded-full border border-border px-4 text-sm font-medium hover:bg-secondary">
            <ArrowUpDown className="h-4 w-4" /> Amount {asc ? "asc" : "desc"}
          </button>
        </Toolbar>

        {view.length === 0 ? (
          <EmptyState title="No orders found" description="Try clearing the search or selecting a different stage." />
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[820px] text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted-foreground">
                    <th className="py-3 pr-4 font-semibold">Order</th>
                    <th className="py-3 pr-4 font-semibold">Customer</th>
                    <th className="py-3 pr-4 font-semibold">Stage</th>
                    <th className="py-3 pr-4 font-semibold">Due</th>
                    <th className="py-3 pr-4 font-semibold">Amount</th>
                    <th className="py-3 text-right font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {view.map((o) => (
                    <tr key={o.id} className="hover:bg-secondary/50">
                      <td className="py-3 pr-4">
                        <div className="flex items-center gap-3">
                          <img src={o.preview} alt="" className="h-10 w-10 rounded-xl object-cover" />
                          <div>
                            <Link to="/app/tailor/orders/$id" params={{ id: o.id }} className="font-semibold hover:text-primary">{o.item}</Link>
                            <p className="text-xs text-muted-foreground">{o.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 pr-4">{o.customer}</td>
                      <td className="py-3 pr-4"><Pill tone={statusTone(o.stage)}>{o.stage}</Pill></td>
                      <td className="py-3 pr-4 text-muted-foreground">{o.due}</td>
                      <td className="py-3 pr-4 font-semibold">${o.amount}</td>
                      <td className="py-3">
                        <div className="flex justify-end gap-2">
                          {o.stage === "New Order" ? (
                            <>
                              <button onClick={() => toast.error(`Order ${o.id} rejected`)} className="grid h-9 w-9 place-items-center rounded-full border border-border hover:bg-secondary" aria-label="Reject order">
                                <X className="h-4 w-4" />
                              </button>
                              <button onClick={() => toast.success(`Order ${o.id} accepted`)} className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground hover:opacity-90" aria-label="Accept order">
                                <Check className="h-4 w-4" strokeWidth={3} />
                              </button>
                            </>
                          ) : (
                            <Link to="/app/tailor/orders/$id" params={{ id: o.id }} className="rounded-full border border-border px-4 py-1.5 text-sm font-medium hover:bg-secondary">
                              Open
                            </Link>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination page={page} pages={pages} onChange={setPage} />
          </>
        )}
      </Panel>
    </TailorShell>
  );
}
