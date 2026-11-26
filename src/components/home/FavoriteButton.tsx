"use client";

import Image from "next/image";
import { useState } from "react";

/** Heart button on vendor cards. Saving favorites for real comes in Stage 2. */
export default function FavoriteButton({ name }: { name: string }) {
  const [liked, setLiked] = useState(false);

  return (
    <button
      type="button"
      aria-pressed={liked}
      aria-label={liked ? `Retirer ${name} des favoris` : `Ajouter ${name} aux favoris`}
      onClick={(e) => {
        e.preventDefault(); // the card itself is a link — don't navigate
        setLiked((v) => !v);
      }}
      className="block size-[32px] transition-transform hover:scale-110"
    >
      <Image
        src={liked ? "/figma/icons/heart-filled.svg" : "/figma/icons/heart.svg"}
        alt=""
        width={32}
        height={32}
      />
    </button>
  );
}
