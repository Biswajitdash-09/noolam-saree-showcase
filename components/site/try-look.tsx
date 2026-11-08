"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Heart, Plus } from "lucide-react";
import { toast } from "sonner";

import { JewelIcon } from "@/components/site/jewel-icon";
import { SilkArt } from "@/components/site/silk-fabric";
import { useStore } from "@/components/site/store";
import { looks, type Look, type LookPiece } from "@/lib/data";
import { cn, formatINR } from "@/lib/utils";

function PieceThumb({ piece }: { piece: LookPiece }) {
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

export function TryLook() {
  const { addToCart, toggleWish, isWished } = useStore();
  const [active, setActive] = React.useState(6);
  const trackRef = React.useRef<HTMLDivElement>(null);
  const dragRef = React.useRef<{ down: boolean; startX: number; startLeft: number }>({
    down: false,
    startX: 0,
    startLeft: 0,
  });
  const look = looks[active] ?? looks[0];

  const scrollToIndex = React.useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(looks.length - 1, index));
    const slide = track.children[clamped] as HTMLElement | undefined;
    if (!slide) return;
    track.scrollTo({
      left: slide.offsetLeft - (track.clientWidth - slide.offsetWidth) / 2,
      behavior: "smooth",
    });
  }, []);

  React.useEffect(() => {
    const id = window.setTimeout(() => scrollToIndex(6), 120);
    return () => window.clearTimeout(id);
  }, [scrollToIndex]);

  React.useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const center = track.scrollLeft + track.clientWidth / 2;
        let best = 0;
        let bestDistance = Number.POSITIVE_INFINITY;
        Array.from(track.children).forEach((child, index) => {
          const el = child as HTMLElement;
          const childCenter = el.offsetLeft + el.offsetWidth / 2;
          const distance = Math.abs(childCenter - center);
          if (distance < bestDistance) {
            bestDistance = distance;
            best = index;
          }
        });
        setActive(best);
      });
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener("scroll", onScroll);
    };
  }, []);

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    const track = trackRef.current;
    if (!track) return;
    dragRef.current = { down: true, startX: event.clientX, startLeft: track.scrollLeft };
    track.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.down || event.pointerType !== "mouse") return;
    const track = trackRef.current;
    if (!track) return;
    track.scrollLeft = dragRef.current.startLeft - (event.clientX - dragRef.current.startX);
  };

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.down || event.pointerType !== "mouse") return;
    dragRef.current.down = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    scrollToIndex(active);
  };

  const addPiece = (piece: LookPiece) => {
    addToCart({
      id: piece.id,
      name: piece.name,
      meta: piece.label,
      price: piece.price,
      swatch: piece.swatch,
    });
    toast.success("Added to bag", { description: piece.name });
  };

  const addFullLook = (selected: Look) => {
    addToCart({
      id: `${selected.id}-bundle`,
      name: `${selected.name} — the full look`,
      meta: "6 pieces · bundle, 10% off",
      price: Math.round(
        (selected.pieces.reduce((sum, piece) => sum + piece.price, 0) * 0.9) / 100,
      ) * 100,
      swatch: selected.pieces[0].swatch,
    });
    toast.success("Full look added", {
      description: "All six pieces, bundled at 10% off.",
    });
  };

  const total = look.pieces.reduce((sum, piece) => sum + piece.price, 0);
  const bundle = Math.round((total * 0.9) / 100) * 100;

  return (
    <section id="try-the-look" aria-labelledby="try-title" className="overflow-hidden bg-white py-20 md:py-24">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_350px] xl:grid-cols-[minmax(0,1fr)_380px] lg:gap-0">
          <div className="min-w-0 lg:pr-10">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="eyebrow">Styled head to toe</p>
                <h2 id="try-title" className="display mt-5 text-[clamp(2.2rem,5.4vw,4.4rem)]">
                  Try the <span className="text-gradient-warm">Look.</span>
                </h2>
              </div>
              <p className="max-w-[280px] text-sm leading-relaxed text-ink-soft lg:pb-2">
                Eight looks, styled head to toe. Tap a look to see the pieces that
                make it.
              </p>
            </div>

            <div className="relative mt-10">
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-white to-transparent sm:w-16" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-white to-transparent sm:w-16" />

              <div
                ref={trackRef}
                tabIndex={0}
                role="region"
                aria-label="Looks carousel. Use arrow keys to browse."
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={endDrag}
                onPointerCancel={endDrag}
                onKeyDown={(event) => {
                  if (event.key === "ArrowLeft") {
                    event.preventDefault();
                    scrollToIndex(active - 1);
                  }
                  if (event.key === "ArrowRight") {
                    event.preventDefault();
                    scrollToIndex(active + 1);
                  }
                }}
                className="no-scrollbar flex snap-x snap-mandatory cursor-grab select-none gap-4 overflow-x-auto pb-2 outline-none active:cursor-grabbing sm:gap-6"
              >
                {looks.map((item, index) => {
                  const distance = Math.abs(index - active);
                  const scale = distance === 0 ? 1 : distance === 1 ? 0.9 : 0.84;
                  const blur = distance === 0 ? 0 : distance === 1 ? 2.5 : 5;
                  const opacity = distance === 0 ? 1 : distance === 1 ? 0.6 : 0.28;

                  return (
                    <div
                      key={item.id}
                      className="relative w-[72vw] shrink-0 snap-center sm:w-[300px] lg:w-[326px]"
                    >
                      <button
                        type="button"
                        onClick={() => (active === index ? scrollToIndex(index) : scrollToIndex(index))}
                        aria-label={`Show look ${index + 1}: ${item.name}`}
                        aria-current={active === index}
                        className="block w-full text-left"
                        style={{
                          transform: `scale(${scale})`,
                          opacity,
                          filter: `blur(${blur}px)`,
                          transition: "transform 600ms cubic-bezier(.22,1,.36,1), opacity 500ms ease, filter 500ms ease",
                        }}
                      >
                        <div className="relative aspect-[3/4.25]">
                          <div
                            className="absolute inset-0 overflow-hidden"
                            style={{
                              maskImage:
                                "linear-gradient(180deg,#000 0%,#000 72%,rgba(0,0,0,0.55) 90%,transparent 100%)",
                              WebkitMaskImage:
                                "linear-gradient(180deg,#000 0%,#000 72%,rgba(0,0,0,0.55) 90%,transparent 100%)",
                            }}
                          >
                            <Image
                              src={item.media}
                              alt={`${item.name} — ${item.subtitle}`}
                              fill
                              sizes="(max-width: 640px) 72vw, 326px"
                              className="object-cover sepia-[0.22] saturate-[0.9] brightness-[0.98]"
                              draggable={false}
                            />
                            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(44,5,11,0.06)_0%,rgba(44,5,11,0.14)_45%,rgba(44,5,11,0.5)_100%)]" />
                          </div>
                          <div className="absolute -bottom-3 left-1/2 h-5 w-2/3 -translate-x-1/2 rounded-[50%] bg-maroon-900/15 blur-xl" />
                          <div className="absolute inset-x-0 bottom-12 flex flex-col items-center px-5 text-center">
                            <span className="rounded-full bg-black/35 px-3 py-1 text-[9px] uppercase tracking-[0.22em] text-white/85 backdrop-blur">
                              Look {String(index + 1).padStart(2, "0")}
                            </span>
                            <p className="mt-2 text-[13px] font-medium uppercase tracking-[0.18em] text-white">
                              {item.name}
                            </p>
                          </div>
                        </div>
                      </button>
                    </div>
                  );
                })}
              </div>

              <div className="mt-7 flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => scrollToIndex(active - 1)}
                  disabled={active === 0}
                  aria-label="Previous look"
                  className="flex size-10 shrink-0 items-center justify-center rounded-full border border-ink/15 text-ink transition hover:border-maroon-600 hover:text-maroon-700 disabled:opacity-30"
                >
                  <ArrowLeft className="size-4" />
                </button>
                <div className="flex-1">
                  <div className="h-px w-full bg-ink/10">
                    <div
                      className="h-px bg-maroon-600 transition-all duration-500"
                      style={{ width: `${((active + 1) / looks.length) * 100}%` }}
                    />
                  </div>
                  <div className="mt-2.5 flex items-center justify-between gap-3">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-ink-soft">
                      {active + 1} of {looks.length} · {look.name}
                    </p>
                    <p className="hidden text-[10px] uppercase tracking-[0.2em] text-ink-soft/60 sm:block">
                      Scroll or drag
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => scrollToIndex(active + 1)}
                  disabled={active === looks.length - 1}
                  aria-label="Next look"
                  className="flex size-10 shrink-0 items-center justify-center rounded-full border border-ink/15 text-ink transition hover:border-maroon-600 hover:text-maroon-700 disabled:opacity-30"
                >
                  <ArrowRight className="size-4" />
                </button>
              </div>
            </div>
          </div>

          <aside className="border-ink/10 lg:border-l lg:pl-10">
            <div className="lg:sticky lg:top-24">
              <div className="flex items-center justify-between">
                <h3 className="text-[11px] font-medium uppercase tracking-[0.24em] text-ink">
                  In this look
                </h3>
                <span className="text-[10px] uppercase tracking-[0.2em] text-ink-soft/60">
                  {look.pieces.length} pieces
                </span>
              </div>

              <ul className="mt-3 max-h-[430px] divide-y divide-ink/10 overflow-y-auto pr-1 lg:max-h-[46svh]">
                {look.pieces.map((piece, index) => (
                  <li key={piece.id} className="flex items-center gap-3 py-3">
                    <span className="relative h-[68px] w-[54px] shrink-0 overflow-hidden rounded-md bg-cream">
                      <PieceThumb piece={piece} />
                      <span className="absolute left-1 top-1 flex size-4 items-center justify-center rounded-full bg-white/85 text-[8px] font-medium text-ink">
                        {index + 1}
                      </span>
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[8.5px] font-medium uppercase tracking-[0.2em] text-ink-soft/70">
                        {piece.label}
                      </p>
                      <p className="mt-0.5 truncate text-[13px] leading-snug text-ink">{piece.name}</p>
                      <p className="mt-0.5 text-[12px] tabular-nums text-ink-soft">
                        {formatINR(piece.price)}
                      </p>
                    </div>
                    <div className="flex items-center gap-0.5">
                      <button
                        type="button"
                        aria-label={`${isWished(piece.id) ? "Remove" : "Save"} ${piece.name}`}
                        aria-pressed={isWished(piece.id)}
                        onClick={() => {
                          toggleWish({
                            id: piece.id,
                            name: piece.name,
                            meta: piece.label,
                            price: piece.price,
                            swatch: piece.swatch,
                          });
                          toast(isWished(piece.id) ? "Removed from wishlist" : "Saved to wishlist", {
                            description: piece.name,
                          });
                        }}
                        className={cn(
                          "flex size-8 items-center justify-center rounded-full transition",
                          isWished(piece.id)
                            ? "text-maroon-600"
                            : "text-ink-soft hover:bg-cream hover:text-maroon-700",
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

              <div className="mt-4 border-t border-ink/10 pt-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-ink">
                      Complete the look
                    </p>
                    <p className="mt-1 text-[10px] text-ink-soft">
                      Bundle all 6 pieces · save 10%
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] tabular-nums text-ink-soft/60 line-through">
                      {formatINR(total)}
                    </p>
                    <p className="text-[15px] font-medium tabular-nums text-ink">
                      {formatINR(bundle)}
                    </p>
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
                    aria-label={`Save ${look.name} to wishlist`}
                    onClick={() => {
                      toggleWish({
                        id: look.id,
                        name: `${look.name} — the full look`,
                        meta: "6 pieces · bundle",
                        price: bundle,
                        swatch: look.pieces[0].swatch,
                      });
                      toast(isWished(look.id) ? "Removed from wishlist" : "Look saved", {
                        description: look.name,
                      });
                    }}
                    className={cn(
                      "flex size-12 shrink-0 items-center justify-center rounded-full border transition",
                      isWished(look.id)
                        ? "border-maroon-600 text-maroon-600"
                        : "border-ink/15 text-ink-soft hover:border-ink/30 hover:text-ink",
                    )}
                  >
                    <Heart className="size-4" fill={isWished(look.id) ? "currentColor" : "none"} />
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
