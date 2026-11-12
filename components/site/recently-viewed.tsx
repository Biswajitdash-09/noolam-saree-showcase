"use client";

import * as React from "react";

import { ProductCard } from "@/components/site/product-card";
import { useStore } from "@/components/site/store";
import { getProduct } from "@/lib/data";

/** Records this product as viewed. Renders nothing. */
export function RecordView({ slug }: { slug: string }) {
  const { recordView } = useStore();
  React.useEffect(() => {
    recordView(slug);
  }, [slug, recordView]);
  return null;
}

/** "Recently viewed" row for the product page, hidden until there's history. */
export function RecentlyViewed({ exclude }: { exclude: string }) {
  const { recent } = useStore();
  const items = recent
    .filter((slug) => slug !== exclude)
    .map((slug) => getProduct(slug))
    .filter((item) => item !== undefined)
    .slice(0, 4);

  if (items.length === 0) return null;

  return (
    <section aria-labelledby="recent-title" className="border-t border-ink/8 bg-white py-16">
      <div className="shell">
        <h2 id="recent-title" className="display text-[clamp(1.6rem,2.8vw,2.2rem)]">
          Recently viewed
        </h2>
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-9 sm:gap-x-6 lg:grid-cols-4">
          {items.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
