"use client";

import { useState } from "react";
import type { Package } from "@/data/vendors";

function Check({ ok, dark }: { ok: boolean; dark: boolean }) {
  return ok ? (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c3937c" strokeWidth="2" aria-hidden="true"><path d="M4 12l5 5L20 6" /></svg>
  ) : (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={dark ? "#888" : "#9a9a9a"} strokeWidth="2" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
  );
}

/** "Formules & Tarifs": three packages, the popular one is dark. */
export default function Packages({ packages }: { packages: Package[] }) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section aria-labelledby="packages-title" className="pt-16">
      <div className="flex items-center justify-between px-5">
        <h2 id="packages-title" className="text-[28px] font-medium">
          Formules &amp; Tarifs
        </h2>
        <span className="text-sm">· TVA incluse</span>
      </div>

      <ul className="mt-12 grid gap-5 md:grid-cols-3 md:gap-[10px] md:px-[10px]">
        {packages.map((p) => {
          const dark = !!p.popular;
          const isSelected = selected === p.id;
          return (
            <li
              key={p.id}
              className={`relative flex flex-col rounded-[18px] px-4 pb-6 pt-3 transition-shadow ${
                dark ? "bg-black text-white md:mt-[5px] md:px-[17px]" : "border border-brand bg-white"
              } ${isSelected ? "ring-4 ring-brand/40" : ""}`}
            >
              {p.popular && (
                <span className="absolute -top-[11px] left-1/2 flex h-[23px] -translate-x-1/2 items-center gap-1 whitespace-nowrap rounded-full bg-[#b07c66] px-2 text-[13px] font-medium text-white">
                  ⭐ Plus Populaire
                </span>
              )}
              <h3 className="text-[32px] font-medium leading-tight">{p.name}</h3>
              <p className="text-sm">{p.tagline}</p>
              <p className="mt-3">
                <span className="font-garamond text-[34px] font-semibold leading-none">{p.price}</span>
                <span className="text-sm">MAD/pers.</span>
              </p>
              <p className="text-sm">{p.guests}</p>

              <ul className="mb-6 mt-5 flex flex-1 flex-col gap-[5px] text-[11px]">
                {p.features.map((f) => (
                  <li key={f.label} className="flex items-center gap-2">
                    <Check ok={f.included} dark={dark} />
                    <span className={f.included ? "" : `line-through ${dark ? "text-[#888]" : "text-[#9a9a9a]"}`}>
                      {f.label}
                      {!f.included && <span className="sr-only"> (non inclus)</span>}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                aria-pressed={isSelected}
                onClick={() => setSelected(isSelected ? null : p.id)}
                className={`flex h-[37px] w-full items-center justify-center rounded-full text-sm transition-colors ${
                  dark
                    ? "font-semibold text-white hover:opacity-90"
                    : "border border-brand text-brand hover:bg-brand/10"
                } ${isSelected && !dark ? "bg-brand text-white hover:bg-brand" : ""}`}
                style={dark ? { backgroundImage: "linear-gradient(90deg, #9c6650 0%, #c3937c 100%)" } : undefined}
              >
                {isSelected ? "Sélectionnée ✓" : "Sélectionner"}
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
