import { availability, availabilityLabel } from "@/lib/data";
import { shop } from "@/lib/shop";
import { cn } from "@/lib/utils";

type Item = { stock?: number; madeToOrder?: boolean };

const tone = {
  low: "bg-gold-100 text-gold-700 ring-gold-400/50",
  sold: "bg-ink/80 text-white ring-transparent",
  made: "bg-white/90 text-maroon-700 ring-maroon-600/25",
};

/** Small stock pill: "Only 1 left", "Sold out", "Made to order". Renders nothing when in stock. */
export function AvailabilityBadge({
  item,
  className,
  detailed = false,
}: {
  item: Item;
  className?: string;
  /** Adds the lead time to "Made to order" and a dot for the product page. */
  detailed?: boolean;
}) {
  const state = availability(item);
  const label = availabilityLabel(item);
  if (!label || state === "in") return null;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium ring-1",
        tone[state],
        className,
      )}
    >
      {detailed && (
        <span
          aria-hidden
          className={cn(
            "size-1.5 rounded-full",
            state === "low" ? "bg-gold-600" : state === "sold" ? "bg-white/70" : "bg-maroon-600",
          )}
        />
      )}
      {label}
      {detailed && state === "made" ? ` · ${shop.shipping.madeToOrderWeeks}` : ""}
    </span>
  );
}
