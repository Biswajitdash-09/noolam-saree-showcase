"use client";

import * as React from "react";
import Link from "next/link";
import { Heart, Minus, Plus, ShoppingBag } from "lucide-react";
import { toast } from "sonner";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useStore } from "@/components/site/store";
import type { Product } from "@/lib/data";
import { cn, formatINR } from "@/lib/utils";

export function ProductBuy({ product }: { product: Product }) {
  const [size, setSize] = React.useState<number | null>(null);
  const [qty, setQty] = React.useState(1);
  const { addToCart, toggleWish, isWished } = useStore();
  const wished = isWished(product.id);
  const label = product.kind === "blouse" ? "Blouse size" : "Blouse size (with the saree)";

  return (
    <div>
      <p className="text-[9.5px] uppercase tracking-[0.26em] text-ink-soft/70">
        NOOLAM · {product.kind === "blouse" ? "Silk blouse" : "Silk saree"}
      </p>
      <h1 className="display mt-3 text-[clamp(1.9rem,3.2vw,2.9rem)] text-ink">
        {product.name}
      </h1>
      <p className="mt-2 text-[12.5px] text-ink-soft">
        {product.fabric}
        {product.pallu ? ` · ${product.pallu}` : ""}
      </p>

      <div className="mt-5 flex flex-wrap items-end gap-3">
        <span className="text-[24px] font-medium tabular-nums text-gold-700">
          {formatINR(product.price)}
        </span>
        {product.compareAt && (
          <span className="pb-1 text-[14px] tabular-nums text-ink-soft/55 line-through">
            {formatINR(product.compareAt)}
          </span>
        )}
        <span className="pb-1.5 text-[10px] uppercase tracking-[0.2em] text-ink-soft/60">
          Inclusive of all taxes
        </span>
      </div>

      <p className="mt-5 max-w-[52ch] text-sm leading-relaxed text-ink-soft">
        {product.description}
      </p>

      <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 border-y border-ink/10 py-4 text-[12px]">
        <div>
          <dt className="text-[9px] uppercase tracking-[0.22em] text-ink-soft/60">Weave</dt>
          <dd className="mt-1 text-ink">{product.fabric}</dd>
        </div>
        <div>
          <dt className="text-[9px] uppercase tracking-[0.22em] text-ink-soft/60">Finish</dt>
          <dd className="mt-1 text-ink">{product.pallu ?? "Hand-finished selvedge"}</dd>
        </div>
        <div>
          <dt className="text-[9px] uppercase tracking-[0.22em] text-ink-soft/60">Colour</dt>
          <dd className="mt-1 flex items-center gap-2 text-ink">
            <span
              className="size-3 rounded-full ring-1 ring-ink/15"
              style={{ backgroundColor: product.swatch.base }}
            />
            {product.swatch.name}
          </dd>
        </div>
        <div>
          <dt className="text-[9px] uppercase tracking-[0.22em] text-ink-soft/60">Mark</dt>
          <dd className="mt-1 text-ink">Silk Mark · pure zari</dd>
        </div>
      </dl>

      <div className="mt-6">
        <div className="flex items-center justify-between">
          <p className="text-[9.5px] uppercase tracking-[0.24em] text-ink-soft">{label}</p>
          <button type="button" className="text-[9.5px] uppercase tracking-[0.2em] text-maroon-700 underline decoration-gold-500/60 underline-offset-4">
            Size guide
          </button>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {product.sizes.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setSize(option)}
              aria-pressed={size === option}
              className={cn(
                "flex h-10 min-w-10 items-center justify-center rounded-full border px-3 text-[12px] tabular-nums transition",
                size === option
                  ? "border-maroon-700 bg-maroon-700 text-white"
                  : "border-ink/15 bg-white text-ink hover:border-ink/40",
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <div className="inline-flex h-12 items-center rounded-full border border-ink/15 bg-white">
          <button
            type="button"
            aria-label="Decrease quantity"
            onClick={() => setQty((value) => Math.max(1, value - 1))}
            className="flex size-11 items-center justify-center text-ink-soft transition hover:text-ink"
          >
            <Minus className="size-3.5" />
          </button>
          <span aria-live="polite" className="w-7 text-center text-[12px] tabular-nums text-ink">
            {qty}
          </span>
          <button
            type="button"
            aria-label="Increase quantity"
            onClick={() => setQty((value) => Math.min(4, value + 1))}
            className="flex size-11 items-center justify-center text-ink-soft transition hover:text-ink"
          >
            <Plus className="size-3.5" />
          </button>
        </div>

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
              qty,
            });
            toast.success("Added to bag", {
              description: `${product.name} · size ${size} · qty ${qty}`,
            });
          }}
          className={cn(
            "h-12 min-w-[190px] flex-1 px-7 text-[12px] uppercase tracking-[0.16em] sm:flex-none",
            !size && "bg-ink/15 text-ink/40 shadow-none",
          )}
        >
          <ShoppingBag className="size-4" />
          {size ? "Add to bag" : "Select a size"}
        </Button>

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
            "flex size-12 items-center justify-center rounded-full border bg-white transition",
            wished
              ? "border-maroon-600 text-maroon-600"
              : "border-ink/15 text-ink-soft hover:border-ink/35 hover:text-ink",
          )}
        >
          <Heart className="size-4" fill={wished ? "currentColor" : "none"} />
        </button>
      </div>

      <p className="mt-4 text-[11px] leading-relaxed text-ink-soft/75">
        Ships in 3–5 working days with insured delivery. One of each piece is
        woven; the loom room will confirm the exact pallu before dispatch.
      </p>

      <Accordion type="single" collapsible className="mt-7">
        <AccordionItem value="weave">
          <AccordionTrigger className="text-[13px]">The weave</AccordionTrigger>
          <AccordionContent className="text-[12.5px] leading-relaxed">
            Woven on a pit loom in Kanchipuram with a three-ply mulberry silk
            warp and a silver-core zari weft. Each korvai join is made by hand,
            so no two borders meet the body in exactly the same way.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="care">
          <AccordionTrigger className="text-[13px]">Silk care</AccordionTrigger>
          <AccordionContent className="text-[12.5px] leading-relaxed">
            Dry clean only, and not before its first wear. Air the saree in
            shade for a few hours after wearing, fold along the pallu, and keep
            it in a cotton muslin bag away from direct light.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="shipping">
          <AccordionTrigger className="text-[13px]">Shipping &amp; returns</AccordionTrigger>
          <AccordionContent className="text-[12.5px] leading-relaxed">
            Insured shipping across India in 3–5 working days. Returns are
            accepted within seven days of delivery on unworn pieces with the
            tag and loom note intact. Bridal pieces are made to order and are
            final sale.
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[9.5px] uppercase tracking-[0.2em] text-ink-soft/60">
        <span>Need it sooner?</span>
        <Link href="/#the-weave" className="text-maroon-700 transition hover:text-maroon-800">
          Write to the loom room
        </Link>
        <span className="text-gold-500">·</span>
        <span>Chennai flagship pickup</span>
      </div>
    </div>
  );
}
