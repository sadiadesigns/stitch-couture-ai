import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Mail, Apple } from "lucide-react";
import { heroImages } from "@/lib/mock-data";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — Stitch" },
      { name: "description", content: "Sign in to Stitch to book tailors, design outfits with AI, and track your orders." },
    ],
  }),
  component: Auth,
});

function Auth() {
  const nav = useNavigate();
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-md min-h-screen flex flex-col">
        <div className="relative h-[52vh] overflow-hidden rounded-b-[40px]">
          <img src={heroImages.design1} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/10 to-transparent" />
          <div className="absolute top-14 left-6">
            <span className="text-white font-black text-4xl tracking-tight">stitch<span className="text-primary-foreground">.</span></span>
          </div>
          <div className="absolute bottom-8 left-6 right-6">
            <h1 className="text-white text-4xl font-bold leading-tight">Custom tailoring,<br/>made simple.</h1>
          </div>
        </div>
        <div className="flex-1 px-6 pt-8 pb-10 flex flex-col gap-3">
          <button
            onClick={() => nav({ to: "/" })}
            className="w-full h-14 rounded-full bg-primary text-primary-foreground font-semibold text-base flex items-center justify-center gap-2 shadow-[var(--shadow-glow)] active:scale-[0.98] transition"
          >
            <Mail className="w-5 h-5" /> Continue with Email
          </button>
          <button
            onClick={() => nav({ to: "/" })}
            className="w-full h-14 rounded-full bg-foreground text-background font-semibold text-base flex items-center justify-center gap-2 active:scale-[0.98] transition"
          >
            <Apple className="w-5 h-5" /> Continue with Apple
          </button>
          <button
            onClick={() => nav({ to: "/" })}
            className="w-full h-14 rounded-full bg-secondary text-foreground font-semibold text-base flex items-center justify-center gap-2 border border-border active:scale-[0.98] transition"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.5 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.9a5.05 5.05 0 0 1-2.2 3.31v2.75h3.55c2.08-1.92 3.28-4.74 3.28-8.07z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.68l-3.55-2.75c-.98.66-2.24 1.05-3.73 1.05-2.87 0-5.3-1.94-6.17-4.54H2.18v2.84A11 11 0 0 0 12 23z"/><path fill="#FBBC05" d="M5.83 14.08a6.6 6.6 0 0 1 0-4.16V7.08H2.18a11 11 0 0 0 0 9.84l3.65-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.2 1.65l3.15-3.15C17.45 2.09 14.97 1 12 1a11 11 0 0 0-9.82 6.08l3.65 2.84C6.7 7.32 9.13 5.38 12 5.38z"/></svg>
            Continue with Google
          </button>
          <p className="text-center text-xs text-muted-foreground mt-4 leading-relaxed">
            By continuing, you agree to our <span className="text-foreground font-medium">Terms</span> and <span className="text-foreground font-medium">Privacy Policy</span>.
          </p>
          <Link to="/" className="text-center text-sm text-primary font-semibold mt-2">
            Skip for now →
          </Link>
        </div>
      </div>
    </div>
  );
}
