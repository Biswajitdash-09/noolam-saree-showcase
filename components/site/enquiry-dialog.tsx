"use client";

import * as React from "react";
import { ArrowUpRight, CalendarDays, Video } from "lucide-react";

import type { EnquiryType } from "@/app/actions/enquiry";
import { EnquiryForm } from "@/components/site/enquiry-form";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { shop } from "@/lib/shop";
import { cn } from "@/lib/utils";

const copy: Record<Exclude<EnquiryType, "contact">, { title: string; text: string; submit: string }> = {
  appointment: {
    title: "Book a bridal appointment",
    text: "Pick a day to visit the loom room or meet us on a video call. We'll confirm the time by phone.",
    submit: "Request appointment",
  },
  "video-call": {
    title: "See it on a video call",
    text: "We'll hold the saree up to the light, open the pallu and show you the zari, live.",
    submit: "Request a video call",
  },
  order: {
    title: "Email this order",
    text: "We'll check stock, confirm delivery to your pincode and send a payment link.",
    submit: "Send order",
  },
};

type EnquiryDialogProps = {
  type: Exclude<EnquiryType, "contact">;
  product?: string;
  order?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function EnquiryDialog({ type, product, order, open, onOpenChange }: EnquiryDialogProps) {
  const text = copy[type];
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92svh] max-w-[540px] overflow-y-auto p-6 sm:p-8">
        <DialogTitle className="display pr-12 text-[1.7rem] font-semibold">{text.title}</DialogTitle>
        <DialogDescription className="mt-2 text-[13.5px] leading-relaxed text-ink-soft">
          {product ? (
            <>
              <span className="font-medium text-ink">{product}.</span>{" "}
            </>
          ) : null}
          {text.text} We reply {shop.replyPromise}.
        </DialogDescription>
        <div className="mt-6">
          <EnquiryForm
            key={open ? "open" : "closed"}
            type={type}
            tone="light"
            product={product}
            order={order}
            submitLabel={text.submit}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

type EnquiryButtonProps = {
  type: "appointment" | "video-call";
  product?: string;
  children: React.ReactNode;
  variant?: "maroon" | "outline" | "link";
  className?: string;
};

/** A button that opens the enquiry dialog. Usable from server components. */
export function EnquiryButton({ type, product, children, variant = "outline", className }: EnquiryButtonProps) {
  const [open, setOpen] = React.useState(false);
  const Icon = type === "video-call" ? Video : CalendarDays;
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          variant === "link"
            ? "inline-flex min-h-11 items-center gap-2 text-[13px] font-medium text-maroon-700 underline decoration-gold-500/60 underline-offset-4 transition hover:text-maroon-800"
            : "group inline-flex h-14 items-center gap-4 rounded-full pl-7 pr-2 text-[15px] font-medium transition-all duration-300 active:scale-[0.985]",
          variant === "maroon" &&
            "bg-maroon-600 text-white shadow-[0_18px_40px_-18px_rgba(74,10,18,0.85)] hover:bg-maroon-700",
          variant === "outline" && "border border-ink/15 bg-transparent text-ink hover:border-ink/35 hover:bg-white",
          className,
        )}
      >
        {variant === "link" && <Icon className="size-4" />}
        <span>{children}</span>
        {variant !== "link" && (
          <span
            className={cn(
              "flex size-10 items-center justify-center rounded-full transition-transform duration-300 group-hover:rotate-45",
              variant === "maroon" ? "bg-white text-maroon-700" : "bg-ink text-white",
            )}
          >
            <ArrowUpRight className="size-4" strokeWidth={2.2} />
          </span>
        )}
      </button>
      <EnquiryDialog type={type} product={product} open={open} onOpenChange={setOpen} />
    </>
  );
}
