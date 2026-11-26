"use client";

import { useState, type FormEvent } from "react";

const eventTypes = ["Mariage", "Fiançailles", "Anniversaire", "Baptême", "Gala / Corporate", "Séminaire", "Autre"];

type BookingCardProps = {
  vendorName: string;
  priceFrom: number;
  rating: number;
  reviewCount: number;
};

/**
 * Right-hand card: price + quote request form.
 * Stage 1: the form only shows a confirmation. Stage 2 will save the request
 * in the database and notify the vendor.
 */
export default function BookingCard({ vendorName, priceFrom, rating, reviewCount }: BookingCardProps) {
  const [sent, setSent] = useState<null | "devis" | "reservation">(null);
  const [error, setError] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const action = (e.nativeEvent as SubmitEvent).submitter?.getAttribute("value") as "devis" | "reservation";

    if (!form.get("type") || !form.get("date") || !form.get("guests")) {
      setError("Merci de remplir les 3 champs.");
      return;
    }
    setError("");
    setSent(action ?? "devis");
  }

  const inputClass =
    "h-[33px] w-full rounded-full border border-brand bg-[#fdf8f3] px-4 text-sm text-ink outline-none focus:ring-2 focus:ring-brand/30";

  return (
    <div className="flex flex-col gap-12">
      <div className="overflow-hidden rounded-[13px] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
        <div className="flex items-start justify-between border-b border-[#eee] px-[18px] pb-7 pt-6">
          <div>
            <p className="text-xs">À partir de</p>
            <p className="mt-2 font-garamond text-[36px] font-semibold leading-none">
              {priceFrom} <span className="font-montserrat text-sm font-medium text-brand">MAD</span>
            </p>
            <p className="mt-2 text-[11px]">TVA incluse</p>
          </div>
          <span className="mt-8 flex h-[33px] items-center gap-1 rounded-full bg-[#ead9cc] px-3 text-xs text-muted">
            <span className="text-brand">★</span>
            <b className="font-jakarta text-sm text-black">{rating}</b> {reviewCount} avis
          </span>
        </div>

        {sent ? (
          <div role="status" className="px-[18px] py-10 text-center">
            <p className="font-garamond text-2xl text-brand">Merci !</p>
            <p className="mt-2 text-sm text-muted-2">
              {sent === "devis"
                ? `Votre demande de devis a été envoyée à ${vendorName}. Vous recevrez une réponse sous 24 h.`
                : `Votre demande de réservation a été envoyée à ${vendorName}.`}
            </p>
            <button type="button" onClick={() => setSent(null)} className="mt-5 text-sm text-brand underline">
              Faire une nouvelle demande
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-[7px] px-[18px] pb-3 pt-6 text-[13px]">
            <label htmlFor="bk-type">Type d&apos;événement</label>
            <div className="relative">
              <select id="bk-type" name="type" defaultValue="" className={`${inputClass} appearance-none pr-10`}>
                <option value="" disabled>
                  Sélectionner…
                </option>
                {eventTypes.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
              <svg className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" aria-hidden="true">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </div>

            <label htmlFor="bk-date" className="mt-2">Date de l&apos;événement</label>
            <input id="bk-date" name="date" type="date" className={inputClass} />

            <label htmlFor="bk-guests" className="mt-2">Nombre d&apos;invités</label>
            <input id="bk-guests" name="guests" type="number" min={1} placeholder="56" className={inputClass} />

            {error && <p role="alert" className="text-xs text-red-600">{error}</p>}

            <button
              type="submit"
              value="devis"
              className="mt-4 flex h-[36px] items-center justify-center gap-2 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundImage: "linear-gradient(90deg, #9c6650 0%, #c3937c 100%)" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M7 3h7l5 5v13H7zM14 3v5h5M10 13h6M10 17h6" /></svg>
              Demander un devis gratuit
            </button>
            <button
              type="submit"
              value="reservation"
              className="flex h-[38px] items-center justify-center gap-2 rounded-full border border-brand bg-[#fdf8f3] text-sm text-brand transition-colors hover:bg-brand/10"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></svg>
              Réserver maintenant
            </button>
          </form>
        )}
      </div>

      <a
        href="#contact"
        className="flex h-[47px] items-center justify-center gap-3 rounded-full border border-brand bg-white text-[15px] font-medium text-muted-2 transition-colors hover:bg-brand/5"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M4 4h16v12H8l-4 4zM8 9h8M8 12h5" /></svg>
        Envoyer un message
      </a>
    </div>
  );
}
