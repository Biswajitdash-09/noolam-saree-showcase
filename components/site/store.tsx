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
  /** Product ids picked for side-by-side comparison (up to 3). */
  compare: string[];
  /** Returns false when the list is already full. */
  toggleCompare: (id: string) => boolean;
  clearCompare: () => void;
  /** Slug of the product open in the quick-view sheet. */
  quickView: string | null;
  setQuickView: (slug: string | null) => void;
  /** Recently viewed product slugs, newest first (up to 8). */
  recent: string[];
  recordView: (slug: string) => void;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
};

export const COMPARE_LIMIT = 3;

const StoreContext = React.createContext<StoreValue | null>(null);

const STORAGE_KEY = "noolam-bag-v1";

type Saved = { cart: CartItem[]; wishlist: WishItem[]; compare: string[]; recent: string[] };

const strings = (value: unknown, max: number) =>
  Array.isArray(value) ? value.filter((v): v is string => typeof v === "string").slice(0, max) : [];

function readSaved(): Saved {
  const empty: Saved = { cart: [], wishlist: [], compare: [], recent: [] };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return empty;
    const data = JSON.parse(raw) as {
      cart?: unknown;
      wishlist?: unknown;
      compare?: unknown;
      recent?: unknown;
    };
    const cart = Array.isArray(data.cart)
      ? (data.cart as CartItem[]).filter(
          (line) => typeof line?.key === "string" && typeof line.price === "number" && line.qty > 0,
        )
      : [];
    const wishlist = Array.isArray(data.wishlist)
      ? (data.wishlist as WishItem[]).filter((item) => typeof item?.id === "string")
      : [];
    return { cart, wishlist, compare: strings(data.compare, 3), recent: strings(data.recent, 8) };
  } catch {
    return empty;
  }
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = React.useState<CartItem[]>([]);
  const [wishlist, setWishlist] = React.useState<WishItem[]>([]);
  const [cartOpen, setCartOpen] = React.useState(false);
  const [wishOpen, setWishOpen] = React.useState(false);
  const [compare, setCompare] = React.useState<string[]>([]);
  const [recent, setRecent] = React.useState<string[]>([]);
  const [quickView, setQuickView] = React.useState<string | null>(null);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const loaded = React.useRef(false);

  // Restore the bag and wishlist after mount (not during render) so the
  // server HTML and the first client render still match.
  React.useEffect(() => {
    const saved = readSaved();
    if (saved.cart.length) setCart(saved.cart);
    if (saved.wishlist.length) setWishlist(saved.wishlist);
    if (saved.compare.length) setCompare(saved.compare);
    if (saved.recent.length) setRecent((current) => [...new Set([...current, ...saved.recent])].slice(0, 8));
    loaded.current = true;
  }, []);

  React.useEffect(() => {
    if (!loaded.current) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ cart, wishlist, compare, recent }));
    } catch {
      // Storage can be unavailable (private mode, blocked site data); the bag still works for this visit.
    }
  }, [cart, wishlist, compare, recent]);

  const compareRef = React.useRef(compare);
  compareRef.current = compare;
  const toggleCompare = React.useCallback((id: string) => {
    const current = compareRef.current;
    if (current.includes(id)) {
      setCompare(current.filter((item) => item !== id));
      return true;
    }
    if (current.length >= COMPARE_LIMIT) return false;
    setCompare([...current, id]);
    return true;
  }, []);
  const clearCompare = React.useCallback(() => setCompare([]), []);
  const recordView = React.useCallback((slug: string) => {
    setRecent((current) => [slug, ...current.filter((item) => item !== slug)].slice(0, 8));
  }, []);

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
    compare,
    toggleCompare,
    clearCompare,
    quickView,
    setQuickView,
    recent,
    recordView,
    searchOpen,
    setSearchOpen,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = React.useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}
