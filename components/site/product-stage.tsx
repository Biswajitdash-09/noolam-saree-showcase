"use client";

import * as React from "react";

import { ProductArt } from "@/components/site/product-art";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Product } from "@/lib/data";

export function ProductStage({ product }: { product: Product }) {
  const [flip, setFlip] = React.useState(false);

  return (
    <div>
      <div className="relative overflow-hidden rounded-[26px] border border-ink/8">
        <ProductArt
          product={product}
          flip={flip}
          className="aspect-[4/4.3] w-full sm:aspect-[4/4.5]"
          artClassName="h-[320px] w-[252px] sm:h-[400px] sm:w-[316px] lg:h-[460px] lg:w-[364px]"
        />
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between px-5 pb-5">
          <span className="text-[9px] uppercase tracking-[0.24em] text-ink-soft/70">
            {flip ? "Reverse · zari selvedge" : "The drape · front"}
          </span>
          <Tabs value={flip ? "back" : "front"} onValueChange={(value) => setFlip(value === "back")}>
            <TabsList>
              <TabsTrigger value="front">Front</TabsTrigger>
              <TabsTrigger value="back">Back</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3">
        {["The body", "The border", "The pallu"].map((label, index) => (
          <div
            key={label}
            className="overflow-hidden rounded-2xl border border-ink/8 bg-[linear-gradient(180deg,#fdfbf7,#f4ecdf)] p-2"
          >
            <div className="relative aspect-square overflow-hidden rounded-xl">
              <ProductArt
                product={product}
                flip={index === 1}
                className="h-full w-full"
                artClassName={
                  index === 0
                    ? "h-[92px] w-[48px] translate-y-2"
                    : index === 1
                      ? "h-[76px] w-[70px] rotate-6 translate-y-3"
                      : "h-[86px] w-[46px] translate-y-2"
                }
              />
            </div>
            <p className="mt-1.5 text-center text-[8.5px] uppercase tracking-[0.2em] text-ink-soft/70">
              {label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
