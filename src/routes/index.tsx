import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, Sparkles, BadgeCheck, Star, ArrowRight, Bell, Tag } from "lucide-react";
import { MobileShell } from "@/components/MobileShell";
import { categories, tailors, trending, heroImages } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Stitch — Custom Tailoring Made Simple" },
      { name: "description", content: "Discover verified tailors, design outfits with AI, and get perfectly tailored clothing delivered to your door." },
      { property: "og:title", content: "Stitch — Custom Tailoring Made Simple" },
      { property: "og:description", content: "Discover verified tailors, design outfits with AI, and get perfectly tailored clothing delivered to your door." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <MobileShell>
      <header className="px-6 pt-14 flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Good morning</p>
          <h1 className="text-2xl font-bold tracking-tight">Hey, Alex ✨</h1>
        </div>
        <Link to="/profile" className="w-11 h-11 rounded-full bg-secondary grid place-items-center hover:bg-accent transition">
          <Bell className="w-5 h-5" />
        </Link>
      </header>

      <div className="px-6 mt-6">
        <Link
          to="/tailors"
          className="flex items-center gap-3 bg-secondary rounded-full pl-5 pr-2 py-2 border-2 border-primary/20 hover:border-primary/40 transition"
        >
          <Search className="w-5 h-5 text-primary" />
          <span className="flex-1 text-muted-foreground text-sm">Search tailors, styles…</span>
          <span className="w-9 h-9 rounded-full bg-primary grid place-items-center">
            <Sparkles className="w-4 h-4 text-primary-foreground" />
          </span>
        </Link>
      </div>

      {/* Hero promo */}
      <section className="px-6 mt-6">
        <Link
          to="/designer"
          className="block relative overflow-hidden rounded-[28px] bg-primary text-primary-foreground p-6 shadow-[var(--shadow-glow)] active:scale-[0.99] transition"
        >
          <div className="relative z-10 max-w-[62%]">
            <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur rounded-full px-3 py-1 text-xs font-medium mb-3">
              <Sparkles className="w-3 h-3" /> New · AI Designer
            </div>
            <h2 className="text-2xl font-bold leading-tight">Design your dream outfit</h2>
            <p className="text-sm text-white/85 mt-1.5">Upload fabric. Get realistic previews in seconds.</p>
            <div className="mt-4 inline-flex items-center gap-2 bg-white text-primary rounded-full px-4 py-2 text-sm font-semibold">
              Try it now <ArrowRight className="w-4 h-4" />
            </div>
          </div>
          <img
            src={heroImages.design1}
            alt=""
            className="absolute -right-6 -bottom-4 w-40 h-52 object-cover rounded-3xl rotate-6 shadow-2xl"
          />
        </Link>
      </section>

      {/* Categories */}
      <section className="mt-8">
        <div className="px-6 flex items-baseline justify-between mb-3">
          <h3 className="text-lg font-bold">Categories</h3>
          <span className="text-sm text-primary font-medium">See all</span>
        </div>
        <div className="flex gap-3 overflow-x-auto px-6 pb-2 scrollbar-hide">
          {categories.map((c) => (
            <Link
              key={c.name}
              to="/tailors"
              className="flex-shrink-0 w-28 group"
            >
              <div className="w-28 h-32 rounded-3xl overflow-hidden bg-secondary mb-2 group-active:scale-95 transition">
                <img src={c.image} alt={c.name} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <p className="text-sm font-semibold truncate">{c.name}</p>
              <p className="text-xs text-muted-foreground">{c.count} styles</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured tailors */}
      <section className="mt-8">
        <div className="px-6 flex items-baseline justify-between mb-3">
          <h3 className="text-lg font-bold">Verified tailors</h3>
          <Link to="/tailors" className="text-sm text-primary font-medium">See all</Link>
        </div>
        <div className="flex gap-4 overflow-x-auto px-6 pb-2 scrollbar-hide">
          {tailors.map((t) => (
            <Link
              key={t.id}
              to="/tailors/$id"
              params={{ id: t.id }}
              className="flex-shrink-0 w-64 rounded-[28px] bg-card shadow-[var(--shadow-card)] overflow-hidden border border-border/50 active:scale-[0.98] transition"
            >
              <div className="relative h-40 bg-secondary">
                <img src={t.photo} alt={t.name} className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute top-3 right-3 bg-white rounded-full px-2.5 py-1 flex items-center gap-1 shadow">
                  <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-bold">{t.rating}</span>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-1.5">
                  <p className="font-bold truncate">{t.name}</p>
                  {t.verified && <BadgeCheck className="w-4 h-4 text-primary flex-shrink-0" />}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{t.specialty}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs text-muted-foreground">{t.experience} yrs · {t.orders}+ orders</span>
                  <span className="text-sm font-bold text-primary">${t.price}+</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Promo banner */}
      <section className="px-6 mt-8">
        <div className="rounded-[24px] bg-secondary p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary/15 grid place-items-center flex-shrink-0">
            <Tag className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-sm">50% off your first order</p>
            <p className="text-xs text-muted-foreground">Use code STITCH50 at checkout</p>
          </div>
        </div>
      </section>

      {/* Trending */}
      <section className="mt-8 mb-6">
        <div className="px-6 flex items-baseline justify-between mb-3">
          <h3 className="text-lg font-bold">Trending designs</h3>
        </div>
        <div className="px-6 grid grid-cols-2 gap-3">
          {trending.map((d, i) => (
            <Link
              to="/designer"
              key={i}
              className={`relative rounded-3xl overflow-hidden bg-secondary ${i === 0 ? "col-span-2 h-56" : "h-40"}`}
            >
              <img src={d.image} alt={d.title} className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <span className="inline-block bg-white/20 backdrop-blur text-white text-[10px] font-semibold uppercase tracking-wider rounded-full px-2 py-0.5 mb-1">
                  {d.tag}
                </span>
                <p className="text-white font-bold text-sm">{d.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </MobileShell>
  );
}
