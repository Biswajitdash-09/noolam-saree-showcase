"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Heart, List, Plus } from "lucide-react";
import { motion, useMotionValueEvent, useTransform, type MotionValue } from "motion/react";
import { toast } from "sonner";

import { JewelIcon } from "@/components/site/jewel-icon";
import { scrollToProgress, useSmoothProgress } from "@/components/site/scroll-rail";
import { SilkArt } from "@/components/site/silk-fabric";
import { useStore } from "@/components/site/store";
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { looks, type Look, type LookPiece } from "@/lib/data";
import { cn, formatINR } from "@/lib/utils";
import { lookMessage, waLink } from "@/lib/whatsapp";

function PieceThumb({ piece }: { piece: LookPiece }) {
  if (piece.thumb) {
    return (
      <div className="relative h-full w-full">
        <Image
          src={piece.thumb}
          alt={piece.name}
          fill
          className="object-cover"
          sizes="68px"
        />
      </div>
    );
  }
  if (piece.kind === "saree" || piece.kind === "blouse") {
    return (
      <SilkArt
        swatch={piece.swatch}
        shape={piece.kind === "blouse" ? "blouse" : "drape"}
        className="h-full w-full"
      />
    );
  }
  return (
    <span className="flex h-full w-full items-center justify-center bg-cream">
      <JewelIcon kind={piece.kind} className="h-11 w-11 text-gold-600" />
    </span>
  );
}

/** Vertical scroll budget per look, in px. */
const STEP = 380;

const lookTotal = (look: Look) => look.pieces.reduce((sum, piece) => sum + piece.price, 0);
const lookBundle = (look: Look) => Math.round((lookTotal(look) * 0.9) / 100) * 100;

function useLookActions() {
  const { addToCart, toggleWish, isWished } = useStore();

  const addPiece = (piece: LookPiece) => {
    addToCart({ id: piece.id, name: piece.name, meta: piece.label, price: piece.price, swatch: piece.swatch });
    toast.success("Added to bag", { description: piece.name });
  };

  const addFullLook = (selected: Look) => {
    addToCart({
      id: `${selected.id}-bundle`,
      name: `${selected.name} — the full look`,
      meta: "6 pieces · bundle, 10% off",
      price: lookBundle(selected),
      swatch: selected.pieces[0].swatch,
    });
    toast.success("Full look added", { description: "All six pieces, bundled at 10% off." });
  };

  const wishLook = (selected: Look) => {
    toggleWish({
      id: selected.id,
      name: `${selected.name} — the full look`,
      meta: "6 pieces · bundle",
      price: lookBundle(selected),
      swatch: selected.pieces[0].swatch,
    });
    toast(isWished(selected.id) ? "Removed from wishlist" : "Look saved", { description: selected.name });
  };

  return { addPiece, addFullLook, wishLook, toggleWish, isWished };
}

