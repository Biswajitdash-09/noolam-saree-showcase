"use client";

import * as React from "react";
import { ArrowUpRight, Check, Loader2, MessageCircle } from "lucide-react";

import { sendEnquiry, type EnquiryState, type EnquiryType } from "@/app/actions/enquiry";
import { shop } from "@/lib/shop";
import { cn } from "@/lib/utils";
import { waLink } from "@/lib/whatsapp";

const occasions = ["Wedding", "Engagement", "Festival", "Gift", "Everyday", "Something else"];
const visits = ["In the shop", "Video call"];

type Tone = "dark" | "light";

type EnquiryFormProps = {
  type: EnquiryType;
  tone?: Tone;
  /** Product name the enquiry is about, sent with the message. */
  product?: string;
  /** Pre-written order summary (for "Email this order"). */
  order?: string;
  submitLabel?: string;
  onSent?: () => void;
};

const initial: EnquiryState = { status: "idle" };

export function EnquiryForm({
  type,
  tone = "dark",
  product,
  order,
  submitLabel,
  onSent,
}: EnquiryFormProps) {
  const [state, formAction, pending] = React.useActionState(sendEnquiry, initial);
  const [occasion, setOccasion] = React.useState(occasions[0]);
  const [visit, setVisit] = React.useState(visits[0]);
  const startedRef = React.useRef<HTMLInputElement>(null);
  const [today, setToday] = React.useState<string>();
  const dark = tone === "dark";

  React.useEffect(() => {
    if (startedRef.current) startedRef.current.value = String(Date.now());
    setToday(new Date().toISOString().slice(0, 10));
  }, []);

  React.useEffect(() => {
    if (state.status === "sent") onSent?.();
  }, [state, onSent]);

  const field = cn(
    "w-full rounded-2xl border px-4 py-3 text-[13.5px] transition focus:outline-none focus-visible:outline-none",
    dark
      ? "border-white/15 bg-white/[0.05] text-white placeholder:text-white/35 focus:border-gold-400 [color-scheme:dark]"
      : "border-ink/15 bg-white text-ink placeholder:text-ink-soft/50 focus:border-maroon-600",
  );
  const labelText = cn("mb-1.5 block text-[12px]", dark ? "text-white/60" : "text-ink-soft");
  const errorText = cn("mt-1.5 text-[12px]", dark ? "text-gold-300" : "text-maroon-700");
  const errors = state.status === "invalid" ? state.errors : {};

  if (state.status === "sent") {
    return (
      <div role="status" className={cn("rounded-2xl p-6", dark ? "bg-white/[0.06]" : "bg-cream")}>
        <span
          className={cn(
            "flex size-11 items-center justify-center rounded-full",
            dark ? "bg-gold-400 text-maroon-950" : "bg-maroon-600 text-white",
          )}
        >
          <Check className="size-5" />
        </span>
        <p className={cn("mt-4 text-[17px] font-medium", dark ? "text-white" : "text-ink")}>
          Request sent{state.name ? `, ${state.name.split(" ")[0]}` : ""}.
        </p>
        <p className={cn("mt-1.5 text-[13.5px] leading-relaxed", dark ? "text-white/65" : "text-ink-soft")}>
          We&apos;ll call or WhatsApp you {shop.replyPromise}.
        </p>
      </div>
    );
  }

  const showOccasion = type === "contact" || type === "appointment";
  const showDate = type === "appointment" || type === "video-call";

  return (
    <form
      noValidate
      className="space-y-4"
      onSubmit={(event) => {
        // Submit via a transition rather than <form action> so React doesn't
        // clear what the customer typed when we ask them to fix a field.
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        React.startTransition(() => formAction(data));
      }}
    >
      <input type="hidden" name="type" value={type} />
      {product && <input type="hidden" name="product" value={product} />}
      {order && <input type="hidden" name="order" value={order} />}
      <input ref={startedRef} type="hidden" name="startedAt" defaultValue="0" />
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Leave this empty
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className={labelText}>Your name</span>
          <input
            name="name"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            className={field}
          />
          {errors.name && <span className={errorText}>{errors.name}</span>}
        </label>
        <label className="block">
          <span className={labelText}>Mobile number</span>
          <input
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="98400 12345"
            aria-invalid={Boolean(errors.phone)}
            className={field}
          />
          {errors.phone && <span className={errorText}>{errors.phone}</span>}
        </label>
      </div>

      {(type === "contact" || type === "order") && (
        <label className="block">
          <span className={labelText}>Email (optional)</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            className={field}
          />
          {errors.email && <span className={errorText}>{errors.email}</span>}
        </label>
      )}

      {type === "appointment" && (
        <fieldset>
          <legend className={labelText}>How would you like to meet?</legend>
          <ChipGroup name="visit" options={visits} value={visit} onChange={setVisit} dark={dark} />
        </fieldset>
      )}

      {showDate && (
        <label className="block">
          <span className={labelText}>
            {type === "appointment" ? "Preferred date" : "Preferred date (optional)"}
          </span>
          <input
            name="date"
            type="date"
            min={today}
            aria-invalid={Boolean(errors.date)}
            className={field}
          />
          {errors.date && <span className={errorText}>{errors.date}</span>}
        </label>
      )}

      {showOccasion && (
        <fieldset>
          <legend className={labelText}>Occasion</legend>
          <ChipGroup name="occasion" options={occasions} value={occasion} onChange={setOccasion} dark={dark} />
        </fieldset>
      )}

      <label className="block">
        <span className={labelText}>
          {type === "contact" ? "Message" : type === "order" ? "Delivery pincode and notes (optional)" : "Anything we should know (optional)"}
        </span>
        <textarea
          name="message"
          rows={type === "contact" ? 4 : 3}
          placeholder={
            type === "order"
              ? "Pincode, preferred delivery date, blouse stitching…"
              : "The colours you love, the date, your budget"
          }
          aria-invalid={Boolean(errors.message)}
          className={cn(field, "resize-none")}
        />
        {errors.message && <span className={errorText}>{errors.message}</span>}
      </label>

      {(state.status === "fallback" || state.status === "error") && (
        <div
          role="alert"
          className={cn(
            "rounded-2xl border p-4 text-[13px] leading-relaxed",
            dark ? "border-gold-400/40 bg-gold-400/10 text-white/85" : "border-maroon-600/25 bg-maroon-100/50 text-ink",
          )}
        >
          <p>{state.message}</p>
          <a
            href={waLink(state.whatsappText)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex h-10 items-center gap-2 rounded-full bg-[#1f8f4e] px-4 text-[13px] font-medium text-white transition hover:bg-[#187a42]"
          >
            <MessageCircle className="size-4" />
            Send on WhatsApp
          </a>
        </div>
      )}
      {state.status === "invalid" && (
        <p role="alert" className={errorText}>
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className={cn(
          "group inline-flex h-12 items-center gap-3 rounded-full pl-6 pr-1.5 text-[14px] font-medium transition active:scale-[0.985] disabled:opacity-70",
          dark ? "bg-gold-400 text-maroon-950 hover:bg-gold-300" : "bg-maroon-600 text-white hover:bg-maroon-700",
        )}
      >
        {pending ? "Sending…" : (submitLabel ?? "Send request")}
        <span
          className={cn(
            "flex size-9 items-center justify-center rounded-full transition-transform duration-300 group-hover:rotate-45",
            dark ? "bg-maroon-900 text-gold-300" : "bg-white/15 text-white",
          )}
        >
          {pending ? <Loader2 className="size-4 animate-spin" /> : <ArrowUpRight className="size-4" />}
        </span>
      </button>
    </form>
  );
}

function ChipGroup({
  name,
  options,
  value,
  onChange,
  dark,
}: {
  name: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  dark: boolean;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((item) => (
        <label key={item} className="cursor-pointer">
          <input
            type="radio"
            name={name}
            value={item}
            checked={value === item}
            onChange={() => onChange(item)}
            className="peer sr-only"
          />
          <span
            className={cn(
              "inline-flex rounded-full border px-3.5 py-1.5 text-[12px] transition peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2",
              dark
                ? "border-white/20 text-white/70 hover:border-white/45 peer-checked:border-gold-400 peer-checked:bg-gold-400 peer-checked:text-maroon-950 peer-focus-visible:outline-gold-400"
                : "border-ink/15 text-ink-soft hover:border-ink/35 peer-checked:border-maroon-600 peer-checked:bg-maroon-600 peer-checked:text-white peer-focus-visible:outline-gold-500",
            )}
          >
            {item}
          </span>
        </label>
      ))}
    </div>
  );
}
