import type { Product } from "@/lib/data";
import { SilkArt } from "@/components/site/silk-fabric";
import { cn } from "@/lib/utils";

type ProductArtProps = {
  product: Product;
  className?: string;
  artClassName?: string;
  flip?: boolean;
  arch?: boolean;
};

/**
 * A draped or folded silk shown on a soft studio ground.
 * Reused by the shop grid, product page and related rails.
 */
export function ProductArt({
  product,
  className,
  artClassName,
  flip = false,
  arch = false,
}: ProductArtProps) {
  const isBlouse = product.kind === "blouse";

  return (
    <div
      className={cn(
        "relative flex items-end justify-center overflow-hidden bg-[linear-gradient(180deg,#fdfbf7_0%,#f8f2e8_58%,#efe5d5_100%)]",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-x-6 bottom-0 h-2/5 bg-[radial-gradient(90%_100%_at_50%_100%,rgba(92,58,24,0.18),transparent_72%)]" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/50" />

      <div
        className={cn(
          "relative transition-transform duration-700 ease-out group-hover:scale-[1.035]",
          arch && "pb-6",
        )}
      >
        <SilkArt
          swatch={product.swatch}
          shape={isBlouse ? "blouse" : "drape"}
          flip={flip}
          className={cn(
            "drop-shadow-[0_26px_30px_rgba(44,5,11,0.22)]",
            isBlouse ? "h-[190px] w-[188px]" : "h-[248px] w-[196px]",
            artClassName,
          )}
        />
        <div
          className={cn(
            "absolute bottom-1 left-1/2 h-3 -translate-x-1/2 rounded-[50%] bg-maroon-950/12 blur-md",
            isBlouse ? "w-24" : "w-20",
          )}
        />
      </div>
    </div>
  );
}
