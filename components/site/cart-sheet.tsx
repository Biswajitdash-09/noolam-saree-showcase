"use client";

import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
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

export function CartSheet() {
  const { cart, cartOpen, setCartOpen, cartSubtotal, setQty, removeCart, clearCart, cartCount } =
    useStore();

  return (
    <Sheet open={cartOpen} onOpenChange={setCartOpen}>
      <SheetContent side="right" className="max-w-[440px]">
        <div className="border-b border-ink/10 px-6 pb-5 pt-7">
          <SheetTitle className="display text-2xl">Your bag</SheetTitle>
          <SheetDescription className="mt-1 text-[11px] uppercase tracking-[0.26em] text-ink-soft">
            {cartCount} {cartCount === 1 ? "piece" : "pieces"} reserved for you
          </SheetDescription>
        </div>

        {cart.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-5 px-8 text-center">
            <span className="flex size-16 items-center justify-center rounded-full bg-cream">
              <ShoppingBag className="size-6 text-maroon-700" />
            </span>
            <div>
              <p className="text-lg font-medium">The bag is empty.</p>
              <p className="mt-2 text-sm text-ink-soft">
                Add a saree from the rack, or take a whole look home.
              </p>
            </div>
            <Button variant="outline" onClick={() => setCartOpen(false)}>
              Keep browsing
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-5">
              <ul className="space-y-5">
                {cart.map((line) => (
                  <li key={line.key} className="flex gap-4">
                    <div className="h-24 w-[74px] shrink-0 overflow-hidden rounded-lg bg-cream">
                      {line.swatch ? (
                        <SilkArt swatch={line.swatch} className="h-full w-full" shape="drape" />
                      ) : null}
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium">{line.name}</p>
                          <p className="mt-0.5 text-[10px] uppercase tracking-[0.2em] text-ink-soft">
                            {line.meta ?? "NOOLAM · Saree"}
                          </p>
                        </div>
                        <button
                          type="button"
                          aria-label={`Remove ${line.name}`}
                          onClick={() => removeCart(line.key)}
                          className="text-ink-soft transition hover:text-maroon-700"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                      <div className="mt-auto flex items-end justify-between pt-3">
                        <div className="inline-flex items-center rounded-full border border-ink/15">
                          <button
                            type="button"
                            aria-label="Decrease quantity"
                            onClick={() => setQty(line.key, line.qty - 1)}
                            className="flex size-7 items-center justify-center rounded-full text-ink-soft transition hover:text-ink"
                          >
                            <Minus className="size-3" />
                          </button>
                          <span className="w-6 text-center text-xs tabular-nums">{line.qty}</span>
                          <button
                            type="button"
                            aria-label="Increase quantity"
                            onClick={() => setQty(line.key, line.qty + 1)}
                            className="flex size-7 items-center justify-center rounded-full text-ink-soft transition hover:text-ink"
                          >
                            <Plus className="size-3" />
                          </button>
                        </div>
                        <span className="text-sm tabular-nums">
                          {formatINR(line.price * line.qty)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={clearCart}
                className="mt-6 text-[10px] uppercase tracking-[0.24em] text-ink-soft underline underline-offset-4 transition hover:text-maroon-700"
              >
                Empty the bag
              </button>
            </div>

            <div className="border-t border-ink/10 bg-cream/50 px-6 py-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-ink-soft">Subtotal</span>
                <span className="text-lg font-medium tabular-nums">{formatINR(cartSubtotal)}</span>
              </div>
              <p className="mt-1 text-[11px] text-ink-soft">
                Complimentary insured shipping across India.
              </p>
              <Button
                className="mt-5 w-full"
                size="lg"
                onClick={() =>
                  toast("This is a showcase store", {
                    description: "Checkout and payments are disabled in this demo.",
                  })
                }
              >
                Proceed to checkout
              </Button>
              <button
                type="button"
                onClick={() => setCartOpen(false)}
                className="mt-3 w-full text-center text-[10px] uppercase tracking-[0.24em] text-ink-soft transition hover:text-ink"
              >
                Continue browsing
              </button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
