import Link from "next/link";

const sitemap = [
  { href: "/", label: "Home" },
  { href: "/a-propos", label: "About" },
  { href: "/offres", label: "Services" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact Us" },
];

export default function Footer() {
  return (
    <footer className="bg-sand text-muted-2">
      <div className="mx-auto max-w-[1280px] px-6 pb-10 pt-16 lg:px-[50px] lg:pt-[75px]">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <p className="font-cormorant text-[34px] uppercase leading-[1.15] sm:text-[44px] lg:max-w-[835px] lg:text-[56px]">
            Our wedding planners will leave you breathless on your special day.
          </p>

          <nav aria-label="Plan du site" className="lg:mt-6 lg:w-[352px]">
            <p className="mb-3 font-cormorant text-sm uppercase tracking-wide">Sitemap</p>
            <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
              {sitemap.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-brand">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col-reverse gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-wrap gap-x-16 gap-y-2 text-xs">
            <span>© 2026 Enchanted Weddings</span>
            <Link href="/conditions" className="hover:text-brand">
              Terms of Use
            </Link>
            <Link href="/confidentialite" className="hover:text-brand">
              Privacy Policy
            </Link>
          </div>

          {/* Newsletter: not connected yet — will be wired in Stage 2 */}
          <form className="w-full lg:w-[460px]" action="#">
            <label htmlFor="newsletter-email" className="mb-2 block font-cormorant text-sm uppercase tracking-wide">
              Newsletter
            </label>
            <div className="flex items-center border-b border-muted-2/60">
              <input
                id="newsletter-email"
                type="email"
                required
                placeholder="Entrez votre adresse e-mail"
                className="w-full bg-transparent py-2 text-sm outline-none placeholder:text-muted-2/80"
              />
              <button type="submit" className="shrink-0 font-cormorant text-sm uppercase hover:text-brand">
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </div>
    </footer>
  );
}
