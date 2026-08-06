import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CalendarDays, List } from "lucide-react";
import { toast } from "sonner";
import { TailorShell } from "@/components/web/nav";
import { PageTitle } from "@/components/web/WebShell";
import { Panel, Pill, statusTone } from "@/components/web/kit";
import { appointments } from "@/lib/web-data";

export const Route = createFileRoute("/app/tailor/appointments")({
  head: () => ({
    meta: [
      { title: "Appointments — Stitch Tailor Workspace" },
      { name: "description", content: "Calendar and list views of every home measurement appointment for your studio." },
      { property: "og:title", content: "Appointments — Stitch Tailor Workspace" },
      { property: "og:description", content: "Calendar and list views of every home measurement appointment for your studio." },
    ],
  }),
  component: AppointmentsPage,
});

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function CalendarGrid() {
  // August 2026 starts on a Saturday (index 5 in a Mon-first grid)
  const offset = 5;
  const cells = Array.from({ length: 42 }, (_, i) => i - offset + 1).map((d) => (d >= 1 && d <= 31 ? d : null));
  return (
    <div>
      <div className="mb-2 grid grid-cols-7 gap-2 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {DAYS.map((d) => <div key={d}>{d}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {cells.map((d, i) => {
          const iso = d ? `2026-08-${String(d).padStart(2, "0")}` : "";
          const items = appointments.filter((a) => a.date === iso);
          return (
            <div key={i} className={`min-h-[96px] rounded-2xl border p-2 ${d ? "border-border bg-background" : "border-transparent"}`}>
              {d && <p className="text-xs font-semibold text-muted-foreground">{d}</p>}
              <div className="mt-1 space-y-1">
                {items.map((a) => (
                  <div key={a.id} className="truncate rounded-lg bg-primary-soft px-2 py-1 text-[11px] font-medium text-primary">
                    {a.time} {a.customer}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AppointmentsPage() {
  const [view, setView] = useState<"calendar" | "list">("calendar");

  return (
    <TailorShell>
      <PageTitle
        title="Appointments"
        subtitle="August 2026 · home measurement visits"
        action={
          <div className="inline-flex rounded-full border border-border bg-background p-1">
            {([["calendar", CalendarDays], ["list", List]] as const).map(([v, Icon]) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium capitalize ${view === v ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                <Icon className="h-4 w-4" /> {v}
              </button>
            ))}
          </div>
        }
      />

      {view === "calendar" ? (
        <Panel title="Calendar view"><CalendarGrid /></Panel>
      ) : (
        <Panel title="List view">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px] text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="py-3 pr-4 font-semibold">Customer</th>
                  <th className="py-3 pr-4 font-semibold">Address</th>
                  <th className="py-3 pr-4 font-semibold">Date</th>
                  <th className="py-3 pr-4 font-semibold">Time</th>
                  <th className="py-3 pr-4 font-semibold">Assistant</th>
                  <th className="py-3 pr-4 font-semibold">Status</th>
                  <th className="py-3 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {appointments.map((a) => (
                  <tr key={a.id} className="hover:bg-secondary/50">
                    <td className="py-3 pr-4 font-semibold">{a.customer}</td>
                    <td className="py-3 pr-4 text-muted-foreground">{a.address}</td>
                    <td className="py-3 pr-4">{a.date}</td>
                    <td className="py-3 pr-4">{a.time}</td>
                    <td className="py-3 pr-4">{a.assistant}</td>
                    <td className="py-3 pr-4"><Pill tone={statusTone(a.status)}>{a.status}</Pill></td>
                    <td className="py-3 text-right">
                      <button onClick={() => toast.success(`Reschedule request sent for ${a.id}`)} className="rounded-full border border-border px-4 py-1.5 text-sm font-medium hover:bg-secondary">
                        Reschedule
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      )}
    </TailorShell>
  );
}
