import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Upload, Sparkles, Check, RotateCw, Bookmark } from "lucide-react";
import { MobileShell, PageHeader } from "@/components/MobileShell";
import { heroImages } from "@/lib/mock-data";

export const Route = createFileRoute("/designer")({
  head: () => ({
    meta: [
      { title: "AI Outfit Designer — Stitch" },
      { name: "description", content: "Upload fabric and generate realistic outfit previews with the Stitch AI designer." },
    ],
  }),
  component: Designer,
});

const options = {
  "Outfit type": ["Kurta", "Shirt", "Blazer", "Dress", "Lehenga"],
  "Neck": ["Round", "V-neck", "Chinese", "Boat"],
  "Sleeve": ["Full", "Half", "3/4", "Sleeveless"],
  "Fit": ["Slim", "Regular", "Relaxed"],
  "Length": ["Short", "Regular", "Long"],
};

function Designer() {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<Record<string, string>>({
    "Outfit type": "Blazer", "Neck": "V-neck", "Sleeve": "Full", "Fit": "Slim", "Length": "Regular",
  });

  return (
    <MobileShell>
      <PageHeader title="AI Designer" subtitle="Fabric to finished outfit in seconds" />

      {/* Stepper */}
      <div className="px-6 flex gap-2 mb-6">
        {["Upload", "Customize", "Preview"].map((s, i) => (
          <div key={s} className="flex-1">
            <div className={`h-1.5 rounded-full ${i <= step ? "bg-primary" : "bg-secondary"}`} />
            <p className={`text-xs mt-1.5 font-medium ${i <= step ? "text-foreground" : "text-muted-foreground"}`}>{s}</p>
          </div>
        ))}
      </div>

      {step === 0 && (
        <div className="px-6 space-y-4">
          <button className="w-full aspect-[4/3] rounded-[28px] border-2 border-dashed border-primary/40 bg-primary-soft grid place-items-center relative overflow-hidden">
            <img src={heroImages.fabric} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" />
            <div className="relative text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground grid place-items-center mx-auto mb-3 shadow-[var(--shadow-glow)]">
                <Upload className="w-6 h-6" />
              </div>
              <p className="font-bold">Upload fabric photo</p>
              <p className="text-xs text-muted-foreground mt-1">Or drag & drop · JPG, PNG up to 20MB</p>
            </div>
          </button>

          <div className="bg-secondary rounded-3xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-primary" />
              <p className="font-semibold text-sm">AI detects automatically</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {["Color", "Texture", "Pattern", "Weave", "Sheen"].map((c) => (
                <span key={c} className="bg-white text-foreground text-xs font-medium px-3 py-1.5 rounded-full">{c}</span>
              ))}
            </div>
          </div>

          <button
            onClick={() => setStep(1)}
            className="w-full h-14 rounded-full bg-primary text-primary-foreground font-semibold shadow-[var(--shadow-glow)]"
          >
            Continue
          </button>
        </div>
      )}

      {step === 1 && (
        <div className="px-6 space-y-6">
          <div className="rounded-3xl bg-secondary p-4 flex items-center gap-3">
            <img src={heroImages.fabric} alt="" className="w-14 h-14 rounded-2xl object-cover" />
            <div className="flex-1">
              <p className="font-semibold text-sm">Emerald silk twill</p>
              <p className="text-xs text-muted-foreground">Detected · smooth weave</p>
            </div>
            <button className="text-xs text-primary font-semibold">Change</button>
          </div>

          {Object.entries(options).map(([label, opts]) => (
            <div key={label}>
              <p className="text-sm font-semibold mb-2">{label}</p>
              <div className="flex flex-wrap gap-2">
                {opts.map((o) => (
                  <button
                    key={o}
                    onClick={() => setSelected((s) => ({ ...s, [label]: o }))}
                    className={`px-4 h-10 rounded-full text-sm font-medium transition ${
                      selected[label] === o
                        ? "bg-foreground text-background"
                        : "bg-secondary text-foreground hover:bg-accent"
                    }`}
                  >
                    {o}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <button
            onClick={() => setStep(2)}
            className="w-full h-14 rounded-full bg-primary text-primary-foreground font-semibold shadow-[var(--shadow-glow)] flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5" /> Generate preview
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="px-6 space-y-4">
          <div className="rounded-[28px] overflow-hidden bg-secondary aspect-[3/4] relative">
            <img src={heroImages.design1} alt="Preview" className="w-full h-full object-cover" />
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur rounded-full px-3 py-1.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-bold">AI Preview</span>
            </div>
            <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur grid place-items-center">
              <Bookmark className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className={`aspect-[3/4] rounded-2xl overflow-hidden bg-secondary border-2 ${i === 0 ? "border-primary" : "border-transparent"}`}>
                <img src={heroImages.design1} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>

          <div className="bg-primary-soft rounded-2xl p-4 flex items-start gap-3">
            <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold">Ready to bring to life</p>
              <p className="text-xs text-muted-foreground mt-0.5">Pair this design with a verified tailor.</p>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={() => setStep(1)}
              className="w-14 h-14 rounded-full bg-secondary grid place-items-center flex-shrink-0"
            >
              <RotateCw className="w-5 h-5" />
            </button>
            <Link
              to="/book"
              className="flex-1 h-14 rounded-full bg-primary text-primary-foreground font-semibold flex items-center justify-center shadow-[var(--shadow-glow)]"
            >
              Book this design
            </Link>
          </div>
        </div>
      )}
    </MobileShell>
  );
}
