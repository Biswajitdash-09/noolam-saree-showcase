"use client";

import * as React from "react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 800);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-14 left-3 z-40 flex size-9 items-center justify-center rounded-full border border-gold-500/30 bg-[#1b0f0c]/90 text-gold-300 shadow-lg backdrop-blur transition-all duration-300 hover:bg-maroon-800 sm:bottom-16 sm:left-5 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <span className="text-[15px] font-semibold tracking-tight">N</span>
      <ArrowUp className="sr-only" />
    </button>
  );
}
