import { createFileRoute } from "@tanstack/react-router";
import { Check, X, Info, FileText, IdCard } from "lucide-react";
import { toast } from "sonner";
import { AdminShell } from "@/components/web/nav";
import { PageTitle } from "@/components/web/WebShell";
import { Panel, Pill, statusTone } from "@/components/web/kit";
import { applications } from "@/lib/web-data";

export const Route = createFileRoute("/app/admin/verification")({
  head: () => ({
    meta: [
      { title: "Tailor Verification — Stitch Admin" },
      { name: "description", content: "Review tailor applications, documents and portfolios before marketplace approval." },
      { property: "og:title", content: "Tailor Verification — Stitch Admin" },
      { property: "og:description", content: "Review tailor applications, documents and portfolios before marketplace approval." },
    ],
  }),
  component: VerificationPage,
});

function VerificationPage() {
  return (
    <AdminShell>
      <PageTitle title="Tailor verification" subtitle={`${applications.length} applications awaiting review`} />

      <div className="space-y-6">
        {applications.map((a) => (
          <Panel key={a.id}>
            <div className="grid gap-6 xl:grid-cols-[1fr_1.2fr]">
              <div>
                <div className="flex items-start gap-4">
                  <img src={a.photo} alt="" className="h-16 w-16 rounded-2xl object-cover" />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="truncate text-lg font-semibold">{a.name}</h2>
                      <Pill tone={statusTone(a.status)}>{a.status}</Pill>
                    </div>
                    <p className="text-sm text-muted-foreground">{a.specialty} · {a.experience} years experience</p>
                    <p className="text-xs text-muted-foreground">Submitted {a.submitted}</p>
                  </div>
                </div>
                <dl className="mt-5 space-y-3 text-sm">
                  <div className="flex items-center gap-3"><IdCard className="h-4 w-4 text-primary" /> National ID: <span className="font-medium">{a.nationalId}</span></div>
                  <div className="flex items-center gap-3"><FileText className="h-4 w-4 text-primary" /> Certificate: <span className="font-medium">{a.certificates}</span></div>
                </dl>
                <div className="mt-6 flex flex-wrap gap-2">
                  <button onClick={() => toast.success(`${a.name} approved — now live in the marketplace`)} className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90">
                    <Check className="h-4 w-4" strokeWidth={3} /> Approve
                  </button>
                  <button onClick={() => toast.error(`${a.name}'s application rejected`)} className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2 text-sm font-medium hover:bg-secondary">
                    <X className="h-4 w-4" /> Reject
                  </button>
                  <button onClick={() => toast(`Information request sent to ${a.name}`)} className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2 text-sm font-medium hover:bg-secondary">
                    <Info className="h-4 w-4" /> Request more info
                  </button>
                </div>
              </div>
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Portfolio & sample work</p>
                <div className="grid grid-cols-4 gap-3">
                  {a.portfolio.map((p, i) => (
                    <img key={i} src={p} alt="" className="aspect-square w-full rounded-2xl object-cover" />
                  ))}
                </div>
              </div>
            </div>
          </Panel>
        ))}
      </div>
    </AdminShell>
  );
}
