"use client";

import * as React from "react";
import { Heart, Plus } from "lucide-react";
import { toast } from "sonner";

import { motion, useTransform } from "motion/react";

import { ScrollRail, useRail, useRailDistance } from "@/components/site/scroll-rail";
import { SilkArt } from "@/components/site/silk-fabric";
import { useStore } from "@/components/site/store";
import { products, type Product } from "@/lib/data";
import { cn, formatINR } from "@/lib/utils";

type SilkCard = {
  slug: string;
  lines: string[];
  tone: "light" | "dark";
};

const silks: SilkCard[] = [
  { slug: "magenta-shot-silk", lines: ["MAGENTA", "SHOT SILK"], tone: "light" },
  { slug: "palace-check", lines: ["PALACE", "CHECK"], tone: "light" },
  { slug: "bengal-garden", lines: ["BENGAL", "GARDEN"], tone: "dark" },
  { slug: "kanchi-rani", lines: ["KANCHI", "RANI"], tone: "light" },
  { slug: "noolam-temple-gold-brocade", lines: ["TEMPLE", "GOLD"], tone: "dark" },
  { slug: "forest-rettaipet", lines: ["FOREST", "RETTAI"], tone: "light" },
  { slug: "ruby-korvai", lines: ["RUBY", "KORVAI"], tone: "light" },
];

