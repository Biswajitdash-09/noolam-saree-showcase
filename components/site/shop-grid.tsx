"use client";

import * as React from "react";
import { ChevronDown, SlidersHorizontal } from "lucide-react";

import { ProductCard } from "@/components/site/product-card";
import { CATEGORIES, categoryCount, products, type CategoryId } from "@/lib/data";
import { cn } from "@/lib/utils";

type FilterId = "all" | CategoryId;
type SortId = "featured" | "price-asc" | "price-desc" | "name";

const SORTS: { id: SortId; label: string }[] = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price · low to high" },
  { id: "price-desc", label: "Price · high to low" },
  { id: "name", label: "A to Z" },
];

export function ShopGrid({ initialFilter = "all" }: { initialFilter?: FilterId }) {
  const [filter, setFilter] = React.useState<FilterId>(initialFilter);
  const [sort, setSort] = React.useState<SortId>("featured");

  const items = React.useMemo(() => {
    const filtered =
      filter === "all"
        ? products
        : products.filter((product) => product.categories.includes(filter));

    const sorted = [...filtered];
    switch (sort) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "name":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }
    return sorted;
  }, [filter, sort]);

  return (
    <div>
      <div className="sticky top-[76px] z-30 -mx-4 border-y border-ink/8 bg-ivory/92 px-4 py-3 backdrop-blur-md sm:-mx-6 sm:px-6 lg:static lg:mx-0 lg:rounded-2xl lg:border lg:bg-white/70 lg:px-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
            {CATEGORIES.map((category) => {
              const active = filter === category.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(category.id)}
                  className={cn(
                    "flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-2 text-[11.5px] transition",
                    active
                      ? "border-gold-500 bg-maroon-700 text-white shadow-[0_10px_22px_-14px_rgba(74,10,18,0.9)]"
                      : "border-ink/10 bg-white text-ink hover:border-ink/30",
                  )}
                >
                  <span>{category.label}</span>
                  <span
                    className={cn(
                      "text-[9.5px] font-medium tabular-nums",
                      active ? "text-gold-300" : "text-maroon-700",
                    )}
                  >
                    {categoryCount(category.id)}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex shrink-0 items-center justify-between gap-3 lg:justify-end">
            <span className="inline-flex items-center gap-1.5 text-[9px] uppercase tracking-[0.22em] text-ink-soft/70">
              <SlidersHorizontal className="size-3 text-gold-600" />
              {items.length} pieces
            </span>
            <label className="relative inline-flex items-center">
              <span className="sr-only">Sort pieces</span>
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value as SortId)}
                className="appearance-none rounded-full border border-ink/15 bg-white py-2 pl-3.5 pr-9 text-[11px] text-ink outline-none transition hover:border-ink/30 focus-visible:ring-2 focus-visible:ring-gold-500"
              >
                {SORTS.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 size-3.5 text-ink-soft" />
            </label>
          </div>
        </div>
      </div>

      {items.length === 0 ? (
        <p className="py-24 text-center text-sm text-ink-soft">
          Nothing on this part of the rail yet.
        </p>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
