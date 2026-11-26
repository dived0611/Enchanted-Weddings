/*
  Mock data for the home page (Stage 1).
  In Stage 2 this will come from the database (Supabase) instead.
  Texts, names and prices are copied from the Figma design.
*/

import type { CategorySlug } from "@/components/icons/CategoryIcon";

export type Category = {
  slug: CategorySlug; // also picks the icon (see components/icons/CategoryIcon.tsx)
  label: string;
  count: string;
};

export const categories: Category[] = [
  { slug: "tous", label: "Tout voir", count: "1000+" },
  { slug: "traiteurs", label: "Traiteur", count: "320+" },
  { slug: "photo-video", label: "Photo & Vidéo", count: "180+" },
  { slug: "musiciens-djs", label: "Musicians & DJs", count: "180+" },
  { slug: "beaute", label: "Mise en beauté", count: "75+" },
  { slug: "decoration", label: "Décoration", count: "140+" },
  { slug: "salles-lieux", label: "Salles & Lieux", count: "50+" },
  { slug: "negafa", label: "Negafa", count: "60+" },
];

/** Small card used in the category carousels ("Airbnb style" in Figma). */
export type VendorCardData = {
  id: string;
  name: string;
  city: string;
  rating: number;
  reviews: number;
  priceFrom: number;
  priceUnit: string;
  image: string;
  badge?: "Vedette" | "Nouveau";
  verified?: boolean;
};

export type VendorSectionData = {
  slug: CategorySlug;
  title: string;
  subtitle: string;
  vendors: VendorCardData[];
};

// NOTE: only the "Traiteurs & Cuisine" carousel could be read from Figma before
// the Figma free-plan limit was reached. The other carousels reuse those photos
// as placeholders until real vendor photos are added.
const traiteurs: VendorCardData[] = [
  { id: "prestige-evenements", name: "Prestige Evenements", city: "Casablanca", rating: 4.9, reviews: 68, priceFrom: 850, priceUnit: "MAD/pers", image: "/figma/vendors/traiteur-2.png", badge: "Vedette", verified: true },
  { id: "al-andalus-traiteur", name: "Al Andalus Traiteur", city: "Marrakech", rating: 4.9, reviews: 97, priceFrom: 650, priceUnit: "MAD/pers", image: "/figma/vendors/traiteur-3.png", verified: true },
  { id: "saveurs-du-monde", name: "Saveurs du Monde", city: "Tanger", rating: 4.9, reviews: 68, priceFrom: 720, priceUnit: "MAD/pers", image: "/figma/vendors/traiteur-1.png", verified: true },
  { id: "chateau-des-reves", name: "Chateau des Reves", city: "Paris, France", rating: 5, reviews: 31, priceFrom: 2200, priceUnit: "MAD/pers", image: "/figma/vendors/traiteur-4.png", badge: "Nouveau", verified: true },
];

/** Builds placeholder vendors for sections whose data we don't have yet. */
function placeholderVendors(prefix: string, names: string[], unit: string): VendorCardData[] {
  const images = [
    "/figma/featured/saveurs-maroc.png",
    "/figma/featured/prestige-events.png",
    "/figma/vendors/traiteur-3.png",
    "/figma/vendors/traiteur-4.png",
  ];
  const cities = ["Casablanca", "Marrakech", "Rabat", "Tanger"];
  return names.map((name, i) => ({
    id: `${prefix}-${i + 1}`,
    name,
    city: cities[i % cities.length],
    rating: 4.8,
    reviews: 40 + i * 9,
    priceFrom: 3000 + i * 1500,
    priceUnit: unit,
    image: images[i % images.length],
    badge: i === 0 ? "Vedette" : undefined,
    verified: true,
  }));
}

export const vendorSections: VendorSectionData[] = [
  {
    slug: "traiteurs",
    title: "Traiteurs & Cuisine",
    subtitle: "Les meilleurs traiteurs pour votre événement",
    vendors: traiteurs,
  },
  {
    slug: "photo-video",
    title: "Photo & Video",
    subtitle: "Immortalisez chaque instant précieux",
    vendors: placeholderVendors("photo", ["Studio Lumière", "Mémoires d'Or", "Instant Magique", "Pixel Wedding"], "MAD"),
  },
  {
    slug: "musiciens-djs",
    title: "Musiciens & DJs",
    subtitle: "Créez l'ambiance parfaite pour votre soirée",
    vendors: placeholderVendors("music", ["DJ Night Vibes", "Orchestre Al Fan", "Soul Strings", "Groupe Andalou"], "MAD"),
  },
  {
    slug: "decoration",
    title: "Décoration",
    subtitle: "Transformer votre espace en un lieu de rêve",
    vendors: placeholderVendors("deco", ["Fleurs & Prestige", "Art & Décor", "Rêve Blanc", "Atelier Floral"], "MAD"),
  },
  {
    slug: "salles-lieux",
    title: "Salles & Lieux",
    subtitle: "Des espaces d'exception pour vos célébrations",
    vendors: placeholderVendors("salle", ["Palais Mirage", "Domaine Andalou", "Villa Jasmine", "Riad Al Amir"], "MAD"),
  },
];

