"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Heart, X } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HangerProduct } from "@/components/site/hanger";
import { SilkArt } from "@/components/site/silk-fabric";
import { useStore } from "@/components/site/store";
import type { Product } from "@/lib/data";
import { cn, formatINR } from "@/lib/utils";

type RackDetailProps = {
  items: Product[];
  index: number | null;
  onIndexChange: (index: number) => void;
  onClose: () => void;
};

export function RackDetail({ items, index, onIndexChange, onClose }: RackDetailProps) {
  const open = index !== null;
  const activeIndex = index ?? 0;
  const product = items[activeIndex];
  const [size, setSize] = React.useState<number | null>(null);
  const [flip, setFlip] = React.useState(false);
  const [showAvailability, setShowAvailability] = React.useState(false);
  const { addToCart, toggleWish, isWished } = useStore();

  React.useEffect(() => {
    setSize(null);
    setFlip(false);
    setShowAvailability(false);
  }, [index]);

  if (!product) return null;

  const go = (direction: 1 | -1) => {
    const next = (activeIndex + direction + items.length) % items.length;
    onIndexChange(next);
  };

  return (
    <Dialog open={open} onOpenChange={(value) => (!value ? onClose() : undefined)}>
      <DialogContent
        showClose={false}
        aria-describedby={undefined}
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
        className="max-h-[100svh] w-screen max-w-none overflow-y-auto rounded-none border-0 bg-[#faf8f4] p-0"
      >
        <DialogTitle className="sr-only">{product.name}</DialogTitle>

        <div className="pointer-events-none absolute inset-x-0 top-[22%] flex items-center justify-center opacity-30 blur-[8px]">
          <div className="relative h-[220px] w-full max-w-[1400px]">
            <Image
              src="/images/rack/full-rail.png"
              alt="The rail"
              fill
              className="object-contain"
            />
          </div>
        </div>

        <div className="relative z-10 flex min-h-[100svh] flex-col">
          <div className="flex items-center justify-between px-6 py-5 sm:px-10">
            <p className="text-[10px] uppercase tracking-[0.24em] text-ink-soft/70">
              The Rack · {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(items.length).padStart(2, "0")}
            </p>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-ink-soft transition hover:text-maroon-700"
            >
              Close <X className="size-3.5" />
            </button>
          </div>

          <div className="relative flex flex-1 flex-col items-center justify-start px-6 pb-12 pt-4 sm:pt-10">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous piece"
              className="absolute left-4 top-1/2 z-20 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full border border-ink/15 bg-white/70 text-ink backdrop-blur transition hover:border-maroon-600 hover:text-maroon-700 sm:flex lg:left-16"
            >
              <ArrowLeft className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next piece"
              className="absolute right-4 top-1/2 z-20 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full border border-ink/15 bg-white/70 text-ink backdrop-blur transition hover:border-maroon-600 hover:text-maroon-700 sm:flex lg:right-16"
            >
              <ArrowRight className="size-4" />
            </button>

            <div className="mt-2 scale-90 sm:scale-100">
              <HangerProduct product={product} size="lg" flip={flip} />
            </div>

            <div className="mt-2 flex flex-col items-center text-center sm:mt-4">
              <p className="text-[9px] uppercase tracking-[0.3em] text-ink-soft/70">
                NOOLAM · {product.kind === "blouse" ? "Blouse" : "Silk Saree"}
              </p>
              <h3 className="mt-2 text-[18px] font-medium uppercase tracking-[0.14em] text-ink">
                {product.name}
              </h3>
              <p className="mt-1.5 text-[14px] tabular-nums text-ink-soft">
                {formatINR(product.price)}.00
              </p>

              <Tabs
                value={flip ? "back" : "front"}
                onValueChange={(value) => setFlip(value === "back")}
                className="mt-4"
              >
                <TabsList>
                  <TabsTrigger value="front">Front</TabsTrigger>
                  <TabsTrigger value="back">Back</TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
                {product.sizes.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setSize(option)}
                    aria-pressed={size === option}
                    className={cn(
                      "flex size-9 items-center justify-center rounded-full border text-[12px] tabular-nums transition",
                      size === option
                        ? "border-maroon-700 bg-maroon-700 text-white"
                        : "border-ink/15 bg-white/60 text-ink hover:border-ink/40",
                    )}
                  >
                    {option}
                  </button>
                ))}
              </div>

              <div className="mt-5 flex items-center gap-3">
                <Button
                  size="lg"
                  disabled={!size}
                  onClick={() => {
                    if (!size) return;
                    addToCart({
                      id: product.id,
                      name: product.name,
                      meta: `Size ${size} · ${product.fabric.split(" · ")[0]}`,
                      price: product.price,
                      swatch: product.swatch,
                      size,
                    });
                    toast.success("Added to bag", {
                      description: `${product.name} · size ${size}`,
                    });
                  }}
                  className={cn(
                    "h-11 min-w-[190px] px-7 text-[12px] uppercase tracking-[0.16em]",
                    !size && "bg-ink/15 text-ink/40 shadow-none",
                  )}
                >
                  {size ? "Add to bag" : "Select a size"}
                </Button>
                <button
                  type="button"
                  aria-label={`${isWished(product.id) ? "Remove" : "Save"} ${product.name}`}
                  aria-pressed={isWished(product.id)}
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
                  className={cn(
                    "flex size-11 items-center justify-center rounded-full border bg-white/60 transition",
                    isWished(product.id)
                      ? "border-maroon-600 text-maroon-600"
                      : "border-ink/15 text-ink-soft hover:border-ink/35 hover:text-ink",
                  )}
                >
                  <Heart className="size-4" fill={isWished(product.id) ? "currentColor" : "none"} />
                </button>
              </div>

              <button
                type="button"
                onClick={() => setShowAvailability((value) => !value)}
                className="mt-4 text-[9.5px] uppercase tracking-[0.24em] text-ink-soft underline decoration-gold-500/60 underline-offset-4 transition hover:text-maroon-700"
              >
                See availability
              </button>
              {showAvailability && (
                <p className="mt-3 max-w-[320px] text-[11px] leading-relaxed text-ink-soft">
                  In the Chennai flagship and the Kanchipuram loom room. Ships in
                  3–5 working days with insured delivery.
                </p>
              )}
              <p className="mt-5 max-w-[340px] text-[11px] leading-relaxed text-ink-soft/80">
                {product.description}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
