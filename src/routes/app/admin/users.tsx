import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, KeyRound, Ban } from "lucide-react";
import { toast } from "sonner";
import { AdminShell } from "@/components/web/nav";
import { PageTitle } from "@/components/web/WebShell";
import { Panel, Pill, statusTone, Toolbar, Pagination, EmptyState } from "@/components/web/kit";
import { customers } from "@/lib/web-data";
import { tailors } from "@/lib/mock-data";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export const Route = createFileRoute("/app/admin/users")({
  head: () => ({
    meta: [
      { title: "User Management — Stitch Admin" },
      { name: "description", content: "Search, filter, suspend and support customers and tailors across Stitch." },
      { property: "og:title", content: "User Management — Stitch Admin" },
      { property: "og:description", content: "Search, filter, suspend and support customers and tailors across Stitch." },
    ],
  }),
  component: UsersPage,
});

const PER_PAGE = 5;

function CustomersTable() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);

  const rows = useMemo(
    () =>
      customers
        .filter((c) => (status === "all" ? true : c.status === status))
        .filter((c) => `${c.name} ${c.email} ${c.city}`.toLowerCase().includes(q.toLowerCase())),
    [q, status],
  );
  const view = rows.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <>
      <Toolbar>
        <div className="relative min-w-[220px] flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={q} onChange={(e) => { setQ(e.target.value); setPage(1); }} placeholder="Search customers" className="h-10 rounded-full pl-10" />
        </div>
        <Select value={status} onValueChange={(v) => { setStatus(v); setPage(1); }}>
          <SelectTrigger className="h-10 w-[180px] rounded-full"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Suspended">Suspended</SelectItem>
          </SelectContent>
        </Select>
      </Toolbar>
      {view.length === 0 ? (
        <EmptyState title="No users match" description="Adjust your search or status filter to find users." />
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[840px] text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="py-3 pr-4 font-semibold">Customer</th>
                  <th className="py-3 pr-4 font-semibold">City</th>
                  <th className="py-3 pr-4 font-semibold">Joined</th>
                  <th className="py-3 pr-4 font-semibold">Orders</th>
                  <th className="py-3 pr-4 font-semibold">Spend</th>
                  <th className="py-3 pr-4 font-semibold">Status</th>
                  <th className="py-3 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {view.map((c) => (
                  <tr key={c.id} className="hover:bg-secondary/50">
                    <td className="py-3 pr-4">
                      <p className="font-semibold">{c.name}</p>
                      <p className="text-xs text-muted-foreground">{c.email}</p>
                    </td>
                    <td className="py-3 pr-4 text-muted-foreground">{c.city}</td>
                    <td className="py-3 pr-4 text-muted-foreground">{c.joined}</td>
                    <td className="py-3 pr-4">{c.ordersCount}</td>
                    <td className="py-3 pr-4 font-semibold">${c.spend.toLocaleString()}</td>
                    <td className="py-3 pr-4"><Pill tone={statusTone(c.status)}>{c.status}</Pill></td>
                    <td className="py-3">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => toast.success(`Password reset link sent to ${c.email}`)} className="grid h-9 w-9 place-items-center rounded-full border border-border hover:bg-secondary" aria-label="Reset password">
                          <KeyRound className="h-4 w-4" />
                        </button>
                        <button onClick={() => toast.error(`${c.name} suspended`)} className="grid h-9 w-9 place-items-center rounded-full border border-border text-destructive hover:bg-destructive/5" aria-label="Suspend account">
                          <Ban className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination page={page} pages={Math.ceil(rows.length / PER_PAGE)} onChange={setPage} />
        </>
      )}
    </>
  );
}

function TailorsTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[760px] text-sm">
        <thead>
          <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted-foreground">
            <th className="py-3 pr-4 font-semibold">Tailor</th>
            <th className="py-3 pr-4 font-semibold">Specialty</th>
            <th className="py-3 pr-4 font-semibold">Experience</th>
            <th className="py-3 pr-4 font-semibold">Orders</th>
            <th className="py-3 pr-4 font-semibold">Rating</th>
            <th className="py-3 text-right font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {tailors.map((t) => (
            <tr key={t.id} className="hover:bg-secondary/50">
              <td className="py-3 pr-4">
                <div className="flex items-center gap-3">
                  <img src={t.photo} alt="" className="h-10 w-10 rounded-xl object-cover" />
                  <div>
                    <p className="font-semibold">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.location}</p>
                  </div>
                </div>
              </td>
              <td className="py-3 pr-4 text-muted-foreground">{t.specialty}</td>
              <td className="py-3 pr-4">{t.experience} yrs</td>
              <td className="py-3 pr-4">{t.orders.toLocaleString()}</td>
              <td className="py-3 pr-4 font-semibold">{t.rating}</td>
              <td className="py-3 text-right">
                <button onClick={() => toast.error(`${t.name} suspended`)} className="rounded-full border border-border px-4 py-1.5 text-sm font-medium text-destructive hover:bg-destructive/5">
                  Suspend
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function UsersPage() {
  return (
    <AdminShell>
      <PageTitle title="Users" subtitle="Customers and tailors across the platform" />
      <Panel>
        <Tabs defaultValue="customers">
          <TabsList className="rounded-full">
            <TabsTrigger value="customers" className="rounded-full">Customers</TabsTrigger>
            <TabsTrigger value="tailors" className="rounded-full">Tailors</TabsTrigger>
          </TabsList>
          <TabsContent value="customers" className="mt-5"><CustomersTable /></TabsContent>
          <TabsContent value="tailors" className="mt-5"><TailorsTable /></TabsContent>
        </Tabs>
      </Panel>
    </AdminShell>
  );
}
