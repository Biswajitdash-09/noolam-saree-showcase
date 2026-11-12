"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";

import { SilkArt } from "@/components/site/silk-fabric";
import { COMPARE_LIMIT, useStore } from "@/components/site/store";
import { products } from "@/lib/data";

/** Floating tray listing the pieces picked for comparison. */
export function CompareTray() {
  const { compare, toggleCompare, clearCompare, cartOpen, wishOpen } = useStore();
  const pathname = usePathname();
  const items = compare
    .map((id) => products.find((product) => product.id === id))
    .filter((item) => item !== undefined);
  const show = items.length > 0 && pathname !== "/compare" && !cartOpen && !wishOpen;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          role="region"
          aria-label="Compare pieces"
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ type: "spring", stiffness: 380, damping: 34 }}
          className="fixed bottom-14 left-1/2 z-40 flex w-[min(560px,calc(100vw-24px))] items-center gap-3 rounded-full border border-gold-500/30 bg-maroon-950/95 py-2 pl-2 pr-2 text-white shadow-[0_24px_50px_-20px_rgba(20,3,6,0.8)] backdrop-blur sm:bottom-16"
          style={{ x: "-50%" }}
        >
          <ul className="flex items-center gap-1.5">
            {Array.from({ length: COMPARE_LIMIT }, (_, index) => {
              const item = items[index];
              return (
                <li key={item?.id ?? `empty-${index}`}>
                  {item ? (
                    <button
                      type="button"
                      onClick={() => toggleCompare(item.id)}
                      aria-label={`Remove ${item.name} from compare`}
                      className="group relative block size-10 overflow-hidden rounded-full ring-1 ring-gold-400/50"
                    >
                      <SilkArt swatch={item.swatch} shape="drape" className="h-full w-full" />
                      <span className="absolute inset-0 flex items-center justify-center bg-maroon-950/70 opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100">
                        <X className="size-4" />
                      </span>
                    </button>
                  ) : (
                    <span aria-hidden className="block size-10 rounded-full border border-dashed border-white/25" />
                  )}
                </li>
              );
            })}
          </ul>
          <p className="hidden min-w-0 flex-1 truncate text-[12.5px] text-white/70 sm:block">
            {items.length < 2 ? "Pick one more piece to compare" : `${items.length} pieces side by side`}
          </p>
          <button
            type="button"
            onClick={clearCompare}
            className="ml-auto px-2 text-[12px] text-white/60 underline-offset-4 transition hover:text-white hover:underline sm:ml-0"
          >
            Clear
          </button>
          <Link
            href="/compare"
            aria-disabled={items.length < 2}
            className={
              items.length < 2
                ? "pointer-events-none flex h-10 items-center rounded-full bg-white/10 px-4 text-[13px] font-medium text-white/45"
                : "flex h-10 items-center rounded-full bg-gold-400 px-4 text-[13px] font-medium text-maroon-950 transition hover:bg-gold-300"
            }
          >
            Compare {items.length}
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
