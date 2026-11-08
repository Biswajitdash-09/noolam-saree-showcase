import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Scissors, ShieldCheck, Truck } from "lucide-react";

import { ArrowPill } from "@/components/site/arrow-pill";
import { ShopGrid } from "@/components/site/shop-grid";
import { SiteFooter } from "@/components/site/site-footer";

export const metadata: Metadata = {
  title: "Shop all silks",
  description:
    "Browse the full NOOLAM rail: Kanjivaram silk sarees, half sarees, checked weaves, zari brocades and blouses, priced by the loom.",
};

const notes = [
  { icon: Scissors, label: "Woven on pit looms", text: "Kanchipuram, Tamil Nadu" },
  { icon: ShieldCheck, label: "Silk Mark certified", text: "Pure mulberry silk" },
  { icon: Truck, label: "Insured delivery", text: "Ships in 3–5 days" },
];

export default function ShopPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#fdfbf7_0%,#f7f1e8_100%)] pb-10 pt-28 md:pt-32">
        <div className="pointer-events-none absolute -right-24 top-0 size-[420px] rounded-full bg-gold-300/20 blur-[110px]" />
        <div className="shell relative">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[9.5px] uppercase tracking-[0.24em] text-ink-soft/70">
            <Link href="/" className="transition hover:text-maroon-700">
              Home
            </Link>
            <ChevronRight className="size-3 text-gold-600" />
            <span className="text-ink">The collection</span>
          </nav>

          <div className="mt-7 grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-end">
            <div>
              <p className="eyebrow">The full rail</p>
              <h1 className="display mt-4 text-[clamp(2.5rem,6.4vw,5rem)]">
                Every silk, <span className="text-gradient-warm">in one place.</span>
              </h1>
            </div>
            <p className="max-w-[44ch] text-sm leading-relaxed text-ink-soft lg:justify-self-end">
              Twenty-five pieces from the Kanchipuram loom room — bridal pattu,
              everyday Kanjivaram, half sarees and checked weaves. Filter by the
              way you drape, then open a piece to see its weave up close.
            </p>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-ink/10 pt-5">
            {notes.map((note) => (
              <span key={note.label} className="inline-flex items-center gap-2.5">
                <note.icon className="size-3.5 text-gold-600" />
                <span className="text-[10px] uppercase tracking-[0.2em] text-ink-soft">
                  {note.label}
                  <span className="mx-1.5 text-gold-500">·</span>
                  <span className="normal-case tracking-[0.04em] text-ink-soft/60">
                    {note.text}
                  </span>
                </span>
              </span>
            ))}
          </div>
        </div>
      </section>

      <main className="bg-ivory pb-24">
        <div className="shell relative -mt-2">
          <ShopGrid />

          <div className="relative mt-20 overflow-hidden rounded-[26px] bg-maroon-950 text-white">
            <Image
              src="/images/editorial/misty-ridge.jpg"
              alt="Morning mist over the loom country"
              fill
              sizes="(max-width: 1024px) 100vw, 1200px"
              className="object-cover sepia-[0.3] saturate-[0.8] brightness-[0.55]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(30,4,8,0.92),rgba(30,4,8,0.55)_60%,rgba(30,4,8,0.3))]" />
            <div className="relative flex flex-col gap-6 p-8 sm:p-12 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="eyebrow text-gold-300 before:bg-gold-400">The loom room</p>
                <h2 className="display mt-4 max-w-[16ch] text-[clamp(1.9rem,3.6vw,3rem)] text-white">
                  Not sure which drape is yours?
                </h2>
                <p className="mt-3 max-w-[42ch] text-sm leading-relaxed text-white/65">
                  Send us the occasion and the colours you love. We will put
                  together a short rail of pieces and hold them for three days.
                </p>
              </div>
              <ArrowPill href="/#the-weave" variant="light">
                Ask the loom room
              </ArrowPill>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
