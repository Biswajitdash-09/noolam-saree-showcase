import * as React from "react";

import { cn } from "@/lib/utils";

type SplitLinesProps = {
  /** Each entry is rendered as one masked line. */
  lines: React.ReactNode[];
  /**
   * "scroll": each line rises from behind its mask as the heading scrolls in.
   * "intro": lines rise once on page load (used by the hero).
   */
  mode?: "scroll" | "intro";
  className?: string;
};

/**
 * Splits a heading into masked lines that slide up into place. The words stay
 * real text in reading order, so screen readers and search engines read the
 * heading normally. Without scroll-timeline support the lines just sit there.
 */
export function SplitLines({ lines, mode = "scroll", className }: SplitLinesProps) {
  return (
    <span className={cn("sd-line", className)}>
      {lines.map((line, index) => (
        <span key={index} className="sd-line__mask">
          <span
            className={mode === "intro" ? "sd-line__inner hero-intro" : "sd-line__inner"}
            style={{ "--i": index } as React.CSSProperties}
          >
            {line}
            {index < lines.length - 1 ? " " : null}
          </span>
        </span>
      ))}
    </span>
  );
}
