import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";

type ArrowPillProps = {
  href: string;
  children: React.ReactNode;
  variant?: "maroon" | "light" | "gold" | "outline";
  className?: string;
};

export function ArrowPill({
  href,
  children,
  variant = "maroon",
  className,
}: ArrowPillProps) {
  const base =
    "group inline-flex h-14 items-center gap-4 rounded-full pl-7 pr-2 text-[15px] font-medium transition-all duration-300 active:scale-[0.985]";
  const styles = {
    maroon:
      "bg-maroon-600 text-white shadow-[0_18px_40px_-18px_rgba(74,10,18,0.85)] hover:bg-maroon-700",
    light:
      "bg-white text-ink shadow-[0_18px_40px_-20px_rgba(0,0,0,0.45)] hover:bg-cream",
    gold: "bg-gold-400 text-maroon-950 shadow-[0_18px_40px_-20px_rgba(201,162,39,0.7)] hover:bg-gold-300",
    outline:
      "border border-ink/15 bg-transparent text-ink hover:border-ink/35 hover:bg-white",
  }[variant];

  const circle = {
    maroon: "bg-white text-maroon-700",
    light: "bg-maroon-600 text-white",
    gold: "bg-maroon-900 text-gold-300",
    outline: "bg-ink text-white",
  }[variant];

  return (
    <Link href={href} className={cn(base, styles, className)}>
      <span>{children}</span>
      <span
        className={cn(
          "flex size-10 items-center justify-center rounded-full transition-transform duration-300 group-hover:rotate-45",
          circle,
        )}
      >
        <ArrowUpRight className="size-4" strokeWidth={2.2} />
      </span>
    </Link>
  );
}
