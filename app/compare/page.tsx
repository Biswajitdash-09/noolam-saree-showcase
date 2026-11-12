import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { PageTransition } from "@/components/motion/page-transition";
import { CompareTable } from "@/components/site/compare-table";
import { SiteFooter } from "@/components/site/site-footer";

export const metadata: Metadata = {
  title: "Compare pieces",
  description: "Compare up to three NOOLAM silks side by side: price, weave, pallu, colour and availability.",
  robots: { index: false },
};

export default function ComparePage() {
  return (
    <PageTransition>
      <section className="bg-[linear-gradient(180deg,#fdfbf7_0%,#f7f1e8_100%)] pb-20 pt-28 md:pt-32">
        <div className="shell">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-[9.5px] uppercase tracking-[0.24em] text-ink-soft/70"
          >
            <Link href="/" className="transition hover:text-maroon-700">
              Home
            </Link>
            <ChevronRight className="size-3 text-gold-600" />
            <Link href="/shop" className="transition hover:text-maroon-700">
              The collection
            </Link>
            <ChevronRight className="size-3 text-gold-600" />
            <span className="text-ink">Compare</span>
          </nav>
          <h1 className="display mt-6 text-[clamp(2.2rem,5vw,4rem)]">Side by side</h1>
          <p className="mt-3 max-w-[48ch] text-[14px] leading-relaxed text-ink-soft">
            Up to three silks, weave against weave. Add pieces with the compare
            button on any saree in the collection.
          </p>
          <CompareTable />
        </div>
      </section>
      <SiteFooter />
    </PageTransition>
  );
}
