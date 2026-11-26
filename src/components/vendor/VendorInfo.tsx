import Image from "next/image";
import type { ServiceIcon, VendorDetails } from "@/data/vendors";
import Stars from "./Stars";

export const serviceIcons: Record<ServiceIcon, string> = {
  venue: "/figma/icons/svc-venue.svg",
  decoration: "/figma/icons/svc-decoration.svg",
  camera: "/figma/icons/svc-camera.svg",
  music: "/figma/icons/svc-music.svg",
  heart: "/figma/icons/svc-heart.svg",
};

const pinkGradient = "linear-gradient(90deg, #c3937c 12%, #ffc7ad 170%)";

/** Name, badges, rating, description and included services. */
export default function VendorInfo({ vendor }: { vendor: VendorDetails }) {
  return (
    <section aria-labelledby="vendor-name">
      <div className="flex items-start justify-between gap-6">
        <div>
          <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
            <h1 id="vendor-name" className="font-garamond text-[32px] font-semibold leading-tight lg:text-[36px]">
              {vendor.name}
            </h1>
            <div className="flex flex-wrap gap-6">
              {vendor.verified && (
                <span className="flex h-[29px] items-center gap-1 rounded-full px-[10px] text-[17px] text-white" style={{ backgroundImage: pinkGradient }}>
                  <Image src="/figma/icons/user-check-white.svg" alt="" width={16} height={16} />
                  Vérifié
                </span>
              )}
              {vendor.featured && (
                <span className="flex h-[29px] items-center gap-2 rounded-full border border-brand bg-brand/15 px-[10px] text-[15px] font-medium text-brand">
                  <Image src="/figma/icons/star-badge.svg" alt="" width={18} height={18} />
                  Prestataire Vedette
                </span>
              )}
            </div>
          </div>

          <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-[15px] tracking-[1.8px] text-muted-2">
            <li className="flex items-center gap-3">
              <Image src="/figma/icons/marker.svg" alt="" width={16} height={16} />
              {vendor.city}
            </li>
            <li className="flex items-center gap-3">
              <Image src="/figma/icons/stat-calendar.svg" alt="" width={20} height={20} className="opacity-70 grayscale" />
              Membre depuis {vendor.memberSince}
            </li>
            <li className="flex items-center gap-3">
              <Image src="/figma/icons/users.svg" alt="" width={20} height={20} className="opacity-60" />
              {vendor.guests}
            </li>
          </ul>
        </div>

        <div className="hidden h-[72px] w-[99px] shrink-0 flex-col items-center justify-center rounded-md bg-[#ead9cc] sm:flex">
          <span className="font-garamond text-[26px] font-semibold leading-none">{vendor.rating}</span>
          <Stars value={vendor.rating} size={11} className="mt-1" />
          <span className="text-xs text-muted">{vendor.reviewCount} avis</span>
        </div>
      </div>

      <p className="mt-8 text-[16px] leading-[20px] text-muted-2">{vendor.description}</p>

      <h2 className="mt-12 text-[22px] font-medium text-muted-2">Services inclus</h2>
      <ul className="mt-8 grid gap-x-16 gap-y-12 sm:grid-cols-2">
        {vendor.services.map((s) => (
          <li key={s.title} className="flex items-center gap-5">
            <span className="flex size-[30px] shrink-0 items-center justify-center">
              <Image src={serviceIcons[s.icon]} alt="" width={28} height={28} />
            </span>
            <span>
              <span className="block font-medium">{s.title}</span>
              <span className="block">{s.text}</span>
            </span>
          </li>
        ))}
      </ul>

      <hr className="mt-12 border-[#8f8f8f]" />
    </section>
  );
}
