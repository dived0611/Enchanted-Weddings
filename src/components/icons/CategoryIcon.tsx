import { Camera, Crown, Flower2, Gem, Landmark, LayoutGrid, Music, UtensilsCrossed, type LucideProps } from "lucide-react";

/*
  One consistent line-icon set (Lucide) for every vendor category.
  The key is the category slug used in src/data/home.ts.
*/
const icons = {
  tous: LayoutGrid,
  traiteurs: UtensilsCrossed,
  "photo-video": Camera,
  "musiciens-djs": Music,
  beaute: Gem,
  decoration: Flower2,
  "salles-lieux": Landmark,
  negafa: Crown,
} as const;

export type CategorySlug = keyof typeof icons;

export default function CategoryIcon({ slug, ...props }: { slug: CategorySlug } & LucideProps) {
  const Icon = icons[slug];
  return <Icon aria-hidden="true" strokeWidth={1.4} {...props} />;
}
