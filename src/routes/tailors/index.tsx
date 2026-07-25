import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, SlidersHorizontal, BadgeCheck, Star, MapPin } from "lucide-react";
import { MobileShell, PageHeader } from "@/components/MobileShell";
import { tailors } from "@/lib/mock-data";

export const Route = createFileRoute("/tailors/")({
  head: () => ({
    meta: [
      { title: "Verified tailors — Stitch" },
      { name: "description", content: "Browse Stitch's curated marketplace of verified master tailors with portfolios, ratings, and available slots." },
    ],
  }),
  component: TailorsList,
});

const filters = ["All", "Menswear", "Bridal", "Suits", "Ethnic", "Nearby"];

function TailorsList() {
  return (
    <MobileShell>
      <PageHeader title="Find a tailor" subtitle="Verified. Reviewed. Award-winning." />

      <div className="px-6">
        <div className="flex items-center gap-2">
          <div className="flex-1 flex items-center gap-3 bg-secondary rounded-full px-5 h-14">
            <Search className="w-5 h-5 text-muted-foreground" />
            <input placeholder="Search by name or style" className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground" />
          </div>
          <button className="w-14 h-14 rounded-full bg-primary text-primary-foreground grid place-items-center shadow-[var(--shadow-glow)]">
            <SlidersHorizontal className="w-5 h-5" />
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto py-4 -mx-6 px-6 scrollbar-hide">
          {filters.map((f, i) => (
            <button
              key={f}
              className={`flex-shrink-0 px-5 h-10 rounded-full text-sm font-semibold transition ${
                i === 0 ? "bg-foreground text-background" : "bg-secondary text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 space-y-4 mt-2">
        {tailors.concat(tailors).map((t, i) => (
          <Link
            key={i}
            to="/tailors/$id"
            params={{ id: t.id }}
            className="flex gap-4 p-3 bg-card rounded-[28px] shadow-[var(--shadow-soft)] border border-border/50 active:scale-[0.99] transition"
          >
            <div className="w-24 h-28 rounded-2xl overflow-hidden bg-secondary flex-shrink-0">
              <img src={t.photo} alt={t.name} className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="flex-1 min-w-0 py-1">
              <div className="flex items-center gap-1">
                <p className="font-bold truncate">{t.name}</p>
                {t.verified && <BadgeCheck className="w-4 h-4 text-primary flex-shrink-0" />}
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">{t.specialty}</p>
              <div className="flex items-center gap-1 mt-1.5">
                <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                <span className="text-xs font-semibold">{t.rating}</span>
                <span className="text-xs text-muted-foreground">({t.reviews})</span>
              </div>
              <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                <MapPin className="w-3 h-3" /> {t.location}
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-xs bg-primary-soft text-primary px-2.5 py-1 rounded-full font-semibold">Available today</span>
                <span className="text-sm font-bold text-primary">${t.price}+</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </MobileShell>
  );
}
