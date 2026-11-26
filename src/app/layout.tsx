import type { Metadata } from "next";
import {
  Cormorant,
  Cormorant_Garamond,
  Gruppo,
  Montserrat,
  Montserrat_Alternates,
  Plus_Jakarta_Sans,
} from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// Fonts used in the Figma design. next/font downloads them at build time,
// so the site does not depend on Google at runtime.
const montserrat = Montserrat({
  variable: "--nf-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const montserratAlt = Montserrat_Alternates({
  variable: "--nf-montserrat-alt",
  subsets: ["latin"],
  weight: ["400"],
});
const cormorant = Cormorant({
  variable: "--nf-cormorant",
  subsets: ["latin"],
  weight: ["400"],
});
const cormorantGaramond = Cormorant_Garamond({
  variable: "--nf-cormorant-garamond",
  subsets: ["latin"],
  weight: ["400"],
});
const jakarta = Plus_Jakarta_Sans({
  variable: "--nf-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});
const gruppo = Gruppo({
  variable: "--nf-gruppo",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Enchanted Weddings — Organisez le mariage qui vous ressemble",
  description:
    "Trouvez les meilleurs prestataires de mariage au Maroc : traiteurs, photographes, DJs, décoration, salles et plus. Planifiez chaque étape avec notre AI Wedding Planner.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const fontVars = [
    montserrat.variable,
    montserratAlt.variable,
    cormorant.variable,
    cormorantGaramond.variable,
    jakarta.variable,
    gruppo.variable,
  ].join(" ");

  return (
    // suppressHydrationWarning: the intro script may add the "intro-seen" class before React loads
    <html lang="fr" className={`${fontVars} antialiased`} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
