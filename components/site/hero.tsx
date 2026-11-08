import Image from "next/image";
import Link from "next/link";
import { ArrowDown } from "lucide-react";

import { ArrowPill } from "@/components/site/arrow-pill";

export function Hero() {
  return (
    <section
      aria-label="NOOLAM Kanchipuram silk"
      className="relative flex min-h-[100svh] items-end overflow-hidden bg-maroon-950"
    >
      <Image
        src="/images/hero-showroom.jpg"
        alt="Grand NOOLAM temple silk showroom with carved wooden pillars and silk sarees"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
        style={{
          filter: "brightness(0.88) contrast(1.05)",
        }}
      />

      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(30,4,8,0.94)_0%,rgba(36,6,11,0.82)_34%,rgba(36,6,11,0.35)_68%,rgba(36,6,11,0.55)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,3,6,0.55)_0%,transparent_28%,transparent_58%,rgba(30,4,8,0.88)_100%)]" />
      <div className="pointer-events-none absolute -left-40 top-1/3 size-[520px] rounded-full bg-gold-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute right-[8%] top-[18%] size-[320px] rounded-full bg-maroon-500/20 blur-[110px]" />

      <div className="shell relative z-10 w-full pb-24 pt-36 sm:pb-28 lg:pb-32">
        <div className="max-w-[980px]">
          <span className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-black/25 px-4 py-2 backdrop-blur-md">
            <span className="size-1.5 rounded-full bg-gold-400" />
            <span className="text-[9.5px] font-medium uppercase tracking-[0.28em] text-white/85 sm:text-[10.5px]">
              Kanchipuram · Pure Zari · Handwoven Silk
            </span>
          </span>

          <h1 className="display mt-7 text-[clamp(2.85rem,8.2vw,7.4rem)] text-white">
            Woven for the Divine.
          </h1>

          <p className="mt-6 max-w-[34rem] text-[15px] leading-relaxed text-white/80 sm:text-base">
            NOOLAM brings the temple looms of Kanchipuram home: Kanjivaram silk in
            heritage colours, bordered in real zari and finished by hand.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <ArrowPill href="/#try-the-look" variant="maroon">
              Try the Look
            </ArrowPill>
            <ArrowPill href="/#the-rack" variant="light">
              Browse the Rack
            </ArrowPill>
          </div>
        </div>

        <div className="mt-14 flex items-center justify-between gap-6 border-t border-white/15 pt-5">
          <div className="flex flex-wrap items-center gap-x-7 gap-y-2 text-[9.5px] uppercase tracking-[0.24em] text-white/50">
            <span>Est. 1978</span>
            <span className="hidden sm:inline">Silk Mark certified</span>
            <span className="hidden md:inline">Handloom · Kanchipuram</span>
          </div>
          <Link
            href="/#archive"
            className="group hidden items-center gap-2 text-[9.5px] uppercase tracking-[0.24em] text-white/55 transition hover:text-gold-300 sm:flex"
          >
            Scroll the archive
            <ArrowDown className="size-3.5 transition-transform group-hover:translate-y-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
