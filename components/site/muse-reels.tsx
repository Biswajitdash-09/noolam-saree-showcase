"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { reels } from "@/lib/data";
import { cn } from "@/lib/utils";

const AUTOPLAY_MS = 5200;

export function MuseReels() {
  const [active, setActive] = React.useState(0);
  const [playing, setPlaying] = React.useState(true);
  const [progress, setProgress] = React.useState(0);
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);
  const [sound, setSound] = React.useState(false);

  React.useEffect(() => {
    if (!playing || openIndex !== null) return;
    const started = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const pct = Math.min(1, (now - started) / AUTOPLAY_MS);
      setProgress(pct);
      if (pct >= 1) {
        setActive((current) => (current + 1) % reels.length);
        setProgress(0);
        return;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, playing, openIndex]);

  React.useEffect(() => {
    setProgress(0);
  }, [active]);

  const go = (direction: 1 | -1) =>
    setActive((current) => (current + direction + reels.length) % reels.length);

  const current = reels[active];
  const openReel = openIndex !== null ? reels[openIndex] : null;

  return (
    <section
      aria-labelledby="reels-title"
      className="relative overflow-hidden bg-white pb-20 pt-16 md:pb-24"
    >
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[280px] bg-[radial-gradient(120%_100%_at_50%_100%,rgba(201,162,39,0.10),transparent_70%)]" />

      <div className="shell relative">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:items-start">
          <div>
            <p className="eyebrow">The Muse Reels</p>
            <h2 id="reels-title" className="display mt-5 text-[clamp(2.3rem,5.6vw,4.8rem)]">
              Silk, <span className="text-gradient-warm">in motion.</span>
            </h2>
          </div>
          <div className="flex flex-col gap-5 lg:items-end lg:text-right">
            <p className="max-w-[420px] text-sm leading-relaxed text-ink-soft">
              Five drapes filmed the way they are lived in — lamp rooms, temple
              lanes, a morning by the sea. Tap the centre reel to watch it full
              screen, with sound.
            </p>
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous reel"
                className="flex size-11 items-center justify-center rounded-full border border-ink/15 bg-white text-ink transition hover:border-maroon-600 hover:text-maroon-700"
              >
                <ArrowLeft className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => setPlaying((value) => !value)}
                aria-label={playing ? "Pause reel rotation" : "Play reel rotation"}
                aria-pressed={playing}
                className="flex size-11 items-center justify-center rounded-full bg-ink text-white transition hover:bg-maroon-800"
              >
                {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next reel"
                className="flex size-11 items-center justify-center rounded-full border border-ink/15 bg-white text-ink transition hover:border-maroon-600 hover:text-maroon-700"
              >
                <ArrowRight className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="relative mt-12 flex items-center justify-center gap-2 px-2 sm:gap-4"
        style={{ perspective: "1600px" }}
      >
        {reels.map((reel, index) => {
          const diff = index - active;
          const wrapped = diff > 2 ? diff - reels.length : diff < -2 ? diff + reels.length : diff;
          const distance = Math.abs(wrapped);
          const isActive = wrapped === 0;
          const scale = isActive ? 1 : distance === 1 ? 0.88 : 0.76;
          const rotate = wrapped * -11;
          const lift = distance * 22;
          const blur = distance === 0 ? 0 : distance === 1 ? 0.6 : 2;
          const opacity = distance === 0 ? 1 : distance === 1 ? 0.9 : 0.55;

          return (
            <motion.button
              key={reel.id}
              type="button"
              onClick={() => (isActive ? setOpenIndex(index) : setActive(index))}
              aria-label={
                isActive ? `Play ${reel.title} full screen` : `Show reel ${reel.number}: ${reel.title}`
              }
              aria-current={isActive}
              className={cn(
                "group relative shrink-0 overflow-hidden rounded-[18px] text-left outline-none",
                "focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-4",
                isActive
                  ? "z-20 w-[62vw] max-w-[330px] shadow-[0_40px_70px_-30px_rgba(30,4,8,0.55)] sm:w-[300px]"
                  : "hidden w-[190px] shadow-[0_30px_50px_-30px_rgba(30,4,8,0.5)] sm:block",
              )}
              style={{
                order: wrapped + 3,
                transform: `translateY(${lift}px) scale(${scale}) rotateY(${rotate}deg)`,
                transformStyle: "preserve-3d",
                opacity,
                filter: `blur(${blur}px)`,
                transition: "transform 700ms cubic-bezier(.22,1,.36,1), opacity 500ms ease, filter 500ms ease",
              }}
            >
              <div className="relative aspect-[9/16]">
                <Image
                  src={reel.media}
                  alt={`${reel.title} — ${reel.location}`}
                  fill
                  draggable={false}
                  sizes="(max-width: 640px) 62vw, 330px"
                  className="object-cover sepia-[0.18] saturate-[0.9] brightness-[0.9] transition-transform duration-[1200ms] group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,3,6,0.35)_0%,rgba(20,3,6,0.06)_30%,rgba(20,3,6,0.25)_58%,rgba(20,3,6,0.92)_100%)]" />

                <div className="absolute inset-x-3 top-3 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-black/35 px-2.5 py-1 text-[8.5px] uppercase tracking-[0.2em] text-white/85 backdrop-blur">
                    <span
                      className={cn(
                        "size-1.5 rounded-full",
                        isActive ? "animate-pulse bg-gold-400" : "bg-white/60",
                      )}
                    />
                    Reel {reel.number}
                  </span>
                  <span className="rounded-full bg-black/30 px-2 py-1 text-[8.5px] tabular-nums text-white/80 backdrop-blur">
                    {reel.duration}
                  </span>
                </div>

                <div className="absolute inset-x-3 bottom-4">
                  <p className="text-[8.5px] uppercase tracking-[0.24em] text-gold-300">
                    {reel.fabric}
                  </p>
                  <p className="mt-1.5 text-[18px] font-medium leading-tight text-white">
                    {reel.title}
                  </p>
                  <p className="mt-1 text-[10px] text-white/65">{reel.location}</p>

                  {isActive && (
                    <div className="mt-3 h-[2px] w-full overflow-hidden rounded-full bg-white/20">
                      <div
                        className="h-full rounded-full bg-gold-400"
                        style={{ width: `${Math.round(progress * 100)}%` }}
                      />
                    </div>
                  )}
                </div>

                {isActive && (
                  <span className="absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-white/20 backdrop-blur-md transition group-hover:scale-105 group-hover:bg-white/30">
                    <Play className="ml-0.5 size-6 text-white" fill="currentColor" />
                  </span>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      <div className="shell mt-9 flex items-center justify-center gap-2">
        {reels.map((reel, index) => (
          <button
            key={`dot-${reel.id}`}
            type="button"
            aria-label={`Go to reel ${reel.number}`}
            aria-current={index === active}
            onClick={() => setActive(index)}
            className={cn(
              "h-1 rounded-full transition-all duration-500",
              index === active ? "w-10 bg-maroon-600" : "w-4 bg-ink/15 hover:bg-ink/30",
            )}
          />
        ))}
      </div>

      <Dialog open={openReel !== null} onOpenChange={(value) => (!value ? setOpenIndex(null) : undefined)}>
        <DialogContent
          showClose={false}
          aria-describedby={undefined}
          className="h-[100svh] w-screen max-w-none rounded-none border-0 bg-maroon-950 p-0"
        >
          <DialogTitle className="sr-only">{openReel?.title ?? "Reel"}</DialogTitle>
          <AnimatePresence>
            {openReel && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative flex h-full flex-col"
              >
                <div className="relative flex-1 overflow-hidden">
                  <Image
                    src={openReel.media}
                    alt={`${openReel.title} — ${openReel.location}`}
                    fill
                    sizes="100vw"
                    className="object-cover sepia-[0.14] saturate-[0.95] brightness-[0.82]"
                  />
                  <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_40%,transparent_20%,rgba(20,3,6,0.65)_100%)]" />

                  <div className="absolute inset-x-0 top-0 flex items-center justify-between px-5 py-5 sm:px-8">
                    <p className="text-[10px] uppercase tracking-[0.28em] text-white/60">
                      NOOLAM · Muse Reel {openReel.number}
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setSound((value) => !value)}
                        aria-pressed={sound}
                        className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/30 px-4 py-2 text-[9px] uppercase tracking-[0.26em] text-white/85 backdrop-blur transition hover:border-gold-400/60"
                      >
                        {sound ? <Volume2 className="size-3.5" /> : <VolumeX className="size-3.5" />}
                        {sound ? "Sound on" : "Sound off"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setOpenIndex(null)}
                        className="rounded-full border border-white/25 bg-black/30 px-4 py-2 text-[9px] uppercase tracking-[0.26em] text-white/85 backdrop-blur transition hover:border-gold-400/60"
                      >
                        Close
                      </button>
                    </div>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 px-5 pb-8 sm:px-8">
                    <p className="text-[9.5px] uppercase tracking-[0.28em] text-gold-300">
                      {openReel.fabric}
                    </p>
                    <h3 className="display mt-2 text-[clamp(1.9rem,4.4vw,3.2rem)] text-white">
                      {openReel.title}
                    </h3>
                    <p className="mt-1 text-sm text-white/60">{openReel.location}</p>
                    <div className="mt-5 flex items-center gap-4">
                      <button
                        type="button"
                        onClick={() => {
                          setOpenIndex((current) =>
                            current === null ? null : (current + 1) % reels.length,
                          );
                        }}
                        className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-white/70 transition hover:text-gold-300"
                      >
                        Next reel <ArrowRight className="size-3.5" />
                      </button>
                      <span className="h-px flex-1 bg-white/15" />
                      <span className="text-[10px] tabular-nums text-white/40">
                        {openReel.number} / {String(reels.length).padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </section>
  );
}
