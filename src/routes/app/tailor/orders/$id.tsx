import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronLeft, Check, X } from "lucide-react";
import { toast } from "sonner";
import { TailorShell } from "@/components/web/nav";
import { Panel, Pill, statusTone, StageTracker } from "@/components/web/kit";
import { orders, workflow, type Stage } from "@/lib/web-data";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/app/tailor/orders/$id")({
  head: ({ params }) => ({
    meta: [
      { title: `Order ${params.id} — Stitch Tailor Workspace` },
      { name: "description", content: `Full detail, measurements, fabric and AI preview for Stitch order ${params.id}.` },
      { property: "og:title", content: `Order ${params.id} — Stitch Tailor Workspace` },
      { property: "og:description", content: `Full detail, measurements, fabric and AI preview for Stitch order ${params.id}.` },
    ],
  }),
  loader: ({ params }) => {
    const o = orders.find((x) => x.id === params.id);
    if (!o) throw notFound();
    return o;
  },
  component: OrderDetail,
});

function OrderDetail() {
  const o = Route.useLoaderData() as NonNullable<(typeof orders)[number]>;
  const [stage, setStage] = useState<Stage>(o.stage);

  return (
    <TailorShell>
      <div className="mb-6 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <Link to="/app/tailor/orders" className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-secondary hover:bg-accent">
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground">{o.id} · placed {o.placed}</p>
            <h1 className="truncate text-2xl font-bold tracking-tight">{o.item}</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {o.stage === "New Order" && (
            <>
              <button onClick={() => toast.error("Order rejected")} className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium hover:bg-secondary">
                <X className="h-4 w-4" /> Reject
              </button>
              <button onClick={() => { setStage("Accepted"); toast.success("Order accepted"); }} className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90">
                <Check className="h-4 w-4" strokeWidth={3} /> Accept
              </button>
            </>
          )}
        </div>
      </div>

      <Panel title="Order progress" action={
        <div className="flex items-center gap-2">
          <Pill tone={statusTone(stage)}>{stage}</Pill>
          <Select value={stage} onValueChange={(v) => { setStage(v as Stage); toast.success(`Status updated to ${v}`); }}>
            <SelectTrigger className="h-9 w-[220px] rounded-full"><SelectValue /></SelectTrigger>
            <SelectContent>{workflow.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
          </Select>
        </div>
      }>
        <StageTracker stages={workflow} current={stage} />
      </Panel>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <div className="space-y-6">
          <Panel title="AI design preview">
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Uploaded fabric</p>
                <img src={o.fabric} alt="Uploaded fabric" className="aspect-[4/5] w-full rounded-2xl object-cover" />
              </div>
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">AI outfit preview</p>
                <img src={o.preview} alt="AI generated outfit preview" className="aspect-[4/5] w-full rounded-2xl object-cover" />
              </div>
            </div>
            <dl className="mt-5 grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {o.design.map((d) => (
                <div key={d.label} className="flex items-start justify-between gap-4 border-b border-border/60 pb-2">
                  <dt className="text-sm text-muted-foreground">{d.label}</dt>
                  <dd className="text-right text-sm font-medium">{d.value}</dd>
                </div>
              ))}
            </dl>
          </Panel>

          <Panel title="Measurements">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {o.measurements.map((m) => (
                <div key={m.label} className="rounded-2xl bg-secondary/70 p-4">
                  <p className="text-xs text-muted-foreground">{m.label}</p>
                  <p className="mt-1 text-lg font-bold">{m.value}</p>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        <div className="space-y-6">
          <Panel title="Customer">
            <p className="text-lg font-semibold">{o.customer}</p>
            <p className="text-sm text-muted-foreground">Category: {o.category}</p>
            <p className="mt-3 text-sm text-muted-foreground">Due {o.due}</p>
            <p className="mt-1 text-2xl font-bold">${o.amount}</p>
            <Link to="/app/tailor/customers/$id" params={{ id: o.customerId }} className="mt-4 inline-flex rounded-full border border-border px-4 py-2 text-sm font-medium hover:bg-secondary">
              View customer profile
            </Link>
          </Panel>
          <Panel title="Customer notes">
            <p className="text-sm leading-relaxed text-muted-foreground">{o.notes}</p>
          </Panel>
        </div>
      </div>
    </TailorShell>
  );
}
