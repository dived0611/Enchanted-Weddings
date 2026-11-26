"use client";

import Image from "next/image";
import { useState } from "react";
import type { VendorReview } from "@/data/vendors";
import Stars from "./Stars";

type Props = {
  rating: number;
  reviewCount: number;
  breakdown: [number, number, number, number, number];
  reviews: VendorReview[];
};

function ReviewCard({ r }: { r: VendorReview }) {
  const [expanded, setExpanded] = useState(false);
  const long = r.text.length > 220;

  return (
    <li className="rounded-[12px] border border-brand px-4 pb-4 pt-3">
      <div className="flex items-start gap-5">
        <Image src={r.avatar} alt="" width={57} height={57} className="size-[57px] shrink-0 rounded-full object-cover" />
        <div className="flex-1">
          <div className="flex items-start justify-between gap-3">
            <p className="font-garamond text-[17px] font-semibold">{r.name}</p>
            <p className="shrink-0 text-xs text-muted">{r.date}</p>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-4">
            <Stars value={r.stars} size={12} />
            <span className="rounded-md border border-brand/50 bg-brand/15 px-2 py-[3px] text-xs font-semibold text-brand">{r.event}</span>
          </div>
        </div>
      </div>
      <p className={`mt-5 text-[13px] text-muted ${expanded ? "" : "line-clamp-2"}`}>{r.text}</p>
      {long && (
        <button type="button" onClick={() => setExpanded((v) => !v)} className="mt-2 text-xs text-brand hover:underline" aria-expanded={expanded}>
          {expanded ? "Réduire" : "Lire la suite"}
        </button>
      )}
    </li>
  );
}

export default function VendorReviews({ rating, reviewCount, breakdown, reviews }: Props) {
  const [showAll, setShowAll] = useState(false);
  const max = Math.max(...breakdown, 1);
  const visible = showAll ? reviews : reviews.slice(0, 3);

  return (
    <section aria-labelledby="reviews-title" className="pt-20">
      <h2 id="reviews-title" className="px-5 text-[28px] font-medium">
        Avis clients
      </h2>

      <div className="mt-10 flex flex-col gap-6 rounded-[14px] bg-[#ead9cc] px-10 py-5 sm:flex-row sm:items-center sm:gap-10">
        <div className="flex flex-col items-center">
          <span className="font-garamond text-[48px] font-semibold leading-none">{rating}</span>
          <Stars value={rating} size={22} className="mt-2 gap-[10px]" />
          <span className="mt-3 font-jakarta text-[20px] text-muted">{reviewCount} avis vérifiés</span>
        </div>
        <ul className="flex flex-1 flex-col gap-[5px]" aria-label="Répartition des notes">
          {breakdown.map((count, i) => {
            const star = 5 - i;
            return (
              <li key={star} className="flex items-center gap-3 text-[10px]">
                <span className="w-6 shrink-0">
                  {star} <span className="text-brand">★</span>
                </span>
                <span className="h-[5px] flex-1 overflow-hidden rounded-full bg-[#e3cfc1]">
                  <span className="block h-full rounded-full bg-brand" style={{ width: `${(count / max) * 82}%` }} />
                </span>
                <span className="w-7 shrink-0 text-right text-muted">{count}</span>
              </li>
            );
          })}
        </ul>
      </div>

      <ul className="mt-9 flex flex-col gap-[10px]">
        {visible.map((r) => (
          <ReviewCard key={r.name + r.event} r={r} />
        ))}
      </ul>

      {reviews.length > 3 && (
        <button
          type="button"
          onClick={() => setShowAll((v) => !v)}
          aria-expanded={showAll}
          className="mt-[10px] flex h-[42px] w-full items-center justify-center gap-4 rounded-[12px] border border-brand text-sm text-muted transition-colors hover:bg-white"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" className={showAll ? "rotate-180" : ""} aria-hidden="true">
            <path d="M6 9l6 6 6-6" />
          </svg>
          {showAll ? "Voir moins d'avis" : `Voir les ${reviewCount} avis`}
        </button>
      )}
    </section>
  );
}
