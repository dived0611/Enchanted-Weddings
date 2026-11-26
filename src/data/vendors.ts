/*
  Mock data for the vendor details page (Stage 1).
  "Prestige Événements" is copied from the Figma "Details_page".
  Every other vendor gets the same structure with generic content, so all the
  cards on the home page open a working page. In Stage 2 this comes from Supabase.
*/
import { featuredVendors, vendorSections } from "./home";
import { offers } from "./offers";

export type ServiceIcon = "venue" | "decoration" | "camera" | "music" | "heart";

export type Package = {
  id: string;
  name: string;
  tagline: string;
  price: number;
  guests: string;
  popular?: boolean;
  features: { label: string; included: boolean }[];
};

export type Partner = {
  name: string;
  role: string;
  icon: ServiceIcon;
  rating: number;
  tags: string;
  avatar: string;
};

export type VendorReview = {
  name: string;
  avatar: string;
  date: string;
  stars: number;
  event: string;
  text: string;
};

/** "YYYY-MM-DD" → status. Days not listed are available. */
export type DayStatus = "reserved" | "pending";

export type VendorDetails = {
  id: string;
  name: string;
  city: string;
  memberSince: number;
  guests: string;
  verified: boolean;
  featured: boolean;
  rating: number;
  reviewCount: number;
  ratingBreakdown: [number, number, number, number, number]; // 5★ → 1★
  priceFrom: number;
  description: string;
  gallery: string[];
  extraPhotos: number;
  services: { icon: ServiceIcon; title: string; text: string }[];
  packages: Package[];
  partners: Partner[];
  reviews: VendorReview[];
  availability: Record<string, DayStatus>;
};

