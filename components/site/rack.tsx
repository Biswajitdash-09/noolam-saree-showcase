"use client";

import * as React from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";

import { HangerProduct } from "@/components/site/hanger";
import { RackDetail } from "@/components/site/rack-detail";
import { CATEGORIES, categoryCount, products, type CategoryId, type Product } from "@/lib/data";
import { cn, formatINR } from "@/lib/utils";

type FilterId = "all" | CategoryId;

const filters = CATEGORIES;

export function Rack() {
  const [filter, setFilter] = React.useState<FilterId>("silk");
  const [hovered, setHovered] = React.useState<Product | null>(null);
  const [selected, setSelected] = React.useState<number | null>(null);

  const items = React.useMemo(
    () =>
      filter === "all"
        ? products
        : products.filter((product) => product.categories.includes(filter)),
    [filter],
  );

  const caption = hovered ?? items[0];

  return (
    <section id="the-rack" aria-labelledby="rack-title" className="bg-white py-20 md:py-24">
      <div className="shell">
        <div className="text-center">
          <p className="eyebrow justify-center before:hidden">The Collection</p>
          <h2 id="rack-title" className="display mt-4 text-[clamp(2.1rem,5.2vw,4.4rem)]">
            Every silk, <span className="text-gradient-warm">on the rail.</span>
          </h2>
        </div>

        <div className="no-scrollbar mt-9 flex gap-2.5 overflow-x-auto pb-2 md:flex-wrap md:justify-center md:overflow-visible">
          {filters.map((item) => {
            const active = filter === item.id;
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={active}
                onClick={() => {
                  setFilter(item.id);
                  setHovered(null);
                }}
                className={cn(
                  "flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-[12px] transition sm:text-[12.5px]",
                  active
                    ? "border-gold-500 bg-maroon-700 text-white shadow-[0_10px_24px_-14px_rgba(74,10,18,0.9)] ring-1 ring-gold-500/60"
                    : "border-ink/10 bg-white text-ink hover:border-ink/30",
                )}
              >
                <span>{item.label}</span>
                <span
                  className={cn(
                    "text-[10px] font-medium tabular-nums",
                    active ? "text-gold-300" : "text-maroon-700",
                  )}
                >
                  {categoryCount(item.id)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="relative mt-10">
        <div className="no-scrollbar overflow-x-auto pb-2">
          <div className="relative mx-auto min-w-max px-6 sm:px-10">
            <div className="pointer-events-none absolute inset-x-4 top-[34px] h-[6px] rounded-full bg-[linear-gradient(180deg,#f3f3f3_0%,#c9c9c9_35%,#8f8f8f_55%,#e6e6e6_75%,#a8a8a8_100%)] shadow-[0_3px_6px_rgba(0,0,0,0.18)] sm:inset-x-8" />
            <div className="pointer-events-none absolute left-2 top-[29px] size-4 rounded-full bg-[linear-gradient(140deg,#f2f2f2,#9a9a9a)] shadow sm:left-6" />
            <div className="pointer-events-none absolute right-2 top-[29px] size-4 rounded-full bg-[linear-gradient(140deg,#f2f2f2,#9a9a9a)] shadow sm:right-6" />

            <LayoutGroup>
              <motion.div layout className="flex items-start gap-1.5 sm:gap-2.5">
                <AnimatePresence initial={false} mode="popLayout">
                  {items.map((product, index) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 30 }}
                      transition={{ type: "spring", stiffness: 260, damping: 30 }}
                      className={cn(
                        "relative transition-transform duration-300",
                        hovered?.id === product.id ? "-translate-y-2.5" : "",
                      )}
                      onMouseEnter={() => setHovered(product)}
                      onMouseLeave={() => setHovered((current) => (current?.id === product.id ? null : current))}
                      onFocus={() => setHovered(product)}
                    >
                      <button
                        type="button"
                        onClick={() => setSelected(index)}
                        aria-label={`View ${product.name}, ${formatINR(product.price)}`}
                        className="group flex flex-col items-center rounded-2xl px-1 pt-1 outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
                      >
                        <HangerProduct
                          product={product}
                          className={cn(
                            "transition-all duration-300",
                            hovered?.id === product.id
                              ? "drop-shadow-[0_26px_30px_rgba(30,4,8,0.28)]"
                              : "drop-shadow-[0_16px_20px_rgba(30,4,8,0.16)]",
                          )}
                        />
                        <span className="mt-3 line-clamp-2 min-h-[2.2em] max-w-[118px] text-center text-[9.5px] uppercase leading-[1.35] tracking-[0.14em] text-ink-soft/80">
                          {product.name}
                        </span>
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </LayoutGroup>
          </div>
        </div>

        <div className="shell mt-2 flex flex-col items-center">
          <div className="flex h-14 items-center justify-center text-center">
            {caption ? (
              <p className="text-[11px] uppercase tracking-[0.22em] text-ink-soft">
                <span className="text-ink">{caption.name}</span>
                <span className="mx-2 text-gold-500">·</span>
                <span className="tabular-nums">{formatINR(caption.price)}.00</span>
              </p>
            ) : null}
          </div>
        </div>
      </div>

      <div className="shell mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-ink/10 pt-4 text-[9px] uppercase tracking-[0.24em] text-ink-soft/70">
        <span>Explore the collection · {items.length} pieces</span>
        <span className="hidden sm:inline">Click a hanger to lift it off the rail</span>
        <span>Editorial stock imagery · demo collection</span>
      </div>

      <RackDetail
        items={items}
        index={selected}
        onIndexChange={setSelected}
        onClose={() => setSelected(null)}
      />
    </section>
  );
}
