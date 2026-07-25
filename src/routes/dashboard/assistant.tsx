import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, MapPin, Clock, Check, Navigation } from "lucide-react";

export const Route = createFileRoute("/dashboard/assistant")({
  head: () => ({
    meta: [
      { title: "Assistant dashboard — Stitch" },
      { name: "description", content: "Assistant routes, appointments, and fabric collections for Stitch home visits." },
    ],
  }),
  component: AssistantDash,
});

const stops = [
  { time: "10:00 AM", name: "Alex Chen", addr: "142 Linking Rd, Bandra W.", task: "Measurements + fabric pickup", eta: "12 min", status: "next" },
  { time: "11:30 AM", name: "Priya Menon", addr: "88 Hill Rd, Bandra", task: "Measurements", eta: "22 min" },
  { time: "1:00 PM", name: "Kabir Rao", addr: "24 Turner Rd, Khar", task: "Fabric collection", eta: "35 min" },
  { time: "3:30 PM", name: "Ishaan V.", addr: "5 Pali Naka, Bandra", task: "Measurements", eta: "48 min" },
];

function AssistantDash() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-md min-h-screen pb-10">
        <header className="px-6 pt-14 flex items-center gap-3">
          <Link to="/profile" className="w-10 h-10 rounded-full bg-secondary grid place-items-center"><ChevronLeft className="w-5 h-5" /></Link>
          <div className="flex-1">
            <p className="text-xs text-muted-foreground">Today's route</p>
            <h1 className="text-xl font-bold">Aisha's day</h1>
          </div>
          <button className="px-4 h-10 rounded-full bg-primary text-primary-foreground text-sm font-semibold flex items-center gap-1.5">
            <Navigation className="w-4 h-4" /> Start
          </button>
        </header>

        <div className="px-6 mt-6 grid grid-cols-3 gap-3">
          {[
            { v: "4", l: "Stops" },
            { v: "3", l: "Completed" },
            { v: "18 km", l: "Route" },
          ].map((s) => (
            <div key={s.l} className="bg-secondary rounded-2xl p-3 text-center">
              <p className="text-lg font-bold">{s.v}</p>
              <p className="text-xs text-muted-foreground">{s.l}</p>
            </div>
          ))}
        </div>

        <section className="px-6 mt-8">
          <h3 className="text-lg font-bold mb-3">Appointments</h3>
          <div className="space-y-3">
            {stops.map((s, i) => (
              <div
                key={i}
                className={`p-4 rounded-2xl border transition ${
                  s.status === "next" ? "bg-primary-soft border-primary/30" : "bg-card border-border/50"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="text-sm font-bold">{s.time}</span>
                    {s.status === "next" && (
                      <span className="text-[10px] bg-primary text-primary-foreground px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider">Next</span>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">{s.eta}</span>
                </div>
                <p className="font-semibold text-sm">{s.name}</p>
                <div className="flex items-start gap-1.5 mt-1 text-xs text-muted-foreground">
                  <MapPin className="w-3 h-3 mt-0.5 flex-shrink-0" />
                  <span>{s.addr}</span>
                </div>
                <p className="text-xs mt-2 font-medium text-primary">{s.task}</p>
                {s.status === "next" && (
                  <div className="flex gap-2 mt-3">
                    <button className="flex-1 h-10 rounded-full bg-white text-foreground font-semibold text-xs border border-border">Navigate</button>
                    <button className="flex-1 h-10 rounded-full bg-primary text-primary-foreground font-semibold text-xs flex items-center justify-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Mark done
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
