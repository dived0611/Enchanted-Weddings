import type { Metadata } from "next";
import { Suspense } from "react";
import AuthCard from "@/components/auth/AuthCard";

export const metadata: Metadata = { title: "Créer un compte — Enchanted Weddings" };

// /inscription?type=professionnel pre-selects "Professionnel" (link from the home page).
// Reading the URL must happen inside <Suspense> in Next.js 16.
async function Register({ searchParams }: { searchParams: PageProps<"/inscription">["searchParams"] }) {
  const { type } = await searchParams;
  return <AuthCard mode="register" initialAccountType={type === "professionnel" ? "professionnel" : "particulier"} />;
}

export default function RegisterPage({ searchParams }: PageProps<"/inscription">) {
  return (
    <Suspense fallback={<AuthCard mode="register" />}>
      <Register searchParams={searchParams} />
    </Suspense>
  );
}
