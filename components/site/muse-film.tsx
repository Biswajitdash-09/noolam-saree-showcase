"use client";

import * as React from "react";
import Image from "next/image";
import { Volume2, VolumeX } from "lucide-react";

import { ArrowPill } from "@/components/site/arrow-pill";

const leftFrames = [
  { src: "/images/editorial/city-dusk.jpg", caption: "The lamp room", alt: "Warm dusk light in a courtyard" },
  { src: "/images/editorial/mountain-pines.jpg", caption: "First light", alt: "Pine-covered hills at first light" },
  { src: "/images/editorial/city-narrow.jpg", caption: "Old-city lanes", alt: "A narrow old-city lane" },
];

const rightFrames = [
  { src: "/images/editorial/ocean-gold.jpg", caption: "Feels right", alt: "Golden light on open water" },
  { src: "/images/editorial/rocky-plains.jpg", caption: "The loom room", alt: "Rocky plains in warm light" },
  { src: "/images/editorial/city-brick.jpg", caption: "For the vow", alt: "Brick facade in afternoon sun" },
];

const grades = {
  film: "sepia-[0.24] saturate-[0.86] brightness-[0.94] contrast-[1.04]",
};

export function MuseFilm() {
  const [sound, setSound] = React.useState(false);
  const [offset, setOffset] = React.useState(0);

  React.useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const el = document.getElementById("the-muse");
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const progress = Math.min(1, Math.max(0, (window.innerHeight - rect.top) / (rect.height + window.innerHeight)));
        setOffset((progress - 0.5) * 2);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section
      id="the-muse"
      aria-labelledby="muse-title"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f7f1e8_55%,#ffffff_100%)] py-16 md:py-24"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-300/12 blur-[120px]" />

      <div className="relative mx-auto flex w-full max-w-[1760px] items-start gap-4 px-4 sm:px-6 xl:gap-8">
        <div className="hidden w-[15%] shrink-0 flex-col gap-4 pt-14 md:flex">
          {leftFrames.map((frame, index) => (
            <figure
              key={frame.src}
              className="group relative overflow-hidden rounded-xl bg-cream shadow-[0_18px_40px_-24px_rgba(44,5,11,0.5)]"
              style={{
                transform: `translateY(${offset * (index % 2 === 0 ? -14 : 16)}px)`,
                transition: "transform 200ms linear",
              }}
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={frame.src}
                  alt={frame.alt}
                  fill
                  sizes="(max-width: 1280px) 15vw, 240px"
                  className={`object-cover ${grades.film}`}
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(44,5,11,0.45)_100%)]" />
                <figcaption className="absolute inset-x-3 bottom-2.5 text-[8.5px] uppercase tracking-[0.22em] text-white/75">
                  {frame.caption}
                </figcaption>
              </div>
            </figure>
          ))}
        </div>

        <div className="min-w-0 flex-1">
          <div className="text-center">
            <p className="eyebrow justify-center before:hidden">The Muse Film</p>
            <h2 id="muse-title" className="display mt-4 text-[clamp(2.3rem,5.6vw,4.8rem)]">
              Feel the <span className="text-gradient-warm">drape</span>
            </h2>
          </div>

          <div className="relative mx-auto mt-8 max-w-[820px]">
            <span className="pointer-events-none absolute -left-3 -top-3 size-7 border-l border-t border-gold-500/70" />
            <span className="pointer-events-none absolute -right-3 -top-3 size-7 border-r border-t border-gold-500/70" />
            <span className="pointer-events-none absolute -bottom-3 -left-3 size-7 border-b border-l border-gold-500/70" />
            <span className="pointer-events-none absolute -bottom-3 -right-3 size-7 border-b border-r border-gold-500/70" />

            <div className="group relative aspect-[16/10] overflow-hidden rounded-[14px] bg-maroon-950 shadow-[0_40px_80px_-40px_rgba(44,5,11,0.65)] sm:aspect-[16/9]">
              <Image
                src="/images/editorial/ocean-sunset.jpg"
                alt="A model in a Kanjivaram saree, listening to music"
                fill
                priority
                sizes="(max-width: 768px) 92vw, 820px"
                className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.03] sepia-[0.16] saturate-[0.95]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,3,6,0.18)_0%,transparent_40%,rgba(20,3,6,0.45)_100%)]" />

              <div className="absolute inset-x-0 bottom-4 flex justify-center">
                <button
                  type="button"
                  onClick={() => setSound((value) => !value)}
                  aria-pressed={sound}
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/35 px-4 py-2 text-[9px] uppercase tracking-[0.28em] text-white/85 backdrop-blur-md transition hover:border-gold-400/60 hover:text-gold-300"
                >
                  {sound ? <Volume2 className="size-3.5" /> : <VolumeX className="size-3.5" />}
                  {sound ? "Sound on" : "Sound off"}
                </button>
              </div>

              <div className="absolute left-4 top-4 flex items-center gap-2">
                <span className="size-1.5 animate-pulse rounded-full bg-gold-400" />
                <span className="text-[9px] uppercase tracking-[0.26em] text-white/70">Film · 1:24</span>
              </div>
            </div>
          </div>

          <div className="mt-9 flex justify-center">
            <ArrowPill href="/shop">Purchase the Collection</ArrowPill>
          </div>
        </div>

        <div className="hidden w-[15%] shrink-0 flex-col gap-4 pt-6 md:flex">
          {rightFrames.map((frame, index) => (
            <figure
              key={frame.src}
              className="group relative overflow-hidden rounded-xl bg-cream shadow-[0_18px_40px_-24px_rgba(44,5,11,0.5)]"
              style={{
                transform: `translateY(${offset * (index % 2 === 0 ? 16 : -14)}px)`,
                transition: "transform 200ms linear",
              }}
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={frame.src}
                  alt={frame.alt}
                  fill
                  sizes="(max-width: 1280px) 15vw, 240px"
                  className={`object-cover ${grades.film}`}
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(44,5,11,0.45)_100%)]" />
                <figcaption className="absolute inset-x-3 bottom-2.5 text-[8.5px] uppercase tracking-[0.22em] text-white/75">
                  {frame.caption}
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
      </div>

      <div className="mt-12 flex justify-center gap-3 px-4 md:hidden">
        {[...leftFrames.slice(0, 2), ...rightFrames.slice(0, 2)].map((frame) => (
          <div key={`m-${frame.src}`} className="relative aspect-[3/4] w-1/4 overflow-hidden rounded-lg bg-cream">
            <Image src={frame.src} alt={frame.alt} fill sizes="24vw" className={`object-cover ${grades.film}`} />
          </div>
        ))}
      </div>
    </section>
  );
}
