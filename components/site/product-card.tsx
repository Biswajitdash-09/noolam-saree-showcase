"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { toast } from "sonner";

import { ProductArt } from "@/components/site/product-art";
import { useStore } from "@/components/site/store";
import type { Product } from "@/lib/data";
import { cn, formatINR } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const { toggleWish, isWished } = useStore();
  const wished = isWished(product.id);

  return (
    <article className="group relative flex flex-col">
      <Link
        href={`/product/${product.slug}`}
        className="relative block overflow-hidden rounded-[20px] border border-ink/8 outline-none transition-shadow duration-500 hover:shadow-[0_30px_60px_-40px_rgba(44,5,11,0.55)] focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-4"
      >
        <ProductArt product={product} className="aspect-[4/5]" />

        {product.badge && (
          <span className="absolute left-4 top-4 rounded-full bg-maroon-700 px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.14em] text-white shadow-sm">
            {product.badge}
          </span>
        )}

        <span className="absolute inset-x-0 bottom-0 flex translate-y-3 items-center justify-center bg-[linear-gradient(180deg,transparent,rgba(44,5,11,0.55))] pb-4 pt-12 text-[9px] uppercase tracking-[0.26em] text-white/0 transition duration-500 group-hover:translate-y-0 group-hover:text-white/90">
          View the piece
        </span>
      </Link>

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
          "absolute right-3 top-3 z-10 flex size-9 items-center justify-center rounded-full border border-white/70 bg-white/90 shadow-sm backdrop-blur transition hover:scale-105",
          wished ? "text-maroon-600" : "text-ink-soft",
        )}
      >
        <Heart className="size-4" fill={wished ? "currentColor" : "none"} />
      </button>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[9px] uppercase tracking-[0.22em] text-ink-soft/70">
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
