"use client";

import * as React from "react";
import {
  motion,
  useMotionValueEvent,
  useTransform,
  type MotionValue,
} from "motion/react";

import { useSmoothProgress } from "@/components/site/scroll-rail";
import { cn } from "@/lib/utils";

const steps = [
  {
    name: "Warp",
    text: "Thousands of three-ply mulberry silk threads are stretched taut along the pit loom. They will run the full length of the saree.",
  },
  {
    name: "Weft",
    text: "The shuttle crosses back and forth, row after row, laying the colour of the body into the warp.",
  },
  {
    name: "Zari",
    text: "Silver-core zari, gilded in gold, is woven into both borders on shuttles of its own.",
  },
  {
    name: "Pallu",
    text: "The korvai join locks a contrast pallu to the body by hand. It is the signature of a Kanjivaram.",
  },
];

// Loom geometry (viewBox 0 0 560 720).
const LEFT = 80;
const WIDTH = 400;
const TOP = 60;
const BODY_END = 500;
const BOTTOM = 660;
const WARPS = 24;
const ROWS = 22;
const ROW_H = (BODY_END - TOP) / ROWS;

function useRange(p: MotionValue<number>, from: number, to: number) {
  return useTransform(p, [from, to], [0, 1], { clamp: true });
}

/**
 * "From thread to heirloom": a pinned chapter where scrolling weaves a
 * Kanjivaram on an SVG loom. Each step is announced to screen readers.
 * With reduced motion the finished saree and all four steps are shown.
 */
