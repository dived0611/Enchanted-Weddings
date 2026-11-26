import Image from "next/image";
import Link from "next/link";

// Shown for any address that doesn't exist (yet).
// Many pages (vendor details, offers, AI planner…) are still being built.
export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-[640px] flex-col items-center px-6 py-24 text-center lg:py-32">
      <Image src="/figma/icons/stars-badge.svg" alt="" width={40} height={40} />
      <p className="mt-6 tracking-[5px] uppercase text-muted-2">Bientôt disponible</p>
      <h1 className="mt-4 font-cormorant text-[40px] uppercase leading-tight text-brand lg:text-[52px]">
        Cette page est en préparation
      </h1>
      <p className="mt-4 leading-[25px] text-muted-2">
        Nous travaillons encore sur cette partie du site. Revenez très vite, ou continuez à explorer nos
        prestataires depuis la page d&apos;accueil.
      </p>
      <Link
        href="/"
        className="mt-8 flex h-[44px] items-center justify-center rounded-full border border-brand px-8 text-sm uppercase text-brand transition-colors hover:bg-brand hover:text-white"
      >
        Retour à l&apos;accueil
      </Link>
    </section>
  );
}
