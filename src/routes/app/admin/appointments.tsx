import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { AdminShell } from "@/components/web/nav";
import { PageTitle } from "@/components/web/WebShell";
import { Panel, Pill, statusTone } from "@/components/web/kit";
import { appointments, assistants } from "@/lib/web-data";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/app/admin/appointments")({
  head: () => ({
    meta: [
      { title: "Appointment Management — Stitch Admin" },
      { name: "description", content: "Assign home measurement assistants, track visits and review schedules." },
      { property: "og:title", content: "Appointment Management — Stitch Admin" },
      { property: "og:description", content: "Assign home measurement assistants, track visits and review schedules." },
    ],
  }),
  component: AdminAppointments,
});

function AdminAppointments() {
  return (
    <AdminShell>
      <PageTitle title="Appointments" subtitle="Home measurement visits and assistant coverage" />

      <div className="grid gap-4 sm:grid-cols-3">
        {assistants.map((a) => (
          <Panel key={a.name}>
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate font-semibold">{a.name}</p>
                <p className="text-xs text-muted-foreground">{a.zone}</p>
              </div>
              <Pill tone="brand">{a.rating} ★</Pill>
            </div>
            <div className="mt-4 flex gap-3">
              <div className="flex-1 rounded-2xl bg-secondary/70 p-3">
                <p className="text-xs text-muted-foreground">Today</p>
                <p className="text-xl font-bold">{a.today}</p>
              </div>
              <div className="flex-1 rounded-2xl bg-secondary/70 p-3">
                <p className="text-xs text-muted-foreground">This week</p>
                <p className="text-xl font-bold">{a.week}</p>
              </div>
            </div>
          </Panel>
        ))}
      </div>

      <div className="mt-6">
        <Panel title="All appointments">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="py-3 pr-4 font-semibold">Ref</th>
                  <th className="py-3 pr-4 font-semibold">Customer</th>
                  <th className="py-3 pr-4 font-semibold">Address</th>
                  <th className="py-3 pr-4 font-semibold">Date & time</th>
                  <th className="py-3 pr-4 font-semibold">Assistant</th>
                  <th className="py-3 pr-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {appointments.map((a) => (
                  <tr key={a.id} className="hover:bg-secondary/50">
                    <td className="py-3 pr-4 font-semibold">{a.id}</td>
                    <td className="py-3 pr-4">{a.customer}</td>
                    <td className="py-3 pr-4 text-muted-foreground">{a.address}</td>
                    <td className="py-3 pr-4">{a.date} · {a.time}</td>
                    <td className="py-3 pr-4">
                      <Select defaultValue={a.assistant} onValueChange={(v) => toast.success(`${v} assigned to ${a.id}`)}>
                        <SelectTrigger className="h-9 w-[180px] rounded-full"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {assistants.map((x) => <SelectItem key={x.name} value={x.name}>{x.name}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="py-3 pr-4"><Pill tone={statusTone(a.status)}>{a.status}</Pill></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      </div>
    </AdminShell>
  );
}
