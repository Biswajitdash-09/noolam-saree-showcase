"use client";

import * as React from "react";
import Link from "next/link";
import { GitCompareArrows, ShoppingBag, X } from "lucide-react";

import { ArrowPill } from "@/components/site/arrow-pill";
import { AvailabilityBadge } from "@/components/site/availability-badge";
import { ProductArt } from "@/components/site/product-art";
import { useStore } from "@/components/site/store";
import { useAddToBag } from "@/components/site/use-add-to-bag";
import { availability, availabilityLabel, products, type Product } from "@/lib/data";
import { shop } from "@/lib/shop";
import { cn, formatINR } from "@/lib/utils";

type Row = { label: string; value: (product: Product) => React.ReactNode };

const rows: Row[] = [
  { label: "Price", value: (p) => <span className="font-medium tabular-nums text-gold-700">{formatINR(p.price)}</span> },
  { label: "Weave", value: (p) => p.fabric },
  { label: "Pallu", value: (p) => p.pallu ?? "Hand-finished selvedge" },
  {
    label: "Colour",
    value: (p) => (
      <span className="inline-flex items-center gap-2">
        <span className="size-3 rounded-full ring-1 ring-ink/15" style={{ backgroundColor: p.swatch.base }} />
        {p.swatch.name}
      </span>
    ),
  },
  {
    label: "Availability",
    value: (p) =>
      availabilityLabel(p) ? (
        <AvailabilityBadge item={p} detailed />
      ) : (
        <span>In stock · ships in {shop.shipping.readyDays}</span>
      ),
  },
  { label: "Blouse sizes", value: (p) => p.sizes.join(", ") },
];

export function CompareTable() {
  const { compare, toggleCompare } = useStore();
  const items = compare
    .map((id) => products.find((product) => product.id === id))
    .filter((item): item is Product => item !== undefined);

  if (items.length === 0) {
    return (
      <div className="mt-12 flex flex-col items-start gap-5 rounded-[26px] border border-ink/10 bg-white p-8 sm:p-10">
        <span className="flex size-12 items-center justify-center rounded-full bg-cream text-maroon-700">
          <GitCompareArrows className="size-5" />
        </span>
        <div>
          <p className="text-lg font-medium">Nothing to compare yet.</p>
          <p className="mt-1.5 max-w-[46ch] text-sm text-ink-soft">
            In the collection, tap the compare button on up to three sarees, then come back here.
          </p>
        </div>
        <ArrowPill href="/shop" variant="maroon">
          Browse the collection
        </ArrowPill>
      </div>
    );
  }

  return (
    <div className="relative mt-10 overflow-x-auto pb-2" data-lenis-prevent>
      <table className="w-full min-w-[640px] border-separate border-spacing-0 text-left text-[13.5px]">
        <caption className="sr-only">Comparison of {items.length} pieces</caption>
        <thead>
          <tr>
            <th scope="col" className="w-[150px] pb-5 align-bottom text-[12px] font-normal text-ink-soft">
              {items.length} of 3 pieces
            </th>
            {items.map((product) => (
              <th key={product.id} scope="col" className="px-3 pb-5 align-top font-normal">
                <div className="relative">
                  <Link href={`/product/${product.slug}`} className="group block overflow-hidden rounded-[20px] border border-ink/8">
                    <ProductArt product={product} className="aspect-[4/5]" artClassName="h-[190px] w-[150px]" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => toggleCompare(product.id)}
                    aria-label={`Remove ${product.name} from compare`}
                    className="absolute right-2.5 top-2.5 flex size-8 items-center justify-center rounded-full bg-white/90 text-ink-soft shadow-sm transition hover:text-maroon-700"
                  >
                    <X className="size-4" />
                  </button>
                </div>
                <Link
                  href={`/product/${product.slug}`}
                  className="mt-3 block text-[16px] font-medium tracking-tight text-ink transition hover:text-maroon-700"
                >
                  {product.name}
                </Link>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label}>
              <th scope="row" className="border-t border-ink/10 py-4 pr-4 align-top text-[12px] font-normal text-ink-soft">
                {row.label}
              </th>
              {items.map((product) => (
                <td key={product.id} className="border-t border-ink/10 px-3 py-4 align-top text-ink">
                  {row.value(product)}
                </td>
              ))}
            </tr>
          ))}
          <tr>
            <th scope="row" className="border-t border-ink/10 py-5 pr-4 text-[12px] font-normal text-ink-soft">
              <span className="sr-only">Add to bag</span>
            </th>
            {items.map((product) => (
              <td key={product.id} className="border-t border-ink/10 px-3 py-5 align-top">
                <CompareAdd product={product} />
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function CompareAdd({ product }: { product: Product }) {
  const addToBag = useAddToBag();
  const [size, setSize] = React.useState<number | "">("");
  const soldOut = availability(product) === "sold";
  if (soldOut) {
    return <p className="text-[12.5px] text-ink-soft">Sold out. Ask the shop for a re-weave.</p>;
  }
  return (
    <div className="flex flex-col gap-2.5">
      <label className="sr-only" htmlFor={`size-${product.id}`}>
        Blouse size for {product.name}
      </label>
      <select
        id={`size-${product.id}`}
        value={size}
        onChange={(event) => setSize(event.target.value ? Number(event.target.value) : "")}
        className="h-10 rounded-full border border-ink/15 bg-white px-4 text-[13px]"
      >
        <option value="">Choose a size</option>
        {product.sizes.map((option) => (
          <option key={option} value={option}>
            Size {option}
          </option>
        ))}
      </select>
      <button
        type="button"
        disabled={!size}
        onClick={() => size && addToBag(product, size)}
        className={cn(
          "flex h-10 items-center justify-center gap-2 rounded-full text-[13px] font-medium transition",
          size ? "bg-maroon-600 text-white hover:bg-maroon-700" : "bg-ink/10 text-ink/40",
        )}
      >
        <ShoppingBag className="size-4" />
        Add to bag
      </button>
    </div>
  );
}
