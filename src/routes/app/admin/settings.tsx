import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { AdminShell } from "@/components/web/nav";
import { PageTitle } from "@/components/web/WebShell";
import { Panel } from "@/components/web/kit";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/app/admin/settings")({
  head: () => ({
    meta: [
      { title: "Platform Settings — Stitch Admin" },
      { name: "description", content: "Configure commission, service areas, feature flags and platform policies." },
      { property: "og:title", content: "Platform Settings — Stitch Admin" },
      { property: "og:description", content: "Configure commission, service areas, feature flags and platform policies." },
    ],
  }),
  component: AdminSettings,
});

function AdminSettings() {
  return (
    <AdminShell>
      <PageTitle
        title="Platform settings"
        subtitle="Commission, coverage and feature control"
        action={
          <button onClick={() => toast.success("Platform settings saved")} className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90">
            Save
          </button>
        }
      />
      <div className="grid gap-6 xl:grid-cols-2">
        <Panel title="Commission & fees">
          <div className="space-y-4">
            <div><Label htmlFor="rate">Platform commission (%)</Label><Input id="rate" defaultValue="15" className="mt-1.5 rounded-2xl" /></div>
            <div><Label htmlFor="visit">Home measurement fee ($)</Label><Input id="visit" defaultValue="12" className="mt-1.5 rounded-2xl" /></div>
            <div><Label htmlFor="min">Minimum payout ($)</Label><Input id="min" defaultValue="50" className="mt-1.5 rounded-2xl" /></div>
          </div>
        </Panel>

        <Panel title="Feature flags">
          <div className="space-y-4">
            {[
              ["AI outfit designer", true],
              ["Home measurement booking", true],
              ["Instant tailor payouts", false],
              ["New tailor sign-ups", true],
            ].map(([label, on]) => (
              <div key={String(label)} className="flex items-center justify-between gap-4">
                <span className="text-sm font-medium">{label}</span>
                <Switch defaultChecked={Boolean(on)} onCheckedChange={() => toast.success("Feature flag updated")} />
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Service areas">
          <Textarea rows={5} defaultValue={"Mumbai\nDelhi NCR\nBengaluru\nHyderabad\nPune"} className="rounded-2xl" />
          <p className="mt-2 text-xs text-muted-foreground">One city per line. Customers outside these areas see a waitlist.</p>
        </Panel>

        <Panel title="Policies">
          <div className="space-y-4">
            <div><Label htmlFor="cancel">Cancellation window (hours)</Label><Input id="cancel" defaultValue="24" className="mt-1.5 rounded-2xl" /></div>
            <div><Label htmlFor="refund">Refund policy</Label><Textarea id="refund" rows={4} defaultValue="Full refund before cutting begins. 50% refund during stitching. No refund after delivery unless quality flagged within 7 days." className="mt-1.5 rounded-2xl" /></div>
          </div>
        </Panel>
      </div>
    </AdminShell>
  );
}
