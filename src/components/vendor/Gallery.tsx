"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

type GalleryProps = {
  name: string;
  photos: string[];
  extraPhotos: number;
};

/** Photo grid (1 big + 4 small) with a simple full-screen viewer. */
export default function Gallery({ name, photos, extraPhotos }: GalleryProps) {
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const move = useCallback(
    (dir: 1 | -1) => setOpen((i) => (i === null ? i : (i + dir + photos.length) % photos.length)),
    [photos.length],
  );

  // Keyboard: Esc closes, arrows navigate
  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") move(1);
      if (e.key === "ArrowLeft") move(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, move]);

  const [main, ...rest] = photos;

  return (
    <>
      <div className="mx-auto grid max-w-[1280px] grid-cols-2 gap-[10px] px-3 pt-3 lg:h-[467px] lg:grid-cols-[581fr_320fr_320fr] lg:grid-rows-2 lg:px-5">
        <button
          type="button"
          onClick={() => setOpen(0)}
          className="relative col-span-2 aspect-[4/3] overflow-hidden rounded-[18px] lg:col-span-1 lg:row-span-2 lg:aspect-auto"
        >
          <Image src={main} alt={`${name} — photo principale`} fill preload sizes="(min-width: 1024px) 581px, 100vw" className="object-cover transition-transform duration-500 hover:scale-105" />
        </button>

        {rest.slice(0, 4).map((src, i) => {
          const isLast = i === 3;
          return (
            <button
              key={src + i}
              type="button"
              onClick={() => setOpen(i + 1)}
              className="relative aspect-[320/223] overflow-hidden rounded-[18px] lg:aspect-auto"
              aria-label={isLast ? `Voir toutes les photos (+${extraPhotos})` : `Voir la photo ${i + 2}`}
            >
              <Image src={src} alt="" fill sizes="(min-width: 1024px) 320px, 50vw" className="object-cover transition-transform duration-500 hover:scale-105" />
              {isLast && extraPhotos > 0 && (
                <span className="absolute inset-0 flex flex-col items-center justify-center bg-black/45 leading-tight text-white">
                  <span className="text-[34px]">+{extraPhotos}</span>
                  <span className="text-xl">Photos</span>
                </span>
              )}
            </button>
          );
        })}
      </div>

      {open !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Photos de ${name}`}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          onClick={close}
        >
          <div className="relative h-[80vh] w-full max-w-[1100px]" onClick={(e) => e.stopPropagation()}>
            <Image src={photos[open]} alt={`${name} — photo ${open + 1}`} fill sizes="100vw" className="object-contain" />
          </div>
          <button type="button" onClick={close} aria-label="Fermer" className="absolute right-5 top-5 size-11 rounded-full bg-white/15 text-2xl text-white hover:bg-white/25">
            ×
          </button>
          <button type="button" onClick={(e) => { e.stopPropagation(); move(-1); }} aria-label="Photo précédente" className="absolute left-4 top-1/2 size-11 -translate-y-1/2 rounded-full bg-white/15 text-2xl text-white hover:bg-white/25">
            ‹
          </button>
          <button type="button" onClick={(e) => { e.stopPropagation(); move(1); }} aria-label="Photo suivante" className="absolute right-4 top-1/2 size-11 -translate-y-1/2 rounded-full bg-white/15 text-2xl text-white hover:bg-white/25">
            ›
          </button>
          <p className="absolute bottom-5 text-sm text-white/80">
            {open + 1} / {photos.length}
          </p>
        </div>
      )}
    </>
  );
}
