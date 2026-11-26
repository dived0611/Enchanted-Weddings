"use client";

import { useEffect, useRef, useState } from "react";
import { CalendarCheck, MapPin, ThumbsUp, Users } from "lucide-react";
import { stats } from "@/data/home";

const statIcons = { users: Users, calendar: CalendarCheck, like: ThumbsUp, map: MapPin };

function StatIcon({ name }: { name: keyof typeof statIcons }) {
  const Icon = statIcons[name];
  return <Icon aria-hidden="true" size={22} strokeWidth={1.4} />;
}

/** Number that counts up from 0 when it scrolls into view (like the Figma "numbers animation"). */
function CountUp({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        if (reduceMotion) {
          setValue(to);
          return;
        }
        const duration = 1600;
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - t, 3); // ease-out
          setValue(Math.round(to * eased));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [to]);

  // French-style thousands separator with a dot, as in the design ("12.000")
  const formatted = value.toLocaleString("de-DE");

  return (
    <span ref={ref} className="lining-nums tabular-nums">
      {formatted}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section aria-label="Enchanted Weddings en chiffres" className="mx-auto max-w-[1280px] px-6 py-[55px] lg:px-[72px]">
      <ul
        data-stagger
        className="grid grid-cols-1 gap-2 rounded-[28px] bg-white px-4 py-6 shadow-[0_20px_50px_-30px_rgba(120,80,60,0.35)] sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-brand/15 lg:py-8"
      >
        {stats.map((s) => (
          <li key={s.label} data-stagger-item className="flex flex-col items-center gap-[10px] px-4 py-[14px] text-center">
            <span className="flex size-[52px] items-center justify-center rounded-full bg-gradient-to-br from-brand/25 to-brand/5 text-brand">
              <StatIcon name={s.icon} />
            </span>
            <span className="font-garamond text-[40px] font-semibold leading-none text-brand lining-nums">
              <CountUp to={s.value} suffix={s.suffix} />
            </span>
            <span className="font-jakarta">{s.label}</span>
            <span className="font-jakarta text-sm text-[#868686]">{s.sub}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
