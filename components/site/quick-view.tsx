"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight, MessageCircle, ShoppingBag } from "lucide-react";

import { AvailabilityBadge } from "@/components/site/availability-badge";
import { ProductArt } from "@/components/site/product-art";
import { useStore } from "@/components/site/store";
import { useAddToBag } from "@/components/site/use-add-to-bag";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { availability, getProduct } from "@/lib/data";
import { cn, formatINR } from "@/lib/utils";
import { reweaveMessage, waLink } from "@/lib/whatsapp";

/** A side sheet to size and bag a piece without leaving the grid. */
export function QuickView() {
  const { quickView, setQuickView } = useStore();
  const product = quickView ? getProduct(quickView) : undefined;
  const [size, setSize] = React.useState<number | null>(null);
  const addToBag = useAddToBag();

  React.useEffect(() => setSize(null), [quickView]);

  const soldOut = product ? availability(product) === "sold" : false;

  return (
    <Sheet open={Boolean(product)} onOpenChange={(open) => (!open ? setQuickView(null) : undefined)}>
      <SheetContent side="right" className="max-w-[460px]">
        {product && (
          <div data-lenis-prevent className="flex h-full flex-col overflow-y-auto">
            <ProductArt
              product={product}
              className="aspect-[5/4] w-full shrink-0"
              artClassName="h-[230px] w-[180px]"
            />
            <div className="flex flex-1 flex-col px-6 pb-7 pt-6">
              <p className="text-[10px] uppercase tracking-[0.24em] text-ink-soft/70">
                {product.kind === "blouse" ? "Silk blouse" : product.fabric.split(" · ")[0]}
              </p>
              <SheetTitle className="display mt-2 text-[1.9rem]">{product.name}</SheetTitle>
              <SheetDescription className="mt-1 text-[13px] text-ink-soft">
                {product.fabric}
                {product.pallu ? ` · ${product.pallu}` : ""}
              </SheetDescription>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <span className="text-[20px] font-medium tabular-nums text-gold-700">
                  {formatINR(product.price)}
                </span>
                {product.compareAt && (
                  <span className="text-[13px] tabular-nums text-ink-soft/55 line-through">
                    {formatINR(product.compareAt)}
                  </span>
                )}
                <AvailabilityBadge item={product} detailed />
              </div>

              <p className="mt-4 line-clamp-3 text-[13.5px] leading-relaxed text-ink-soft">
                {product.description}
              </p>

              {!soldOut && (
                <fieldset className="mt-6">
                  <legend className="text-[12px] text-ink-soft">Blouse size</legend>
                  <div className="mt-2.5 flex flex-wrap gap-2">
                    {product.sizes.map((option) => (
                      <button
                        key={option}
                        type="button"
                        aria-pressed={size === option}
                        onClick={() => setSize(option)}
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
                </fieldset>
              )}

              <div className="mt-auto pt-7">
                {soldOut ? (
                  <a
                    href={waLink(reweaveMessage(product))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#1f8f4e] text-[14px] font-medium text-white transition hover:bg-[#187a42]"
                  >
                    <MessageCircle className="size-4" />
                    Ask for a re-weave
                  </a>
                ) : (
                  <Button
                    size="lg"
                    className="w-full"
                    disabled={!size}
                    onClick={() => {
                      if (!size) return;
                      addToBag(product, size);
                      setQuickView(null);
                    }}
                  >
                    <ShoppingBag className="size-4" />
                    {size ? "Add to bag" : "Choose a size to add"}
                  </Button>
                )}
                <Link
                  href={`/product/${product.slug}`}
                  onClick={() => setQuickView(null)}
                  className="mt-3 flex items-center justify-center gap-1.5 text-[13px] font-medium text-maroon-700 underline decoration-gold-500/60 underline-offset-4"
                >
                  See the full page
                  <ArrowUpRight className="size-3.5" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
