"use client";

import { Heart, ShoppingBag } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";
import { SilkArt } from "@/components/site/silk-fabric";
import { useStore } from "@/components/site/store";
import { formatINR } from "@/lib/utils";

export function WishlistSheet() {
  const { wishlist, wishOpen, setWishOpen, removeWish, addToCart } = useStore();

  return (
    <Sheet open={wishOpen} onOpenChange={setWishOpen}>
      <SheetContent side="right" className="max-w-[440px]">
        <div className="border-b border-ink/10 px-6 pb-5 pt-7">
          <SheetTitle className="display text-2xl">Your wishlist</SheetTitle>
          <SheetDescription className="mt-1 text-[11px] uppercase tracking-[0.26em] text-ink-soft">
            {wishlist.length} saved {wishlist.length === 1 ? "piece" : "pieces"}
          </SheetDescription>
        </div>

        {wishlist.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-5 px-8 text-center">
            <span className="flex size-16 items-center justify-center rounded-full bg-cream">
              <Heart className="size-6 text-maroon-700" />
            </span>
            <div>
              <p className="text-lg font-medium">Nothing saved yet.</p>
              <p className="mt-2 text-sm text-ink-soft">
                Tap the heart on any piece to keep it here.
              </p>
            </div>
            <Button variant="outline" onClick={() => setWishOpen(false)}>
              Back to the rack
            </Button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-6 py-5">
            <ul className="space-y-5">
              {wishlist.map((item) => (
                <li key={item.id} className="flex gap-4">
                  <div className="h-24 w-[74px] shrink-0 overflow-hidden rounded-lg bg-cream">
                    {item.swatch ? (
                      <SilkArt swatch={item.swatch} className="h-full w-full" shape="drape" />
                    ) : null}
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <p className="truncate text-sm font-medium">{item.name}</p>
                    <p className="mt-0.5 text-[10px] uppercase tracking-[0.2em] text-ink-soft">
                      {item.meta ?? "NOOLAM · Saree"}
                    </p>
                    <p className="mt-2 text-sm tabular-nums">{formatINR(item.price)}</p>
                    <div className="mt-auto flex items-center gap-3 pt-3">
                      <button
                        type="button"
                        onClick={() => {
                          if (item.swatch) {
                            addToCart({
                              id: item.id,
                              name: item.name,
                              meta: item.meta,
                              price: item.price,
                              swatch: item.swatch,
                            });
                            removeWish(item.id);
                          } else {
                            toast("Pick a size on the product page", {
                              description: "This piece needs a size before it can join the bag.",
                            });
                          }
                        }}
                        className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-maroon-700 transition hover:text-maroon-600"
                      >
                        <ShoppingBag className="size-3.5" /> Move to bag
                      </button>
                      <button
                        type="button"
                        onClick={() => removeWish(item.id)}
                        className="text-[10px] uppercase tracking-[0.2em] text-ink-soft underline underline-offset-4 transition hover:text-ink"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
