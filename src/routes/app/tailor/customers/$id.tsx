import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ChevronLeft, Mail, Phone, MapPin } from "lucide-react";
import { TailorShell } from "@/components/web/nav";
import { Panel, Pill, statusTone } from "@/components/web/kit";
import { customers, orders } from "@/lib/web-data";

export const Route = createFileRoute("/app/tailor/customers/$id")({
  head: ({ params }) => ({
    meta: [
      { title: `Customer ${params.id} — Stitch Tailor Workspace` },
      { name: "description", content: "Contact details, saved measurements, fabrics, AI previews and order history." },
      { property: "og:title", content: "Customer profile — Stitch Tailor Workspace" },
      { property: "og:description", content: "Contact details, saved measurements, fabrics, AI previews and order history." },
    ],
  }),
  loader: ({ params }) => {
    const c = customers.find((x) => x.id === params.id);
    if (!c) throw notFound();
    return c;
  },
  component: CustomerDetail,
});

function CustomerDetail() {
  const c = Route.useLoaderData() as NonNullable<(typeof customers)[number]>;
  const history = orders.filter((o) => o.customerId === c.id);
  const latest = history[0];

  return (
    <TailorShell>
      <div className="mb-6 flex items-center gap-3">
        <Link to="/app/tailor/customers" className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-secondary hover:bg-accent">
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground">Customer since {c.joined}</p>
          <h1 className="truncate text-2xl font-bold tracking-tight">{c.name}</h1>
        </div>
        <div className="ml-auto"><Pill tone={statusTone(c.status)}>{c.status}</Pill></div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_1.3fr]">
        <div className="space-y-6">
          <Panel title="Contact information">
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3"><Mail className="h-4 w-4 text-primary" /> {c.email}</li>
              <li className="flex items-center gap-3"><Phone className="h-4 w-4 text-primary" /> {c.phone}</li>
              <li className="flex items-center gap-3"><MapPin className="h-4 w-4 text-primary" /> {c.city}</li>
            </ul>
          </Panel>

          <Panel title="Saved measurements">
            {latest ? (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {latest.measurements.map((m) => (
                  <div key={m.label} className="rounded-2xl bg-secondary/70 p-4">
                    <p className="text-xs text-muted-foreground">{m.label}</p>
                    <p className="mt-1 text-lg font-bold">{m.value}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No measurements captured yet.</p>
            )}
          </Panel>

          <Panel title="Notes">
            <p className="text-sm leading-relaxed text-muted-foreground">{latest?.notes ?? "No notes from this customer."}</p>
          </Panel>
        </div>

        <div className="space-y-6">
          <Panel title="Fabric & AI outfit preview">
            {latest ? (
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Uploaded fabric</p>
                  <img src={latest.fabric} alt="Uploaded fabric" className="aspect-square w-full rounded-2xl object-cover" />
                </div>
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">AI preview</p>
                  <img src={latest.preview} alt="AI outfit preview" className="aspect-square w-full rounded-2xl object-cover" />
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Nothing uploaded yet.</p>
            )}
          </Panel>

          <Panel title="Order history">
            <ul className="divide-y divide-border">
              {history.length === 0 && <li className="py-3 text-sm text-muted-foreground">No orders yet.</li>}
              {history.map((o) => (
                <li key={o.id} className="flex flex-wrap items-center gap-3 py-3">
                  <img src={o.preview} alt="" className="h-10 w-10 rounded-xl object-cover" />
                  <div className="min-w-0 flex-1">
                    <Link to="/app/tailor/orders/$id" params={{ id: o.id }} className="truncate text-sm font-semibold hover:text-primary">{o.item}</Link>
                    <p className="text-xs text-muted-foreground">{o.id} · {o.placed}</p>
                  </div>
                  <Pill tone={statusTone(o.stage)}>{o.stage}</Pill>
                  <span className="w-16 text-right text-sm font-semibold">${o.amount}</span>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>
    </TailorShell>
  );
}
