import * as React from "react";
import { ViewTransition } from "react";

/**
 * Wraps a page so route changes play the maroon curtain (see globals.css,
 * "Route transitions"). It lives in each page, not the layout, because
 * layouts persist across navigations and would never enter or exit.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="page-in" exit="page-out" default="none">
      <div>{children}</div>
    </ViewTransition>
  );
}
