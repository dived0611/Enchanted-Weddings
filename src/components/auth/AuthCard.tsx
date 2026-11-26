"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Eye, EyeOff, FileText, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type Mode = "signin" | "register";

const notConfigured =
  "La connexion n'est pas encore activée : ajoutez vos clés Supabase dans le fichier .env.local (voir .env.local.example).";

/** Google "G" logo (official colors). */
function GoogleLogo() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
    </svg>
  );
}

function PasswordInput({ id, name, autoComplete }: { id: string; name: string; autoComplete: string }) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="relative">
      <input
        id={id}
        name={name}
        type={visible ? "text" : "password"}
        autoComplete={autoComplete}
        placeholder="•••••••••"
        required
        minLength={8}
        className="h-[42px] w-full rounded-[4px] border border-brand bg-[#faf6f0] px-4 pr-11 text-sm outline-none transition-shadow focus:ring-2 focus:ring-brand/30"
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? "Masquer le mot de passe" : "Afficher le mot de passe"}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-2 hover:text-brand"
      >
        {visible ? <EyeOff size={18} strokeWidth={1.6} /> : <Eye size={18} strokeWidth={1.6} />}
      </button>
    </div>
  );
}

export default function AuthCard({ mode, initialAccountType = "particulier", initialError }: {
  mode: Mode;
  initialAccountType?: "particulier" | "professionnel";
  initialError?: string;
}) {
  const router = useRouter();
  const [accountType, setAccountType] = useState(initialAccountType);
  const [loading, setLoading] = useState<null | "form" | "google">(null);
  const [error, setError] = useState(initialError ?? "");
  const [info, setInfo] = useState("");
  const isRegister = mode === "register";

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setInfo("");
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");

    if (!/^\S+@\S+\.\S+$/.test(email)) return setError("Adresse e-mail invalide.");
    if (password.length < 8) return setError("Le mot de passe doit contenir au moins 8 caractères.");
    if (isRegister && password !== form.get("confirm")) return setError("Les mots de passe ne correspondent pas.");

    const supabase = createClient();
    if (!supabase) return setError(notConfigured);

    setLoading("form");
    if (isRegister) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { account_type: accountType },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      setLoading(null);
      if (error) return setError(translateError(error.message));
      if (data.session) {
        router.push("/");
        router.refresh();
      } else {
        setInfo("Compte créé ! Vérifiez votre boîte e-mail pour confirmer votre adresse.");
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setLoading(null);
      if (error) return setError(translateError(error.message));
      router.push("/");
      router.refresh();
    }
  }

  async function signInWithGoogle() {
    setError("");
    const supabase = createClient();
    if (!supabase) return setError(notConfigured);
    setLoading("google");
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback?next=/` },
    });
    // On success the browser leaves for Google, so we only handle errors here
    if (error) {
      setLoading(null);
      setError(translateError(error.message));
    }
  }

  const tabBase = "flex h-[52px] flex-1 items-center justify-center text-[17px] tracking-[2px] transition-colors";
  const labelClass = "mb-2 block text-[15px] uppercase";
  const inputClass =
    "h-[42px] w-full rounded-[4px] border border-brand bg-[#faf6f0] px-4 text-sm outline-none transition-shadow focus:ring-2 focus:ring-brand/30";

  return (
    <div className="mx-auto w-full max-w-[480px] px-4 pb-24 pt-8">
      <h1 className="text-center font-garamond text-[52px] leading-tight lg:text-[64px]">
        {isRegister ? "Welcome" : "Welcome Back"}
      </h1>
      <p className="mt-4 text-center tracking-[2px] text-muted-2">
        {isRegister ? "Register to Enchanted Weddings" : "Sign in to your Enchanted Weddings account"}
      </p>

      <div className="mt-3 rounded-2xl bg-[#efefef] px-[22px] pb-8 pt-6">
        {/* Tabs */}
        <div className="flex bg-white" role="tablist">
          <Link
            href="/connexion"
            role="tab"
            aria-selected={!isRegister}
            className={`${tabBase} ${!isRegister ? "rounded-r-full bg-[#c3937c] text-white" : "text-black hover:bg-brand/10"}`}
          >
            Sign in
          </Link>
          <Link
            href="/inscription"
            role="tab"
            aria-selected={isRegister}
            className={`${tabBase} ${isRegister ? "rounded-l-full bg-[#c3937c] text-white" : "text-black hover:bg-brand/10"}`}
          >
            Register
          </Link>
        </div>

        <form onSubmit={handleSubmit} noValidate className="mt-5 flex flex-col">
          {isRegister && (
            <fieldset className="mb-5">
              <legend className={labelClass}>Je suis</legend>
              <div className="grid grid-cols-2 gap-2">
                {(["particulier", "professionnel"] as const).map((t) => (
                  <label
                    key={t}
                    className={`flex h-[42px] cursor-pointer items-center justify-center rounded-full border text-sm capitalize transition-colors ${
                      accountType === t ? "border-brand bg-brand text-white" : "border-brand bg-[#faf6f0] text-brand hover:bg-brand/10"
                    }`}
                  >
                    <input
                      type="radio"
                      name="accountType"
                      value={t}
                      checked={accountType === t}
                      onChange={() => setAccountType(t)}
                      className="sr-only"
                    />
                    {t === "particulier" ? "Particulier" : "Professionnel"}
                  </label>
                ))}
              </div>
            </fieldset>
          )}

          <label htmlFor="auth-email" className={labelClass}>
            Email
          </label>
          <input id="auth-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required className={inputClass} />

          <label htmlFor="auth-password" className={`${labelClass} mt-5`}>
            Password
          </label>
          <PasswordInput id="auth-password" name="password" autoComplete={isRegister ? "new-password" : "current-password"} />

          {isRegister && (
            <>
              <label htmlFor="auth-confirm" className={`${labelClass} mt-3`}>
                Confirm password
              </label>
              <PasswordInput id="auth-confirm" name="confirm" autoComplete="new-password" />
            </>
          )}

          <div className="mt-5 text-right">
            {isRegister ? (
              <Link href="/connexion" className="text-brand underline underline-offset-2 hover:opacity-75">
                Avez-vous déjà un compte ?
              </Link>
            ) : (
              <Link href="/mot-de-passe-oublie" className="text-brand underline underline-offset-2 hover:opacity-75">
                Forgot password ?
              </Link>
            )}
          </div>

          {error && (
            <p role="alert" className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </p>
          )}
          {info && (
            <p role="status" className="mt-4 rounded-lg bg-green-50 px-3 py-2 text-sm text-green-800">
              {info}
            </p>
          )}

          <button
            type="submit"
            disabled={loading !== null}
            className="mt-3 flex h-[40px] items-center justify-center gap-2 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
            style={{ backgroundImage: "linear-gradient(90deg, #9c6650 0%, #b77a62 100%)" }}
          >
            {loading === "form" ? <Loader2 size={16} className="animate-spin" /> : <FileText size={16} strokeWidth={1.6} />}
            {isRegister ? "Sign up" : "Sign in"}
          </button>
        </form>

        <div className="my-6 flex items-center gap-3 text-xs text-muted-2">
          <span className="h-px flex-1 bg-brand/30" />
          ou
          <span className="h-px flex-1 bg-brand/30" />
        </div>

        <button
          type="button"
          onClick={signInWithGoogle}
          disabled={loading !== null}
          className="flex h-[40px] w-full items-center justify-center gap-3 rounded-full border border-brand bg-[#faf6f0] text-sm text-brand transition-colors hover:bg-white disabled:opacity-60"
        >
          {loading === "google" ? <Loader2 size={16} className="animate-spin" /> : <GoogleLogo />}
          Continue with Google
        </button>
        <button
          type="button"
          disabled
          title="Bientôt disponible"
          className="mt-3 flex h-[40px] w-full cursor-not-allowed items-center justify-center rounded-full border border-brand/50 bg-[#faf6f0] text-sm text-brand/60"
        >
          Continue with Facebook <span className="ml-2 text-xs">(bientôt)</span>
        </button>
      </div>
    </div>
  );
}

/** Supabase errors are in English — show French messages to visitors. */
function translateError(message: string) {
  const m = message.toLowerCase();
  if (m.includes("invalid login credentials")) return "E-mail ou mot de passe incorrect.";
  if (m.includes("already registered")) return "Un compte existe déjà avec cet e-mail.";
  if (m.includes("email not confirmed")) return "Confirmez d'abord votre adresse e-mail (lien envoyé par e-mail).";
  if (m.includes("provider is not enabled")) return "La connexion Google n'est pas encore activée dans Supabase.";
  return message;
}
