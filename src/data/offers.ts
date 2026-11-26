/*
  Mock data for the /offres page (Stage 1).
  Stage 2 will load these from the database and filter on the server.
*/
import type { CategorySlug } from "@/components/icons/CategoryIcon";
import { featuredVendors, type FeaturedVendor } from "./home";

export type Offer = FeaturedVendor & {
  category: Exclude<CategorySlug, "tous">;
  pricePerPers: number; // used by the budget filter
  eventTypes: string[];
  services: string[];
};

export const cities = ["Casablanca", "Marrakech", "Rabat", "Tanger", "Fès", "Agadir"];
export const eventTypes = ["Mariage", "Fiançailles", "Anniversaire", "Baptême", "Entreprise", "Soirée privée"];
export const serviceOptions = ["Traiteur", "DJ", "Photographe", "Décoration", "Maquillage", "Wedding Planner", "Salle", "Animation"];

export const categoryLabels: Record<Offer["category"], string> = {
  traiteurs: "Traiteur",
  "photo-video": "Photo & Vidéo",
  "musiciens-djs": "Musiciens & DJs",
  beaute: "Mise en beauté",
  decoration: "Décoration",
  "salles-lieux": "Salles & Lieux",
  negafa: "Negafa",
};

const images = [
  "/figma/featured/al-baraka.png",
  "/figma/featured/prestige-events.png",
  "/figma/featured/festin-royal.png",
  "/figma/featured/saveurs-maroc.png",
  "/figma/vendors/traiteur-3.png",
  "/figma/vendors/traiteur-1.png",
  "/figma/details/gallery-1.jpg",
  "/figma/details/gallery-3.jpg",
];
const logos = ["/figma/featured/avatar-1.png", "/figma/featured/avatar-2.png", "/figma/featured/avatar-3.png"];

// The 6 real vendors from Figma (all caterers)
const caterers: Offer[] = featuredVendors.map((v, i) => ({
  ...v,
  category: "traiteurs",
  pricePerPers: [850, 950, 700, 650, 720, 900][i],
  eventTypes: v.tags,
  services: ["Traiteur", i % 2 ? "Décoration" : "Animation"],
}));

// Extra placeholder vendors in other categories so the filters have data
const extra: Array<[string, Offer["category"], string, number, string[], string[]]> = [
  ["Studio Lumière", "photo-video", "Casablanca", 1200, ["Mariage", "Entreprise"], ["Photographe"]],
  ["Mémoires d'Or", "photo-video", "Marrakech", 900, ["Mariage", "Fiançailles"], ["Photographe"]],
  ["DJ Karim", "musiciens-djs", "Casablanca", 800, ["Mariage", "Soirée privée"], ["DJ", "Animation"]],
  ["Orchestre Al Fan", "musiciens-djs", "Fès", 1500, ["Mariage"], ["DJ", "Animation"]],
  ["Nadia Beauty", "beaute", "Rabat", 600, ["Mariage", "Fiançailles"], ["Maquillage"]],
  ["Fleurs & Rêves", "decoration", "Marrakech", 1800, ["Mariage", "Anniversaire"], ["Décoration"]],
  ["Atelier Floral", "decoration", "Tanger", 1100, ["Mariage", "Baptême"], ["Décoration"]],
  ["Palais Mirage", "salles-lieux", "Marrakech", 4500, ["Mariage", "Entreprise"], ["Salle", "Traiteur"]],
  ["Villa Jasmine", "salles-lieux", "Agadir", 3800, ["Mariage", "Soirée privée"], ["Salle"]],
  ["Lalla Negafa", "negafa", "Fès", 2500, ["Mariage"], ["Maquillage", "Wedding Planner"]],
  ["Dar Negafa Royale", "negafa", "Casablanca", 3000, ["Mariage", "Fiançailles"], ["Maquillage"]],
  ["Wedding Dream Planner", "salles-lieux", "Rabat", 5000, ["Mariage"], ["Wedding Planner", "Décoration"]],
];

const others: Offer[] = extra.map(([name, category, city, price, events, services], i) => ({
  id: name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, ""),
  name,
  city,
  category,
  rating: [4.9, 4.7, 4.8, 4.6, 5][i % 5],
  reviews: 20 + ((i * 17) % 90),
  description: `${categoryLabels[category]} de confiance à ${city}, au service de vos plus beaux événements.`,
  tags: events,
  guests: ["50–300 invités", "100–500 invités", "30–200 invités"][i % 3],
  priceFrom: (price * 25).toLocaleString("de-DE"),
  pricePerPers: price,
  eventTypes: events,
  services,
  image: images[i % images.length],
  logo: logos[i % logos.length],
}));

export const offers: Offer[] = [...caterers, ...others];
