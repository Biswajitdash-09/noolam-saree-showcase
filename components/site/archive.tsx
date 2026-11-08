import Image from "next/image";

import { moods } from "@/lib/data";

const ARCH_PATH =
  "M2 100 L2 47 L10 47 L10 41 L17 41 L17 35 C21 27 30 25 37 21 C44 17 48 11 50 3.5 C52 11 56 17 63 21 C70 25 79 27 83 35 L83 41 L90 41 L90 47 L98 47 L98 100 Z";

const grades = {
  warm: "sepia-[0.28] saturate-[0.92] brightness-[0.98] contrast-[1.02]",
  deep: "sepia-[0.42] saturate-[0.82] brightness-[0.82] contrast-[1.08]",
  cool: "sepia-[0.18] saturate-[0.7] brightness-[0.9] contrast-[1.05]",
};

const tints = {
  warm: "bg-[linear-gradient(180deg,rgba(74,10,18,0.05)_0%,rgba(74,10,18,0.42)_100%)]",
  deep: "bg-[linear-gradient(180deg,rgba(30,4,8,0.25)_0%,rgba(44,5,11,0.6)_100%)]",
  cool: "bg-[linear-gradient(180deg,rgba(20,24,36,0.18)_0%,rgba(44,5,11,0.48)_100%)]",
};

export function Archive() {
  return (
    <section id="archive" aria-labelledby="archive-title" className="bg-white py-20 md:py-28">
      <div className="shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow">The NOOLAM Archive</p>
            <h2
              id="archive-title"
              className="display mt-5 text-[clamp(2.1rem,5.2vw,4.6rem)]"
            >
              Six Moods.{" "}
              <span className="text-gradient-warm">Timeless Drapes</span>
            </h2>
          </div>
          <p className="max-w-[19rem] text-sm leading-relaxed text-ink-soft lg:pb-2 lg:text-right">
            Woven by hand, worn for a lifetime. Six silk stories, from quiet
            mornings to festive evenings.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-6 lg:gap-x-5">
          {moods.map((mood) => (
            <figure key={mood.label} className="group flex flex-col items-center">
              <div className="relative w-full max-w-[220px] pt-3">
                <div className="relative aspect-[3/4.7] w-full transition-all duration-500 ease-out group-hover:-translate-y-2.5 group-hover:drop-shadow-[0_22px_34px_rgba(74,10,18,0.22)]">
                  <div
                    className="absolute inset-0 overflow-hidden bg-cream"
                    style={{ clipPath: "url(#gopuram-arch)" }}
                  >
                    <Image
                      src={mood.media}
                      alt={`${mood.label} — ${mood.caption}`}
                      fill
                      sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 15vw"
                      className={`object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06] ${grades[mood.tone]}`}
                    />
                    <div
                      className={`absolute inset-0 transition-opacity duration-500 group-hover:opacity-70 ${tints[mood.tone]}`}
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.12)_0%,transparent_35%,transparent_65%,rgba(0,0,0,0.16)_100%)]" />
                  </div>

                  <svg
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    aria-hidden
                    className="pointer-events-none absolute inset-0 h-full w-full"
                  >
                    <path
                      d={ARCH_PATH}
                      fill="none"
                      stroke="rgba(201,162,39,0.72)"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                      className="transition-colors duration-500 group-hover:stroke-gold-400"
                    />
                    <path
                      d={ARCH_PATH}
                      fill="none"
                      stroke="rgba(255,255,255,0.22)"
                      strokeWidth="2.5"
                      vectorEffect="non-scaling-stroke"
                      className="opacity-60"
                    />
                  </svg>

                  <svg
                    viewBox="0 0 20 26"
                    aria-hidden
                    className="absolute -top-2 left-1/2 w-3 -translate-x-1/2 text-gold-500 transition-transform duration-500 group-hover:-translate-y-1"
                  >
                    <path d="M10 1 L12.6 8.2 L10 7 L7.4 8.2 Z" fill="currentColor" />
                    <circle cx="10" cy="12" r="1.5" fill="currentColor" />
                    <rect x="9.4" y="14" width="1.2" height="6" rx="0.6" fill="currentColor" opacity="0.8" />
                  </svg>
                </div>
              </div>

              <figcaption className="mt-5 text-center">
                <p className="text-[10px] font-medium uppercase leading-relaxed tracking-[0.2em] text-ink sm:text-[10.5px]">
                  {mood.label}
                </p>
                <p className="mt-1 text-[10px] tracking-wide text-ink-soft/65">
                  {mood.caption}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <svg width="0" height="0" aria-hidden className="absolute">
        <defs>
          <clipPath id="gopuram-arch" clipPathUnits="objectBoundingBox">
            <path
              d="M0.02 1 L0.02 0.47 L0.10 0.47 L0.10 0.41 L0.17 0.41 L0.17 0.35
                 C0.21 0.27 0.30 0.25 0.37 0.21
                 C0.44 0.17 0.48 0.11 0.50 0.035
                 C0.52 0.11 0.56 0.17 0.63 0.21
                 C0.70 0.25 0.79 0.27 0.83 0.35
                 L0.83 0.41 L0.90 0.41 L0.90 0.47 L0.98 0.47 L0.98 1 Z"
            />
          </clipPath>
        </defs>
      </svg>
    </section>
  );
}
