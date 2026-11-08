"use client";

import * as React from "react";
import Image from "next/image";
import { Heart, Plus } from "lucide-react";
import { toast } from "sonner";

import { useDragScroll } from "@/hooks/use-drag-scroll";
import { useStore } from "@/components/site/store";
import { products, type Product } from "@/lib/data";
import { cn, formatINR } from "@/lib/utils";

type SilkCard = {
  slug: string;
  lines: string[];
  media: string;
  tone: "light" | "dark";
};

const silks: SilkCard[] = [
  { slug: "magenta-shot-silk", lines: ["MAGENTA", "SHOT SILK"], media: "/images/editorial/city-brick.jpg", tone: "light" },
  { slug: "palace-check", lines: ["PALACE", "CHECK"], media: "/images/editorial/city-dusk.jpg", tone: "light" },
  { slug: "bengal-garden", lines: ["BENGAL", "GARDEN"], media: "/images/editorial/rocky-plains.jpg", tone: "dark" },
  { slug: "kanchi-rani", lines: ["KANCHI", "RANI"], media: "/images/editorial/ocean-sunset.jpg", tone: "light" },
  { slug: "noolam-temple-gold-brocade", lines: ["TEMPLE", "GOLD"], media: "/images/editorial/misty-ridge.jpg", tone: "dark" },
  { slug: "forest-rettaipet", lines: ["FOREST", "RETTAI"], media: "/images/editorial/mountain-pines.jpg", tone: "light" },
  { slug: "ruby-korvai", lines: ["RUBY", "KORVAI"], media: "/images/editorial/city-fog.jpg", tone: "light" },
];

function SilkCardItem({ card, index, total }: { card: SilkCard; index: number; total: number }) {
  const { addToCart, toggleWish, isWished } = useStore();
  const product = products.find((item: Product) => item.slug === card.slug);
  const [tilt, setTilt] = React.useState({ x: 0, y: 0 });
  const [pressed, setPressed] = React.useState(false);
  if (!product) return null;

  const center = (total - 1) / 2;
  const offset = index - center;

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
    <div
      className="w-[236px] shrink-0 sm:w-[262px]"
      style={{ transform: `translateY(${Math.abs(offset) * 16}px)` }}
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
          transform: `perspective(1100px) rotate(${offset * 1.35}deg) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${pressed ? 0.975 : 1})`,
        }}
      >
        <div className="relative h-[368px] overflow-hidden rounded-[16px] sm:h-[402px]">
          <Image
            src={card.media}
            alt={`${product.name} editorial`}
            fill
            sizes="262px"
            draggable={false}
            className="object-cover opacity-70 mix-blend-luminosity transition-transform duration-700 group-hover:scale-[1.04]"
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(180deg, ${product.swatch.base}f2 0%, ${product.swatch.base}33 34%, ${product.swatch.deep}00 55%, ${product.swatch.deep}d9 100%)`,
            }}
          />

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
              <p className="text-[9px] uppercase tracking-[0.22em] text-white/60">
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
    </div>
  );
}

export function PickSilk() {
  const { ref, dragProps } = useDragScroll<HTMLDivElement>();

  return (
    <section
      id="pick-a-silk"
      aria-labelledby="pick-title"
      className="overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#fbf7f2_100%)] py-20 md:py-24"
    >
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">The colour wall</p>
            <h2 id="pick-title" className="display mt-5 text-[clamp(2.2rem,5.4vw,4.4rem)]">
              Pick a <span className="text-gradient-warm">Silk</span>
            </h2>
          </div>
          <p className="max-w-[300px] text-sm leading-relaxed text-ink-soft lg:text-right">
            Tilt a card, press it, poke the silk. Hit{" "}
            <span className="inline-flex size-4 translate-y-0.5 items-center justify-center rounded-full bg-ink text-[9px] text-white">
              +
            </span>{" "}
            to drop a saree into your bag.
          </p>
        </div>
      </div>

      <div className="mt-14">
        <div
          ref={ref}
          {...dragProps}
          className="no-scrollbar flex cursor-grab snap-x snap-mandatory items-start gap-4 overflow-x-auto px-5 pb-16 pt-2 active:cursor-grabbing sm:gap-6 md:px-10 xl:px-14"
        >
          {silks.map((card, index) => (
            <div key={card.slug} className="snap-center">
              <SilkCardItem card={card} index={index} total={silks.length} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
