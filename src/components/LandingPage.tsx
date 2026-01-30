import { Camera, FileCheck, Printer, ArrowRight, Shield, Clock, Award, Play, Star, Aperture, Film, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LandingPageProps {
  onGetStarted: () => void;
}

export const LandingPage = ({ onGetStarted }: LandingPageProps) => {
  return (
    <div className="min-h-screen grain-overlay">
      {/* ===== NAVBAR ===== */}
      <nav className="py-5 border-b-[3px] border-retro-dark">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo as retro badge */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-retro-red border-[3px] border-retro-dark rounded-lg shadow-retro-sm flex items-center justify-center">
                <Aperture className="w-5 h-5 text-retro-cream" />
              </div>
              <span className="font-display text-3xl text-retro-dark tracking-wide">PHOTOID PRO</span>
            </div>

            <div className="hidden md:flex items-center gap-1">
              {["Home", "How it Works", "Features", "Pricing"].map((link, i) => (
                <span
                  key={link}
                  className={`text-sm font-bold uppercase tracking-wider px-4 py-2 cursor-pointer transition-all duration-150 rounded-md ${
                    i === 0
                      ? "bg-retro-dark text-retro-cream"
                      : "text-retro-dark hover:bg-retro-dark hover:text-retro-cream"
                  }`}
                >
                  {link}
                </span>
              ))}
            </div>

            <Button variant="hero" size="default" onClick={onGetStarted}>
              Get A Quote
            </Button>
          </div>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section className="pt-12 pb-16 lg:pt-20 lg:pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left — Big bold retro headline */}
              <div className="animate-slide-up">
                {/* Retro label badge */}
                <div className="inline-flex items-center gap-2 bg-retro-mustard border-[3px] border-retro-dark rounded-lg px-4 py-1.5 shadow-retro-sm mb-6">
                  <Zap className="w-4 h-4 text-retro-dark" />
                  <span className="text-xs font-black uppercase tracking-widest text-retro-dark">AI-Powered</span>
                </div>

                <h1 className="font-display text-[4rem] md:text-[5.5rem] lg:text-[7rem] text-retro-dark leading-[0.9] mb-6 tracking-tight">
                  GET YOUR
                  <br />
                  PERFECT
                  <br />
                  <span className="text-retro-red font-display-serif italic text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem]">
                    ID Photo
                  </span>
                </h1>

                <p className="text-retro-dark-mid text-base mb-8 max-w-md leading-relaxed font-medium">
                  Create passport, visa, and ID photos that meet official requirements.
                  No studio visit needed — snap, process, done.
                </p>

                <div className="flex items-center gap-4 flex-wrap">
                  <Button variant="hero" size="lg" onClick={onGetStarted}>
                    Get Started
                    <ArrowRight className="ml-1 h-5 w-5" />
                  </Button>
                  <button
                    className="flex items-center gap-3 group border-[3px] border-retro-dark rounded-lg px-5 py-3 bg-retro-cream shadow-retro-sm hover:shadow-retro-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150"
                    onClick={onGetStarted}
                  >
                    <div className="w-8 h-8 bg-retro-dark rounded-md flex items-center justify-center">
                      <Play className="w-3.5 h-3.5 text-retro-cream fill-retro-cream ml-0.5" />
                    </div>
                    <span className="text-sm font-black uppercase tracking-wider text-retro-dark">Watch Demo</span>
                  </button>
                </div>
              </div>

              {/* Right — retro sticker collage */}
              <div className="relative h-[420px] lg:h-[500px] animate-slide-up-2">
                {/* Film strip decoration */}
                <div className="absolute -top-4 right-20 bg-retro-dark text-retro-cream px-3 py-1 rounded-md border-[3px] border-retro-dark shadow-retro-sm rotate-6 z-40">
                  <span className="font-display text-sm tracking-wider">35mm</span>
                </div>

                {/* Decorative dots */}
                <div className="absolute top-2 right-8 w-5 h-5 bg-retro-mustard border-[3px] border-retro-dark rounded-full" />
                <div className="absolute bottom-28 left-2 w-4 h-4 bg-retro-red border-[2px] border-retro-dark rounded-full" />
                <div className="absolute top-32 right-2 w-6 h-6 bg-retro-teal border-[3px] border-retro-dark rounded-sm rotate-45" />

                {/* Photo frame 1 — Passport sticker */}
                <div className="absolute top-0 right-0 w-52 h-60 sticker bg-retro-cream rounded-xl rotate-6 overflow-hidden z-10">
                  <div className="w-full h-full bg-retro-teal/10 halftone-bg flex items-center justify-center relative">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-retro-teal border-[3px] border-retro-dark rounded-lg mx-auto mb-3 flex items-center justify-center shadow-retro-sm">
                        <Camera className="w-8 h-8 text-retro-cream" />
                      </div>
                      <p className="font-display text-xl text-retro-dark tracking-wide">PASSPORT</p>
                    </div>
                  </div>
                </div>

                {/* Photo frame 2 — Your Photo (center, biggest) */}
                <div className="absolute top-14 left-4 w-56 h-64 sticker bg-retro-cream rounded-xl -rotate-3 overflow-hidden z-20">
                  <div className="w-full h-full bg-retro-pink/10 stripe-bg flex items-center justify-center relative">
                    <div className="absolute top-3 left-3 bg-retro-red border-[2px] border-retro-dark rounded-md px-2 py-0.5">
                      <span className="text-[10px] font-black uppercase text-retro-cream tracking-wider">Your Photo</span>
                    </div>
                    <div className="text-center mt-4">
                      <div className="w-24 h-28 bg-retro-pink/20 border-[3px] border-retro-dark rounded-lg mx-auto mb-3 flex items-center justify-center">
                        <Camera className="w-10 h-10 text-retro-pink" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Vinyl record badge */}
                <div className="absolute bottom-12 right-8 w-32 h-32 bg-retro-dark border-[3px] border-retro-dark rounded-full z-30 flex items-center justify-center shadow-retro-lg">
                  <div className="w-24 h-24 border-[3px] border-retro-mustard rounded-full flex items-center justify-center">
                    <div className="w-14 h-14 border-[2px] border-retro-mustard/50 rounded-full flex items-center justify-center">
                      <div className="w-6 h-6 bg-retro-mustard rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-retro-dark rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Photo frame 3 — Verified sticker */}
                <div className="absolute bottom-0 left-0 w-48 h-56 sticker bg-retro-cream rounded-xl rotate-3 overflow-hidden z-10">
                  <div className="w-full h-full bg-retro-mustard/10 halftone-bg flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-retro-mustard border-[3px] border-retro-dark rounded-lg mx-auto mb-3 flex items-center justify-center shadow-retro-sm">
                        <FileCheck className="w-8 h-8 text-retro-dark" />
                      </div>
                      <p className="font-display text-xl text-retro-dark tracking-wide">VERIFIED</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== MARQUEE TICKER BANNER ===== */}
      <section className="py-0 animate-slide-up-3">
        <div className="border-y-[3px] border-retro-dark bg-retro-red overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap py-3">
            {Array.from({ length: 2 }).map((_, setIdx) => (
              <div key={setIdx} className="flex items-center gap-8 mx-8">
                {[
                  "500+ PHOTOS CREATED",
                  "4.9 USER RATING",
                  "100% ACCEPTANCE RATE",
                  "AI-POWERED",
                  "NO STUDIO NEEDED",
                  "INSTANT DELIVERY",
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Star className="w-4 h-4 text-retro-cream fill-retro-cream flex-shrink-0" />
                    <span className="font-display text-xl text-retro-cream tracking-wider whitespace-nowrap">{text}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS — retro sticker cards ===== */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Section header */}
            <div className="mb-14 animate-slide-up-3">
              <div className="inline-flex items-center gap-2 bg-retro-dark text-retro-cream px-4 py-1.5 rounded-lg border-[3px] border-retro-dark shadow-retro-sm mb-5">
                <Film className="w-4 h-4" />
                <span className="font-display text-sm tracking-wider">HOW IT WORKS</span>
              </div>
              <h2 className="font-display text-[3rem] md:text-[4.5rem] text-retro-dark leading-[0.9] tracking-tight">
                THREE SIMPLE
                <br />
                <span className="font-display-serif italic text-retro-red text-[2.5rem] md:text-[3.5rem]">Steps to perfection</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6 animate-slide-up-4">
              {[
                {
                  icon: Camera,
                  step: "01",
                  title: "TAKE YOUR PHOTO",
                  desc: "Use your device camera with smart face detection",
                  bg: "bg-retro-teal",
                  accent: "bg-retro-teal/10",
                  rotate: "-rotate-2",
                  stars: 4.8,
                },
                {
                  icon: FileCheck,
                  step: "02",
                  title: "CHOOSE DOCUMENT",
                  desc: "Select passport, visa, or ID with official sizing",
                  bg: "bg-retro-red",
                  accent: "bg-retro-red/10",
                  rotate: "rotate-1",
                  stars: 4.9,
                },
                {
                  icon: Printer,
                  step: "03",
                  title: "GET YOUR PHOTOS",
                  desc: "Download or have prints delivered to your door",
                  bg: "bg-retro-mustard",
                  accent: "bg-retro-mustard/10",
                  rotate: "-rotate-1",
                  stars: 5.0,
                },
              ].map((step) => (
                <div
                  key={step.title}
                  className={`sticker bg-retro-cream rounded-xl p-5 ${step.rotate} hover:rotate-0 transition-all duration-300 relative`}
                >
                  {/* Step number badge */}
                  <div className="absolute -top-3 -right-3 w-12 h-12 bg-retro-dark border-[3px] border-retro-dark rounded-full flex items-center justify-center z-10 shadow-retro-sm">
                    <span className="font-display text-lg text-retro-cream tracking-wider">{step.step}</span>
                  </div>

                  {/* Card image area */}
                  <div className={`w-full aspect-[4/3] ${step.accent} border-[2px] border-retro-dark/20 rounded-lg flex items-center justify-center mb-4`}>
                    <div className={`w-16 h-16 ${step.bg} border-[3px] border-retro-dark rounded-lg flex items-center justify-center shadow-retro-sm`}>
                      <step.icon className="w-8 h-8 text-retro-cream" strokeWidth={2} />
                    </div>
                  </div>

                  {/* Card info */}
                  <h3 className="font-display text-2xl text-retro-dark mb-1 tracking-wide">
                    {step.title}
                  </h3>
                  <p className="text-retro-dark-mid text-sm mb-3 font-medium">
                    {step.desc}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-1.5">
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-retro-mustard fill-retro-mustard" />
                      ))}
                    </div>
                    <span className="text-sm font-black text-retro-dark">{step.stars}k</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES — retro card grid ===== */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="sticker bg-retro-cream rounded-xl p-8 md:p-10">
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    icon: Shield,
                    title: "OFFICIAL COMPLIANCE",
                    desc: "Photos meet all government requirements",
                    color: "bg-retro-red",
                  },
                  {
                    icon: Clock,
                    title: "READY IN MINUTES",
                    desc: "No waiting, no appointments needed",
                    color: "bg-retro-teal",
                  },
                  {
                    icon: Award,
                    title: "GUARANTEED ACCEPTANCE",
                    desc: "AI-verified to pass inspection",
                    color: "bg-retro-mustard",
                  },
                ].map((f) => (
                  <div key={f.title} className="text-center group">
                    <div className={`w-16 h-16 ${f.color} border-[3px] border-retro-dark rounded-lg flex items-center justify-center mx-auto mb-4 shadow-retro-sm group-hover:shadow-retro-hover group-hover:translate-x-[2px] group-hover:translate-y-[2px] transition-all duration-150`}>
                      <f.icon className="w-7 h-7 text-retro-cream" strokeWidth={2} />
                    </div>
                    <h4 className="font-display text-xl text-retro-dark mb-1 tracking-wide">{f.title}</h4>
                    <p className="text-sm text-retro-dark-mid font-medium">{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA — retro poster style ===== */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="bg-retro-dark border-[3px] border-retro-dark rounded-xl p-10 md:p-16 text-center relative overflow-hidden shadow-retro-lg">
              {/* Decorative retro shapes */}
              <div className="absolute top-5 left-6 w-10 h-10 border-[3px] border-retro-teal/40 rounded-lg rotate-12" />
              <div className="absolute bottom-6 right-10 w-8 h-8 bg-retro-mustard/30 border-[2px] border-retro-mustard/40 rounded-full" />
              <div className="absolute top-8 right-16 w-6 h-6 bg-retro-red/30 border-[2px] border-retro-red/30 rounded-sm rotate-45" />
              <div className="absolute bottom-12 left-16 w-4 h-4 bg-retro-teal/20 rounded-full" />

              {/* Halftone background */}
              <div className="absolute inset-0 halftone-bg opacity-30" />

              <div className="relative z-10">
                <h2 className="font-display text-[2.5rem] md:text-[4rem] text-retro-cream mb-2 tracking-tight leading-[0.95]">
                  READY TO GET YOUR
                </h2>
                <p className="font-display-serif italic text-retro-mustard text-[2rem] md:text-[3rem] mb-6">
                  Perfect Photo?
                </p>
                <p className="text-retro-cream/50 text-base mb-8 max-w-md mx-auto font-medium">
                  Create professional ID photos in minutes. No appointment needed.
                </p>
                <Button variant="hero" size="xl" onClick={onGetStarted}>
                  Take Your Photo Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER — retro style ===== */}
      <footer className="py-6 border-t-[3px] border-retro-dark">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-retro-red border-[2px] border-retro-dark rounded-md flex items-center justify-center">
              <Aperture className="w-4 h-4 text-retro-cream" />
            </div>
            <span className="font-display text-2xl text-retro-dark tracking-wide">PHOTOID PRO</span>
          </div>
          <p className="text-xs font-bold uppercase tracking-wider text-retro-dark-mid">
            &copy; {new Date().getFullYear()} PhotoID Pro. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};
