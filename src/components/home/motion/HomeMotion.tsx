"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

/*
  All home-page animations live here. Components only add data attributes.

  OPENING SEQUENCE (first thing visitors see)
  data-intro*            → intro screen: logo ink-reveal, gold line, letters, 00→100 counter, curtain wipe
  data-site-header       → header slides down, its [data-nav-item]s drop in one by one
  data-hero-*            → hero: 3D letter-by-letter title, photo reveal, buttons, trust line
  data-petal             → rose-gold petals drifting down
  data-depth="20"        → follows the mouse (negative = opposite direction)
  data-magnetic          → button leans toward the cursor
  data-hero-copy / data-hero-art-scroll → hero drifts away while scrolling

  REST OF THE PAGE
  data-split             → heading revealed line by line
  data-reveal            → fades + slides up
  data-stagger           → [data-stagger-item] children appear one after another
  data-parallax="0.15"   → image moves slower than the page
  data-line              → line draws from left to right
  data-float             → gentle floating loop
*/

const EASE = "power3.out";
const INTRO_KEY = "ew-intro";

export default function HomeMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  // Decided once per page view (React runs effects twice in development —
  // a ref keeps the first answer so the intro isn't skipped the second time)
  const introSeen = useRef<boolean | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const q = gsap.utils.selector(root);
        const header = document.querySelector<HTMLElement>("[data-site-header]");
        const navItems = header ? gsap.utils.toArray<HTMLElement>("[data-nav-item]", header) : [];

        /* =========================================================
           1. INTRO SCREEN (once per browser tab)
        ========================================================= */
        const loader = q("[data-intro]")[0] as HTMLElement | undefined;
        if (introSeen.current === null) {
          let s = document.documentElement.classList.contains("intro-seen");
          try {
            s ||= !!sessionStorage.getItem(INTRO_KEY);
            sessionStorage.setItem(INTRO_KEY, "1");
          } catch {
            /* private mode: just play it */
          }
          introSeen.current = s;
        }
        const seen = introSeen.current;

        const master = gsap.timeline();

        if (loader && !seen) {
          // Lock scrolling during the intro (Lenis pauses automatically, see SmoothScroll autoToggle)
          document.documentElement.style.overflow = "hidden";

          const tagline = q("[data-intro-tagline]")[0];
          if (tagline) gsap.set(tagline, { autoAlpha: 1 }); // hidden by CSS until now
          const taglineSplit = tagline ? SplitText.create(tagline, { type: "chars" }) : null;
          const counter = q("[data-intro-count]")[0];
          const count = { v: 0 };

          const intro = gsap.timeline({ defaults: { ease: "expo.out" } });
          intro
            // Logo appears like ink spreading from left to right
            .fromTo(
              q("[data-intro-logo]"),
              { clipPath: "inset(0% 100% 0% 0%)", scale: 0.92, filter: "blur(6px)" },
              { clipPath: "inset(0% 0% 0% 0%)", scale: 1, filter: "blur(0px)", duration: 1.5, ease: "power3.inOut" },
              0.1,
            )
            .fromTo(q("[data-intro-line]"), { scaleX: 0 }, { scaleX: 1, duration: 1.3 }, 0.9)
            .fromTo(
              taglineSplit?.chars ?? [],
              { yPercent: 120, autoAlpha: 0, rotateX: -90 },
              { yPercent: 0, autoAlpha: 1, rotateX: 0, duration: 0.9, stagger: 0.035 },
              1.0,
            )
            // Counter 00 → 100 during the whole intro
            .to(
              count,
              {
                v: 100,
                duration: 2.2,
                ease: "power2.inOut",
                onUpdate: () => {
                  if (counter) counter.textContent = String(Math.round(count.v)).padStart(2, "0");
                },
              },
              0,
            )
            // Content lifts away…
            .to(q("[data-intro-inner]"), { yPercent: -18, autoAlpha: 0, duration: 0.7, ease: "power2.in" }, 2.35)
            // …then the whole screen wipes upward like a curtain
            .to(loader, { clipPath: "inset(0% 0% 100% 0%)", duration: 1.2, ease: "expo.inOut" }, 2.55)
            .add(() => {
              loader.style.display = "none";
              document.documentElement.style.overflow = "";
            });

          master.add(intro);

          // Header slides in from above as the curtain opens
          if (header) {
            master.fromTo(header, { yPercent: -100 }, { yPercent: 0, duration: 1.1, ease: "expo.out" }, 3.0);
            master.fromTo(navItems, { y: -24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.9, stagger: 0.07, ease: EASE }, 3.15);
          }
        } else if (loader) {
          loader.style.display = "none";
        }

        /* =========================================================
           2. HERO INTRO
        ========================================================= */
        const heroStart = loader && !seen ? 2.9 : 0;
        const hero = gsap.timeline({ defaults: { ease: EASE } });

        // Photo: opens from a rounded window and settles from slightly zoomed in
        hero.fromTo(
          q("[data-hero-art]"),
          { autoAlpha: 0, clipPath: "inset(18% 12% 18% 12% round 48px)", scale: 1.15, rotate: -2 },
          { autoAlpha: 1, clipPath: "inset(0% 0% 0% 0% round 0px)", scale: 1, rotate: 0, duration: 1.8, ease: "expo.out" },
          0,
        );

        hero
          .fromTo(q("[data-hero-eyebrow]"), { autoAlpha: 0, x: -20 }, { autoAlpha: 1, x: 0, duration: 0.9 }, 0.2)
          .fromTo(q("[data-hero-eyebrow-line]"), { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: "expo.out" }, 0.25);

        // Title: every letter flips up in 3D out of a blur, one after another
        const heroTitle = q("[data-hero-title]")[0] as HTMLElement | undefined;
        if (heroTitle) {
          gsap.set(heroTitle, { autoAlpha: 1 });
          SplitText.create(heroTitle, {
            type: "lines,words,chars",
            mask: "lines",
            autoSplit: true,
            onSplit: (self) =>
              gsap.fromTo(
                self.chars,
                { yPercent: 110, rotateX: -85, autoAlpha: 0, filter: "blur(8px)", transformOrigin: "50% 100% -20px" },
                {
                  yPercent: 0,
                  rotateX: 0,
                  autoAlpha: 1,
                  filter: "blur(0px)",
                  duration: 1.1,
                  ease: "expo.out",
                  stagger: { each: 0.022, from: "start" },
                  delay: heroStart + 0.35,
                },
              ),
          });
        }

        hero
          .fromTo(q("[data-hero-text]"), { autoAlpha: 0, y: 24, filter: "blur(6px)" }, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 1 }, 0.9)
          .fromTo(q("[data-hero-cta] > *"), { autoAlpha: 0, y: 28, scale: 0.9 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.9, stagger: 0.12, ease: "back.out(1.6)" }, 1.1)
          .fromTo(q("[data-hero-trust]"), { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.8 }, 1.35)
          .fromTo(q("[data-hero-scroll]"), { autoAlpha: 0, y: -10 }, { autoAlpha: 1, y: 0, duration: 0.8 }, 1.6);

        master.add(hero, heroStart);

        // Photo floats gently once it has arrived
        q("[data-float]").forEach((el) => {
          gsap.to(el, { y: -14, duration: 3.2, ease: "sine.inOut", repeat: -1, yoyo: true, delay: heroStart + 1.8 });
        });

        /* =========================================================
           3. FALLING PETALS
        ========================================================= */
        const petalBox = q("[data-petals]")[0] as HTMLElement | undefined;
        if (petalBox) {
          const width = () => petalBox.clientWidth;
          const height = () => petalBox.clientHeight;
          q("[data-petal]").forEach((petal) => {
            const duration = gsap.utils.random(10, 18);
            const tl = gsap.timeline({ repeat: -1, repeatRefresh: true, delay: heroStart + gsap.utils.random(0.5, 9) });
            tl.fromTo(
              petal,
              {
                x: () => gsap.utils.random(0, width()),
                y: -40,
                rotation: () => gsap.utils.random(0, 360),
                rotationY: () => gsap.utils.random(-60, 60),
                scale: () => gsap.utils.random(0.6, 1.15),
              },
              {
                y: () => height() + 40,
                x: () => `+=${gsap.utils.random(-160, 160)}`,
                rotation: () => `+=${gsap.utils.random(160, 520)}`,
                rotationY: () => `+=${gsap.utils.random(180, 540)}`,
                duration,
                ease: "none",
              },
              0,
            )
              .fromTo(petal, { autoAlpha: 0 }, { autoAlpha: () => gsap.utils.random(0.45, 0.85), duration: 1.5 }, 0)
              .to(petal, { autoAlpha: 0, duration: 1.5 }, duration - 1.5);
          });
        }

        /* =========================================================
           4. HEADER: hide when scrolling down, show when scrolling up
        ========================================================= */
        if (header) {
          const showHeader = gsap.quickTo(header, "yPercent", { duration: 0.45, ease: "power3.out" });
          ScrollTrigger.create({
            start: 0,
            end: "max",
            onUpdate: (self) => {
              if (document.documentElement.style.overflow === "hidden") return; // during intro
              showHeader(self.direction === 1 && self.scroll() > 260 ? -100 : 0);
            },
          });
        }

        /* =========================================================
           5. HERO SCROLL-OUT: text drifts up, photo shrinks away
        ========================================================= */
        const heroSection = q("[data-hero]")[0];
        if (heroSection) {
          gsap.to(q("[data-hero-copy]"), {
            yPercent: -25,
            autoAlpha: 0.15,
            ease: "none",
            scrollTrigger: { trigger: heroSection, start: "top top", end: "bottom top", scrub: true },
          });
          gsap.to(q("[data-hero-art-scroll]"), {
            scale: 0.88,
            yPercent: 12,
            ease: "none",
            scrollTrigger: { trigger: heroSection, start: "top top", end: "bottom top", scrub: true },
          });
        }

        /* =========================================================
           6. REST OF THE PAGE
        ========================================================= */
        q("[data-split]").forEach((el) => {
          SplitText.create(el, {
            type: "lines",
            mask: "lines",
            autoSplit: true,
            onSplit: (self) =>
              gsap.from(self.lines, {
                yPercent: 105,
                duration: 1,
                stagger: 0.1,
                ease: "expo.out",
                scrollTrigger: { trigger: el, start: "top 88%", once: true },
              }),
          });
        });

        q("[data-reveal]").forEach((el) => {
          gsap.from(el, { autoAlpha: 0, y: 40, duration: 1, ease: EASE, scrollTrigger: { trigger: el, start: "top 88%", once: true } });
        });

        q("[data-stagger]").forEach((group) => {
          const items = group.querySelectorAll("[data-stagger-item]");
          if (!items.length) return;
          gsap.from(items, {
            autoAlpha: 0,
            y: 50,
            duration: 0.9,
            stagger: 0.08,
            ease: EASE,
            scrollTrigger: { trigger: group, start: "top 90%", once: true },
          });
        });

        q("[data-parallax]").forEach((el) => {
          const amount = parseFloat(el.getAttribute("data-parallax") || "0.15");
          gsap.fromTo(
            el,
            { yPercent: -amount * 50 },
            { yPercent: amount * 50, ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true } },
          );
        });

        q("[data-line]").forEach((el) => {
          gsap.from(el, { scaleX: 0, transformOrigin: "left center", duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 92%", once: true } });
        });

        return () => {
          document.documentElement.style.overflow = "";
          if (header) gsap.set([header, ...navItems], { clearProps: "transform,opacity,visibility" });
        };
      });

      /* =========================================================
         7. MOUSE EFFECTS (desktop with a real mouse only)
      ========================================================= */
      mm.add("(prefers-reduced-motion: no-preference) and (pointer: fine)", () => {
        const q = gsap.utils.selector(root);
        const heroSection = q("[data-hero]")[0] as HTMLElement | undefined;
        const cleanups: Array<() => void> = [];

        // Depth: layers follow the mouse by different amounts
        if (heroSection) {
          const layers = q("[data-depth]").map((el) => ({
            depth: parseFloat(el.getAttribute("data-depth") || "0"),
            x: gsap.quickTo(el, "x", { duration: 1.2, ease: "power3.out" }),
            y: gsap.quickTo(el, "y", { duration: 1.2, ease: "power3.out" }),
          }));
          const onMove = (e: PointerEvent) => {
            const r = heroSection.getBoundingClientRect();
            const nx = (e.clientX - r.left) / r.width - 0.5; // -0.5 … 0.5
            const ny = (e.clientY - r.top) / r.height - 0.5;
            layers.forEach((l) => {
              l.x(nx * l.depth);
              l.y(ny * l.depth);
            });
          };
          const onLeave = () => layers.forEach((l) => (l.x(0), l.y(0)));
          heroSection.addEventListener("pointermove", onMove);
          heroSection.addEventListener("pointerleave", onLeave);
          cleanups.push(() => {
            heroSection.removeEventListener("pointermove", onMove);
            heroSection.removeEventListener("pointerleave", onLeave);
          });
        }

        // Magnetic buttons
        q("[data-magnetic]").forEach((btn) => {
          const x = gsap.quickTo(btn, "x", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
          const y = gsap.quickTo(btn, "y", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
          const onMove = (e: PointerEvent) => {
            const r = btn.getBoundingClientRect();
            x((e.clientX - (r.left + r.width / 2)) * 0.35);
            y((e.clientY - (r.top + r.height / 2)) * 0.45);
          };
          const onLeave = () => (x(0), y(0));
          btn.addEventListener("pointermove", onMove as EventListener);
          btn.addEventListener("pointerleave", onLeave);
          cleanups.push(() => {
            btn.removeEventListener("pointermove", onMove as EventListener);
            btn.removeEventListener("pointerleave", onLeave);
          });
        });

        return () => cleanups.forEach((fn) => fn());
      });

      // Reduced motion: show everything immediately
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(gsap.utils.toArray("[data-hero-hide]", root.current), { autoAlpha: 1 });
        const loader = root.current?.querySelector<HTMLElement>("[data-intro]");
        if (loader) loader.style.display = "none";
      });
    },
    { scope: root },
  );

  return <div ref={root}>{children}</div>;
}
