import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";

import { ArrowPill } from "@/components/site/arrow-pill";
import { ProductBuy } from "@/components/site/product-buy";
import { ProductCard } from "@/components/site/product-card";
import { ProductStage } from "@/components/site/product-stage";
import { SiteFooter } from "@/components/site/site-footer";
import { getProduct, products } from "@/lib/data";

type Params = { slug: string };

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Piece not found" };
  return {
    title: product.name,
    description: `${product.name} — ${product.fabric}. ${product.pallu ?? "Handwoven in Kanchipuram."}`,
  };
}

export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = products
    .filter(
      (item) =>
        item.id !== product.id &&
        (item.kind === product.kind ||
          item.categories.some((category) => product.categories.includes(category))),
    )
    .slice(0, 4);

  return (
    <>
      <div className="bg-[linear-gradient(180deg,#fdfbf7_0%,#faf6ef_100%)] pb-16 pt-28 md:pt-32">
        <div className="shell">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-1.5 text-[9.5px] uppercase tracking-[0.22em] text-ink-soft/70"
          >
            <Link href="/" className="transition hover:text-maroon-700">
              Home
            </Link>
            <ChevronRight className="size-3 text-gold-600" />
            <Link href="/shop" className="transition hover:text-maroon-700">
              The collection
            </Link>
            <ChevronRight className="size-3 text-gold-600" />
            <span className="text-ink">{product.name}</span>
          </nav>

          <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:gap-14">
            <ProductStage product={product} />
            <div className="lg:pt-2">
              <ProductBuy product={product} />
            </div>
          </div>
        </div>
      </div>

      <section className="border-y border-ink/8 bg-white py-12">
        <div className="shell grid gap-6 text-[12px] sm:grid-cols-3">
          {[
            {
              title: "Woven in Kanchipuram",
              text: "Each piece is marked with the weaver's name in the border and comes with a loom note.",
            },
            {
              title: "Real zari only",
              text: "Silver-core zari, tested and certified. No imitation thread, ever.",
            },
            {
              title: "Kept, not worn out",
              text: "The loom room will re-pleat the saree once, free of charge, after its first wash.",
            },
          ].map((note) => (
            <div key={note.title}>
              <p className="text-[9.5px] uppercase tracking-[0.24em] text-gold-700">
                {note.title}
              </p>
              <p className="mt-2 leading-relaxed text-ink-soft">{note.text}</p>
            </div>
          ))}
        </div>
      </section>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="bg-ivory py-16">
          <div className="shell">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="eyebrow">From the same part of the rail</p>
                <h2 id="related-title" className="display mt-3 text-[clamp(1.7rem,3vw,2.4rem)]">
                  You may also <span className="text-gradient-warm">love</span>
                </h2>
              </div>
              <ArrowPill href="/shop" variant="outline">
                See all 25 pieces
              </ArrowPill>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-9 sm:gap-x-6 lg:grid-cols-4">
              {related.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        </section>
      )}

      <SiteFooter />
    </>
  );
}
