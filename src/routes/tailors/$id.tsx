import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { BadgeCheck, Star, ChevronLeft, Share2, Heart, Award, Clock, Package } from "lucide-react";
import { tailors } from "@/lib/mock-data";

export const Route = createFileRoute("/tailors/$id")({
  head: ({ params }) => {
    const t = tailors.find((t) => t.id === params.id);
    return {
      meta: [
        { title: t ? `${t.name} — Stitch` : "Tailor — Stitch" },
        { name: "description", content: t ? `Book ${t.name}, a verified ${t.specialty.toLowerCase()} tailor on Stitch.` : "Verified tailor profile on Stitch." },
      ],
    };
  },
  loader: ({ params }) => {
    const t = tailors.find((t) => t.id === params.id);
    if (!t) throw notFound();
    return t;
  },
  component: TailorDetail,
});

function TailorDetail() {
  const t = Route.useLoaderData() as NonNullable<ReturnType<typeof tailors.find>>;
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-md min-h-screen relative pb-28">
        <div className="relative h-[45vh] overflow-hidden">
          <img src={t.photo} alt={t.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-background" />
          <div className="absolute top-14 left-6 right-6 flex justify-between">
            <Link to="/tailors" className="w-10 h-10 rounded-full bg-white/90 backdrop-blur grid place-items-center">
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-full bg-white/90 backdrop-blur grid place-items-center"><Heart className="w-5 h-5" /></button>
              <button className="w-10 h-10 rounded-full bg-white/90 backdrop-blur grid place-items-center"><Share2 className="w-5 h-5" /></button>
            </div>
          </div>
        </div>

        <div className="px-6 -mt-8 relative">
          <div className="bg-card rounded-[28px] p-6 shadow-[var(--shadow-card)] border border-border/50">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-1.5">
                  <h1 className="text-2xl font-bold">{t.name}</h1>
                  {t.verified && <BadgeCheck className="w-5 h-5 text-primary" />}
                </div>
                <p className="text-sm text-muted-foreground mt-0.5">{t.specialty}</p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold">{t.rating}</span>
                </div>
                <p className="text-xs text-muted-foreground">{t.reviews} reviews</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mt-5">
              {[
                { icon: Award, val: `${t.experience}y`, lbl: "Experience" },
                { icon: Package, val: `${t.orders}+`, lbl: "Orders" },
                { icon: Clock, val: "24h", lbl: "Response" },
              ].map(({ icon: I, val, lbl }) => (
                <div key={lbl} className="bg-secondary rounded-2xl p-3 text-center">
                  <I className="w-4 h-4 mx-auto text-primary mb-1" />
                  <p className="font-bold text-sm">{val}</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{lbl}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <section className="px-6 mt-8">
          <h3 className="text-lg font-bold mb-3">Portfolio</h3>
          <div className="grid grid-cols-2 gap-3">
            {t.portfolio.map((p: string, i: number) => (
              <div key={i} className={`rounded-3xl overflow-hidden bg-secondary ${i === 0 ? "col-span-2 aspect-[4/3]" : "aspect-square"}`}>
                <img src={p} alt="" className="w-full h-full object-cover" loading="lazy" />
              </div>
            ))}
          </div>
        </section>

        <section className="px-6 mt-8">
          <h3 className="text-lg font-bold mb-3">Available slots</h3>
          <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-6 px-6 pb-2">
            {["Today", "Tomorrow", "Wed 26", "Thu 27", "Fri 28", "Sat 29"].map((d, i) => (
              <button
                key={d}
                className={`flex-shrink-0 flex flex-col items-center px-5 py-3 rounded-2xl min-w-20 ${
                  i === 1 ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"
                }`}
              >
                <span className="text-xs font-medium opacity-80">{d.split(" ")[0]}</span>
                <span className="font-bold text-lg mt-0.5">{d.split(" ")[1] ?? (i === 0 ? "Now" : "AM")}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="px-6 mt-8">
          <h3 className="text-lg font-bold mb-3">Recent reviews</h3>
          <div className="space-y-3">
            {[
              { name: "Priya M.", text: "Beautiful stitching and perfect fit. Delivered ahead of schedule.", rating: 5 },
              { name: "Kabir R.", text: "The AI preview matched the final outfit almost exactly. Impressed.", rating: 5 },
            ].map((r, i) => (
              <div key={i} className="bg-card rounded-2xl p-4 border border-border/50">
                <div className="flex items-center justify-between mb-1.5">
                  <p className="font-semibold text-sm">{r.name}</p>
                  <div className="flex">
                    {Array.from({ length: r.rating }).map((_, j) => (
                      <Star key={j} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{r.text}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-sm z-50">
          <div className="bg-card rounded-full p-2 flex items-center gap-3 shadow-[0_20px_60px_-15px_oklch(0_0_0/0.25)] border border-border">
            <div className="pl-4 flex-1">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Starting from</p>
              <p className="font-bold text-lg leading-none">${t.price}</p>
            </div>
            <Link
              to="/book"
              className="flex-1 h-14 rounded-full bg-primary text-primary-foreground font-semibold flex items-center justify-center shadow-[var(--shadow-glow)]"
            >
              Book tailor
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
