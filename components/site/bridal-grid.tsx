"use client";

import Image from "next/image";
import { Heart, ShoppingBag } from "lucide-react";
import { toast } from "sonner";

import { useStore } from "@/components/site/store";
import { bridal } from "@/lib/data";
import { cn, formatINR } from "@/lib/utils";

export function BridalGrid() {
  const { addToCart, toggleWish, isWished } = useStore();

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-7 lg:grid-cols-3 xl:grid-cols-4">
      {bridal.map((piece) => {
        const wished = isWished(piece.id);
        return (
          <article key={piece.id} className="group">
            <div
              className="relative aspect-[0.62] overflow-hidden bg-cream ring-1 ring-gold-500/25 transition-shadow duration-500 group-hover:shadow-[0_30px_60px_-40px_rgba(44,5,11,0.6)]"
              style={{ borderRadius: "999px 999px 6px 6px" }}
            >
              <Image
                src={piece.media}
                alt={`${piece.name} — ${piece.fabric} bridal saree`}
                fill
                sizes="(max-width: 640px) 45vw, (max-width: 1280px) 30vw, 320px"
                className="object-cover sepia-[0.16] saturate-[0.92] brightness-[0.97] transition-transform duration-[1200ms] group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(250,247,242,0.05)_0%,transparent_45%,rgba(44,5,11,0.45)_100%)]" />

              {piece.discount && (
                <span className="absolute right-3 top-10 rounded-full bg-maroon-700 px-2.5 py-1 text-[9px] font-medium tracking-[0.08em] text-white shadow">
                  {piece.discount}
                </span>
              )}

              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 p-3">
                <button
                  type="button"
                  onClick={() => {
                    addToCart({
                      id: piece.id,
                      name: piece.name,
                      meta: `Bridal · ${piece.fabric}`,
                      price: piece.price,
                      swatch: piece.swatch,
                    });
                    toast.success("Bridal piece added", { description: piece.name });
                  }}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/92 px-3 py-2 text-[9px] font-medium uppercase tracking-[0.14em] text-ink backdrop-blur transition hover:bg-white"
                >
                  <ShoppingBag className="size-3" />
                  Add
                </button>
                <button
                  type="button"
                  aria-label={`${wished ? "Remove" : "Save"} ${piece.name}`}
                  aria-pressed={wished}
                  onClick={() => {
                    toggleWish({
                      id: piece.id,
                      name: piece.name,
                      meta: `Bridal · ${piece.fabric}`,
                      price: piece.price,
                      swatch: piece.swatch,
                    });
                    toast(wished ? "Removed from wishlist" : "Saved to wishlist", {
                      description: piece.name,
                    });
                  }}
                  className={cn(
                    "flex size-8 items-center justify-center rounded-full bg-white/92 backdrop-blur transition hover:bg-white",
                    wished ? "text-maroon-600" : "text-ink-soft",
                  )}
                >
                  <Heart className="size-3.5" fill={wished ? "currentColor" : "none"} />
                </button>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-[9px] uppercase tracking-[0.22em] text-ink-soft/65">
                {piece.fabric}
              </p>
              <h3 className="mt-1.5 text-[15px] font-medium tracking-tight text-ink">
                {piece.name}
              </h3>
              <p className="mt-0.5 text-[11.5px] text-ink-soft">{piece.pallu}</p>
              <div className="mt-2 flex items-baseline gap-2">
                {piece.compareAt && (
                  <span className="text-[11px] tabular-nums text-ink-soft/55 line-through">
                    {formatINR(piece.compareAt)}
                  </span>
                )}
                <span className="text-[13px] font-medium tabular-nums text-gold-700">
                  {formatINR(piece.price)}
                </span>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
