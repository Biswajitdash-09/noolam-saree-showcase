import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Gem, Ruler, Sparkles } from "lucide-react";

import { ArrowPill } from "@/components/site/arrow-pill";
import { BridalGrid } from "@/components/site/bridal-grid";
import { SiteFooter } from "@/components/site/site-footer";

export const metadata: Metadata = {
  title: "The Bridal Collection",
  description:
    "Heirloom Kanjivaram bridal silks from the NOOLAM loom room — temple korvai pallus, real zari, and a private fitting at the Kanchipuram loom house.",
};

const promises = [
  {
    icon: Gem,
    title: "Silver-core zari",
    text: "Tested zari, woven with a silver core and gilded in gold. It keeps its light for generations.",
  },
  {
    icon: Ruler,
    title: "Fitted to you",
    text: "Come to the loom room or send your measurements. The blouse is cut and stitched in-house.",
  },
  {
    icon: Sparkles,
    title: "Six weeks on the loom",
    text: "Each bridal piece is woven to order. The loom room holds your date and plans around it.",
  },
];

export default function BridalPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#fdfbf7_0%,#f8f1e6_65%,#f4ebdc_100%)] pb-16 pt-28 md:pb-20 md:pt-32">
        <div className="pointer-events-none absolute -left-32 top-24 size-[460px] rounded-full bg-gold-300/20 blur-[120px]" />
        <div className="shell relative">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-[9.5px] uppercase tracking-[0.24em] text-ink-soft/70"
          >
            <Link href="/" className="transition hover:text-maroon-700">
              Home
            </Link>
            <ChevronRight className="size-3 text-gold-600" />
            <span className="text-ink">The bridal collection</span>
          </nav>

          <div className="mt-8 grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-14">
            <div>
              <p className="eyebrow">For the muhurtham and every vow after</p>
              <h1 className="display mt-4 text-[clamp(2.6rem,6.6vw,5.4rem)]">
                The Bridal <span className="text-maroon-700">Collection</span>
              </h1>
              <p className="mt-5 max-w-[46ch] text-sm leading-relaxed text-ink-soft">
                Seven heirloom pieces, each woven to order on the Kanchipuram pit
                looms. Temple korvai pallus, real zari borders, and the deep
                colours a muhurtham asks for — kept in the family long after the
                day.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <ArrowPill href="#bridal-rail" variant="maroon">
                  See the seven pieces
                </ArrowPill>
                <ArrowPill href="/#the-weave" variant="outline">
                  Book a fitting
                </ArrowPill>
              </div>

              <dl className="mt-10 grid max-w-[440px] grid-cols-3 gap-4 border-t border-ink/10 pt-5">
                {[
                  ["07", "Heirloom pieces"],
                  ["45", "Days on the loom"],
                  ["01", "Of each woven"],
                ].map(([value, label]) => (
                  <div key={label}>
                    <dt className="text-[22px] font-medium tabular-nums text-maroon-700">{value}</dt>
                    <dd className="mt-1 text-[9px] uppercase leading-[1.5] tracking-[0.18em] text-ink-soft/70">
                      {label}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="relative mx-auto flex w-full max-w-[470px] items-end justify-center gap-4">
              <div
                className="relative aspect-[0.6] w-[52%] overflow-hidden ring-1 ring-gold-500/40"
                style={{ borderRadius: "999px 999px 4px 4px" }}
              >
                <Image
                  src="/images/editorial/ocean-sunset.jpg"
                  alt="Golden light across a bridal silk"
                  fill
                  priority
                  sizes="(max-width: 1024px) 45vw, 250px"
                  className="object-cover sepia-[0.15] saturate-[0.95]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_50%,rgba(44,5,11,0.4))]" />
              </div>
              <div
                className="relative aspect-[0.6] w-[40%] translate-y-8 overflow-hidden ring-1 ring-gold-500/40"
                style={{ borderRadius: "999px 999px 4px 4px" }}
              >
                <Image
                  src="/images/editorial/city-dusk.jpg"
                  alt="Lamp light in the loom room"
                  fill
                  priority
                  sizes="(max-width: 1024px) 35vw, 190px"
                  className="object-cover sepia-[0.24] saturate-[0.86] brightness-[0.94]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_50%,rgba(44,5,11,0.45))]" />
              </div>
              <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-[8.5px] uppercase tracking-[0.26em] text-ink-soft/60">
                The bridal archive · Kanchipuram
              </span>
            </div>
          </div>
        </div>
      </section>

      <section id="bridal-rail" aria-labelledby="bridal-rail-title" className="bg-ivory pb-20 pt-6">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-ink/10 pb-6">
            <div>
              <p className="eyebrow">The bridal rail</p>
              <h2 id="bridal-rail-title" className="display mt-3 text-[clamp(1.8rem,3.4vw,2.8rem)]">
                Kept for the <span className="text-gradient-warm">vow</span>
              </h2>
            </div>
            <p className="max-w-[40ch] text-[12px] leading-relaxed text-ink-soft">
              Every piece is final sale and made to order. Add one to your bag and
              the loom room will write to you within a day to plan the fitting.
            </p>
          </div>

          <div className="mt-10">
            <BridalGrid />
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white py-16 md:py-20">
        <div className="shell">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-14">
            <div
              className="relative aspect-[4/5] overflow-hidden ring-1 ring-gold-500/30"
              style={{ borderRadius: "999px 999px 6px 6px" }}
            >
              <Image
                src="/images/editorial/city-fog.jpg"
                alt="Silk threads on the loom at first light"
                fill
                sizes="(max-width: 1024px) 90vw, 420px"
                className="object-cover sepia-[0.22] saturate-[0.86] brightness-[0.95]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(30,4,8,0.5))]" />
              <p className="absolute inset-x-6 bottom-6 text-[9px] uppercase tracking-[0.26em] text-white/75">
                Loom 04 · the bridal warp
              </p>
            </div>

            <div>
              <p className="eyebrow">The bridal promise</p>
              <h2 className="display mt-4 max-w-[18ch] text-[clamp(1.9rem,3.6vw,3rem)]">
                Made once. Worn for a lifetime.
              </h2>
              <div className="mt-8 grid gap-6 sm:grid-cols-3">
                {promises.map((promise) => (
                  <div key={promise.title}>
                    <promise.icon className="size-4 text-gold-600" />
                    <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-gold-700">
                      {promise.title}
                    </p>
                    <p className="mt-2 text-[12px] leading-relaxed text-ink-soft">{promise.text}</p>
                  </div>
                ))}
              </div>

              <div className="mt-9 flex flex-wrap items-center gap-4">
                <ArrowPill href="/#the-weave" variant="maroon">
                  Book a bridal appointment
                </ArrowPill>
                <Link
                  href="/shop"
                  className="text-[10px] uppercase tracking-[0.22em] text-ink-soft underline decoration-gold-500/60 underline-offset-4 transition hover:text-maroon-700"
                >
                  Or browse the ready rail
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
