"use client";

import { CartSheet } from "@/components/site/cart-sheet";
import { WishlistSheet } from "@/components/site/wishlist-sheet";

export function SiteOverlays() {
  return (
    <>
      <CartSheet />
      <WishlistSheet />
    </>
  );
}
