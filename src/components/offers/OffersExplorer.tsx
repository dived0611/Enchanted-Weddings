"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowUpDown, ChevronDown, ChevronLeft, ChevronRight, Filter, LayoutGrid, List, MapPin, Search, SlidersHorizontal, Star, X } from "lucide-react";
import { FeaturedCard } from "@/components/home/FeaturedVendors";
import FavoriteButton from "@/components/home/FavoriteButton";
import { categoryLabels, cities, eventTypes, offers, serviceOptions, type Offer } from "@/data/offers";

const PAGE_SIZE = 6;
const BUDGET_MIN = 500;
const BUDGET_MAX = 5000;

type Filters = {
  category: Offer["category"] | "";
  city: string;
  eventType: string;
  budget: [number, number];
  minRating: number | null;
  services: string[];
};

const emptyFilters: Filters = {
  category: "",
  city: "",
  eventType: "",
  budget: [BUDGET_MIN, BUDGET_MAX],
  minRating: null,
  services: [],
};

type Sort = "pertinence" | "prix-asc" | "prix-desc" | "note";

const sortLabels: Record<Sort, string> = {
  pertinence: "Pertinence",
  "prix-asc": "Prix croissant",
  "prix-desc": "Prix décroissant",
  note: "Meilleure note",
};

/* ------------------------------------------------------------------ */

function SelectField({ id, label, value, onChange, options, placeholder }: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: (string | { value: string; label: string })[];
  placeholder: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-3 block uppercase tracking-[2px]">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-[33px] w-full appearance-none rounded-full border border-brand bg-[#fdf8f3] px-4 pr-10 text-sm text-ink outline-none focus:ring-2 focus:ring-brand/30"
        >
          <option value="">{placeholder}</option>
          {options.map((o) => {
            const opt = typeof o === "string" ? { value: o, label: o } : o;
            return (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            );
          })}
        </select>
        <ChevronDown aria-hidden="true" size={18} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted" />
      </div>
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`flex h-[25px] items-center gap-1 rounded-full border px-[10px] text-[13px] transition-colors ${
        active ? "border-brand bg-brand text-white" : "border-brand text-[#9a9a9a] hover:text-brand"
      }`}
    >
      {children}
    </button>
  );
}

function BudgetSlider({ value, onChange }: { value: [number, number]; onChange: (v: [number, number]) => void }) {
  const [lo, hi] = value;
  const pct = (n: number) => ((n - BUDGET_MIN) / (BUDGET_MAX - BUDGET_MIN)) * 100;
  return (
    <div>
      <p className="mb-3 tracking-[2px]">Budget (MAD/pers.)</p>
      <div className="flex justify-between px-2 text-[15px] tracking-[2px] text-muted-2">
        <span>{lo}MAD</span>
        <span>{hi}MAD</span>
      </div>
      <div className="dual-range relative mt-3 h-[22px]">
        <div className="absolute left-0 right-0 top-1/2 h-2 -translate-y-1/2 rounded-full bg-brand/20" />
        <div
          className="absolute top-1/2 h-2 -translate-y-1/2 rounded-full bg-brand"
          style={{ left: `${pct(lo)}%`, right: `${100 - pct(hi)}%` }}
        />
        <input
          type="range"
          min={BUDGET_MIN}
          max={BUDGET_MAX}
          step={50}
          value={lo}
          aria-label="Budget minimum"
          onChange={(e) => onChange([Math.min(Number(e.target.value), hi - 50), hi])}
        />
        <input
          type="range"
          min={BUDGET_MIN}
          max={BUDGET_MAX}
          step={50}
          value={hi}
          aria-label="Budget maximum"
          onChange={(e) => onChange([lo, Math.max(Number(e.target.value), lo + 50)])}
        />
      </div>
    </div>
  );
}

