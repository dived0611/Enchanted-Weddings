import Image from "next/image";
import Link from "next/link";
import type { Partner } from "@/data/vendors";
import { serviceIcons } from "./VendorInfo";

/** Vendors that this vendor often works with. */
export default function Partners({ partners }: { partners: Partner[] }) {
  return (
    <section aria-labelledby="partners-title" className="pt-20">
      <div className="flex items-center justify-between px-5">
        <h2 id="partners-title" className="text-[28px] font-medium">
          Partenaires Professionnels
        </h2>
        <Link href="/offres" className="flex items-center gap-2 text-lg text-brand hover:opacity-75">
          Voir tout
          <Image src="/figma/icons/arrow-right.svg" alt="" width={12} height={9} />
        </Link>
      </div>

      <ul className="mt-12 grid gap-[10px] sm:grid-cols-2">
        {partners.map((p) => (
          <li key={p.name}>
            <Link
              href="/offres"
              className="flex h-[86px] items-center gap-5 rounded-[12px] border border-brand px-[13px] transition-colors hover:bg-white"
            >
              <Image src={p.avatar} alt="" width={58} height={58} className="size-[58px] shrink-0 rounded-full object-cover" />
              <span className="flex flex-col gap-[2px]">
                <span className="flex items-center gap-[6px] font-medium">
                  {p.name}
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#c3937c" strokeWidth="1.6" aria-label="Vérifié">
                    <rect x="3" y="3" width="18" height="18" rx="3" />
                    <path d="M8 12l3 3 5-6" />
                  </svg>
                </span>
                <span className="flex items-center gap-3">
                  <Image src={serviceIcons[p.icon]} alt="" width={18} height={18} />
                  {p.role}
                </span>
                <span className="flex items-center gap-1 font-jakarta text-xs text-[#8a8a8a]">
                  <span className="text-brand">★</span>
                  <b className="text-sm font-semibold text-black">{p.rating}</b> · {p.tags}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