const prestige: VendorDetails = {
  id: "prestige-evenements",
  name: "Prestige Événements",
  city: "Casablanca, Maroc",
  memberSince: 2021,
  guests: "50-500 invités",
  verified: true,
  featured: true,
  rating: 4.9,
  reviewCount: 143,
  ratingBreakdown: [118, 18, 5, 2, 0],
  priceFrom: 850,
  description:
    "Prestige Événements est votre partenaire de confiance pour l'organisation d'événements inoubliables à Casablanca et dans tout le Maroc. Avec plus de 10 ans d'expérience dans le secteur de la restauration et de l'événementiel, nous mettons notre expertise au service de vos rêves. Notre équipe de professionnels passionnés vous accompagne de la conception à la réalisation pour créer des moments magiques.",
  gallery: [
    "/figma/details/gallery-1.jpg",
    "/figma/details/gallery-2.jpg",
    "/figma/details/gallery-3.jpg",
    "/figma/details/gallery-4.jpg",
    "/figma/featured/prestige-events.png",
  ],
  extraPhotos: 12,
  services: [
    { icon: "venue", title: "Traiteur Gastronomique", text: "Cuisine marocaine, française et fusion" },
    { icon: "decoration", title: "Décoration Complète", text: "Florale, lumineuse et thématique" },
    { icon: "camera", title: "Photo & Vidéo", text: "Reportage professionnel HD/4K" },
    { icon: "music", title: "DJ & Musique Live", text: "DJ set + groupe de musique" },
    { icon: "heart", title: "Maquillage & Coiffure", text: "Équipe beauté certifiée" },
  ],
  packages: [
    {
      id: "essentiel",
      name: "Essentiel",
      tagline: "Pour les petits budgets",
      price: 850,
      guests: "50–150 invités",
      features: [
        { label: "Menu 3 services (entrée, plat, dessert)", included: true },
        { label: "Service en salle professionnel", included: true },
        { label: "Décoration de table basique", included: true },
        { label: "Sonorisation standard", included: true },
        { label: "Photographe", included: false },
        { label: "DJ", included: false },
        { label: "Maquillage", included: false },
      ],
    },
    {
      id: "premium",
      name: "Premium",
      tagline: "Le plus populaire",
      price: 1400,
      guests: "50–300 invités",
      popular: true,
      features: [
        { label: "Menu 5 services gastronomique", included: true },
        { label: "Service en salle + maître d'hôtel", included: true },
        { label: "Décoration florale complète", included: true },
        { label: "Photographe (8h)", included: true },
        { label: "DJ professionnel (6h)", included: true },
        { label: "Maquillage mariée inclus", included: true },
        { label: "Vidéographie", included: false },
      ],
    },
    {
      id: "luxe",
      name: "Luxe Totale",
      tagline: "L'expérience ultime",
      price: 2200,
      guests: "100–500 invités",
      features: [
        { label: "Menu 7 services (entrée, plat, dessert)", included: true },
        { label: "Service en salle professionnel", included: true },
        { label: "Décoration florale & lumineuse", included: true },
        { label: "Sonorisation standard", included: true },
        { label: "DJ + Groupe de musique live", included: true },
        { label: "Photographe + Vidéographe 4K", included: true },
        { label: "Maquillage & coiffure (mariée + 2)", included: true },
        { label: "Wedding planner dédié", included: true },
        { label: "Transport invités VIP", included: true },
      ],
    },
  ],
  partners: [
    { name: "Studio Lumière", role: "Photographe", icon: "camera", rating: 4.9, tags: "Mariage & Corporate", avatar: "/figma/details/partner-studio.jpg" },
    { name: "DJ Karim", role: "DJ Professionnel", icon: "music", rating: 4.9, tags: "Oriental & Moderne", avatar: "/figma/details/partner-dj.jpg" },
    { name: "Fleurs & Rêves", role: "Décorateur Floral", icon: "decoration", rating: 4.9, tags: "Mariage & Gala", avatar: "/figma/details/partner-fleurs.jpg" },
    { name: "Nadia Beauty", role: "Maquillage & Coiffure", icon: "heart", rating: 4.9, tags: "Mariée & Cérémonie", avatar: "/figma/details/partner-nadia.jpg" },
  ],
  reviews: [
    { name: "Fatima Zahra Alaoui", avatar: "/figma/details/review-fatima.jpg", date: "12 mars 2026", stars: 5, event: "Mariage · 220 invités", text: "Une expérience absolument exceptionnelle ! L'équipe de Prestige Événements a transformé notre mariage en un conte de fées. La cuisine était divine, le service impeccable, et la décoration à couper le souffle. Nous recommandons vivement ! Chaque détail avait été pensé, du cocktail d'accueil jusqu'à la pièce montée." },
    { name: "Mohammed Benkirane", avatar: "/figma/details/review-mohammed.jpg", date: "12 mars 2026", stars: 5, event: "Gala Corporate · 150 invités", text: "Pour notre gala annuel d'entreprise, Prestige Événements a dépassé toutes nos attentes. Professionnalisme de haut niveau, ponctualité parfaite, et un menu gastronomique qui a impressionné tous nos invités." },
    { name: "Amina Tazi", avatar: "/figma/details/review-amina.jpg", date: "12 mars 2026", stars: 4, event: "Fiançailles · 80 invités", text: "Très belle prestation pour nos fiançailles. La décoration florale était magnifique et le buffet délicieux. Petit bémol sur la ponctualité du DJ, mais l'équipe a su rattraper ça rapidement. Je recommande !" },
    { name: "Youssef Idrissi", avatar: "/figma/reviews/avatar-1.png", date: "2 février 2026", stars: 5, event: "Mariage · 300 invités", text: "Organisation parfaite du début à la fin. Nos invités ont adoré le buffet et l'ambiance de la soirée." },
    { name: "Salma Berrada", avatar: "/figma/reviews/avatar-2.png", date: "18 janvier 2026", stars: 5, event: "Anniversaire · 60 invités", text: "Une équipe à l'écoute et très réactive. La décoration était exactement ce que nous avions imaginé." },
  ],
  availability: {
    "2026-06-04": "reserved",
    "2026-06-10": "reserved",
    "2026-06-11": "reserved",
    "2026-06-17": "pending",
    "2026-06-18": "pending",
    "2026-06-24": "reserved",
    "2026-06-25": "reserved",
    "2026-07-04": "reserved",
    "2026-07-11": "pending",
    "2026-07-18": "reserved",
  },
};

/** Generic details for vendors we only have card data for. */
function fromCard(card: { id: string; name: string; city: string; rating: number; reviews: number; image: string; priceFrom: number }): VendorDetails {
  return {
    ...prestige,
    id: card.id,
    name: card.name,
    city: card.city,
    rating: card.rating,
    reviewCount: card.reviews,
    priceFrom: card.priceFrom,
    featured: false,
    description: `${card.name} accompagne vos plus beaux événements avec passion et professionnalisme. Contactez-nous pour recevoir un devis personnalisé adapté à votre date, votre budget et votre nombre d'invités.`,
    gallery: [card.image, ...prestige.gallery.slice(1)],
  };
}

export function getVendor(id: string): VendorDetails | undefined {
  if (id === prestige.id) return prestige;

  const card = vendorSections.flatMap((s) => s.vendors).find((v) => v.id === id);
  if (card) return fromCard(card);

  const featured = featuredVendors.find((v) => v.id === id) ?? offers.find((v) => v.id === id);
  if (featured) {
    return fromCard({
      ...featured,
      priceFrom: Number(featured.priceFrom.replace(/\./g, "")),
    });
  }
  return undefined;
}

/** All vendor ids — lets Next.js pre-build every vendor page. */
export function allVendorIds(): string[] {
  const ids = new Set<string>([prestige.id]);
  vendorSections.forEach((s) => s.vendors.forEach((v) => ids.add(v.id)));
  featuredVendors.forEach((v) => ids.add(v.id));
  offers.forEach((v) => ids.add(v.id));
  return [...ids];
}
