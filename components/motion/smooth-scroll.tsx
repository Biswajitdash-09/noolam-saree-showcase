"use client";

import * as React from "react";
import Lenis from "lenis";
import { usePathname } from "next/navigation";

/**
 * One Lenis instance for the whole site: inertial wheel/trackpad scrolling on
 * desktop, native touch scrolling on phones, and nothing at all for people who
 * ask for reduced motion. Scroll-linked animations (motion's useScroll, CSS
 * scroll timelines, sticky pins) keep working because Lenis drives the real
 * window scroll position.
 */
let instance: Lenis | null = null;

export function getLenis() {
  return instance;
}

type ScrollTarget = number | string | HTMLElement;

/** Smooth scroll that goes through Lenis when it's running, native otherwise. */
export function smoothScrollTo(
  target: ScrollTarget,
  { offset = 0, immediate = false }: { offset?: number; immediate?: boolean } = {},
) {
  if (instance && !immediate) {
    instance.scrollTo(target, { offset, duration: 1.2 });
    return;
  }
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let top = 0;
  if (typeof target === "number") top = target;
  else {
    const el = typeof target === "string" ? document.querySelector<HTMLElement>(target) : target;
    if (!el) return;
    top = el.getBoundingClientRect().top + window.scrollY;
  }
  window.scrollTo({ top: top + offset, behavior: immediate || reduce ? "auto" : "smooth" });
}

export function SmoothScroll() {
  const pathname = usePathname();

  React.useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | null = null;
    let observer: MutationObserver | null = null;

    const start = () => {
      if (lenis || media.matches) return;
      lenis = new Lenis({
        autoRaf: true,
        lerp: 0.1,
        wheelMultiplier: 1,
        smoothWheel: true,
        syncTouch: false,
        anchors: { offset: -72 },
        // Let dialogs, sheets and anything marked scrollable keep native scroll.
        prevent: (node) =>
          Boolean(node.closest?.("[role=dialog],[data-lenis-prevent],[data-radix-scroll-area-viewport]")),
      });
      instance = lenis;
      // Radix sheets/dialogs lock the page; pause the glide while they're open.
      const sync = () => {
        if (!lenis) return;
        if (document.body.hasAttribute("data-scroll-locked")) lenis.stop();
        else lenis.start();
      };
      observer = new MutationObserver(sync);
      observer.observe(document.body, { attributes: true, attributeFilter: ["data-scroll-locked"] });
      sync();
    };

    const stop = () => {
      observer?.disconnect();
      observer = null;
      lenis?.destroy();
      lenis = null;
      instance = null;
    };

    const onChange = () => (media.matches ? stop() : start());
    start();
    media.addEventListener("change", onChange);
    return () => {
      media.removeEventListener("change", onChange);
      stop();
    };
  }, []);

  // New page: begin at the top, unless the URL points at a section.
  React.useEffect(() => {
    if (window.location.hash) return;
    instance?.scrollTo(0, { immediate: true, force: true });
  }, [pathname]);

  return null;
}