export function LoomStory() {
  const ref = React.useRef<HTMLDivElement>(null);
  const p = useSmoothProgress(ref);
  const [step, setStep] = React.useState(0);

  useMotionValueEvent(p, "change", (value) => {
    const next = Math.min(steps.length - 1, Math.max(0, Math.floor(value * steps.length - 0.02)));
    setStep((current) => (current === next ? current : next));
  });

  const rail = useTransform(p, [0, 1], [0, 1]);

  return (
    <section
      id="the-loom"
      aria-labelledby="loom-title"
      className="relative bg-[linear-gradient(180deg,#ffffff_0%,#f8f1e6_100%)]"
    >
      <div ref={ref} className="relative motion-safe:h-[420svh]">
        <div className="top-0 flex min-h-[100svh] items-center overflow-hidden py-24 motion-safe:sticky motion-safe:h-[100svh] motion-safe:py-0 motion-safe:pt-16">
          <div className="shell grid w-full items-center gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
            <div className="order-2 lg:order-1">
              <p className="eyebrow">The loom room</p>
              <h2 id="loom-title" className="display mt-4 text-[clamp(2rem,4.6vw,3.9rem)]">
                From thread to heirloom
              </h2>

              <div className="mt-8 flex gap-5">
                <div aria-hidden className="relative w-px shrink-0 bg-ink/10 motion-reduce:hidden">
                  <motion.span
                    className="absolute inset-x-0 top-0 h-full origin-top bg-gold-500"
                    style={{ scaleY: rail }}
                  />
                </div>
                <ol className="space-y-5">
                  {steps.map((item, index) => (
                    <li
                      key={item.name}
                      aria-current={index === step ? "step" : undefined}
                      className={cn(
                        "transition-[opacity,transform] duration-500",
                        index === step ? "opacity-100" : "motion-safe:opacity-45",
                        index > step && "motion-safe:translate-y-1",
                      )}
                    >
                      <p className="flex items-baseline gap-3">
                        <span className="text-[12px] tabular-nums text-gold-700">0{index + 1}</span>
                        <span className="text-[19px] font-semibold tracking-tight text-ink">{item.name}</span>
                      </p>
                      <p
                        className={cn(
                          "mt-1.5 max-w-[42ch] text-[14px] leading-relaxed text-ink-soft",
                          index !== step && "motion-safe:max-lg:hidden",
                        )}
                      >
                        {item.text}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
              <p className="sr-only" aria-live="polite">
                Step {step + 1} of 4: {steps[step].name}
              </p>
            </div>

            <div className="order-1 flex justify-center lg:order-2">
              <LoomArt p={p} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LoomArt({ p }: { p: MotionValue<number> }) {
  return (
    <svg
      viewBox="0 0 560 720"
      role="img"
      aria-label="A Kanjivaram saree being woven on a loom: warp threads, a rani pink body, gold zari borders and a deep maroon pallu with temple motifs"
      className="loom-art h-[min(44svh,420px)] w-auto drop-shadow-[0_40px_60px_rgba(74,10,18,0.18)] lg:h-[min(78svh,680px)]"
    >
      <defs>
        <linearGradient id="loom-zari" x1="0" x2="1">
          <stop offset="0" stopColor="#8f6f16" />
          <stop offset="0.35" stopColor="#e7d193" />
          <stop offset="0.6" stopColor="#c9a227" />
          <stop offset="1" stopColor="#8f6f16" />
        </linearGradient>
        <linearGradient id="loom-shine" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff8e1" stopOpacity="0" />
          <stop offset="0.5" stopColor="#fff8e1" stopOpacity="0.85" />
          <stop offset="1" stopColor="#fff8e1" stopOpacity="0" />
        </linearGradient>
        <clipPath id="loom-cloth">
          <rect x={LEFT} y={TOP} width={WIDTH} height={BOTTOM - TOP} />
        </clipPath>
      </defs>

      {/* Loom beams */}
      <rect x="40" y="34" width="480" height="14" rx="7" fill="#5b3420" />
      <rect x="40" y="672" width="480" height="14" rx="7" fill="#5b3420" />
      <rect x="40" y="34" width="8" height="652" rx="4" fill="#5b3420" opacity="0.35" />
      <rect x="512" y="34" width="8" height="652" rx="4" fill="#5b3420" opacity="0.35" />

      {Array.from({ length: WARPS }, (_, i) => (
        <Warp key={i} p={p} index={i} />
      ))}

      <g clipPath="url(#loom-cloth)">
        {Array.from({ length: ROWS }, (_, i) => (
          <Weft key={i} p={p} index={i} />
        ))}
        <Pallu p={p} />
        <Zari p={p} />
      </g>

      <Shuttle p={p} />
    </svg>
  );
}

function Warp({ p, index }: { p: MotionValue<number>; index: number }) {
  const start = (index % 6) * 0.012 + Math.floor(index / 6) * 0.008;
  const length = useRange(p, start, start + 0.16);
  const x = LEFT + (index * WIDTH) / (WARPS - 1);
  return (
    <motion.line
      data-anim
      x1={x}
      x2={x}
      y1={TOP - 12}
      y2={BOTTOM + 12}
      stroke="#d9c2a5"
      strokeWidth={1.1}
      style={{ pathLength: length }}
    />
  );
}

function Weft({ p, index }: { p: MotionValue<number>; index: number }) {
  const start = 0.24 + (index * 0.26) / ROWS;
  const fill = useRange(p, start, start + 0.035);
  return (
    <motion.rect
      data-anim
      x={LEFT}
      y={TOP + index * ROW_H}
      width={WIDTH}
      height={ROW_H + 0.6}
      fill={index % 2 ? "#a3204a" : "#b02a55"}
      style={{ scaleX: fill, originX: 0, transformBox: "fill-box" }}
    />
  );
}

function Shuttle({ p }: { p: MotionValue<number> }) {
  // Rides the current weft row, swinging left and right.
  const x = useTransform(p, (v) => {
    const t = Math.min(1, Math.max(0, (v - 0.24) / 0.26)) * ROWS;
    const swing = t % 2 < 1 ? t % 1 : 1 - (t % 1);
    return LEFT - 20 + swing * (WIDTH + 40) - 22;
  });
  const y = useTransform(p, (v) => {
    const row = Math.min(ROWS - 1, Math.floor(Math.max(0, (v - 0.24) / 0.26) * ROWS));
    return TOP + row * ROW_H + ROW_H / 2 - 5;
  });
  const opacity = useTransform(p, [0.2, 0.25, 0.48, 0.52], [0, 1, 1, 0]);
  return (
    <motion.g data-anim className="motion-reduce:hidden" style={{ x, y, opacity }}>
      <rect width="44" height="10" rx="5" fill="#5b3420" />
      <rect x="10" y="3" width="24" height="4" rx="2" fill="#e7d193" />
    </motion.g>
  );
}

function Zari({ p }: { p: MotionValue<number> }) {
  const grow = useRange(p, 0.5, 0.68);
  const shine = useTransform(p, [0.56, 0.76], [TOP - 160, BOTTOM + 40]);
  const shineOpacity = useTransform(p, [0.55, 0.6, 0.72, 0.78], [0, 1, 1, 0]);
  return (
    <g>
      {[LEFT, LEFT + WIDTH - 34].map((x) => (
        <motion.g key={x} data-anim style={{ scaleY: grow, originY: 0, transformBox: "fill-box" }}>
          <rect x={x} y={TOP} width="34" height={BOTTOM - TOP} fill="url(#loom-zari)" />
          <rect x={x === LEFT ? x + 34 : x - 4} y={TOP} width="4" height={BOTTOM - TOP} fill="#4a0a12" />
          {Array.from({ length: 14 }, (_, i) => (
            <path
              key={i}
              d={`M${x + 17} ${TOP + 22 + i * 43} l8 10 l-8 10 l-8 -10 Z`}
              fill="#4a0a12"
              opacity="0.55"
            />
          ))}
        </motion.g>
      ))}
      <motion.rect
        data-anim
        x={LEFT}
        width={WIDTH}
        height="160"
        fill="url(#loom-shine)"
        style={{ y: shine, opacity: shineOpacity }}
        className="motion-reduce:hidden"
      />
    </g>
  );
}

const butas = [
  { x: 190, y: 600 },
  { x: 280, y: 590 },
  { x: 370, y: 600 },
];

function Pallu({ p }: { p: MotionValue<number> }) {
  const base = useRange(p, 0.72, 0.8);
  const join = useRange(p, 0.74, 0.82);
  return (
    <g>
      <motion.rect
        data-anim
        x={LEFT}
        y={BODY_END}
        width={WIDTH}
        height={BOTTOM - BODY_END}
        fill="#4a0a12"
        style={{ scaleY: base, originY: 0, transformBox: "fill-box" }}
      />
      <motion.line
        data-anim
        x1={LEFT}
        x2={LEFT + WIDTH}
        y1={BODY_END + 1}
        y2={BODY_END + 1}
        stroke="#e7d193"
        strokeWidth="3"
        style={{ pathLength: join }}
      />
      {Array.from({ length: 9 }, (_, i) => (
        <Temple key={i} p={p} index={i} />
      ))}
      {butas.map((item, i) => (
        <Buta key={i} p={p} index={i} {...item} />
      ))}
    </g>
  );
}

function Temple({ p, index }: { p: MotionValue<number>; index: number }) {
  const start = 0.8 + index * 0.012;
  const bloom = useRange(p, start, start + 0.06);
  const x = LEFT + 44 + index * 39;
  return (
    <motion.path
      data-anim
      d={`M${x - 15} ${BODY_END + 46} L${x - 15} ${BODY_END + 30} L${x - 8} ${BODY_END + 30} L${x - 8} ${BODY_END + 20} L${x} ${BODY_END + 8} L${x + 8} ${BODY_END + 20} L${x + 8} ${BODY_END + 30} L${x + 15} ${BODY_END + 30} L${x + 15} ${BODY_END + 46} Z`}
      fill="#c9a227"
      style={{ scale: bloom, opacity: bloom, originY: 1, transformBox: "fill-box" }}
    />
  );
}

function Buta({ p, index, x, y }: { p: MotionValue<number>; index: number; x: number; y: number }) {
  const start = 0.85 + index * 0.025;
  const bloom = useRange(p, start, start + 0.06);
  return (
    <motion.path
      data-anim
      d={`M${x} ${y - 22} C${x + 16} ${y - 22} ${x + 22} ${y - 4} ${x + 10} ${y + 12} C${x + 4} ${y + 20} ${x - 10} ${y + 22} ${x - 13} ${y + 12} C${x - 16} ${y + 2} ${x - 6} ${y - 4} ${x} ${y - 4} C${x + 6} ${y - 4} ${x + 6} ${y - 13} ${x} ${y - 22} Z`}
      fill="none"
      stroke="#e7d193"
      strokeWidth="2.4"
      style={{ pathLength: bloom, opacity: bloom }}
    />
  );
}
