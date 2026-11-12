"use client";

import * as React from "react";
import { toast } from "sonner";

import { useStore } from "@/components/site/store";
import type { Product } from "@/lib/data";

/** Adds a sized piece to the bag with the standard line label and confirmation. */
export function useAddToBag() {
  const { addToCart } = useStore();
  return React.useCallback(
    (product: Product, size: number, qty = 1) => {
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
        description: `${product.name} · size ${size}${qty > 1 ? ` · qty ${qty}` : ""}`,
      });
    },
    [addToCart],
  );
}

/** Toggles a piece in the compare list, explaining when the list is full. */
export function useToggleCompare() {
  const { toggleCompare, compare } = useStore();
  return React.useCallback(
    (product: Pick<Product, "id" | "name">) => {
      const was = compare.includes(product.id);
      const ok = toggleCompare(product.id);
      if (!ok) {
        toast("You can compare 3 pieces at a time", {
          description: "Remove one from the compare tray to add this one.",
        });
        return;
      }
      if (!was) toast("Added to compare", { description: product.name });
    },
    [toggleCompare, compare],
  );
}
