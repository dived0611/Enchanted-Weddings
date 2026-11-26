import type { Metadata } from "next";
import { Suspense } from "react";
import OffersExplorer from "@/components/offers/OffersExplorer";
import { categoryLabels, type Offer } from "@/data/offers";

export const metadata: Metadata = {
  title: "Trouver des prestataires — Enchanted Weddings",
  description: "Traiteurs, photographes, DJs, décoration, salles et plus : comparez les prestataires de mariage vérifiés au Maroc.",
};

// Search / filter page — built from the "Filter_offers" frame in Figma.
// Links like /offres?categorie=traiteurs open it already filtered.
async function Explorer({ searchParams }: { searchParams: PageProps<"/offres">["searchParams"] }) {
  const { categorie } = await searchParams;
  const initialCategory =
    typeof categorie === "string" && categorie in categoryLabels ? (categorie as Offer["category"]) : "";
  // `key` resets the filters when you come from another category link
  return <OffersExplorer key={initialCategory} initialCategory={initialCategory} />;
}

export default function OffersPage({ searchParams }: PageProps<"/offres">) {
  return (
    <Suspense fallback={<OffersExplorer initialCategory="" />}>
      <Explorer searchParams={searchParams} />
    </Suspense>
  );
}