function PieceList({ look, className }: { look: Look; className?: string }) {
  const { addPiece, toggleWish, isWished } = useLookActions();
  return (
    <ul className={cn("divide-y divide-ink/10 overflow-y-auto pr-1", className)}>
      {look.pieces.map((piece, index) => (
        <li key={piece.id} className="flex items-center gap-3 py-3">
          <span className="relative h-[68px] w-[54px] shrink-0 overflow-hidden rounded-md bg-cream">
            <PieceThumb piece={piece} />
            <span className="absolute left-1 top-1 flex size-4 items-center justify-center rounded-full bg-white/85 text-[11px] font-medium text-ink">
              {index + 1}
            </span>
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-ink-soft/70">{piece.label}</p>
            <p className="mt-0.5 truncate text-[13px] leading-snug text-ink">{piece.name}</p>
            <p className="mt-0.5 text-[12px] tabular-nums text-ink-soft">{formatINR(piece.price)}</p>
          </div>
          <div className="flex items-center gap-0.5">
            <button
              type="button"
              aria-label={`${isWished(piece.id) ? "Remove" : "Save"} ${piece.name}`}
              aria-pressed={isWished(piece.id)}
              onClick={() => {
                toggleWish({ id: piece.id, name: piece.name, meta: piece.label, price: piece.price, swatch: piece.swatch });
                toast(isWished(piece.id) ? "Removed from wishlist" : "Saved to wishlist", { description: piece.name });
              }}
              className={cn(
                "flex size-8 items-center justify-center rounded-full transition",
                isWished(piece.id) ? "text-maroon-600" : "text-ink-soft hover:bg-cream hover:text-maroon-700",
              )}
            >
              <Heart className="size-4" fill={isWished(piece.id) ? "currentColor" : "none"} />
            </button>
            <button
              type="button"
              aria-label={`Add ${piece.name} to bag`}
              onClick={() => addPiece(piece)}
              className="flex size-8 items-center justify-center rounded-full text-ink-soft transition hover:bg-cream hover:text-ink"
            >
              <Plus className="size-4" />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

function BundleRow({ look }: { look: Look }) {
  const { addFullLook, wishLook, isWished } = useLookActions();
  return (
    <>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-ink">Complete the look</p>
          <p className="mt-1 text-[11px] text-ink-soft">Bundle all 6 pieces · save 10%</p>
        </div>
        <div className="text-right">
          <p className="text-[11px] tabular-nums text-ink-soft/60 line-through">{formatINR(lookTotal(look))}</p>
          <p className="text-[15px] font-medium tabular-nums text-ink">{formatINR(lookBundle(look))}</p>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2">
        <button
          type="button"
          onClick={() => addFullLook(look)}
          className="group flex h-12 flex-1 items-center justify-between rounded-full bg-maroon-600 pl-5 pr-1.5 text-[13px] font-medium text-white transition hover:bg-maroon-700"
        >
          Add full look to bag
          <span className="flex size-9 items-center justify-center rounded-full bg-white/15">
            <Plus className="size-4" />
          </span>
        </button>
        <button
          type="button"
          aria-label={`${isWished(look.id) ? "Remove" : "Save"} ${look.name} ${isWished(look.id) ? "from" : "to"} wishlist`}
          aria-pressed={isWished(look.id)}
          onClick={() => wishLook(look)}
          className={cn(
            "flex size-12 shrink-0 items-center justify-center rounded-full border transition",
            isWished(look.id) ? "border-maroon-600 text-maroon-600" : "border-ink/15 text-ink-soft hover:border-ink/30 hover:text-ink",
          )}
        >
          <Heart className="size-4" fill={isWished(look.id) ? "currentColor" : "none"} />
        </button>
      </div>
      <a
        href={waLink(lookMessage(look))}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex text-[12.5px] text-maroon-700 underline decoration-gold-500/60 underline-offset-4 transition hover:text-maroon-800"
      >
        Ask about sizes for this look on WhatsApp
      </a>
    </>
  );
}

function LookSlide({
  look,
  index,
  position,
  spacing,
  onSelect,
}: {
  look: Look;
  index: number;
  position: MotionValue<number>;
  spacing: number;
  onSelect: (index: number) => void;
}) {
  const d = useTransform(position, (p) => index - p);
  const x = useTransform(d, (dist) => `calc(-50% + ${(dist * spacing).toFixed(1)}px)`);
  const scale = useTransform(d, (v) => 1 - Math.min(Math.abs(v), 2) * 0.09);
  const opacity = useTransform(d, (v) => Math.max(0, 1 - Math.abs(v) * 0.42));
  const filter = useTransform(d, (v) => `blur(${(Math.min(Math.abs(v), 2) * 2.6).toFixed(2)}px)`);
  const zIndex = useTransform(d, (v) => 20 - Math.round(Math.abs(v) * 4));
  const [current, setCurrent] = React.useState(index === 0);
  useMotionValueEvent(d, "change", (v) => setCurrent(Math.abs(v) < 0.5));

  return (
    <motion.button
      type="button"
      onClick={() => onSelect(index)}
      tabIndex={-1}
      aria-hidden={!current}
      aria-label={`Show look ${index + 1}: ${look.name}`}
      className="absolute left-1/2 top-0 h-full w-[min(64vw,280px)] cursor-pointer"
      style={{ x, scale, opacity, filter, zIndex }}
    >
      <span className="relative block h-full w-full">
        <Image
          src={look.model || look.media}
          alt={current ? `${look.name} — ${look.subtitle}` : ""}
          fill
          sizes="(max-width: 640px) 64vw, 280px"
          className="object-contain object-bottom"
          draggable={false}
          priority={index < 2}
        />
        <span className="absolute -bottom-2 left-1/2 h-4 w-3/4 -translate-x-1/2 rounded-[50%] bg-maroon-950/15 blur-lg" />
      </span>
    </motion.button>
  );
}

export function TryLook() {
  const outerRef = React.useRef<HTMLDivElement>(null);
  const stageRef = React.useRef<HTMLDivElement>(null);
  const progress = useSmoothProgress(outerRef);
  const last = looks.length - 1;
  const position = useTransform(progress, (p) => p * last);
  const progressBar = useTransform(position, (p) => (p + 1) / looks.length);
  const [active, setActive] = React.useState(0);
  const [spacing, setSpacing] = React.useState(240);
  const [piecesOpen, setPiecesOpen] = React.useState(false);
  const look = looks[active] ?? looks[0];

  useMotionValueEvent(position, "change", (p) => {
    const next = Math.max(0, Math.min(last, Math.round(p)));
    setActive((current) => (current === next ? current : next));
  });

  React.useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const measure = () => setSpacing(Math.max(150, Math.min(300, stage.clientWidth * 0.36)));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  const goTo = React.useCallback(
    (index: number) => scrollToProgress(outerRef.current, Math.max(0, Math.min(last, index)) / last),
    [last],
  );

  return (
    <section id="try-the-look" aria-labelledby="try-title" className="overflow-x-clip bg-white">
      <div className="shell">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_350px] xl:grid-cols-[minmax(0,1fr)_380px]">
          <div
            ref={outerRef}
            className="relative min-w-0 lg:pr-10"
            style={{ height: `calc(100svh + ${last * STEP}px)` }}
          >
            <div className="sticky top-0 flex h-[100svh] flex-col justify-center pb-14 pt-20 sm:pt-24">
              <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
                <div>
                  <p className="eyebrow">Styled head to toe</p>
                  <h2 id="try-title" className="display mt-4 text-[clamp(2.1rem,5.2vw,4.4rem)]">
                    Try the <span className="text-gradient-warm">Look.</span>
                  </h2>
                </div>
                <p className="hidden max-w-[280px] text-sm leading-relaxed text-ink-soft sm:block lg:pb-2">
                  Eight looks, styled head to toe. Keep scrolling to change the
                  look; the pieces follow.
                </p>
              </div>

              <div
                ref={stageRef}
                role="region"
                aria-roledescription="carousel"
                aria-label={`Look ${active + 1} of ${looks.length}: ${look.name}. Use arrow keys to browse.`}
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === "ArrowLeft") {
                    event.preventDefault();
                    goTo(active - 1);
                  }
                  if (event.key === "ArrowRight") {
                    event.preventDefault();
                    goTo(active + 1);
                  }
                }}
                className="relative mt-6 h-[min(500px,46svh)] select-none overflow-x-clip rounded-3xl outline-none [mask-image:linear-gradient(90deg,transparent,#000_9%,#000_91%,transparent)] focus-visible:ring-2 focus-visible:ring-gold-500 sm:mt-8"
              >
                {looks.map((item, index) => (
                  <LookSlide
                    key={item.id}
                    look={item}
                    index={index}
                    position={position}
                    spacing={spacing}
                    onSelect={goTo}
                  />
                ))}
              </div>

              <div className="mt-6 flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => goTo(active - 1)}
                  disabled={active === 0}
                  aria-label="Previous look"
                  className="flex size-10 shrink-0 items-center justify-center rounded-full border border-ink/15 text-ink transition hover:border-maroon-600 hover:text-maroon-700 disabled:opacity-30"
                >
                  <ArrowLeft className="size-4" />
                </button>
                <div className="flex-1">
                  <div className="relative h-px w-full bg-ink/10">
                    <motion.div
                      className="absolute inset-y-0 left-0 w-full origin-left bg-maroon-600"
                      style={{ scaleX: progressBar }}
                    />
                  </div>
                  <div className="mt-2.5 flex items-center justify-between gap-3">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-ink-soft" aria-live="polite">
                      {active + 1} of {looks.length} · {look.name}
                    </p>
                    <p className="hidden text-[11px] uppercase tracking-[0.2em] text-ink-soft/60 sm:block">
                      Scroll to browse
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => goTo(active + 1)}
                  disabled={active === last}
                  aria-label="Next look"
                  className="flex size-10 shrink-0 items-center justify-center rounded-full border border-ink/15 text-ink transition hover:border-maroon-600 hover:text-maroon-700 disabled:opacity-30"
                >
                  <ArrowRight className="size-4" />
                </button>
              </div>

              <div className="mt-5 flex items-center justify-between gap-3 border-t border-ink/10 pt-4 lg:hidden">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-ink-soft">Full look · save 10%</p>
                  <p className="mt-0.5 text-[15px] font-medium tabular-nums text-ink">{formatINR(lookBundle(look))}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setPiecesOpen(true)}
                  className="inline-flex h-11 items-center gap-2 rounded-full bg-maroon-600 px-5 text-[13px] font-medium text-white transition hover:bg-maroon-700"
                >
                  <List className="size-4" />
                  See the {look.pieces.length} pieces
                </button>
              </div>
            </div>
          </div>

          <aside aria-label="In this look" className="hidden border-ink/10 lg:block lg:border-l lg:pl-10">
            <div className="sticky top-0 flex h-[100svh] flex-col justify-center pb-14 pt-24">
              <div className="flex items-center justify-between">
                <h3 className="text-[11px] font-medium uppercase tracking-[0.24em] text-ink">In this look</h3>
                <span className="text-[11px] uppercase tracking-[0.2em] text-ink-soft/60">
                  {look.pieces.length} pieces
                </span>
              </div>
              <PieceList look={look} className="mt-3 max-h-[46svh]" />
              <div className="mt-4 border-t border-ink/10 pt-4">
                <BundleRow look={look} />
              </div>
            </div>
          </aside>
        </div>
      </div>

      <Sheet open={piecesOpen} onOpenChange={setPiecesOpen}>
        <SheetContent side="right" className="max-w-[440px]">
          <div className="border-b border-ink/10 px-6 pb-4 pt-6">
            <SheetTitle className="display text-2xl">{look.name}</SheetTitle>
            <SheetDescription className="mt-1 text-[11px] uppercase tracking-[0.22em] text-ink-soft">
              {look.subtitle}
            </SheetDescription>
          </div>
          <PieceList look={look} className="flex-1 px-6" />
          <div className="border-t border-ink/10 px-6 py-5">
            <BundleRow look={look} />
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
}
