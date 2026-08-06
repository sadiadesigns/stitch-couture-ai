import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { DollarSign, Wallet, Clock, Percent } from "lucide-react";
import { AdminShell } from "@/components/web/nav";
import { PageTitle } from "@/components/web/WebShell";
import { StatCard, Panel, Pill, statusTone } from "@/components/web/kit";
import { payouts, orders } from "@/lib/web-data";

export const Route = createFileRoute("/app/admin/payments")({
  head: () => ({
    meta: [
      { title: "Payments & Payouts — Stitch Admin" },
      { name: "description", content: "Track platform transactions, commission and tailor payout approvals." },
      { property: "og:title", content: "Payments & Payouts — Stitch Admin" },
      { property: "og:description", content: "Track platform transactions, commission and tailor payout approvals." },
    ],
  }),
  component: PaymentsPage,
});

function PaymentsPage() {
  return (
    <AdminShell>
      <PageTitle title="Payments" subtitle="Transactions, commission and payouts" />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={DollarSign} label="Gross volume" value="$38,900" delta="August 2026" accent />
        <StatCard icon={Percent} label="Platform commission" value="$5,835" delta="15% take rate" />
        <StatCard icon={Wallet} label="Paid to tailors" value="$29,120" delta="42 payouts" />
        <StatCard icon={Clock} label="Pending payouts" value="$3,945" delta="awaiting approval" />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.1fr_1fr]">
        <Panel title="Tailor payouts">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="py-3 pr-4 font-semibold">Reference</th>
                  <th className="py-3 pr-4 font-semibold">Date</th>
                  <th className="py-3 pr-4 font-semibold">Amount</th>
                  <th className="py-3 pr-4 font-semibold">Status</th>
                  <th className="py-3 text-right font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {payouts.map((p) => (
                  <tr key={p.id} className="hover:bg-secondary/50">
                    <td className="py-3 pr-4 font-semibold">{p.id}</td>
                    <td className="py-3 pr-4 text-muted-foreground">{p.date}</td>
                    <td className="py-3 pr-4 font-semibold">${p.amount.toLocaleString()}</td>
                    <td className="py-3 pr-4"><Pill tone={statusTone(p.status)}>{p.status}</Pill></td>
                    <td className="py-3 text-right">
                      <button onClick={() => toast.success(`${p.id} approved for release`)} className="rounded-full border border-border px-4 py-1.5 text-sm font-medium hover:bg-secondary">
                        Approve
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <Panel title="Recent transactions">
          <ul className="divide-y divide-border">
            {orders.map((o) => (
              <li key={o.id} className="flex items-center gap-3 py-3">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{o.item}</p>
                  <p className="truncate text-xs text-muted-foreground">{o.customer} · {o.id} · {o.placed}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">${o.amount}</p>
                  <p className="text-xs text-muted-foreground">fee ${Math.round(o.amount * 0.15)}</p>
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </AdminShell>
  );
}
