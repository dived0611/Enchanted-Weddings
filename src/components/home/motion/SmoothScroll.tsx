"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";

gsap.registerPlugin(ScrollTrigger);

/**
 * Smooth scrolling with Lenis, synced with GSAP ScrollTrigger.
 * Only mounted on the home page, and turned off when the visitor
 * asked their system to reduce motion.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      lerp: 0.09, // lower = smoother / slower
      wheelMultiplier: 1,
      anchors: { offset: -84 }, // smooth-scroll "#..." links, below the sticky header
      autoRaf: false, // GSAP drives the animation loop below
      autoToggle: true, // pauses while <html> has overflow:hidden (during the intro screen)
    });

    // Keep ScrollTrigger animations in sync with Lenis
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return null;
}
