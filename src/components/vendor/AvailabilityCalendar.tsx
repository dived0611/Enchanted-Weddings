"use client";

import { useState } from "react";
import type { DayStatus } from "@/data/vendors";

const weekdays = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

const pad = (n: number) => String(n).padStart(2, "0");

/** Month calendar showing which days are free, booked or pending. */
export default function AvailabilityCalendar({
  availability,
  startYear = 2026,
  startMonth = 5, // 0 = January → 5 = June (as in the Figma design)
}: {
  availability: Record<string, DayStatus>;
  startYear?: number;
  startMonth?: number;
}) {
  const [view, setView] = useState({ year: startYear, month: startMonth });

  const daysInMonth = new Date(view.year, view.month + 1, 0).getDate();
  // getDay(): 0 = Sunday. Convert so Monday is the first column.
  const offset = (new Date(view.year, view.month, 1).getDay() + 6) % 7;

  const go = (dir: 1 | -1) =>
    setView(({ year, month }) => {
      const m = month + dir;
      return { year: year + Math.floor(m / 12), month: ((m % 12) + 12) % 12 };
    });

  return (
    <section aria-labelledby="calendar-title" className="pt-6">
      <h2 id="calendar-title" className="px-4 text-xl font-medium">
        Disponibilités
      </h2>

      <div className="mt-5 rounded-[18px] border border-brand bg-white px-3 pb-5 pt-5 sm:px-5">
        <div className="flex items-center justify-between">
          <button type="button" onClick={() => go(-1)} aria-label="Mois précédent" className="flex size-[31px] items-center justify-center rounded-full border border-brand text-brand hover:bg-brand/10">
            ‹
          </button>
          <p className="text-sm font-medium" aria-live="polite">
            {months[view.month]} {view.year}
          </p>
          <button type="button" onClick={() => go(1)} aria-label="Mois suivant" className="flex size-[31px] items-center justify-center rounded-full border border-brand text-brand hover:bg-brand/10">
            ›
          </button>
        </div>

        <div className="mt-8 grid grid-cols-7 gap-[6px] text-center sm:gap-[10px]">
          {weekdays.map((d) => (
            <span key={d} className="pb-4 text-xs text-muted-2 sm:text-sm">
              {d}
            </span>
          ))}

          {Array.from({ length: offset }).map((_, i) => (
            <span key={`empty-${i}`} />
          ))}

          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const key = `${view.year}-${pad(view.month + 1)}-${pad(day)}`;
            const status = availability[key];
            const weekend = (offset + i) % 7 === 6; // Sunday column

            const style =
              status === "reserved"
                ? "bg-[#fbeaea] text-[#f08a8a] line-through"
                : status === "pending"
                  ? "bg-[#fffbe8] text-muted-2"
                  : weekend
                    ? "bg-[#f6f1ed] text-muted-2"
                    : "bg-white text-muted-2";

            const label = status === "reserved" ? "réservé" : status === "pending" ? "en attente" : "disponible";

            return (
              <span
                key={key}
                className={`flex aspect-square items-center justify-center rounded-md border border-brand text-xs sm:text-sm ${style}`}
                aria-label={`${day} ${months[view.month]} : ${label}`}
              >
                {day}
              </span>
            );
          })}
        </div>

        <hr className="mt-4 border-brand/60" />
        <ul className="mt-3 flex flex-wrap gap-5 px-3 text-sm">
          <li className="flex items-center gap-2"><span className="size-3 rounded-full border border-muted-2 bg-white" />Disponible</li>
          <li className="flex items-center gap-2"><span className="size-3 rounded-full border border-brand bg-[#fbeaea]" />Réservé</li>
          <li className="flex items-center gap-2"><span className="size-3 rounded-full bg-[#fff4c4]" />En attente</li>
        </ul>
      </div>
    </section>
  );
}
