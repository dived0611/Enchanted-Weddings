"use client";

import { useEffect, useRef, type ReactNode } from "react";

type CarouselProps = {
  children: ReactNode;
  /** Accessible name for the scrolling list */
  label: string;
  /** Extra classes for the scrolling track */
  trackClassName?: string;
};

/**
 * Horizontal list you can scroll by grabbing it with the mouse (with a little
 * glide when you let go), with a trackpad, or by swiping on touch screens.
 * Each direct child should be a card with `shrink-0` and `snap-start`.
 */
export default function Carousel({ children, label, trackClassName = "" }: CarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    let isDown = false;
    let moved = false;
    let startX = 0;
    let startScroll = 0;
    let lastX = 0;
    let lastTime = 0;
    let velocity = 0; // px per ms
    let glideFrame = 0;

    const stopGlide = () => cancelAnimationFrame(glideFrame);

    const onPointerDown = (e: PointerEvent) => {
      // Touch already scrolls natively — only handle mouse / pen
      if (e.pointerType === "touch" || e.button !== 0) return;
      stopGlide();
      isDown = true;
      moved = false;
      startX = lastX = e.clientX;
      startScroll = el.scrollLeft;
      lastTime = performance.now();
      velocity = 0;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDown) return;
      const dx = e.clientX - startX;
      if (!moved && Math.abs(dx) > 5) {
        moved = true;
        el.setPointerCapture(e.pointerId);
        // Turn off snapping and smooth-scroll while dragging so it follows the mouse exactly
        el.style.scrollSnapType = "none";
        el.style.scrollBehavior = "auto";
        el.dataset.dragging = "true";
      }
      if (!moved) return;
      el.scrollLeft = startScroll - dx;

      const now = performance.now();
      const dt = now - lastTime || 1;
      velocity = (e.clientX - lastX) / dt;
      lastX = e.clientX;
      lastTime = now;
    };

    const endDrag = (e: PointerEvent) => {
      if (!isDown) return;
      isDown = false;
      delete el.dataset.dragging;
      if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
      if (!moved) return;

      // Glide: keep moving with the release speed, slowing down each frame
      let v = velocity * 16; // px per frame
      const step = () => {
        v *= 0.94;
        el.scrollLeft -= v;
        if (Math.abs(v) > 0.4) {
          glideFrame = requestAnimationFrame(step);
        } else {
          // Re-enable snapping so the list settles neatly on a card
          el.style.scrollBehavior = "";
          el.style.scrollSnapType = "";
        }
      };
      glideFrame = requestAnimationFrame(step);
    };

    // After a drag, don't treat the mouse-up as a click on a card link
    const onClickCapture = (e: MouseEvent) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
        moved = false;
      }
    };

    // Stop the browser from "picking up" images / links as ghost images
    const onDragStart = (e: DragEvent) => e.preventDefault();

    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", endDrag);
    el.addEventListener("pointercancel", endDrag);
    el.addEventListener("click", onClickCapture, true);
    el.addEventListener("dragstart", onDragStart);
    return () => {
      stopGlide();
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", endDrag);
      el.removeEventListener("pointercancel", endDrag);
      el.removeEventListener("click", onClickCapture, true);
      el.removeEventListener("dragstart", onDragStart);
    };
  }, []);

  return (
    <div
      ref={trackRef}
      data-stagger
      role="region"
      aria-label={label}
      tabIndex={0}
      className={`no-scrollbar -mx-3 flex cursor-grab snap-x [&_a]:cursor-grab data-[dragging=true]:cursor-grabbing data-[dragging=true]:[&_a]:cursor-grabbing snap-mandatory gap-[33px] overflow-x-auto scroll-smooth px-3 pb-10 pt-6 outline-none select-none ${trackClassName}`}
    >
      {children}
    </div>
  );
}
