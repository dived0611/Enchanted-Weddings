import Link from "next/link";
import CategoryIcon from "@/components/icons/CategoryIcon";
import { categories } from "@/data/home";

export default function CategoryBar() {
  return (
    <section
      id="categories"
      aria-label="Catégories de prestataires"
      className="relative z-10 scroll-mt-20 border-y border-[rgba(161,148,141,0.25)] bg-white/50 backdrop-blur-sm"
    >
      <ul
        data-stagger
        className="no-scrollbar mx-auto flex max-w-[1280px] gap-3 overflow-x-auto px-6 py-4 lg:justify-center lg:gap-[18px] lg:px-0"
      >
        {categories.map((c) => (
          <li key={c.slug} data-stagger-item className="shrink-0">
            <Link
              href={`/offres?categorie=${c.slug}`}
              className="group flex h-[104px] w-[118px] flex-col items-center justify-center gap-1 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_12px_30px_-12px_rgba(195,147,124,0.45)]"
            >
              <span className="flex size-12 items-center justify-center rounded-full bg-brand/10 text-brand transition-all duration-300 group-hover:scale-110 group-hover:bg-brand group-hover:text-white">
                <CategoryIcon slug={c.slug} size={22} />
              </span>
              <span className="whitespace-nowrap text-[15px] font-medium text-[#9a9a9a] transition-colors group-hover:text-brand">
                {c.label}
              </span>
              <span className="font-jakarta text-[11px] font-medium text-[#8e8e8e]">{c.count}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
