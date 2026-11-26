import CategoryIcon from "@/components/icons/CategoryIcon";
import type { VendorSectionData } from "@/data/home";
import Carousel from "./Carousel";
import { SeeAllCard, VendorCard } from "./VendorCard";

/** One category block: icon + title + carousel of vendors. */
export default function VendorSection({ section }: { section: VendorSectionData }) {
  const href = `/offres?categorie=${section.slug}`;
  const headingId = `section-${section.slug}`;

  return (
    <section aria-labelledby={headingId} className="mx-auto max-w-[1280px] px-6 lg:px-[138px]">
      <div className="flex items-end gap-5 pb-2 pt-[60px]">
        <span data-reveal className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-white text-brand shadow-[0_10px_30px_-14px_rgba(195,147,124,0.6)] lg:size-[68px]">
          <CategoryIcon slug={section.slug} className="size-6 lg:size-[30px]" strokeWidth={1.25} />
        </span>
        <div className="flex flex-col gap-[9px]">
          <h2 id={headingId} data-split className="text-[26px] text-brand lg:text-[32px]">
            {section.title}
          </h2>
          <p data-reveal className="tracking-[1.92px] text-muted">
            {section.subtitle}
          </p>
        </div>
      </div>
      <div data-line aria-hidden="true" className="mt-5 h-px w-full bg-gradient-to-r from-brand/50 via-brand/15 to-transparent" />

      <Carousel label={section.title}>
        {section.vendors.map((v) => (
          <VendorCard key={v.id} vendor={v} />
        ))}
        <SeeAllCard href={href} label={section.title} />
      </Carousel>
    </section>
  );
}
