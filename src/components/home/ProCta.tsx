import Link from "next/link";
import { ArrowRight } from "lucide-react";

/** "Professionnel du mariage ?" call to action for vendors. */
export default function ProCta() {
  return (
    <section aria-labelledby="pro-title" className="mx-auto max-w-[1280px] px-6 py-20 lg:px-[106px] lg:py-28">
      <div
        data-reveal
        className="relative overflow-hidden rounded-[32px] px-6 py-16 text-center shadow-[0_30px_70px_-40px_rgba(120,80,60,0.5)] lg:py-20"
        style={{ background: "linear-gradient(135deg, #fbf6f2 0%, #f1e2d6 55%, #e8d2c2 100%)" }}
      >
        {/* Decorative circles */}
        <span aria-hidden="true" className="absolute -left-16 -top-16 size-64 rounded-full border border-brand/20" />
        <span aria-hidden="true" className="absolute -left-6 -top-6 size-40 rounded-full border border-brand/15" />
        <span aria-hidden="true" className="absolute -bottom-24 -right-10 size-80 rounded-full bg-white/40 blur-2xl" />

        <div className="relative">
          <p className="font-garamond text-2xl text-muted-2 lg:text-[28px]">Professionnel du mariage ?</p>
          <h2 id="pro-title" data-split className="font-garamond text-[38px] leading-tight lg:text-[54px]">
            Développez votre activité
          </h2>
          <p className="mx-auto mt-3 max-w-[760px] tracking-[1.92px] text-muted-2">
            Rejoignez la plateforme et accédez à des milliers de clients potentiels.
          </p>
          <Link
            href="/inscription?type=professionnel"
            className="group mx-auto mt-8 inline-flex h-12 items-center gap-3 rounded-full bg-brand px-8 text-[13.5px] font-bold tracking-[1.2px] text-white shadow-[0_12px_28px_-10px_rgba(156,102,80,0.9)] transition-[translate,box-shadow,background-color] duration-300 hover:-translate-y-0.5 hover:bg-[#b07c66]"
          >
            Inscrire mon entreprise
            <ArrowRight aria-hidden="true" size={18} strokeWidth={1.8} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
