"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Heart, ShoppingBag } from "lucide-react";
import { toast } from "sonner";

import { useStore } from "@/components/site/store";
import { bridal } from "@/lib/data";
import { cn, formatINR } from "@/lib/utils";

export function BridalCarousel() {
  const [active, setActive] = React.useState(0);
  const { addToCart, toggleWish, isWished } = useStore();
  const item = bridal[active];

  const go = (direction: 1 | -1) =>
    setActive((current) => (current + direction + bridal.length) % bridal.length);

  const add = () => {
    addToCart({
      id: item.id,
      name: item.name,
      meta: `Bridal · ${item.fabric}`,
      price: item.price,
      swatch: item.swatch,
    });
    toast.success("Bridal piece added", { description: item.name });
  };

  return (
    <section
      id="bridal"
      aria-labelledby="bridal-title"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#fbf8f3_40%,#f6f0e6_100%)] pb-24 pt-16 md:pt-20"
    >
      <div className="shell">
        <div className="text-center">
          <p className="eyebrow justify-center before:hidden">
            For the muhurtham and every vow after
          </p>
          <h2 id="bridal-title" className="display mt-4 text-[clamp(2.4rem,6vw,5rem)]">
            The Bridal <span className="text-maroon-700">Collection</span>
          </h2>
        </div>
      </div>

      <div className="relative mt-10">
        <div
          role="region"
          aria-label="Bridal arches. Use arrow keys to browse."
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") {
              event.preventDefault();
              go(-1);
            }
            if (event.key === "ArrowRight") {
              event.preventDefault();
              go(1);
            }
          }}
          className="flex items-end justify-center gap-1 overflow-hidden px-2 pb-6 outline-none sm:gap-2 lg:gap-3"
        >
          {bridal.map((piece, index) => {
            const diff = index - active;
            const wrapped =
              diff > 3 ? diff - bridal.length : diff < -3 ? diff + bridal.length : diff;
            const distance = Math.abs(wrapped);
            const isActive = wrapped === 0;
            const scale = isActive ? 1 : distance === 1 ? 0.86 : distance === 2 ? 0.72 : 0.6;
            const drop = isActive ? 0 : distance * 26;
            const rotate = wrapped * 2.4;
            const tone =
              distance === 0 ? "" : distance === 1 ? "opacity-90" : distance === 2 ? "opacity-70" : "opacity-45";

            return (
              <button
                key={piece.id}
                type="button"
                onClick={() => setActive(index)}
                aria-label={`Show ${piece.name}`}
                aria-current={isActive}
                className={cn(
                  "group relative shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-gold-500",
                  isActive
                    ? "w-[240px] sm:w-[300px] lg:w-[330px]"
                    : "w-[130px] sm:w-[190px] lg:w-[230px]",
                  tone,
                )}
                style={{
                  order: wrapped + 4,
                  transform: `translateY(${drop}px) scale(${scale}) rotate(${rotate}deg)`,
                  transition: "transform 650ms cubic-bezier(.22,1,.36,1), opacity 500ms ease",
                }}
              >
                <div
                  className={cn(
                    "relative aspect-[0.62] overflow-hidden bg-cream",
                    isActive && "ring-1 ring-gold-500/70 ring-offset-4 ring-offset-[#fbf8f3]",
                  )}
                  style={{ borderRadius: "999px 999px 4px 4px" }}
                >
                  <Image
                    src={piece.media}
                    alt={`${piece.name} — ${piece.fabric} bridal saree`}
                    fill
                    sizes="(max-width: 640px) 60vw, 330px"
                    className={cn(
                      "object-cover transition-transform duration-[1200ms] group-hover:scale-[1.05]",
                      isActive
                        ? "sepia-[0.12] saturate-[0.96] brightness-[0.98]"
                        : "sepia-[0.28] saturate-[0.8] brightness-[0.9]",
                    )}
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(250,247,242,0.06)_0%,transparent_38%,rgba(44,5,11,0.42)_100%)]" />

                  {piece.discount && (
                    <span className="absolute right-3 top-8 rounded-full bg-maroon-700 px-2.5 py-1 text-[9px] font-medium tracking-[0.08em] text-white shadow">
                      {piece.discount}
                    </span>
                  )}

                  {!isActive && (
                    <span className="absolute inset-x-4 bottom-5 text-center text-[9px] uppercase tracking-[0.22em] text-white/80">
                      {piece.name}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-8 flex flex-col items-center px-5">
          <div className="min-h-[112px] text-center">
            <h3 className="text-[clamp(1.4rem,2.6vw,2rem)] font-medium tracking-tight text-ink">
              {item.name}
            </h3>
            <p className="mt-1.5 text-[12px] text-ink-soft">
              {item.fabric} · {item.pallu}
            </p>
            <div className="mt-2 flex items-center justify-center gap-2.5">
              {item.compareAt && (
                <span className="text-[13px] tabular-nums text-ink-soft/55 line-through">
                  {formatINR(item.compareAt)}
                </span>
              )}
              <span className="text-[15px] font-medium tabular-nums text-gold-700">
                {formatINR(item.price)}
              </span>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous bridal saree"
              className="flex size-11 items-center justify-center rounded-full border border-ink/15 bg-white text-ink transition hover:border-maroon-600 hover:text-maroon-700"
            >
              <ArrowLeft className="size-4" />
            </button>

            <button
              type="button"
              onClick={add}
              className="inline-flex h-11 items-center gap-2 rounded-full bg-maroon-700 px-7 text-[12px] font-medium uppercase tracking-[0.14em] text-white transition hover:bg-maroon-800"
            >
              <ShoppingBag className="size-3.5" />
              Add to cart
            </button>

            <button
              type="button"
              aria-label={`${isWished(item.id) ? "Remove" : "Save"} ${item.name}`}
              aria-pressed={isWished(item.id)}
              onClick={() => {
                toggleWish({
                  id: item.id,
                  name: item.name,
                  meta: `Bridal · ${item.fabric}`,
                  price: item.price,
                  swatch: item.swatch,
                });
                toast(isWished(item.id) ? "Removed from wishlist" : "Saved to wishlist", {
                  description: item.name,
                });
              }}
              className={cn(
                "flex size-11 items-center justify-center rounded-full border bg-white transition",
                isWished(item.id)
                  ? "border-maroon-600 text-maroon-600"
                  : "border-ink/15 text-ink-soft hover:border-ink/35 hover:text-ink",
              )}
            >
              <Heart className="size-4" fill={isWished(item.id) ? "currentColor" : "none"} />
            </button>

            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next bridal saree"
              className="flex size-11 items-center justify-center rounded-full border border-ink/15 bg-white text-ink transition hover:border-maroon-600 hover:text-maroon-700"
            >
              <ArrowRight className="size-4" />
            </button>
          </div>

          <div className="mt-5 flex items-center gap-3 text-[10px] uppercase tracking-[0.24em] text-ink-soft/60">
            <span className="tabular-nums">
              {String(active + 1).padStart(2, "0")} / {String(bridal.length).padStart(2, "0")}
            </span>
            <span className="h-px w-16 bg-ink/15" />
            <Link href="/bridal" className="transition hover:text-maroon-700">
              See the full bridal archive
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
