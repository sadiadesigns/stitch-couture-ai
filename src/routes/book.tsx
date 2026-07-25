import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Calendar, Clock, MapPin, Check } from "lucide-react";
import { MobileShell, PageHeader } from "@/components/MobileShell";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Book home measurement — Stitch" },
      { name: "description", content: "Schedule a home visit with a Stitch assistant to take your measurements." },
    ],
  }),
  component: Book,
});

function Book() {
  const nav = useNavigate();
  const [done, setDone] = useState(false);
  const [time, setTime] = useState("10:00 AM");

  if (done) {
    return (
      <MobileShell hideNav>
        <div className="min-h-screen flex flex-col items-center justify-center px-8 text-center">
          <div className="w-24 h-24 rounded-full bg-primary grid place-items-center shadow-[var(--shadow-glow)] mb-6">
            <Check className="w-12 h-12 text-primary-foreground" strokeWidth={3} />
          </div>
          <h1 className="text-3xl font-bold">You're booked!</h1>
          <p className="text-muted-foreground mt-2 max-w-xs">
            Aisha will visit you tomorrow at {time}. We'll send a reminder 30 minutes before.
          </p>
          <button
            onClick={() => nav({ to: "/orders" })}
            className="mt-8 w-full max-w-xs h-14 rounded-full bg-primary text-primary-foreground font-semibold shadow-[var(--shadow-glow)]"
          >
            Track your order
          </button>
          <button onClick={() => nav({ to: "/" })} className="mt-3 text-sm text-muted-foreground font-medium">
            Back to home
          </button>
        </div>
      </MobileShell>
    );
  }

  return (
    <MobileShell hideNav>
      <PageHeader title="Home measurement" subtitle="A Stitch assistant will come to you" back />

      <div className="px-6 space-y-6">
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="w-4 h-4 text-primary" />
            <p className="font-semibold text-sm">Pick a date</p>
          </div>
          <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-6 px-6 pb-1">
            {["Today", "Tue 25", "Wed 26", "Thu 27", "Fri 28", "Sat 29", "Sun 30"].map((d, i) => (
              <button
                key={d}
                className={`flex-shrink-0 flex flex-col items-center px-5 py-3 rounded-2xl min-w-[72px] ${
                  i === 1 ? "bg-primary text-primary-foreground" : "bg-secondary"
                }`}
              >
                <span className="text-xs opacity-80">{d.split(" ")[0]}</span>
                <span className="font-bold text-lg">{d.split(" ")[1] ?? "•"}</span>
              </button>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-4 h-4 text-primary" />
            <p className="font-semibold text-sm">Time slot</p>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {["9:00 AM", "10:00 AM", "11:30 AM", "1:00 PM", "3:00 PM", "5:00 PM"].map((t) => (
              <button
                key={t}
                onClick={() => setTime(t)}
                className={`h-12 rounded-2xl text-sm font-semibold transition ${
                  time === t ? "bg-foreground text-background" : "bg-secondary"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="w-4 h-4 text-primary" />
            <p className="font-semibold text-sm">Address</p>
          </div>
          <div className="bg-secondary rounded-2xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/15 grid place-items-center">
              <MapPin className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm">Home</p>
              <p className="text-xs text-muted-foreground">142 Linking Rd, Bandra West</p>
            </div>
            <button className="text-xs text-primary font-semibold">Change</button>
          </div>
        </section>

        <section>
          <p className="font-semibold text-sm mb-2">Notes for the assistant (optional)</p>
          <textarea
            placeholder="Gate code, parking notes, style preferences…"
            rows={3}
            className="w-full bg-secondary rounded-2xl p-4 text-sm outline-none resize-none placeholder:text-muted-foreground"
          />
        </section>

        <button
          onClick={() => setDone(true)}
          className="w-full h-14 rounded-full bg-primary text-primary-foreground font-semibold shadow-[var(--shadow-glow)]"
        >
          Confirm booking
        </button>
      </div>
    </MobileShell>
  );
}
