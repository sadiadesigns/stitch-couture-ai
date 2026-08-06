import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Star } from "lucide-react";
import { TailorShell } from "@/components/web/nav";
import { PageTitle } from "@/components/web/WebShell";
import { Panel, EmptyState } from "@/components/web/kit";
import { reviews } from "@/lib/web-data";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/app/tailor/reviews")({
  head: () => ({
    meta: [
      { title: "Reviews — Stitch Tailor Workspace" },
      { name: "description", content: "Read and filter customer ratings and reviews for your tailoring studio." },
      { property: "og:title", content: "Reviews — Stitch Tailor Workspace" },
      { property: "og:description", content: "Read and filter customer ratings and reviews for your tailoring studio." },
    ],
  }),
  component: ReviewsPage,
});

function Stars({ n }: { n: number }) {
  return (
    <span className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`h-4 w-4 ${i < n ? "fill-primary text-primary" : "text-border"}`} />
      ))}
    </span>
  );
}

function ReviewsPage() {
  const [filter, setFilter] = useState("all");
  const rows = reviews.filter((r) => (filter === "all" ? true : r.rating === Number(filter)));
  const avg = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <TailorShell>
      <PageTitle title="Reviews" subtitle={`${avg} average from ${reviews.length} reviews`} />

      <div className="grid gap-6 xl:grid-cols-[1fr_2fr]">
        <Panel title="Rating breakdown">
          <p className="text-5xl font-bold">{avg}</p>
          <div className="mt-2"><Stars n={Math.round(Number(avg))} /></div>
          <div className="mt-5 space-y-2">
            {[5, 4, 3, 2, 1].map((r) => {
              const count = reviews.filter((x) => x.rating === r).length;
              const pct = (count / reviews.length) * 100;
              return (
                <div key={r} className="flex items-center gap-3 text-sm">
                  <span className="w-3 text-muted-foreground">{r}</span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-secondary">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="w-6 text-right text-muted-foreground">{count}</span>
                </div>
              );
            })}
          </div>
        </Panel>

        <Panel
          title="All reviews"
          action={
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="h-9 w-[160px] rounded-full"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All ratings</SelectItem>
                {[5, 4, 3, 2, 1].map((r) => <SelectItem key={r} value={String(r)}>{r} stars</SelectItem>)}
              </SelectContent>
            </Select>
          }
        >
          {rows.length === 0 ? (
            <EmptyState title="No reviews at this rating" description="Try a different rating filter to see more feedback." />
          ) : (
            <ul className="space-y-4">
              {rows.map((r) => (
                <li key={r.id} className="rounded-2xl border border-border/60 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <span className="grid h-9 w-9 place-items-center rounded-full bg-primary-soft text-xs font-bold text-primary">
                        {r.customer[0]}
                      </span>
                      <div>
                        <p className="text-sm font-semibold">{r.customer}</p>
                        <p className="text-xs text-muted-foreground">{r.order} · {r.date}</p>
                      </div>
                    </div>
                    <Stars n={r.rating} />
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">{r.text}</p>
                </li>
              ))}
            </ul>
          )}
        </Panel>
      </div>
    </TailorShell>
  );
}
