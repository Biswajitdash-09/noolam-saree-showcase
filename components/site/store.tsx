"use client";

import * as React from "react";
import type { Swatch } from "@/lib/data";

export type CartItem = {
  key: string;
  id: string;
  name: string;
  meta?: string;
  price: number;
  qty: number;
  swatch?: Swatch;
};

export type WishItem = {
  id: string;
  name: string;
  meta?: string;
  price: number;
  swatch?: Swatch;
};

type StoreValue = {
  cart: CartItem[];
  cartCount: number;
  cartSubtotal: number;
  addToCart: (
    item: Omit<CartItem, "qty" | "key"> & {
      qty?: number;
      size?: number | string;
      key?: string;
    },
  ) => void;
  removeCart: (key: string) => void;
  setQty: (key: string, qty: number) => void;
  clearCart: () => void;
  wishlist: WishItem[];
  toggleWish: (item: WishItem) => void;
  removeWish: (id: string) => void;
  isWished: (id: string) => boolean;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  wishOpen: boolean;
  setWishOpen: (open: boolean) => void;
};

const StoreContext = React.createContext<StoreValue | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = React.useState<CartItem[]>([]);
  const [wishlist, setWishlist] = React.useState<WishItem[]>([]);
  const [cartOpen, setCartOpen] = React.useState(false);
  const [wishOpen, setWishOpen] = React.useState(false);

  const addToCart = React.useCallback<StoreValue["addToCart"]>((item) => {
    const qty = item.qty ?? 1;
    const key = item.key ?? (item.size ? `${item.id}-${item.size}` : `${item.id}-one`);
    setCart((prev) => {
      const existing = prev.find((line) => line.key === key);
      if (existing) {
        return prev.map((line) =>
          line.key === key ? { ...line, qty: line.qty + qty } : line,
        );
      }
      return [
        ...prev,
        {
          key,
          id: item.id,
          name: item.name,
          meta: item.meta,
          price: item.price,
          swatch: item.swatch,
          qty,
        },
      ];
    });
    setCartOpen(true);
  }, []);

  const removeCart = React.useCallback((key: string) => {
    setCart((prev) => prev.filter((line) => line.key !== key));
  }, []);

  const setQty = React.useCallback((key: string, qty: number) => {
    setCart((prev) =>
      qty <= 0
        ? prev.filter((line) => line.key !== key)
        : prev.map((line) => (line.key === key ? { ...line, qty } : line)),
    );
  }, []);

  const clearCart = React.useCallback(() => setCart([]), []);

  const toggleWish = React.useCallback((item: WishItem) => {
    setWishlist((prev) =>
      prev.some((w) => w.id === item.id)
        ? prev.filter((w) => w.id !== item.id)
        : [...prev, item],
    );
  }, []);

  const removeWish = React.useCallback(
    (id: string) => setWishlist((prev) => prev.filter((w) => w.id !== id)),
    [],
  );

  const isWished = React.useCallback(
    (id: string) => wishlist.some((w) => w.id === id),
    [wishlist],
  );

  const cartCount = cart.reduce((sum, line) => sum + line.qty, 0);
  const cartSubtotal = cart.reduce((sum, line) => sum + line.qty * line.price, 0);

  const value: StoreValue = {
    cart,
    cartCount,
    cartSubtotal,
    addToCart,
    removeCart,
    setQty,
    clearCart,
    wishlist,
    toggleWish,
    removeWish,
    isWished,
    cartOpen,
    setCartOpen,
    wishOpen,
    setWishOpen,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = React.useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}
