import Hero from "@/components/home/Hero";
import IntroLoader from "@/components/home/IntroLoader";
import CategoryBar from "@/components/home/CategoryBar";
import VendorSection from "@/components/home/VendorSection";
import FeaturedVendors from "@/components/home/FeaturedVendors";
import Stats from "@/components/home/Stats";
import Testimonials from "@/components/home/Testimonials";
import HowItWorks from "@/components/home/HowItWorks";
import ProCta from "@/components/home/ProCta";
import SmoothScroll from "@/components/home/motion/SmoothScroll";
import HomeMotion from "@/components/home/motion/HomeMotion";
import { vendorSections } from "@/data/home";

// Home page — built from the "HomePage_third" frame in Figma.
// SmoothScroll (Lenis) and HomeMotion (GSAP) are only used on this page.
export default function HomePage() {
  return (
    <>
      <SmoothScroll />
      {/* If JavaScript is off, show the hero (it's hidden until GSAP animates it) */}
      <noscript>
        <style>{`[data-hero-hide]{visibility:visible!important}[data-intro]{display:none!important}`}</style>
      </noscript>
      <HomeMotion>
        <IntroLoader />
        <Hero />
        <CategoryBar />
        {vendorSections.map((section) => (
          <VendorSection key={section.slug} section={section} />
        ))}
        <FeaturedVendors />
        <Stats />
        <Testimonials />
        <HowItWorks />
        <ProCta />
      </HomeMotion>
    </>
  );
}
