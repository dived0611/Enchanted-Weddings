"use client";

// "use client" = this component runs in the browser, because the mobile menu
// needs state (open / closed).

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import UserMenu, { Avatar, firstName } from "./UserMenu";

const links = [
  { href: "/", label: "Home" },
  { href: "/offres", label: "Offers" },
  { href: "/ai-planner", label: "AI Planner" },
  { href: "/click-and-collect", label: "Click & Collect" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Know who is signed in (Supabase), and update when they log in / out
  useEffect(() => {
    const supabase = createClient();
    if (!supabase) return;
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data } = supabase.auth.onAuthStateChange((_event, session) => setUser(session?.user ?? null));
    return () => data.subscription.unsubscribe();
  }, []);

  async function signOut() {
    await createClient()?.auth.signOut();
    setOpen(false);
    router.refresh();
  }

  // Add a soft shadow once the page is scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-site-header
      className={`sticky top-0 z-50 backdrop-blur-[10px] transition-[background-color,box-shadow] duration-300 ${
        scrolled ? "bg-white/85 shadow-[0_6px_24px_-14px_rgba(120,80,60,0.35)]" : "bg-white/60"
      }`}
    >
      <div className="mx-auto flex h-[68px] max-w-[1280px] items-center justify-between px-6 lg:h-[80px] lg:px-[53px]">
        <Link href="/" data-nav-item aria-label="Enchanted Weddings — accueil" className="shrink-0">
          <Image
            src="/figma/logo.svg"
            alt="Enchanted Weddings"
            width={188}
            height={83}
            preload
            className="h-[48px] w-auto lg:h-[58px]"
          />
        </Link>

        {/* Desktop navigation */}
        <nav aria-label="Navigation principale" className="hidden items-center gap-10 lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              data-nav-item
              aria-current={pathname === l.href ? "page" : undefined}
              className="nav-link text-[15px] font-medium text-brand"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {user ? (
          <div data-nav-item className="hidden lg:block">
            <UserMenu user={user} onSignOut={signOut} />
          </div>
        ) : (
          <Link
            href="/inscription"
            data-nav-item
            className="hidden h-[40px] w-[132px] items-center justify-center rounded-full border border-brand text-[13px] uppercase tracking-[1px] text-brand transition-colors hover:bg-brand hover:text-white lg:flex"
          >
            Sign up
          </Link>
        )}

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          className="flex size-11 items-center justify-center rounded-full border border-brand text-brand lg:hidden"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            {open ? (
              <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            ) : (
              <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <nav id="mobile-menu" aria-label="Navigation mobile" className="border-t border-brand/20 bg-white/95 px-6 pb-6 lg:hidden">
          <ul className="flex flex-col">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 font-medium text-brand"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          {user ? (
            <div className="mt-3 rounded-2xl border border-brand/20 bg-white p-3">
              <div className="flex items-center gap-3">
                <Avatar user={user} size={40} />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{firstName(user)}</p>
                  <p className="truncate text-xs text-muted-2">{user.email}</p>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <Link
                  href="/compte"
                  onClick={() => setOpen(false)}
                  className="flex h-10 items-center justify-center rounded-full bg-brand text-sm text-white"
                >
                  Mon compte
                </Link>
                <button
                  type="button"
                  onClick={signOut}
                  className="flex h-10 items-center justify-center rounded-full border border-brand text-sm text-brand"
                >
                  Déconnexion
                </button>
              </div>
            </div>
          ) : (
            <Link
              href="/inscription"
              onClick={() => setOpen(false)}
              className="mt-3 flex h-12 items-center justify-center rounded-full border border-brand text-sm uppercase text-brand"
            >
              Sign up
            </Link>
          )}
        </nav>
      )}
    </header>
  );
}
