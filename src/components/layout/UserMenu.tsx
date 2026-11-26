"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { ChevronDown, FileText, Heart, LogOut, UserRound } from "lucide-react";

const menuLinks = [
  { href: "/compte", label: "Mon compte", icon: UserRound },
  { href: "/compte/favoris", label: "Mes favoris", icon: Heart },
  { href: "/compte/devis", label: "Mes devis", icon: FileText },
];

/** Avatar: Google photo if available, otherwise the first letter on a rose circle. */
export function Avatar({ user, size = 36 }: { user: User; size?: number }) {
  const photo: string | undefined = user.user_metadata?.avatar_url || user.user_metadata?.picture;
  const name: string = user.user_metadata?.full_name || user.email || "?";
  return photo ? (
    <Image
      src={photo}
      alt=""
      width={size}
      height={size}
      referrerPolicy="no-referrer"
      className="rounded-full object-cover ring-2 ring-white"
      style={{ width: size, height: size }}
    />
  ) : (
    <span
      className="flex items-center justify-center rounded-full bg-gradient-to-br from-[#d4a991] to-[#b07c66] text-sm font-medium text-white ring-2 ring-white"
      style={{ width: size, height: size }}
    >
      {name.charAt(0).toUpperCase()}
    </span>
  );
}

export function firstName(user: User) {
  const full: string | undefined = user.user_metadata?.full_name || user.user_metadata?.name;
  return full ? full.split(" ")[0] : (user.email ?? "").split("@")[0];
}

/** Account button in the header (desktop) with a small dropdown menu. */
export default function UserMenu({ user, onSignOut }: { user: User; onSignOut: () => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close when clicking outside or pressing Escape
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const fullName: string = user.user_metadata?.full_name || firstName(user);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex h-11 items-center gap-2 rounded-full border border-brand/30 bg-white/70 py-1 pl-1 pr-3 shadow-[0_4px_14px_-8px_rgba(120,80,60,0.4)] transition-colors hover:border-brand/60 hover:bg-white"
      >
        <Avatar user={user} size={34} />
        <span className="max-w-[110px] truncate text-sm font-medium text-ink">{firstName(user)}</span>
        <ChevronDown size={16} className={`text-brand transition-transform duration-200 ${open ? "rotate-180" : ""}`} aria-hidden="true" />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-[calc(100%+10px)] w-[260px] origin-top-right overflow-hidden rounded-2xl border border-brand/15 bg-white shadow-[0_24px_50px_-20px_rgba(80,50,35,0.45)]"
        >
          <div className="flex items-center gap-3 bg-gradient-to-br from-[#fbf6f2] to-[#f1e2d6] px-4 py-4">
            <Avatar user={user} size={42} />
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{fullName}</p>
              <p className="truncate text-xs text-muted-2">{user.email}</p>
            </div>
          </div>

          <ul className="py-2">
            {menuLinks.map(({ href, label, icon: Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  role="menuitem"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-ink transition-colors hover:bg-brand/10 hover:text-brand"
                >
                  <Icon size={17} strokeWidth={1.6} className="text-brand" aria-hidden="true" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="border-t border-brand/15 p-2">
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setOpen(false);
                onSignOut();
              }}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted-2 transition-colors hover:bg-red-50 hover:text-red-700"
            >
              <LogOut size={17} strokeWidth={1.6} aria-hidden="true" />
              Déconnexion
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