/** Bigger card used in "Trouvez les meilleurs prestataires". */
export type FeaturedVendor = {
  id: string;
  name: string;
  city: string;
  rating: number;
  reviews: number;
  description: string;
  tags: string[];
  guests: string;
  priceFrom: string;
  image: string;
  logo: string;
};

export const featuredVendors: FeaturedVendor[] = [
  { id: "al-baraka-traiteur", name: "Al Baraka Traiteur", city: "Casablanca", rating: 4.9, reviews: 127, description: "Spécialistes de la cuisine marocaine authentique pour mariages et grandes réceptions depuis 15 ans.", tags: ["Mariage", "Fiançailles"], guests: "100–800 invités", priceFrom: "35.000", image: "/figma/featured/al-baraka.png", logo: "/figma/featured/avatar-1.png" },
  { id: "prestige-events", name: "Prestige Events", city: "Marrakech", rating: 4.8, reviews: 68, description: "Fusion gastronomique entre cuisine marocaine et internationale pour des événements d'exception.", tags: ["Mariage", "Entreprise"], guests: "100–500 invités", priceFrom: "45.000", image: "/figma/featured/prestige-events.png", logo: "/figma/featured/avatar-3.png" },
  { id: "festin-royal", name: "Festin Royal", city: "Rabat", rating: 4.9, reviews: 64, description: "Traiteur royal spécialisé dans les buffets fastueux et les banquets de prestige.", tags: ["Mariage", "Réception officielle"], guests: "150–1000 invités", priceFrom: "28.000", image: "/figma/featured/festin-royal.png", logo: "/figma/featured/avatar-2.png" },
  { id: "business-gourmet", name: "Business Gourmet", city: "Fès", rating: 4.8, reviews: 71, description: "Authentique cuisine fassi revisitée pour anniversaires, baptêmes et célébrations familiales.", tags: ["Anniversaire", "Baptême"], guests: "50–400 invités", priceFrom: "22.000", image: "/figma/featured/prestige-events.png", logo: "/figma/featured/avatar-1.png" },
  { id: "saveurs-du-maroc", name: "Saveurs du Maroc", city: "Fès", rating: 4.8, reviews: 71, description: "Authentique cuisine fassi revisitée pour anniversaires, baptêmes et célébrations familiales.", tags: ["Entreprise", "Séminaire"], guests: "50–400 invités", priceFrom: "22.000", image: "/figma/featured/saveurs-maroc.png", logo: "/figma/featured/avatar-1.png" },
  { id: "la-belle-epoque", name: "La Belle Époque", city: "Tanger", rating: 4.9, reviews: 43, description: "Mélange unique de cuisine méditerranéenne et marocaine pour des mariages romantiques.", tags: ["Mariage", "Soirée privée"], guests: "100–600 invités", priceFrom: "32.000", image: "/figma/featured/al-baraka.png", logo: "/figma/featured/avatar-1.png" },
];

// The Figma file shows "000+" placeholders here; these targets are examples
// and should be replaced with real numbers from the database later.
export const stats: { icon: "users" | "calendar" | "like" | "map"; value: number; suffix: string; label: string; sub: string }[] = [
  { icon: "users", value: 320, suffix: "+", label: "Traiteurs vérifiés", sub: "Partenaires actifs sur la plateforme" },
  { icon: "calendar", value: 12000, suffix: "+", label: "Événements réalisés", sub: "Depuis le lancement de la plateforme" },
  { icon: "like", value: 98, suffix: " %", label: "Taux de satisfaction", sub: "Partenaires actifs sur la plateforme" },
  { icon: "map", value: 25, suffix: "", label: "Villes couvertes", sub: "Dans tout le Royaume du Maroc" },
];

export type Review = {
  quote: string;
  event: string;
  name: string;
  role: string;
  date: string;
  avatar: string;
  stars: 4 | 5;
};

export const reviews: Review[] = [
  { quote: "Nous organisons des événements corporate régulièrement et Enchanted Weddings nous a permis de trouver un prestataire de qualité en un temps record.", event: "Séminaire d'entreprise — 120 personnes", name: "Mehdi Alaoui", role: "Directeur RH — Marrakech", date: "Avril 2026", avatar: "/figma/reviews/avatar-1.png", stars: 4 },
  { quote: "La transparence des prix et les avis vérifiés m'ont permis de choisir en toute confiance. Le système d'escrow est rassurant, je savais que mon argent était protégé jusqu'à la fin.", event: "Anniversaire — 80 invités", name: "Fatima Zahra Benali", role: "Organisatrice d'événements — Rabat", date: "Avril 2026", avatar: "/figma/reviews/avatar-2.png", stars: 5 },
  { quote: "Al Baraka Traiteur a dépassé toutes nos attentes. La cuisine était exquise, le service impeccable et l'équipe professionnelle du début à la fin. Nos invités en parlent encore !", event: "Mariage — 350 invités", name: "Fatima Zahra Benali", role: "Mariée — Casablanca", date: "Avril 2026", avatar: "/figma/reviews/avatar-3.png", stars: 5 },
  { quote: "Saveurs du Maroc a sublimé le baptême de notre fils. Les plats traditionnels fassis étaient authentiques et savoureux. Je recommande vivement cette plateforme à tous.", event: "Baptême — 200 invités", name: "Youssef Benkirane", role: "Père de famille — Fès", date: "Avril 2026", avatar: "/figma/reviews/avatar-4.png", stars: 5 },
];
