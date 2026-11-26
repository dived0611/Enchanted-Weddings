import Image from "next/image";
import Link from "next/link";
import type { VendorCardData } from "@/data/home";

// Soft rose-gold gradients used for the badges in Figma
const badgeGradient = "linear-gradient(91deg, #e9d3c6 0%, #c3937c 100%)";
const verifiedGradient = "linear-gradient(91deg, #fbf8f1 23%, #c3937c 230%)";

const cardHover =
  // Only transition translate/shadow: GSAP animates transform/opacity on scroll
  "transition-[translate,box-shadow] duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_22px_40px_-18px_rgba(120,80,60,0.35)]";

export function VendorCard({ vendor }: { vendor: VendorCardData }) {
  return (
    <Link
      href={`/prestataires/${vendor.id}`}
      data-stagger-item
      className={`group block h-[294px] w-[250px] shrink-0 snap-start overflow-hidden rounded-2xl bg-white shadow-[0_2px_10px_-4px_rgba(0,0,0,0.06)] ${cardHover}`}
    >
      <div className="relative h-[157px] w-full overflow-hidden">
        <Image
          src={vendor.image}
          alt={vendor.name}
          fill
          sizes="250px"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        {/* Light gradient so the badges stay readable on bright photos */}
        <div className="absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-black/25 to-transparent" aria-hidden="true" />
        {vendor.badge && (
          <span
            className="absolute left-[7px] top-[7px] flex h-6 items-center rounded-full px-[10px] text-[10px] font-semibold text-white shadow-sm"
            style={{ backgroundImage: badgeGradient }}
          >
            {vendor.badge}
          </span>
        )}
        {vendor.verified && (
          <span
            className="absolute right-[7px] top-[6px] flex h-6 items-center gap-1 rounded-full pl-[6px] pr-2 font-jakarta text-[13px] shadow-sm"
            style={{ backgroundImage: verifiedGradient }}
          >
            <Image src="/figma/icons/user-check.svg" alt="" width={12} height={12} />
            Vérifié
          </span>
        )}
      </div>

      <div className="flex h-[137px] flex-col px-[14px] pb-[10px] pr-[10px] pt-[13px]">
        <div className="flex items-start justify-between border-b border-brand/30 pb-3">
          <div className="flex flex-col gap-[10px]">
            <p className="text-[13px] font-medium transition-colors group-hover:text-brand">{vendor.name}</p>
            <div className="flex items-center gap-[3px] text-xs">
              <Image
                src={vendor.rating >= 5 ? "/figma/icons/stars-rating-5.svg" : "/figma/icons/stars-rating-4.svg"}
                alt={`Note ${vendor.rating} sur 5`}
                width={70}
                height={9}
              />
              <span className="font-medium">{vendor.rating}</span>
              <span className="font-gruppo">({vendor.reviews})</span>
            </div>
          </div>
          <span className="flex items-center gap-[2px] font-jakarta text-[10px] font-light text-[#a6a6a6]">
            <Image src="/figma/icons/marker.svg" alt="" width={11} height={11} />
            {vendor.city}
          </span>
        </div>

        <div className="mt-auto flex items-end justify-between">
          <div className="text-[13.2px] leading-tight">
            <p className="font-gruppo text-[#818181]">A partir de</p>
            <p>
              <span className="font-medium">{vendor.priceFrom}</span> <span className="text-brand">{vendor.priceUnit}</span>
            </p>
          </div>
          <span className="flex items-center gap-[6px] rounded-full px-3 py-1 font-montserrat-alt text-[15px] text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
            Voir
            <svg width="12" height="9" viewBox="0 0 12 9" fill="none" stroke="currentColor" strokeWidth="1.2" className="transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true">
              <path d="M0 4.5h11M7.5 1l3.5 3.5L7.5 8" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

/** Last dashed card: "Voir tous …" */
export function SeeAllCard({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      data-stagger-item
      className="group flex h-[294px] w-[250px] shrink-0 snap-start flex-col items-center justify-center gap-[10px] rounded-2xl border border-dashed border-brand bg-white/70 transition-[translate,box-shadow,background-color] duration-500 hover:-translate-y-2 hover:bg-white hover:shadow-[0_22px_40px_-18px_rgba(120,80,60,0.3)]"
    >
      <Image src="/figma/icons/see-all.svg" alt="" width={70} height={70} className="transition-transform duration-500 group-hover:translate-x-1.5" />
      <span className="font-montserrat-alt text-[15px]">Voir tous</span>
      <span className="font-montserrat-alt text-[15px] text-[#868686]">{label}</span>
    </Link>
  );
}
