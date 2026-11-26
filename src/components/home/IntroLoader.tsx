import Image from "next/image";

/*
  Opening screen shown on the first visit of a session (animated in HomeMotion.tsx).
  The tiny inline script runs before the page is painted: if the intro was already
  seen in this tab (or the visitor prefers reduced motion), it hides the loader
  right away, so returning visitors never see it flash.
*/
const skipScript = `try{if(sessionStorage.getItem("ew-intro")||matchMedia("(prefers-reduced-motion: reduce)").matches){document.documentElement.classList.add("intro-seen")}}catch(e){}`;

export default function IntroLoader() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: skipScript }} />
      <div
        data-intro
        aria-hidden="true"
        className="fixed inset-0 z-[200] flex items-center justify-center"
        style={{ background: "radial-gradient(ellipse at center, #fbf6f2 0%, #efe0d4 60%, #e6d2c3 100%)" }}
      >
        <div data-intro-inner className="flex flex-col items-center">
          <div data-intro-logo>
            <Image src="/figma/logo.svg" alt="" width={300} height={133} preload className="h-auto w-[220px] sm:w-[300px]" />
          </div>
          <span data-intro-line className="mt-6 block h-px w-[240px] bg-gradient-to-r from-transparent via-brand to-transparent" />
          <p data-intro-tagline className="mt-5 font-cormorant text-lg uppercase tracking-[8px] text-brand sm:text-xl">
            Life is an event
          </p>
        </div>

        <p className="absolute bottom-8 right-8 font-cormorant text-[64px] leading-none text-brand/80 lining-nums tabular-nums sm:text-[96px]">
          <span data-intro-count>00</span>
        </p>
        <p className="absolute bottom-10 left-8 text-xs uppercase tracking-[4px] text-muted-2">Enchanted Weddings · Maroc</p>
      </div>
    </>
  );
}
