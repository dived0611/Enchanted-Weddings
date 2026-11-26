import Image from "next/image";
import { reviews } from "@/data/home";

export default function Testimonials() {
  return (
    <section aria-labelledby="reviews-title" className="mx-auto max-w-[1280px] px-6 pb-10">
      <div className="flex flex-col items-center gap-[19px] pt-14 text-center">
        <p data-reveal className="flex items-center justify-center gap-4 text-[20px] tracking-[3px] text-brand sm:text-[26px]">
          <span className="hidden h-px w-[90px] bg-gradient-to-r from-transparent to-brand sm:block sm:w-[130px]" aria-hidden="true" />
          SIMPLE &amp; RAPIDE
          <span className="hidden h-px w-[90px] bg-gradient-to-l from-transparent to-brand sm:block sm:w-[130px]" aria-hidden="true" />
        </p>
        <h2 id="reviews-title" data-split className="font-garamond text-[38px] lg:text-[52px]">
          Ce que disent nos clients
        </h2>
        <p data-reveal className="max-w-[873px] tracking-[1.92px] text-muted">
          Des milliers de familles et d&apos;entreprises satisfaites à travers le Maroc
        </p>
      </div>

      <ul
        data-stagger
        className="no-scrollbar mt-8 flex snap-x snap-mandatory gap-8 overflow-x-auto px-1 pb-10 pt-4 lg:justify-center lg:px-[60px]"
      >
        {reviews.slice(0, 3).map((r, i) => (
          <li
            key={r.name + r.event}
            data-stagger-item
            className={`relative flex min-h-[330px] w-[300px] shrink-0 snap-start flex-col gap-[11px] rounded-[22px] bg-white p-6 shadow-[0_18px_40px_-26px_rgba(120,80,60,0.4)] transition-[translate,box-shadow] duration-500 hover:-translate-y-2 hover:shadow-[0_28px_50px_-24px_rgba(120,80,60,0.45)] ${
              i === 1 ? "lg:-translate-y-4 lg:hover:-translate-y-6" : ""
            }`}
          >
            <Image src="/figma/icons/quote.svg" alt="" width={48} height={48} className="opacity-90" />
            <Image
              src={r.stars === 5 ? "/figma/icons/stars-5-gold.svg" : "/figma/icons/stars-4-gold.svg"}
              alt={`${r.stars} étoiles sur 5`}
              width={r.stars === 5 ? 95 : 75}
              height={14}
            />
            <blockquote className="text-[13px] leading-[1.55] text-ink">“{r.quote}”</blockquote>
            <p className="w-fit rounded-full bg-brand-soft px-3 py-1 text-[11.5px] text-brand">{r.event}</p>
            <hr className="mt-auto border-[#eee]" />
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Image src={r.avatar} alt="" width={42} height={42} className="size-[42px] rounded-full object-cover ring-2 ring-brand/20" />
                <div className="flex flex-col gap-[2px]">
                  <span className="text-[12px] font-medium">{r.name}</span>
                  <span className="text-[10px] text-muted">{r.role}</span>
                </div>
              </div>
              <span className="text-[10px] text-muted">{r.date}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
