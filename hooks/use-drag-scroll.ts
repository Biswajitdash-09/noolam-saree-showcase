"use client";

import * as React from "react";

export function useDragScroll<T extends HTMLElement = HTMLDivElement>() {
  const ref = React.useRef<T>(null);
  const state = React.useRef({ down: false, startX: 0, startLeft: 0, moved: false });

  const onPointerDown = (event: React.PointerEvent) => {
    if (event.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    state.current = { down: true, startX: event.clientX, startLeft: el.scrollLeft, moved: false };
    el.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: React.PointerEvent) => {
    if (!state.current.down) return;
    const el = ref.current;
    if (!el) return;
    const delta = event.clientX - state.current.startX;
    if (Math.abs(delta) > 4) state.current.moved = true;
    el.scrollLeft = state.current.startLeft - delta;
  };

  const end = (event: React.PointerEvent) => {
    const el = ref.current;
    if (el?.hasPointerCapture(event.pointerId)) el.releasePointerCapture(event.pointerId);
    state.current.down = false;
    window.setTimeout(() => {
      state.current.moved = false;
    }, 0);
  };

  const onClickCapture = (event: React.MouseEvent) => {
    if (state.current.moved) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  return {
    ref,
    dragProps: {
      onPointerDown,
      onPointerMove,
      onPointerUp: end,
      onPointerCancel: end,
      onPointerLeave: end,
      onClickCapture,
    },
  };
}
