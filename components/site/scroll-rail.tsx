"use client";

import * as React from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";

import { smoothScrollTo } from "@/components/motion/smooth-scroll";
import { cn } from "@/lib/utils";

type RailContextValue = {
  /** Horizontal offset of the track in px (0 → -distance). */
  x: MotionValue<number>;
  /** Width of the visible rail viewport in px. */
  viewport: MotionValue<number>;
  /** Smoothed 0–1 progress through the pinned section. */
  progress: MotionValue<number>;
  pinned: boolean;
};

const RailContext = React.createContext<RailContextValue | null>(null);

export function useRail() {
  return React.useContext(RailContext);
}

/**
 * Smoothed 0–1 progress through a tall scroll wrapper.
 * Spring smoothing is skipped when the visitor prefers reduced motion.
 */
export function useSmoothProgress(target: React.RefObject<HTMLElement | null>) {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 160, damping: 32, mass: 0.35 });
  // Lenis already glides wheel and trackpad scrolling; a second spring on top
  // would only add lag. Touch scrolling stays native, so it keeps the spring.
  const [touch, setTouch] = React.useState(false);
  React.useEffect(() => {
    setTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);
  return reduce || !touch ? scrollYProgress : smooth;
}

/** Scroll the window so the wrapper sits at the given 0–1 progress. */
export function scrollToProgress(target: HTMLElement | null, progress: number) {
  if (!target) return;
  const top = target.getBoundingClientRect().top + window.scrollY;
  const range = target.offsetHeight - window.innerHeight;
  smoothScrollTo(top + Math.max(0, Math.min(1, progress)) * range);
}

type ScrollRailProps = {
  children: React.ReactNode;
  /** Content pinned above the track (title, filters). */
  head?: React.ReactNode;
  /** Content pinned below the track (captions). */
  foot?: React.ReactNode;
  className?: string;
  trackClassName?: string;
  /** Extra vertical scroll per px of horizontal travel. */
  speed?: number;
  label?: string;
};

/**
 * Turns vertical scroll into horizontal travel. While the track is wider
 * than the screen, the section pins and the track glides sideways; when it
 * fits, the rail renders in place with no pinning.
 */
export function ScrollRail({
  children,
  head,
  foot,
  className,
  trackClassName,
  speed = 1,
  label,
}: ScrollRailProps) {
  const outerRef = React.useRef<HTMLDivElement>(null);
  const viewportRef = React.useRef<HTMLDivElement>(null);
  const trackRef = React.useRef<HTMLDivElement>(null);
  const [distance, setDistance] = React.useState(0);
  const viewport = useMotionValue(0);
  const progress = useSmoothProgress(outerRef);
  const x = useTransform(progress, (value) => -value * distance);
  const pinned = distance > 4;

  React.useLayoutEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      const view = viewportRef.current;
      if (!track || !view) return;
      viewport.set(view.clientWidth);
      setDistance(Math.max(0, track.scrollWidth - view.clientWidth));
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (trackRef.current) observer.observe(trackRef.current);
    if (viewportRef.current) observer.observe(viewportRef.current);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [viewport]);

  // Keep keyboard focus visible: scroll the page so a focused card is on screen.
  const onFocusCapture = (event: React.FocusEvent) => {
    if (!pinned) return;
    const track = trackRef.current;
    const view = viewportRef.current;
    const item = (event.target as HTMLElement).closest<HTMLElement>("[data-rail-item]");
    if (!track || !view || !item) return;
    const center = item.offsetLeft + item.offsetWidth / 2 - view.clientWidth / 2;
    scrollToProgress(outerRef.current, center / distance);
  };

  return (
    <RailContext.Provider value={{ x, viewport, progress, pinned }}>
      <div
        ref={outerRef}
        className={cn("relative", className)}
        style={{ height: pinned ? `calc(100svh + ${Math.round(distance * speed)}px)` : undefined }}
      >
        <div
          className={cn(
            pinned && "sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden pt-16 sm:pt-20",
          )}
        >
          {head}
          <div
            ref={viewportRef}
            role={label ? "region" : undefined}
            aria-label={label}
            className="relative w-full overflow-hidden"
            onFocusCapture={onFocusCapture}
          >
            <motion.div
              ref={trackRef}
              style={{ x: pinned ? x : 0 }}
              className={cn("flex w-max min-w-full will-change-transform", trackClassName)}
            >
              {children}
            </motion.div>
          </div>
          {foot}
        </div>
      </div>
    </RailContext.Provider>
  );
}

/**
 * Normalised distance (-1 … 1) of an element's centre from the centre of the
 * rail viewport, updated every frame from the rail's motion values.
 */
export function useRailDistance(ref: React.RefObject<HTMLElement | null>) {
  const rail = useRail();
  const zero = useMotionValue(0);
  return useTransform<number, number>([rail?.x ?? zero, rail?.viewport ?? zero], ([x, width]) => {
    const el = ref.current;
    if (!el || !width) return 0;
    const center = el.offsetLeft + el.offsetWidth / 2 + x;
    const d = (center - width / 2) / (width / 2);
    return Math.max(-1.6, Math.min(1.6, d));
  });
}
