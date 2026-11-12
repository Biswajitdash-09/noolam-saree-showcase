"use client";

import { CartSheet } from "@/components/site/cart-sheet";
import { CompareTray } from "@/components/site/compare-tray";
import { QuickView } from "@/components/site/quick-view";
import { SearchDialog } from "@/components/site/search-dialog";
import { WishlistSheet } from "@/components/site/wishlist-sheet";

export function SiteOverlays() {
  return (
    <>
      <CartSheet />
      <WishlistSheet />
      <QuickView />
      <SearchDialog />
      <CompareTray />
    </>
  );
}
