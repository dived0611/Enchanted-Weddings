import Image from "next/image";
import Link from "next/link";
import { featuredVendors, type FeaturedVendor } from "@/data/home";
import Carousel from "./Carousel";
import FavoriteButton from "./FavoriteButton";

const pinkGradient = "linear-gradient(90deg, #c3937c 12%, #ffc7ad 170%)";
const greenGradient = "linear-gradient(92deg, #18a25e 0%, #0d683b 131%)";

/** Vendor card — used in the home carousel and on the /offres page. */
export function FeaturedCard({
  v,
  className = "w-[300px] shrink-0 snap-start sm:w-[336px]",
}: {
  v: FeaturedVendor;
  /** Width / layout classes (the carousel uses a fixed width, the grid uses full width) */
  className?: string;
}) {
  return (
    <Link
      href={`/prestataires/${v.id}`}
      data-stagger-item
      className={`group flex h-[454px] flex-col overflow-hidden rounded-[20px] bg-white shadow-[0_2px_12px_-4px_rgba(0,0,0,0.07)] transition-[translate,box-shadow] duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_26px_45px_-20px_rgba(120,80,60,0.38)] ${className}`}
    >
      <div className="relative h-[169px] w-full shrink-0 overflow-hidden">
        <Image src={v.image} alt={v.name} fill sizes="336px" className="object-cover transition-transform duration-700 ease-out group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20" aria-hidden="true" />
        <span
          className="absolute left-2 top-[6px] flex h-[22px] items-center gap-[3px] rounded-full pl-[3px] pr-2 font-jakarta text-[10.5px] text-white"
          style={{ backgroundImage: greenGradient }}
        >
          <Image src="/figma/icons/smiley.svg" alt="" width={15} height={15} />
          Recommandé
        </span>
        <span className="absolute right-[10px] top-[10px]">
          <FavoriteButton name={v.name} />
        </span>
        <Image
          src={v.logo}
          alt=""
          width={38}
          height={38}
          className="absolute bottom-[7px] left-[11px] size-[38px] rounded-full border-2 border-white object-cover shadow-md"
        />
      </div>

      <div className="flex items-center justify-between px-[17px] pt-5">
        <div>
          <p className="font-jakarta text-[15.8px] font-light">{v.name}</p>
          <p className="flex items-center gap-[3px] font-jakarta text-[13.2px] font-light text-[#a6a6a6]">
            <Image src="/figma/icons/marker-lg.svg" alt="" width={15} height={15} />
            {v.city}
          </p>
        </div>
        <span
          className="flex h-[21px] items-center gap-1 rounded-full pl-[7px] pr-2 font-jakarta text-[13.2px] text-white"
          style={{ backgroundImage: pinkGradient }}
        >
          <Image src="/figma/icons/user-check-white.svg" alt="" width={12} height={12} />
          Vérifié
        </span>
      </div>

      <div className="flex flex-col gap-1 px-4 pt-5">
        <div className="flex items-center gap-[2.4px]" aria-label={`Note ${v.rating} sur 5, ${v.reviews} avis`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Image key={i} src="/figma/icons/star.svg" alt="" width={17} height={16} />
          ))}
          <span className="ml-1 font-jakarta text-sm font-light">{v.rating}</span>
          <span className="font-gruppo text-xs">({v.reviews})</span>
        </div>
        <p className="line-clamp-2 font-jakarta text-[13.2px] font-light text-ink">{v.description}</p>
        <div className="flex gap-1 py-1">
          {v.tags.map((t) => (
            <span
              key={t}
              className="flex h-[23px] items-center rounded-full border border-brand bg-brand/15 px-[5px] font-jakarta text-[11.9px] font-medium text-brand"
            >
              {t}
            </span>
          ))}
        </div>
        <hr className="w-[242px] border-[#d9d9d9]" />
      </div>

      <div className="mt-auto flex items-center justify-between px-4 pb-5 pr-[10px]">
        <div className="flex flex-col gap-[7px] font-jakarta text-[11.9px] text-[#3a3a3a]">
          <span className="flex items-center gap-[5px]">
            <Image src="/figma/icons/users.svg" alt="" width={15} height={15} />
            {v.guests}
          </span>
          <span>
            À partir de <span className="text-[15px] text-brand">{v.priceFrom}</span> MAD
          </span>
        </div>
        <span
          className="flex h-[33px] w-[96px] items-center justify-center rounded-3xl font-jakarta text-[13px] text-white shadow-[0_8px_18px_-8px_rgba(195,147,124,0.9)] transition-transform duration-300 group-hover:scale-105"
          style={{ backgroundImage: pinkGradient }}
        >
          Voir profil
        </span>
      </div>
    </Link>
  );
}

export default function FeaturedVendors() {
  return (
    <section aria-labelledby="featured-title" className="mx-auto max-w-[1280px] px-6 lg:px-[138px]">
      <div className="flex flex-col gap-[19px] pt-[89px]">
        <span data-reveal className="flex h-[34px] w-[213px] items-center justify-center gap-[5px] rounded-full bg-brand-soft text-[11px] font-bold tracking-[1.3px] text-brand">
          <Image src="/figma/icons/star-badge.svg" alt="" width={19} height={19} />
          Prestataires vedettes
        </span>
        <h2 id="featured-title" data-split className="font-garamond text-[42px] leading-tight sm:text-[52px] lg:text-[64px]">
          Trouvez <span className="text-brand">les meilleurs prestataires</span>
        </h2>
      </div>

      <div className="mt-4">
        <Carousel label="Prestataires vedettes" trackClassName="!gap-[18px]">
          {featuredVendors.map((v) => (
            <FeaturedCard key={v.id} v={v} />
          ))}
        </Carousel>
      </div>

      <div data-reveal className="flex justify-center py-6">
        <Link
          href="/offres"
          className="group flex h-12 w-[290px] items-center justify-center gap-[9px] rounded-full bg-brand-soft text-[13.5px] font-bold tracking-[1.6px] text-brand transition-colors duration-300 hover:bg-brand hover:text-white"
        >
          Voir tous les prestataires
          <Image src="/figma/icons/arrow-long.svg" alt="" width={13} height={22} className="rotate-90 transition-transform duration-300 group-hover:translate-x-1 group-hover:brightness-0 group-hover:invert" />
        </Link>
      </div>
    </section>
  );
}
