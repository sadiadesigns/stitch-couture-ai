import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { TailorShell } from "@/components/web/nav";
import { PageTitle } from "@/components/web/WebShell";
import { Panel } from "@/components/web/kit";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/app/tailor/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Stitch Tailor Workspace" },
      { name: "description", content: "Manage account, notification and payout settings for your Stitch studio." },
      { property: "og:title", content: "Settings — Stitch Tailor Workspace" },
      { property: "og:description", content: "Manage account, notification and payout settings for your Stitch studio." },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <TailorShell>
      <PageTitle
        title="Settings"
        subtitle="Account, notifications and payouts"
        action={
          <button onClick={() => toast.success("Settings saved")} className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90">
            Save
          </button>
        }
      />
      <div className="grid gap-6 xl:grid-cols-2">
        <Panel title="Account">
          <div className="space-y-4">
            <div><Label htmlFor="name">Full name</Label><Input id="name" defaultValue="Arjun Mehta" className="mt-1.5 rounded-2xl" /></div>
            <div><Label htmlFor="email">Email</Label><Input id="email" type="email" defaultValue="arjun@stitch.app" className="mt-1.5 rounded-2xl" /></div>
            <div><Label htmlFor="phone">Phone</Label><Input id="phone" defaultValue="+91 98200 55443" className="mt-1.5 rounded-2xl" /></div>
          </div>
        </Panel>
        <Panel title="Notifications">
          <div className="space-y-4">
            {[
              ["New order alerts", true],
              ["Appointment reminders", true],
              ["Review notifications", false],
              ["Weekly earnings summary", true],
            ].map(([label, on]) => (
              <div key={String(label)} className="flex items-center justify-between gap-4">
                <span className="text-sm font-medium">{label}</span>
                <Switch defaultChecked={Boolean(on)} onCheckedChange={() => toast.success("Preference updated")} />
              </div>
            ))}
          </div>
        </Panel>
        <Panel title="Payouts">
          <div className="space-y-4">
            <div><Label htmlFor="bank">Bank account</Label><Input id="bank" defaultValue="HDFC •••• 4421" className="mt-1.5 rounded-2xl" /></div>
            <div><Label htmlFor="cycle">Payout cycle</Label><Input id="cycle" defaultValue="Monthly, 1st" className="mt-1.5 rounded-2xl" /></div>
          </div>
        </Panel>
        <Panel title="Danger zone">
          <p className="text-sm text-muted-foreground">Pausing your studio hides your profile from the marketplace until you resume.</p>
          <button onClick={() => toast.error("Studio paused")} className="mt-4 rounded-full border border-destructive/40 px-5 py-2 text-sm font-semibold text-destructive hover:bg-destructive/5">
            Pause studio
          </button>
        </Panel>
      </div>
    </TailorShell>
  );
}
