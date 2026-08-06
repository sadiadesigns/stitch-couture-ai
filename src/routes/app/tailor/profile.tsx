import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { TailorShell } from "@/components/web/nav";
import { PageTitle } from "@/components/web/WebShell";
import { Panel } from "@/components/web/kit";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { tailors } from "@/lib/mock-data";

export const Route = createFileRoute("/app/tailor/profile")({
  head: () => ({
    meta: [
      { title: "Studio Profile — Stitch Tailor Workspace" },
      { name: "description", content: "Edit your shop name, portfolio, services, pricing and working hours." },
      { property: "og:title", content: "Studio Profile — Stitch Tailor Workspace" },
      { property: "og:description", content: "Edit your shop name, portfolio, services, pricing and working hours." },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const t = tailors[0]!;
  return (
    <TailorShell>
      <PageTitle
        title="Studio profile"
        subtitle="This is what customers see in the Stitch marketplace"
        action={
          <button onClick={() => toast.success("Profile saved")} className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90">
            Save changes
          </button>
        }
      />

      <div className="grid gap-6 xl:grid-cols-[1fr_1.4fr]">
        <div className="space-y-6">
          <Panel title="Shop identity">
            <div className="flex items-center gap-4">
              <img src={t.photo} alt="" className="h-20 w-20 rounded-3xl object-cover" />
              <button onClick={() => toast.success("Photo upload ready")} className="rounded-full border border-border px-4 py-2 text-sm font-medium hover:bg-secondary">
                Change photo
              </button>
            </div>
            <div className="mt-5 space-y-4">
              <div><Label htmlFor="shop">Shop name</Label><Input id="shop" defaultValue="Arjun's Studio" className="mt-1.5 rounded-2xl" /></div>
              <div><Label htmlFor="exp">Experience (years)</Label><Input id="exp" type="number" defaultValue={t.experience} className="mt-1.5 rounded-2xl" /></div>
              <div><Label htmlFor="bio">About</Label><Textarea id="bio" rows={4} defaultValue="Bespoke menswear and panjabi specialist with a focus on hand-finished detail." className="mt-1.5 rounded-2xl" /></div>
            </div>
          </Panel>

          <Panel title="Working hours">
            <div className="space-y-3">
              {["Mon – Fri", "Saturday", "Sunday"].map((d, i) => (
                <div key={d} className="flex items-center justify-between gap-3">
                  <span className="text-sm font-medium">{d}</span>
                  <Input defaultValue={["9:00 AM – 8:00 PM", "10:00 AM – 6:00 PM", "Closed"][i]} className="h-9 w-52 rounded-full" />
                </div>
              ))}
            </div>
          </Panel>
        </div>

        <div className="space-y-6">
          <Panel title="Portfolio">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {t.portfolio.map((p, i) => (
                <img key={i} src={p} alt="" className="aspect-square w-full rounded-2xl object-cover" />
              ))}
              <button onClick={() => toast.success("Upload dialog ready")} className="grid aspect-square w-full place-items-center rounded-2xl border border-dashed border-border text-sm text-muted-foreground hover:bg-secondary">
                + Add
              </button>
            </div>
          </Panel>

          <Panel title="Services & pricing">
            <div className="space-y-3">
              {[
                ["Custom shirt", 49], ["Panjabi / kurta set", 79],
                ["Two-piece suit", 240], ["Blazer", 180], ["Alterations", 25],
              ].map(([name, price]) => (
                <div key={String(name)} className="flex items-center justify-between gap-3 rounded-2xl border border-border/60 px-4 py-3">
                  <span className="text-sm font-medium">{name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">$</span>
                    <Input defaultValue={String(price)} className="h-9 w-24 rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </TailorShell>
  );
}
