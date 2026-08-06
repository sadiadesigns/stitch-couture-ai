import type { ReactNode } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Check } from "lucide-react";

export function StatCard({
  icon: Icon,
  label,
  value,
  delta,
  accent = false,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  delta?: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-3xl border p-5 ${
        accent
          ? "border-transparent bg-primary text-primary-foreground shadow-[var(--shadow-glow)]"
          : "border-border bg-card shadow-[var(--shadow-soft)]"
      }`}
    >
      <div className="flex items-center justify-between">
        <span className={`text-xs font-medium uppercase tracking-wider ${accent ? "opacity-80" : "text-muted-foreground"}`}>
          {label}
        </span>
        <span className={`grid h-9 w-9 place-items-center rounded-full ${accent ? "bg-white/20" : "bg-primary-soft"}`}>
          <Icon className={`h-4 w-4 ${accent ? "" : "text-primary"}`} />
        </span>
      </div>
      <p className="mt-3 text-3xl font-bold tracking-tight">{value}</p>
      {delta && <p className={`mt-1 text-xs ${accent ? "opacity-80" : "text-muted-foreground"}`}>{delta}</p>}
    </div>
  );
}

export function Panel({
  title,
  action,
  children,
  className = "",
}: {
  title?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`rounded-3xl border border-border bg-card shadow-[var(--shadow-soft)] ${className}`}>
      {(title || action) && (
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4">
          {title && <h2 className="text-base font-semibold">{title}</h2>}
          {action}
        </div>
      )}
      <div className="p-5">{children}</div>
    </section>
  );
}

const tones: Record<string, string> = {
  neutral: "bg-secondary text-secondary-foreground",
  brand: "bg-primary-soft text-primary",
  success: "bg-[color-mix(in_oklab,var(--success)_14%,transparent)] text-[var(--success)]",
  warning: "bg-amber-100 text-amber-700",
  danger: "bg-[color-mix(in_oklab,var(--destructive)_12%,transparent)] text-destructive",
};

export function Pill({ children, tone = "neutral" }: { children: ReactNode; tone?: keyof typeof tones }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${tones[tone]}`}>
      {children}
    </span>
  );
}

export function statusTone(status: string): keyof typeof tones {
  const s = status.toLowerCase();
  if (["delivered", "completed", "approved", "resolved", "active"].some((k) => s.includes(k))) return "success";
  if (["pending", "review", "quality", "rescheduled", "more info"].some((k) => s.includes(k))) return "warning";
  if (["cancelled", "rejected", "suspended", "open", "high"].some((k) => s.includes(k))) return "danger";
  if (["new", "accepted", "tailoring", "ready", "scheduled", "in progress"].some((k) => s.includes(k))) return "brand";
  return "neutral";
}

export function EmptyState({ title, description, action }: { title: string; description: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border px-6 py-14 text-center">
      <div className="mb-3 grid h-12 w-12 place-items-center rounded-full bg-primary-soft text-primary">✦</div>
      <p className="text-base font-semibold">{title}</p>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export function TableSkeleton({ rows = 5, cols = 5 }: { rows?: number; cols?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="flex gap-4">
          {Array.from({ length: cols }).map((_, c) => (
            <Skeleton key={c} className="h-9 flex-1 rounded-xl" />
          ))}
        </div>
      ))}
    </div>
  );
}

export function StageTracker({ stages, current }: { stages: readonly string[]; current: string }) {
  const idx = stages.indexOf(current);
  return (
    <ol className="flex flex-col gap-0 md:flex-row md:items-start md:gap-0">
      {stages.map((stage, i) => {
        const done = i < idx;
        const active = i === idx;
        return (
          <li key={stage} className="flex flex-1 gap-3 md:flex-col md:items-center md:text-center">
            <div className="flex flex-col items-center md:w-full md:flex-row">
              <span className="hidden h-0.5 flex-1 md:block" style={{ background: i === 0 ? "transparent" : "var(--border)" }} />
              <span
                className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 text-xs font-bold ${
                  done || active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-muted-foreground"
                }`}
              >
                {done ? <Check className="h-4 w-4" strokeWidth={3} /> : i + 1}
              </span>
              <span className="hidden h-0.5 flex-1 md:block" style={{ background: i === stages.length - 1 ? "transparent" : done ? "var(--primary)" : "var(--border)" }} />
              <span className="w-0.5 flex-1 md:hidden" style={{ background: i === stages.length - 1 ? "transparent" : done ? "var(--primary)" : "var(--border)", minHeight: 24 }} />
            </div>
            <p className={`pb-6 text-xs font-medium md:px-1 md:pb-0 md:pt-2 ${active ? "text-primary" : done ? "text-foreground" : "text-muted-foreground"}`}>
              {stage}
            </p>
          </li>
        );
      })}
    </ol>
  );
}

export function Toolbar({ children }: { children: ReactNode }) {
  return <div className="mb-4 flex flex-wrap items-center gap-3">{children}</div>;
}

export function Pagination({ page, pages, onChange }: { page: number; pages: number; onChange: (p: number) => void }) {
  return (
    <div className="mt-4 flex items-center justify-between gap-3 text-sm">
      <p className="text-muted-foreground">
        Page {page} of {Math.max(pages, 1)}
      </p>
      <div className="flex gap-2">
        <button
          onClick={() => onChange(Math.max(1, page - 1))}
          disabled={page <= 1}
          className="rounded-full border border-border px-4 py-1.5 font-medium disabled:opacity-40 hover:bg-secondary"
        >
          Previous
        </button>
        <button
          onClick={() => onChange(Math.min(pages, page + 1))}
          disabled={page >= pages}
          className="rounded-full border border-border px-4 py-1.5 font-medium disabled:opacity-40 hover:bg-secondary"
        >
          Next
        </button>
      </div>
    </div>
  );
}
