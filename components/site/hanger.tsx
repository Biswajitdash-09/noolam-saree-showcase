import Image from "next/image";

import type { Product } from "@/lib/data";
import { SilkArt } from "@/components/site/silk-fabric";
import { cn } from "@/lib/utils";

export function Hanger({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 72"
      aria-hidden
      className={cn("h-[58px] w-[120px]", className)}
    >
      <path
        d="M60 34V19c0-7 5-11 11-9 5 2 5 9-1 11"
        stroke="#6f4a2c"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M60 34 L11 55c-4 2-4 6 1 6.5h96c5-.5 5-4.5 1-6.5Z"
        fill="#8a5a34"
        stroke="#5b3a20"
        strokeWidth="1"
      />
      <path d="M60 38 L18 58h84Z" fill="#a9744a" opacity="0.75" />
      <path d="M11 55c-4 2-4 6 1 6.5h96" fill="none" stroke="#c08a5c" strokeWidth="0.8" opacity="0.6" />
    </svg>
  );
}

type HangerProductProps = {
  product: Product;
  size?: "sm" | "lg";
  flip?: boolean;
  className?: string;
};

const dims = {
  sm: { hanger: "h-[52px] w-[108px]", drapeW: "w-[132px]", drapeH: "h-[172px]", blouseH: "h-[142px]", mt: "-mt-[8px]" },
  lg: { hanger: "h-[74px] w-[152px]", drapeW: "w-[286px]", drapeH: "h-[330px]", blouseH: "h-[240px]", mt: "-mt-[16px]" },
};

export function HangerProduct({ product, size = "sm", flip = false, className }: HangerProductProps) {
  const d = dims[size];
  const isBlouse = product.kind === "blouse";

  if (size === "lg") {
    const detailImg = isBlouse
      ? "/images/rack/blouse-detail-saffron.png"
      : "/images/rack/saree-detail-gold.png";

    return (
      <div className={cn("relative flex flex-col items-center", className)}>
        <div className="relative h-[340px] w-[280px] sm:h-[400px] sm:w-[340px]">
          <Image
            src={detailImg}
            alt={product.name}
            fill
            sizes="340px"
            className={cn(
              "object-contain transition-transform duration-500",
              flip && "-scale-x-100",
            )}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={cn("relative flex flex-col items-center", className)}>
      <Hanger className={d.hanger} />
      <div
        className={cn(
          "relative",
          d.drapeW,
          isBlouse ? d.blouseH : d.drapeH,
          d.mt,
        )}
      >
        <SilkArt
          swatch={product.swatch}
          shape={isBlouse ? "blouse" : "drape"}
          flip={flip}
          className="h-full w-full drop-shadow-[0_18px_22px_rgba(30,4,8,0.22)]"
        />
        <div className="absolute inset-x-3 bottom-1 h-3 rounded-[50%] bg-maroon-950/10 blur-md" />
      </div>
    </div>
  );
}
