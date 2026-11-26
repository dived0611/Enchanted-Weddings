import Image from "next/image";
import { ClipboardList, Lock, Search, ShieldCheck, type LucideIcon } from "lucide-react";

/*
  "Comment ça marche" — 3 steps with alternating image / text.
  NOTE: this section's exact assets could not be fetched (Figma free-plan limit),
  so the step photos below are placeholders taken from the other sections and the
  step icons come from Lucide. Replace the photos once exported from Figma.
*/

const icons: Record<string, LucideIcon> = {
  search: Search,
  plan: ClipboardList,
  shield: ShieldCheck,
};

const steps = [
  {
    number: "01",
    step: "Étape 01",
    title: "Trouvez les meilleurs prestataires",
    text: "Parcourez des profils complets avec photos, vidéos, avis et prestations pour choisir les professionnels qui correspondent à votre vision.",
    image: "/figma/featured/prestige-events.png",
    icon: "search",
  },
  {
    number: "02",
    step: "Étape 02",
    title: "Planifier",
    text: "Organisez votre mariage simplement avec notre Wedding Planner : budget, invités, plan de table, rappels… gardez le contrôle à chaque étape.",
    image: "/figma/featured/saveurs-maroc.png",
    icon: "plan",
  },
  {
    number: "03",
    step: "Étape 03",
    title: "Choisir",
    text: "Des recommandations adaptées à votre projet. Recevez des suggestions de prestataires en fonction de votre budget, de votre date, du lieu de votre mariage et de vos besoins.",
    image: "/figma/vendors/traiteur-1.png",
    icon: "shield",
    note: "Système d'escrow — votre paiement est libéré uniquement après la réussite de l'événement.",
  },
];

export default function HowItWorks() {
  return (
    <section aria-labelledby="how-title" className="mx-auto max-w-[1280px] px-6 lg:px-[138px]">
      <div className="flex flex-col items-center gap-[19px] pb-4 pt-[89px] text-center">
        <span data-reveal className="flex h-[33px] w-[210px] items-center justify-center gap-[5px] rounded-full bg-brand-soft text-[10.8px] font-semibold tracking-[1.3px] text-brand">
          <Image src="/figma/icons/stars-badge.svg" alt="" width={21} height={21} />
          Comment ça marche
        </span>
        <h2 id="how-title" data-split className="font-garamond text-[38px] lg:text-[52px]">
          Le mariage commence ici
        </h2>
        <p data-reveal className="max-w-[873px] tracking-[1.92px] text-muted">
          De la recherche à la confirmation, <span className="text-brand">Enchanted Weddings</span> simplifie chaque
          étape de l&apos;organisation de votre événement.
        </p>
      </div>

      <ol className="flex flex-col gap-20 py-14 lg:gap-28">
        {steps.map((s, i) => {
          const reversed = i % 2 === 1;
          return (
            <li
              key={s.step}
              className={`flex flex-col items-center gap-10 lg:gap-[80px] ${reversed ? "lg:flex-row-reverse" : "lg:flex-row"}`}
            >
              {/* Image with an offset rose frame + parallax inside */}
              <div data-reveal className="relative w-full lg:w-[480px]">
                <div
                  aria-hidden="true"
                  className={`absolute -bottom-4 h-full w-full rounded-[24px] border border-brand/50 ${reversed ? "-left-4" : "-right-4"}`}
                />
                <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] shadow-[0_30px_60px_-30px_rgba(80,50,35,0.5)]">
                  <div data-parallax="0.18" className="absolute -inset-y-[12%] inset-x-0">
                    <Image src={s.image} alt="" fill sizes="(min-width: 1024px) 480px, 100vw" className="object-cover" />
                  </div>
                </div>
              </div>

              <div data-reveal className="relative flex max-w-[430px] flex-col gap-2">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-16 right-0 select-none font-garamond text-[140px] lining-nums leading-none text-brand/10 lg:-right-6"
                >
                  {s.number}
                </span>
                <span className="mb-3 flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#c3937c] to-[#9c6650] text-white shadow-[0_10px_24px_-10px_rgba(156,102,80,0.9)]">
                  {(() => {
                    const Icon = icons[s.icon];
                    return <Icon aria-hidden="true" size={22} strokeWidth={1.6} />;
                  })()}
                </span>
                <p className="text-sm uppercase tracking-[2px] text-brand">{s.step}</p>
                <h3 className={`text-[28px] font-semibold leading-tight text-brand lg:text-[32px] ${i > 0 ? "uppercase" : ""}`}>{s.title}</h3>
                <p className="text-[15px] leading-relaxed tracking-[0.5px] text-muted-2">{s.text}</p>
                {s.note && (
                  <p className="mt-4 flex items-center gap-3 rounded-2xl border border-brand/20 bg-[#f3e6dc] px-4 py-3 text-xs text-ink">
                    <Lock aria-hidden="true" size={18} strokeWidth={1.8} className="shrink-0 text-brand" />
                    {s.note}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
