"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

import { SplitLines } from "@/components/motion/split-lines";
import { ArrowPill } from "@/components/site/arrow-pill";

// Arch window in a 1600×1000 frame: a pointed temple arch, centred.
const ARCH = "M540 960 V480 Q540 270 800 170 Q1060 270 1060 480 V960 Z";
const FRAME = `M-6000 -6000 H7600 V7000 H-6000 Z ${ARCH}`;
const ORIGIN = "800px 565px";

/**
 * The hero is a pinned scene. Scrolling down, the showroom closes into a
 * gold-edged temple arch set into the ivory page, and the archive continues
 * below. Reduced motion: the hero stays a plain full-screen image.
 */
export function Hero() {
  const ref = React.useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [endScale, setEndScale] = React.useState(1);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });

  React.useEffect(() => {
    const fit = () => {
      // Keep the finished arch comfortably inside narrow screens.
      const w = window.innerWidth;
      const h = window.innerHeight;
      const unitsVisible = 1600 * Math.min(1, (w / h) / 1.6);
      setEndScale(Math.min(1, (unitsVisible * 0.78) / 520));
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  const frameScale = useTransform(p, [0, 0.82], reduce ? [5, 5] : [5, endScale]);
  const outline = useTransform(p, [0.5, 0.92], reduce ? [0, 0] : [0, 1]);
  const imageScale = useTransform(p, [0, 1], reduce ? [1.04, 1.04] : [1.04, 1.2]);
  const copyY = useTransform(p, [0, 0.45], reduce ? ["0%", "0%"] : ["0%", "-18%"]);
  const copyOpacity = useTransform(p, [0, 0.38], reduce ? [1, 1] : [1, 0]);
  const veil = useTransform(p, [0, 0.6], reduce ? [1, 1] : [1, 0.45]);
  const cueOpacity = useTransform(p, [0, 0.08], [1, 0]);

  return (
    <section
      ref={ref}
      aria-label="NOOLAM Kanchipuram silk"
      className="relative h-[100svh] bg-white motion-safe:h-[185svh]"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-maroon-950">
        <motion.div className="absolute inset-0 will-change-transform" style={{ scale: imageScale }}>
          <Image
            src="/images/hero-showroom.jpg"
            alt="Grand NOOLAM temple silk showroom with carved wooden pillars and silk sarees"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
            style={{ filter: "brightness(0.88) contrast(1.05)" }}
          />
        </motion.div>

        <motion.div className="absolute inset-0" style={{ opacity: veil }}>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(30,4,8,0.94)_0%,rgba(36,6,11,0.82)_34%,rgba(36,6,11,0.35)_68%,rgba(36,6,11,0.55)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,3,6,0.55)_0%,transparent_28%,transparent_58%,rgba(30,4,8,0.88)_100%)]" />
        </motion.div>

        <motion.div
          className="shell relative z-10 flex h-full w-full flex-col justify-end pb-[clamp(3rem,9svh,6rem)] pt-[clamp(6.5rem,18svh,10rem)]"
          style={{ y: copyY, opacity: copyOpacity }}
        >
          <div className="max-w-[980px]">
            <span className="hero-fade inline-flex items-center gap-3 rounded-full border border-white/20 bg-black/25 px-4 py-2 backdrop-blur-md">
              <span className="size-1.5 rounded-full bg-gold-400" />
              <span className="text-[11px] font-medium uppercase tracking-[0.28em] text-white/85 sm:text-[11px]">
                Kanchipuram · Pure Zari · Handwoven Silk
              </span>
            </span>

            <h1 className="display mt-[clamp(1rem,3svh,1.75rem)] text-[clamp(2.6rem,min(8.2vw,9.5svh),7.4rem)] text-white">
              <SplitLines mode="intro" lines={["Woven for", "the Divine."]} />
            </h1>

            <p
              className="hero-fade mt-[clamp(0.75rem,2.4svh,1.5rem)] max-w-[34rem] text-[15px] leading-relaxed text-white/80 sm:text-base"
              style={{ "--i": 3 } as React.CSSProperties}
            >
              NOOLAM brings the temple looms of Kanchipuram home: Kanjivaram silk in
              heritage colours, bordered in real zari and finished by hand.
            </p>

            <div
              className="hero-fade mt-[clamp(1rem,3.5svh,2.25rem)] flex flex-wrap items-center gap-3"
              style={{ "--i": 4 } as React.CSSProperties}
            >
              <ArrowPill href="/#try-the-look" variant="maroon">
                Try the Look
              </ArrowPill>
              <ArrowPill href="/#the-rack" variant="light">
                Browse the Rack
              </ArrowPill>
            </div>
          </div>

          <div className="mt-[clamp(1rem,5svh,3.5rem)] flex items-center justify-between gap-6 border-t border-white/15 pt-5">
            <div className="flex flex-wrap items-center gap-x-7 gap-y-2 text-[11px] uppercase tracking-[0.24em] text-white/50">
              <span>Est. 1978</span>
              <span className="hidden sm:inline">Silk Mark certified</span>
              <span className="hidden md:inline">Handloom · Kanchipuram</span>
            </div>
            <motion.div style={{ opacity: cueOpacity }} className="hidden xl:block">
              <Link
                href="/#archive"
                className="group flex min-h-11 items-center gap-2 whitespace-nowrap text-[11px] uppercase tracking-[0.24em] text-white/55 transition hover:text-gold-300"
              >
                Scroll the archive
                <ArrowDown className="size-3.5 animate-[drift_2.4s_ease-in-out_infinite]" />
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* The ivory wall closing in around a temple arch. */}
        <svg
          aria-hidden
          viewBox="0 0 1600 1000"
          preserveAspectRatio="xMidYMid slice"
          className="pointer-events-none absolute inset-0 z-20 h-full w-full motion-reduce:hidden"
        >
          <motion.g style={{ scale: frameScale, transformOrigin: ORIGIN, transformBox: "view-box" }}>
            <path d={FRAME} fill="#ffffff" fillRule="evenodd" />
            <motion.path
              d={ARCH}
              fill="none"
              stroke="var(--color-gold-500)"
              strokeWidth={1.6}
              vectorEffect="non-scaling-stroke"
              style={{ pathLength: outline, opacity: outline }}
            />
          </motion.g>
        </svg>
      </div>
    </section>
  );
}