/** Horizontal card for the list view. */
function OfferRow({ o }: { o: Offer }) {
  return (
    <Link
      href={`/prestataires/${o.id}`}
      className="group flex flex-col overflow-hidden rounded-[20px] bg-white shadow-[0_2px_12px_-4px_rgba(0,0,0,0.07)] transition-[translate,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_rgba(120,80,60,0.38)] sm:h-[190px] sm:flex-row"
    >
      <div className="relative h-[170px] shrink-0 overflow-hidden sm:h-full sm:w-[260px]">
        <Image src={o.image} alt={o.name} fill sizes="260px" className="object-cover transition-transform duration-700 group-hover:scale-110" />
        <span className="absolute right-3 top-3">
          <FavoriteButton name={o.name} />
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-jakarta text-lg font-light">{o.name}</p>
            <p className="flex items-center gap-1 text-[13px] text-[#a6a6a6]">
              <MapPin size={14} strokeWidth={1.5} aria-hidden="true" /> {o.city} · {categoryLabels[o.category]}
            </p>
          </div>
          <span className="flex items-center gap-1 text-sm">
            <Star size={15} className="fill-[#e4b109] text-[#e4b109]" aria-hidden="true" />
            {o.rating} <span className="font-gruppo text-xs">({o.reviews})</span>
          </span>
        </div>
        <p className="line-clamp-2 font-jakarta text-[13px] font-light text-ink">{o.description}</p>
        <div className="mt-auto flex items-end justify-between">
          <p className="font-jakarta text-[13px] text-[#3a3a3a]">
            À partir de <span className="text-[17px] text-brand">{o.pricePerPers}</span> MAD/pers.
          </p>
          <span className="rounded-3xl bg-gradient-to-r from-[#c3937c] to-[#e0b49d] px-4 py-2 font-jakarta text-[13px] text-white">Voir profil</span>
        </div>
      </div>
    </Link>
  );
}

/* ------------------------------------------------------------------ */