function SilkCardItem({ card, index }: { card: SilkCard; index: number }) {
  const { addToCart, toggleWish, isWished } = useStore();
  const product = products.find((item: Product) => item.slug === card.slug);
  const [tilt, setTilt] = React.useState({ x: 0, y: 0 });
  const [pressed, setPressed] = React.useState(false);
  const itemRef = React.useRef<HTMLDivElement>(null);
  const distance = useRailDistance(itemRef);
  // Cards ride a shallow arc: level and lifted at the centre, dipping and
  // leaning outward toward the edges of the screen.
  const y = useTransform(distance, (d) => d * d * 46);
  const rotate = useTransform(distance, (d) => d * 5.5);
  const scale = useTransform(distance, (d) => 1 - Math.min(1, Math.abs(d)) * 0.06);
  if (!product) return null;

  const handleMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -9, y: px * 11 });
  };

  const add = () => {
    addToCart({
      id: product.id,
      name: product.name,
      meta: product.kind === "saree" ? "NOOLAM · Saree" : "NOOLAM · Blouse",
      price: product.price,
      swatch: product.swatch,
    });
    toast.success("Dropped into your bag", { description: product.name });
  };

  return (
    <motion.div
      ref={itemRef}
      data-rail-item
      className="w-[236px] shrink-0 sm:w-[262px]"
      style={{ y, rotate, scale, transformOrigin: "50% 120%" }}
    >
      <div
        role="group"
        aria-label={product.name}
        onPointerMove={handleMove}
        onPointerLeave={() => setTilt({ x: 0, y: 0 })}
        onPointerDown={() => setPressed(true)}
        onPointerUp={() => setPressed(false)}
        className="group relative select-none overflow-hidden rounded-[22px] p-2 shadow-[0_30px_60px_-34px_rgba(30,4,8,0.55)] transition-transform duration-300 ease-out"
        style={{
          background: `linear-gradient(168deg, ${product.swatch.base} 0%, ${product.swatch.base} 45%, ${product.swatch.deep} 100%)`,
          transform: `perspective(1100px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${pressed ? 0.975 : 1})`,
        }}
      >
        <div className="relative h-[368px] overflow-hidden rounded-[16px] sm:h-[402px]">
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(70% 46% at 50% 60%, rgba(255,255,255,0.34) 0%, rgba(255,255,255,0) 70%), linear-gradient(180deg, ${product.swatch.base} 0%, ${product.swatch.deep} 100%)`,
            }}
          />
          <div className="absolute inset-x-8 bottom-[62px] h-6 rounded-[50%] bg-black/35 blur-lg" />

          <div className="absolute inset-1.5 rounded-[13px] border border-dashed border-white/30" />

          <h3
            className={cn(
              "display absolute inset-x-3 top-4 text-center text-[2.55rem] leading-[0.82] tracking-[-0.055em] sm:text-[2.85rem]",
              card.tone === "light" ? "text-white/95" : "text-maroon-950/85",
            )}
          >
            {card.lines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h3>

          <div className="pointer-events-none absolute inset-x-0 bottom-[68px] top-[92px] z-[2] flex items-end justify-center">
            <SilkArt
              swatch={product.swatch}
              shape={product.kind === "blouse" ? "blouse" : "drape"}
              flip={index % 2 === 1}
              className="h-full max-h-[270px] w-[188px] drop-shadow-[0_18px_16px_rgba(20,3,6,0.5)] transition-transform duration-500 ease-out group-hover:-translate-y-1.5"
            />
          </div>

          <button
            type="button"
            onClick={() => {
              toggleWish({
                id: product.id,
                name: product.name,
                meta: "NOOLAM · Silk",
                price: product.price,
                swatch: product.swatch,
              });
              toast(isWished(product.id) ? "Removed from wishlist" : "Saved to wishlist", {
                description: product.name,
              });
            }}
            aria-label={`${isWished(product.id) ? "Remove" : "Save"} ${product.name}`}
            aria-pressed={isWished(product.id)}
            className={cn(
              "absolute bottom-16 right-4 z-10 flex size-8 items-center justify-center rounded-full bg-white/90 shadow-sm transition hover:scale-105",
              isWished(product.id) ? "text-maroon-600" : "text-ink",
            )}
          >
            <Heart className="size-[15px]" fill={isWished(product.id) ? "currentColor" : "none"} />
          </button>

          <div className="absolute inset-x-4 bottom-4 z-10 flex items-end justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/60">
                {product.fabric.split(" · ")[0]}
              </p>
              <p className="mt-1 text-[13px] font-medium tabular-nums text-white">
                {formatINR(product.price)}
              </p>
            </div>
            <button
              type="button"
              onClick={add}
              aria-label={`Add ${product.name} to bag`}
              className="flex size-10 items-center justify-center rounded-full bg-ink text-white shadow-lg transition hover:scale-105 hover:bg-maroon-800 active:scale-95"
            >
              <Plus className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function RailThread() {
  const rail = useRail();
  if (!rail?.pinned) return null;
  return (
    <div className="shell mt-2" aria-hidden>
      <div className="relative mx-auto h-px max-w-[420px] bg-ink/10">
        <motion.div
          className="absolute inset-y-0 left-0 w-full origin-left bg-[linear-gradient(90deg,var(--color-maroon-600),var(--color-gold-500))]"
          style={{ scaleX: rail.progress }}
        />
      </div>
    </div>
  );
}

export function PickSilk() {
  return (
    <section
      id="pick-a-silk"
      aria-labelledby="pick-title"
      className="overflow-x-clip bg-[linear-gradient(180deg,#ffffff_0%,#fbf7f2_100%)] py-20 md:py-24"
    >
      <ScrollRail
        label="Silk colour wall. Scroll to move through the silks."
        head={
          <div className="shell">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="eyebrow">The colour wall</p>
                <h2 id="pick-title" className="display mt-5 text-[clamp(2.2rem,5.4vw,4.4rem)]">
                  Pick a <span className="text-gradient-warm">Silk</span>
                </h2>
              </div>
              <p className="max-w-[300px] text-sm leading-relaxed text-ink-soft lg:text-right">
                Scroll to walk the wall. Tilt a card, press it, then hit{" "}
                <span className="inline-flex size-4 translate-y-0.5 items-center justify-center rounded-full bg-ink text-[11px] text-white">
                  +
                </span>{" "}
                to drop a saree into your bag.
              </p>
            </div>
          </div>
        }
        foot={<RailThread />}
        trackClassName="items-start gap-5 px-[calc(50vw-118px)] pb-14 pt-10 sm:gap-8 sm:px-[calc(50vw-131px)]"
      >
        {silks.map((card, index) => (
          <SilkCardItem key={card.slug} card={card} index={index} />
        ))}
      </ScrollRail>
    </section>
  );
}
