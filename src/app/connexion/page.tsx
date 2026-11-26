import type { Metadata } from "next";
import { Suspense } from "react";
import AuthCard from "@/components/auth/AuthCard";

export const metadata: Metadata = { title: "Connexion — Enchanted Weddings" };

// Reading the URL (?erreur=…) must happen inside <Suspense> in Next.js 16
async function SignIn({ searchParams }: { searchParams: PageProps<"/connexion">["searchParams"] }) {
  const { erreur } = await searchParams;
  return <AuthCard mode="signin" initialError={erreur ? "La connexion a échoué. Merci de réessayer." : undefined} />;
}

export default function SignInPage({ searchParams }: PageProps<"/connexion">) {
  return (
    <Suspense fallback={<AuthCard mode="signin" />}>
      <SignIn searchParams={searchParams} />
    </Suspense>
  );
}
