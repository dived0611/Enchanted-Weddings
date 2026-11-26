import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allVendorIds, getVendor } from "@/data/vendors";
import Gallery from "@/components/vendor/Gallery";
import VendorInfo from "@/components/vendor/VendorInfo";
import BookingCard from "@/components/vendor/BookingCard";
import Packages from "@/components/vendor/Packages";
import Partners from "@/components/vendor/Partners";
import VendorReviews from "@/components/vendor/VendorReviews";
import AvailabilityCalendar from "@/components/vendor/AvailabilityCalendar";

// Vendor details page — built from the "Details_page" frame in Figma.
// The address looks like /prestataires/prestige-evenements

// Pre-build one page per vendor we know about
export function generateStaticParams() {
  return allVendorIds().map((id) => ({ id }));
}

export async function generateMetadata({ params }: PageProps<"/prestataires/[id]">): Promise<Metadata> {
  const { id } = await params;
  const vendor = getVendor(id);
  if (!vendor) return { title: "Prestataire introuvable — Enchanted Weddings" };
  return {
    title: `${vendor.name} — ${vendor.city} | Enchanted Weddings`,
    description: vendor.description.slice(0, 155),
  };
}

export default async function VendorPage({ params }: PageProps<"/prestataires/[id]">) {
  const { id } = await params;
  const vendor = getVendor(id);
  if (!vendor) notFound();

  return (
    <div className="pb-24">
      <Gallery name={vendor.name} photos={vendor.gallery} extraPhotos={vendor.extraPhotos} />

      <div className="mx-auto mt-12 grid max-w-[1280px] gap-12 px-6 lg:grid-cols-[minmax(0,819px)_291px] lg:justify-between lg:gap-4 lg:pl-[120px] lg:pr-[35px]">
        {/* Left column */}
        <div className="min-w-0">
          <VendorInfo vendor={vendor} />
          <Packages packages={vendor.packages} />
          <Partners partners={vendor.partners} />
          <VendorReviews
            rating={vendor.rating}
            reviewCount={vendor.reviewCount}
            breakdown={vendor.ratingBreakdown}
            reviews={vendor.reviews}
          />
          <AvailabilityCalendar availability={vendor.availability} />
        </div>

        {/* Right column — stays visible while scrolling on desktop */}
        <aside className="order-first lg:order-none" aria-label="Demande de devis">
          <div className="lg:sticky lg:top-[100px]">
            <BookingCard
              vendorName={vendor.name}
              priceFrom={vendor.priceFrom}
              rating={vendor.rating}
              reviewCount={vendor.reviewCount}
            />
          </div>
        </aside>
      </div>
    </div>
  );
}
