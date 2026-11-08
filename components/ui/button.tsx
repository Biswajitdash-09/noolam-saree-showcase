import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-45 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-ivory",
  {
    variants: {
      variant: {
        default:
          "bg-maroon-600 text-white shadow-[0_14px_30px_-14px_rgba(74,10,18,0.8)] hover:bg-maroon-700 active:scale-[0.985]",
        light:
          "bg-white text-ink shadow-[0_14px_30px_-18px_rgba(0,0,0,0.45)] hover:bg-cream active:scale-[0.985]",
        outline:
          "border border-ink/15 bg-transparent text-ink hover:border-ink/30 hover:bg-ink/[0.04]",
        gold:
          "bg-gold-500 text-maroon-950 hover:bg-gold-400 active:scale-[0.985]",
        ghost: "text-ink hover:bg-ink/[0.05]",
        link: "text-maroon-700 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6",
        sm: "h-9 px-4 text-[13px]",
        lg: "h-14 px-8 text-base",
        icon: "size-11",
        "icon-sm": "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
