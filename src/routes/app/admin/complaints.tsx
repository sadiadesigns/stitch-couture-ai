import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, Mail, Check, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { AdminShell } from "@/components/web/nav";
import { PageTitle } from "@/components/web/WebShell";
import { Panel, Pill, statusTone, EmptyState, Toolbar } from "@/components/web/kit";
import { complaints } from "@/lib/web-data";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/app/admin/complaints")({
  head: () => ({
    meta: [
      { title: "Complaints — Stitch Admin" },
      { name: "description", content: "Ticket management for customer and tailor complaints, refunds and resolutions." },
      { property: "og:title", content: "Complaints — Stitch Admin" },
      { property: "og:description", content: "Ticket management for customer and tailor complaints, refunds and resolutions." },
    ],
  }),
  component: ComplaintsPage,
});

function ComplaintsPage() {
  const [status, setStatus] = useState("all");
  const rows = complaints.filter((c) => (status === "all" ? true : c.status === status));

  return (
    <AdminShell>
      <PageTitle title="Complaints" subtitle={`${rows.length} tickets`} />
      <Panel>
        <Toolbar>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="h-10 w-[200px] rounded-full"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All tickets</SelectItem>
              <SelectItem value="Open">Open</SelectItem>
              <SelectItem value="In review">In review</SelectItem>
              <SelectItem value="Resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>
        </Toolbar>

        {rows.length === 0 ? (
          <EmptyState title="No tickets here" description="Nothing matches this status filter right now." />
        ) : (
          <ul className="space-y-4">
            {rows.map((c) => (
              <li key={c.id} className="rounded-3xl border border-border/60 p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="truncate font-semibold">{c.subject}</h3>
                      <Pill tone={statusTone(c.status)}>{c.status}</Pill>
                      <Pill tone={statusTone(c.priority)}>{c.priority} priority</Pill>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {c.id} · opened {c.opened} · customer {c.customer} · tailor {c.tailor}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button onClick={() => toast.success(`Calling ${c.customer}`)} className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium hover:bg-secondary">
                    <Phone className="h-4 w-4" /> Contact customer
                  </button>
                  <button onClick={() => toast.success(`Emailing ${c.tailor}`)} className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium hover:bg-secondary">
                    <Mail className="h-4 w-4" /> Contact tailor
                  </button>
                  <button onClick={() => toast.success(`Refund issued for ${c.id}`)} className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium hover:bg-secondary">
                    <RotateCcw className="h-4 w-4" /> Issue refund
                  </button>
                  <button onClick={() => toast.success(`${c.id} resolved`)} className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90">
                    <Check className="h-4 w-4" strokeWidth={3} /> Resolve
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </AdminShell>
  );
}
