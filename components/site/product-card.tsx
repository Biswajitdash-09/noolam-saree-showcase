"use client";

import * as React from "react";
import { ViewTransition } from "react";
import Link from "next/link";
import { Eye, GitCompareArrows, Heart } from "lucide-react";
import { toast } from "sonner";

import { AvailabilityBadge } from "@/components/site/availability-badge";
import { ProductArt } from "@/components/site/product-art";
import { useStore } from "@/components/site/store";
import { useToggleCompare } from "@/components/site/use-add-to-bag";
import type { Product } from "@/lib/data";
import { cn, formatINR } from "@/lib/utils";

type ProductCardProps = {
  product: Product;
  /**
   * Carry the saree across to its product page with a view-transition morph
   * when this card is clicked. Leave it off in rows that can repeat a piece.
   */
  morph?: boolean;
};

export function ProductCard({ product, morph = false }: ProductCardProps) {
  const { toggleWish, isWished, setQuickView, compare } = useStore();
  const toggleCompare = useToggleCompare();
  const wished = isWished(product.id);
  const comparing = compare.includes(product.id);
  // Only the card being opened is named for the morph; naming every card
  // would leave the others floating over the page transition.
  const [opening, setOpening] = React.useState(false);

  const art = <ProductArt product={product} className="aspect-[4/5]" />;

  return (
    <article className="group relative flex flex-col">
      <Link
        href={`/product/${product.slug}`}
        onClick={() => {
          if (morph) setOpening(true);
        }}
        className="relative block overflow-hidden rounded-[20px] border border-ink/8 outline-none transition-shadow duration-500 hover:shadow-[0_30px_60px_-40px_rgba(44,5,11,0.55)] focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-4"
      >
        {morph && opening ? (
          <ViewTransition name={`product-${product.slug}`} share="morph" default="none">
            {art}
          </ViewTransition>
        ) : (
          art
        )}

        {product.badge && (
          <span className="absolute left-4 top-4 rounded-full bg-maroon-700 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-white shadow-sm">
            {product.badge}
          </span>
        )}
        <AvailabilityBadge item={product} className="absolute bottom-3 left-3 shadow-sm" />
      </Link>

      <div className="absolute right-3 top-3 z-10 flex flex-col gap-2">
        <button
          type="button"
          aria-label={`${wished ? "Remove" : "Save"} ${product.name}`}
          aria-pressed={wished}
          onClick={() => {
            toggleWish({
              id: product.id,
              name: product.name,
              meta: `NOOLAM · ${product.kind === "blouse" ? "Blouse" : "Silk Saree"}`,
              price: product.price,
              swatch: product.swatch,
            });
            toast(wished ? "Removed from wishlist" : "Saved to wishlist", {
              description: product.name,
            });
          }}
          className={cn(
            "flex size-9 items-center justify-center rounded-full border border-white/70 bg-white/90 shadow-sm backdrop-blur transition hover:scale-105",
            wished ? "text-maroon-600" : "text-ink-soft",
          )}
        >
          <Heart className="size-4" fill={wished ? "currentColor" : "none"} />
        </button>
        <button
          type="button"
          aria-label={`${comparing ? "Remove" : "Add"} ${product.name} ${comparing ? "from" : "to"} compare`}
          aria-pressed={comparing}
          onClick={() => toggleCompare(product)}
          className={cn(
            "flex size-9 items-center justify-center rounded-full border shadow-sm backdrop-blur transition hover:scale-105",
            comparing
              ? "border-maroon-600 bg-maroon-600 text-white"
              : "border-white/70 bg-white/90 text-ink-soft [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-focus-within:opacity-100 [@media(hover:hover)]:group-hover:opacity-100",
          )}
        >
          <GitCompareArrows className="size-4" />
        </button>
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex aspect-[4/5] items-end px-3 pb-12">
        <button
          type="button"
          onClick={() => setQuickView(product.slug)}
          className="pointer-events-auto hidden h-10 w-full translate-y-2 items-center justify-center gap-2 rounded-full bg-white/95 text-[12.5px] font-medium text-ink opacity-0 shadow-[0_12px_30px_-14px_rgba(44,5,11,0.5)] backdrop-blur transition duration-300 focus-visible:translate-y-0 focus-visible:opacity-100 group-hover:translate-y-0 group-hover:opacity-100 [@media(hover:hover)]:flex"
        >
          <Eye className="size-4" />
          Quick view
        </button>
      </div>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] uppercase tracking-[0.22em] text-ink-soft/70">
            {product.kind === "blouse" ? "Blouse" : product.fabric.split(" · ")[0]}
          </p>
          <h3 className="mt-1.5 truncate text-[15px] font-medium tracking-tight text-ink">
            <Link href={`/product/${product.slug}`} className="transition hover:text-maroon-700">
              {product.name}
            </Link>
          </h3>
        </div>
        <div className="shrink-0 text-right">
          {product.compareAt && (
            <p className="text-[11px] tabular-nums text-ink-soft/55 line-through">
              {formatINR(product.compareAt)}
            </p>
          )}
          <p className="text-[13px] font-medium tabular-nums text-gold-700">
            {formatINR(product.price)}
          </p>
        </div>
      </div>
    </article>
  );
}