export default function OffersExplorer({ initialCategory }: { initialCategory: Filters["category"] }) {
  const start: Filters = { ...emptyFilters, category: initialCategory };
  const [draft, setDraft] = useState<Filters>(start); // what the sidebar shows
  const [applied, setApplied] = useState<Filters>(start); // what the results use
  const [sort, setSort] = useState<Sort>("pertinence");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false); // mobile panel

  const results = useMemo(() => {
    const list = offers.filter((o) => {
      if (applied.category && o.category !== applied.category) return false;
      if (applied.city && o.city !== applied.city) return false;
      if (applied.eventType && !o.eventTypes.includes(applied.eventType)) return false;
      if (o.pricePerPers < applied.budget[0] || o.pricePerPers > applied.budget[1]) return false;
      if (applied.minRating && o.rating < applied.minRating) return false;
      if (applied.services.length && !applied.services.every((s) => o.services.includes(s))) return false;
      return true;
    });
    if (sort === "prix-asc") list.sort((a, b) => a.pricePerPers - b.pricePerPers);
    if (sort === "prix-desc") list.sort((a, b) => b.pricePerPers - a.pricePerPers);
    if (sort === "note") list.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
    return list;
  }, [applied, sort]);

  const pageCount = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const visible = results.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  function goToPage(n: number) {
    setPage(n);
    document.getElementById("offers-results")?.scrollIntoView({ behavior: "smooth" });
  }

  function apply(next: Filters) {
    setApplied(next);
    setDraft(next);
    setPage(1);
  }

  // Chips above the results, one per active filter (click × to remove)
  const activeChips: { label: string; remove: () => void }[] = [];
  if (applied.city) activeChips.push({ label: applied.city, remove: () => apply({ ...applied, city: "" }) });
  if (applied.category) activeChips.push({ label: categoryLabels[applied.category], remove: () => apply({ ...applied, category: "" }) });
  if (applied.eventType) activeChips.push({ label: applied.eventType, remove: () => apply({ ...applied, eventType: "" }) });
  if (applied.minRating) activeChips.push({ label: `${applied.minRating}+ ★`, remove: () => apply({ ...applied, minRating: null }) });
  if (applied.budget[0] !== BUDGET_MIN || applied.budget[1] !== BUDGET_MAX)
    activeChips.push({ label: `${applied.budget[0]}–${applied.budget[1]} MAD`, remove: () => apply({ ...applied, budget: [BUDGET_MIN, BUDGET_MAX] }) });
  applied.services.forEach((s) =>
    activeChips.push({ label: s, remove: () => apply({ ...applied, services: applied.services.filter((x) => x !== s) }) }),
  );

  return (
    <div className="mx-auto max-w-[1280px] px-6 pb-24 pt-12 lg:px-[88px]">
      {/* Title */}
      <p className="flex items-center gap-3 font-semibold tracking-[2px] text-muted-2">
        <MapPin size={20} strokeWidth={1.4} className="text-brand" aria-hidden="true" />
        Maroc · France
      </p>
      <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
        <div>
          <h1 className="font-garamond text-[44px] leading-tight lg:text-[64px]">Trouver des prestataires</h1>
          <p className="mt-3 tracking-[2px] text-muted-2">
            <span className="text-2xl font-semibold text-black">320+</span> traiteurs et prestataires vérifiés disponibles
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowFilters((v) => !v)}
          aria-expanded={showFilters}
          aria-controls="offers-filters"
          className="flex h-[34px] items-center gap-3 rounded-full border border-brand bg-brand-soft px-5 font-semibold tracking-[2px] text-brand lg:mr-6"
        >
          <SlidersHorizontal size={18} strokeWidth={1.6} aria-hidden="true" />
          Filtres actifs
          {activeChips.length > 0 && (
            <span className="flex size-5 items-center justify-center rounded-full bg-brand text-xs text-white">{activeChips.length}</span>
          )}
        </button>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-[291px_1fr] lg:gap-3">
        {/* ---------- Sidebar filters ---------- */}
        <aside
          id="offers-filters"
          aria-label="Filtres"
          className={`${showFilters ? "block" : "hidden"} h-fit rounded-2xl bg-white px-[10px] pb-3 pt-4 lg:block`}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              apply(draft);
              setShowFilters(false);
            }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center justify-between">
              <p className="flex items-center gap-4 text-[17px] tracking-[2px]">
                <Filter size={22} strokeWidth={1.2} className="text-brand" aria-hidden="true" /> Filter
              </p>
              <button type="button" onClick={() => apply(emptyFilters)} className="text-sm tracking-[2px] text-muted-2 hover:text-brand">
                Réinitialiser
              </button>
            </div>

            <SelectField id="f-city" label="Ville" value={draft.city} onChange={(city) => setDraft({ ...draft, city })} options={cities} placeholder="Sélectionner la ville…" />
            <SelectField
              id="f-category"
              label="Catégorie"
              value={draft.category}
              onChange={(c) => setDraft({ ...draft, category: c as Filters["category"] })}
              options={Object.entries(categoryLabels).map(([value, label]) => ({ value, label }))}
              placeholder="Toutes les catégories"
            />
            <SelectField id="f-event" label="Type d'événement" value={draft.eventType} onChange={(eventType) => setDraft({ ...draft, eventType })} options={eventTypes} placeholder="Sélectionner…" />
            <BudgetSlider value={draft.budget} onChange={(budget) => setDraft({ ...draft, budget })} />

            <div>
              <p className="mb-3 tracking-[2px]">Note minimale</p>
              <div className="flex gap-3">
                {[5, 4, 3].map((n) => (
                  <Chip key={n} active={draft.minRating === n} onClick={() => setDraft({ ...draft, minRating: draft.minRating === n ? null : n })}>
                    <Star size={12} className="fill-current" aria-hidden="true" /> {n}+
                  </Chip>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-3 tracking-[2px]">Services inclus</p>
              <div className="flex flex-wrap gap-x-3 gap-y-3">
                {serviceOptions.map((s) => (
                  <Chip
                    key={s}
                    active={draft.services.includes(s)}
                    onClick={() =>
                      setDraft({
                        ...draft,
                        services: draft.services.includes(s) ? draft.services.filter((x) => x !== s) : [...draft.services, s],
                      })
                    }
                  >
                    {s}
                  </Chip>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="flex h-[37px] items-center justify-center gap-2 rounded-full font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundImage: "linear-gradient(90deg, #9c6650 0%, #b77a62 100%)" }}
            >
              <Search size={18} strokeWidth={2} aria-hidden="true" /> Appliquer les filtres
            </button>
          </form>
        </aside>

        {/* ---------- Results ---------- */}
        <section id="offers-results" aria-label="Résultats" className="scroll-mt-24">
          <div className="flex flex-wrap items-center justify-between gap-4 px-2">
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <p aria-live="polite">
                <span className="mr-3">{results.length}</span>résultats trouvés
              </p>
              {activeChips.map((c) => (
                <button
                  key={c.label}
                  type="button"
                  onClick={c.remove}
                  aria-label={`Retirer le filtre ${c.label}`}
                  className="flex h-[25px] items-center gap-1 rounded-full border border-brand px-3 text-[13px] text-brand hover:bg-brand/10"
                >
                  {c.label} <X size={12} aria-hidden="true" />
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <ArrowUpDown size={16} className="text-[#9a9a9a]" aria-hidden="true" />
              <div className="relative">
                <select
                  aria-label="Trier par"
                  value={sort}
                  onChange={(e) => setSort(e.target.value as Sort)}
                  className="h-[30px] appearance-none rounded-full border border-brand bg-white pl-4 pr-9 text-[15px] outline-none focus:ring-2 focus:ring-brand/30"
                >
                  {Object.entries(sortLabels).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
                <ChevronDown size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" aria-hidden="true" />
              </div>
              <div className="flex overflow-hidden rounded-full border border-brand" role="group" aria-label="Affichage">
                <button type="button" aria-pressed={view === "grid"} aria-label="Grille" onClick={() => setView("grid")} className={`flex h-[28px] w-[42px] items-center justify-center ${view === "grid" ? "bg-brand text-white" : "text-brand"}`}>
                  <LayoutGrid size={16} strokeWidth={1.6} />
                </button>
                <button type="button" aria-pressed={view === "list"} aria-label="Liste" onClick={() => setView("list")} className={`flex h-[28px] w-[42px] items-center justify-center ${view === "list" ? "bg-brand text-white" : "text-brand"}`}>
                  <List size={16} strokeWidth={1.6} />
                </button>
              </div>
            </div>
          </div>

          {visible.length === 0 ? (
            <div className="mt-10 rounded-2xl bg-white px-6 py-16 text-center">
              <p className="font-garamond text-3xl">Aucun prestataire trouvé</p>
              <p className="mt-2 text-muted-2">Essayez d&apos;élargir votre budget ou de retirer un filtre.</p>
              <button type="button" onClick={() => apply(emptyFilters)} className="mt-6 rounded-full border border-brand px-6 py-2 text-brand hover:bg-brand hover:text-white">
                Réinitialiser les filtres
              </button>
            </div>
          ) : view === "grid" ? (
            <ul className="mt-6 grid gap-x-3 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">
              {visible.map((o) => (
                <li key={o.id}>
                  <FeaturedCard v={o} className="w-full" />
                </li>
              ))}
            </ul>
          ) : (
            <ul className="mt-6 flex flex-col gap-4">
              {visible.map((o) => (
                <li key={o.id}>
                  <OfferRow o={o} />
                </li>
              ))}
            </ul>
          )}

          {/* Pagination */}
          {pageCount > 1 && (
            <nav aria-label="Pagination" className="mt-14 flex items-center justify-center gap-3">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => goToPage(currentPage - 1)}
                aria-label="Page précédente"
                className="flex size-[31px] items-center justify-center rounded-full border border-brand disabled:opacity-30"
              >
                <ChevronLeft size={16} />
              </button>
              {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => goToPage(n)}
                  aria-current={n === currentPage ? "page" : undefined}
                  className={`flex size-[31px] items-center justify-center rounded-full border border-brand text-sm ${
                    n === currentPage ? "bg-brand text-white shadow-[0_6px_14px_-6px_rgba(195,147,124,0.9)]" : "hover:bg-brand/10"
                  }`}
                >
                  {n}
                </button>
              ))}
              <button
                type="button"
                disabled={currentPage === pageCount}
                onClick={() => goToPage(currentPage + 1)}
                aria-label="Page suivante"
                className="flex size-[31px] items-center justify-center rounded-full border border-brand disabled:opacity-30"
              >
                <ChevronRight size={16} />
              </button>
            </nav>
          )}
        </section>
      </div>
    </div>
  );
}
