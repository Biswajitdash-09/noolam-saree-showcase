"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Heart, Menu, Search, ShoppingBag } from "lucide-react";
import { motion, useScroll, useSpring } from "motion/react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Wordmark } from "@/components/site/logo";
import { useStore } from "@/components/site/store";
import { navLinks } from "@/lib/data";
import { shop } from "@/lib/shop";
import { cn } from "@/lib/utils";

const sectionIds = ["try-the-look", "pick-a-silk", "the-rack", "the-muse", "bridal", "the-weave"];

export function SiteHeader() {
  const pathname = usePathname();
  const { cartCount, wishlist, setCartOpen, setWishOpen, setSearchOpen } = useStore();
  const { scrollYProgress } = useScroll();
  const thread = useSpring(scrollYProgress, { stiffness: 260, damping: 40, mass: 0.3 });
  const [scrolled, setScrolled] = React.useState(false);
  const [active, setActive] = React.useState<string>("/");
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    if (pathname !== "/") {
      setActive(pathname);
      return;
    }
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;

    // A section is current when it spans the line 35% down the viewport.
    // This works for pinned scroll sections that are many screens tall,
    // where intersection ratios stay too small to register.
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const line = window.innerHeight * 0.35;
        const current = sections.find((section) => {
          const rect = section.getBoundingClientRect();
          return rect.top <= line && rect.bottom > line;
        });
        setActive(current ? `/#${current.id}` : "/");
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return active === "/";
    if (href.startsWith("/#")) return active === href;
    if (href === "/bridal") return pathname.startsWith("/bridal") || active === "/#bridal";
    return pathname.startsWith(href);
  };

  return (
    <header
      className="fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-5 sm:pt-4"
      style={{ viewTransitionName: "site-header" }}
    >
      <div
        className={cn(
          "mx-auto flex h-14 w-full max-w-[1560px] items-center justify-between gap-4 rounded-full px-3 transition-all duration-500 sm:h-16 sm:px-4",
          "glass-pill",
          scrolled ? "bg-[#1c0f0d]/97" : "bg-[#241310]/92",
          "relative overflow-hidden",
        )}
      >
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-x-8 bottom-0 h-px origin-left bg-[linear-gradient(90deg,transparent,var(--color-gold-400)_12%,var(--color-gold-300)_88%,transparent)]"
          style={{ scaleX: thread }}
        />
        <Link href="/" aria-label="NOOLAM home" className="shrink-0 pl-2 sm:pl-3">
          <Wordmark />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-0.5 xl:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-full px-3.5 py-2 text-[12.5px] font-medium transition-colors",
                isActive(link.href)
                  ? "bg-gold-400 text-maroon-950 shadow-[0_6px_18px_-8px_rgba(201,162,39,0.9)]"
                  : "text-white/80 hover:bg-white/10 hover:text-white",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            aria-label="Search the collection"
            aria-keyshortcuts="Control+K Meta+K"
            onClick={() => setSearchOpen(true)}
            className="relative flex size-9 items-center justify-center rounded-full border border-white/20 text-white/85 transition hover:border-gold-400/60 hover:text-gold-300 sm:size-10"
          >
            <Search className="size-[17px]" />
          </button>
          <button
            type="button"
            aria-label={`Wishlist, ${wishlist.length} saved`}
            onClick={() => setWishOpen(true)}
            className="relative hidden size-9 items-center sm:flex justify-center rounded-full border border-white/20 text-white/85 transition hover:border-gold-400/60 hover:text-gold-300 sm:size-10"
          >
            <Heart className="size-[17px]" />
            {wishlist.length > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-gold-400 text-[9px] font-semibold text-maroon-950">
                {wishlist.length}
              </span>
            )}
          </button>
          <button
            type="button"
            aria-label={`Bag, ${cartCount} ${cartCount === 1 ? "piece" : "pieces"}`}
            onClick={() => setCartOpen(true)}
            className="relative flex size-9 items-center justify-center rounded-full border border-white/20 text-white/85 transition hover:border-gold-400/60 hover:text-gold-300 sm:size-10"
          >
            <ShoppingBag className="size-[17px]" />
            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-gold-400 text-[9px] font-semibold text-maroon-950">
                {cartCount}
              </span>
            )}
          </button>

          <Button
            asChild
            className="ml-1 hidden h-10 gap-3 pl-5 pr-1.5 text-[12.5px] sm:inline-flex"
          >
            <Link href="/care#contact">
              Visit the Store
              <span className="flex size-7 items-center justify-center rounded-full bg-gold-300 text-maroon-900">
                <ArrowUpRight className="size-3.5" />
              </span>
            </Link>
          </Button>

          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Open menu"
                className="flex size-9 items-center justify-center rounded-full border border-white/20 text-white/85 transition hover:border-gold-400/60 hover:text-gold-300 xl:hidden sm:size-10"
              >
                <Menu className="size-[18px]" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="max-w-[340px] bg-maroon-950 text-white">
              <div className="border-b border-white/10 px-6 pb-6 pt-7">
                <SheetTitle className="sr-only">NOOLAM menu</SheetTitle>
                <Wordmark />
              </div>
              <nav aria-label="Mobile" className="flex flex-col px-3 py-4">
                {navLinks.map((link, index) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      "flex items-center justify-between rounded-xl px-4 py-3.5 text-[15px] tracking-wide transition",
                      isActive(link.href)
                        ? "bg-white/10 text-gold-300"
                        : "text-white/80 hover:bg-white/5 hover:text-white",
                    )}
                  >
                    <span>{link.label}</span>
                    <span className="text-[10px] tracking-[0.2em] text-white/30">
                      0{index + 1}
                    </span>
                  </Link>
                ))}
              </nav>
              <div className="flex flex-col gap-1 border-t border-white/10 px-3 py-4 sm:hidden">
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    setSearchOpen(true);
                  }}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-left text-[15px] text-white/80 transition hover:bg-white/5 hover:text-white"
                >
                  <Search className="size-4 text-gold-300" />
                  Search the collection
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    setWishOpen(true);
                  }}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-left text-[15px] text-white/80 transition hover:bg-white/5 hover:text-white"
                >
                  <Heart className="size-4 text-gold-300" />
                  Wishlist{wishlist.length ? ` (${wishlist.length})` : ""}
                </button>
              </div>
              <div className="mt-auto border-t border-white/10 px-6 py-6">
                <Link
                  href="/care#contact"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between rounded-full bg-maroon-600 px-5 py-3 text-sm font-medium text-white"
                >
                  Visit the Store
                  <ArrowUpRight className="size-4 text-gold-300" />
                </Link>
                <p className="mt-4 text-[10px] uppercase tracking-[0.26em] text-white/40">
                  {shop.address.city} · {shop.address.region}
                </p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
