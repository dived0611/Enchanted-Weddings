import Image from "next/image";
import Link from "next/link";
import Petals from "./Petals";

// Soft fade on the right side of the hero photo (opaque until 80%, fully transparent at the edge)
const heroFade = "linear-gradient(to right, #000 0%, #000 80%, rgba(0,0,0,0.6) 90%, transparent 100%)";

const trustAvatars =["/figma/reviews/avatar-1.png", "/figma/reviews/avatar-2.png", "/figma/reviews/avatar-3.png"];

/*
  Animation hooks used by HomeMotion.tsx:
  data-hero-*      intro timeline        data-depth   follows the mouse (parallax)
  data-magnetic    leans toward cursor   data-hero-copy / data-hero-art-scroll  scroll-out effect
*/
export default function Hero() {
  return (
    <section data-hero className="relative overflow-hidden lg:overflow-visible">
      {/* Soft rose glow behind the artwork (moves opposite to the mouse) */}
      <div
        aria-hidden="true"
        data-depth="-30"
        className="pointer-events-none absolute -right-40 top-10 size-[620px] rounded-full opacity-60 blur-3xl lg:right-0"
        style={{ background: "radial-gradient(circle, rgba(195,147,124,0.28) 0%, rgba(245,245,245,0) 70%)" }}
      />

      <Petals />

      {/* Exactly one screen tall on desktop (screen height minus the 80px header) */}
      <div className="relative mx-auto max-w-[1280px] px-6 pb-12 pt-6 lg:flex lg:h-[calc(100svh-80px)] lg:min-h-[600px] lg:items-center lg:px-[70px] lg:py-0">
        <div className="flex w-full flex-col gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
          {/* Left: text */}
          <div data-hero-copy className="relative z-10 flex max-w-[480px] flex-col gap-6 lg:shrink-0">
            <p data-hero-eyebrow data-hero-hide className="flex items-center gap-3 tracking-[5px] uppercase text-muted-2">
              <span data-hero-eyebrow-line className="h-px w-8 origin-left bg-brand" aria-hidden="true" />
              Life is an event
            </p>
            <h1
              data-hero-title
              data-hero-hide
              className="font-cormorant text-[40px] uppercase leading-[1.1] text-brand [perspective:700px] sm:text-[52px] lg:text-[58px] lg:leading-[1.15]"
            >
              Organisez le mariage qui vous ressemble
            </h1>
            <p data-hero-text data-hero-hide className="max-w-[456px] leading-[26px] text-muted-2">
              Trouvez les meilleurs prestataires, planifiez chaque étape et vivez pleinement votre mariage.
            </p>

            <div data-hero-cta className="flex flex-wrap gap-3">
              <Link
                href="/offres"
                data-hero-hide
                data-magnetic
                className="group relative flex h-12 min-w-[188px] items-center justify-center gap-2 overflow-hidden rounded-full bg-brand px-7 text-sm uppercase tracking-[1.5px] text-white shadow-[0_10px_25px_-8px_rgba(195,147,124,0.8)] transition-[box-shadow,background-color] duration-300 hover:bg-[#b07c66] hover:shadow-[0_14px_30px_-8px_rgba(176,124,102,0.9)]"
              >
                {/* Shine sweeping across the button on hover */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/30 blur-sm transition-transform duration-700 group-hover:translate-x-[420%]"
                />
                Explore
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
              <Link
                href="/ai-planner"
                data-hero-hide
                data-magnetic
                className="flex h-12 min-w-[188px] items-center justify-center gap-2 rounded-full border border-brand bg-white/60 px-6 text-sm font-medium text-brand backdrop-blur transition-[box-shadow,background-color] duration-300 hover:bg-white hover:shadow-[0_10px_25px_-10px_rgba(195,147,124,0.6)]"
              >
                <Image src="/figma/icons/stars-ai.svg" alt="" width={22} height={22} />
                AI Wedding Planner
              </Link>
            </div>

            {/* Trust line */}
            <div data-hero-trust data-hero-hide className="flex items-center gap-3 pt-2">
              <div className="flex -space-x-3">
                {trustAvatars.map((src) => (
                  <Image key={src} src={src} alt="" width={36} height={36} className="size-9 rounded-full border-2 border-page object-cover" />
                ))}
              </div>
              <p className="text-[13px] leading-tight text-muted-2">
                <span className="font-semibold text-ink">1000+ prestataires vérifiés</span>
                <br />
                partout au Maroc
              </p>
            </div>
          </div>

          {/* Right: couple photo + floral artwork (exported from Figma as one image) */}
          <div
            data-hero-art-scroll
            className="relative mx-auto w-full max-w-[560px] lg:mx-0 lg:-mr-[70px] lg:w-auto lg:max-w-none"
          >
            <div data-hero-art data-hero-hide data-depth="18">
              <div data-float>
                <Image
                  src="/figma/hero/hero-art.png"
                  alt="Couple de mariés s'embrassant derrière un bouquet de fleurs blanches"
                  width={1410}
                  height={1485}
                  preload
                  sizes="(min-width: 1024px) 760px, (min-width: 640px) 560px, 100vw"
                  // Desktop: height follows the screen so the whole hero fits in one view
                  // (also capped by the width left next to the text, so it never overflows sideways)
                  className="h-auto w-full lg:h-[min(calc(100svh-120px),800px,calc((min(100vw,1280px)-510px)*1.05))] lg:w-auto"
                  // Fade the right edge (and its corners) into the page instead of a hard cut
                  style={{ WebkitMaskImage: heroFade, maskImage: heroFade }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <a
          href="#categories"
          data-hero-scroll
          data-hero-hide
          aria-label="Défiler vers les catégories"
          className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 lg:block"
        >
          <Image src="/figma/icons/mouse.svg" alt="" width={41} height={41} className="animate-mouse-bounce" />
        </a>
      </div>
    </section>
  );
}
