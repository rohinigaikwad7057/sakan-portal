"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Home as HomeIcon, Heart, LayoutDashboard, LogOut } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export function Navbar() {
  const { t } = useLanguage();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const dashboardHref = user?.role === "admin" ? "/dashboard/admin" : "/dashboard/agent";

  const links = [
    { href: "/", label: t.nav.home },
    { href: "/listings", label: t.nav.listings },
    { href: "/favorites", label: t.nav.favorites },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-sand/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-display text-2xl font-semibold text-ink">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-gold">
            <HomeIcon size={18} />
          </span>
          {t.nav.brand}
        </Link>

        <nav className="hidden items-center gap-6 font-utility text-sm font-medium text-ink/80 md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="focus-ring rounded transition-colors hover:text-gold-deep">
              {link.label}
            </Link>
          ))}
          {user && (user.role === "agent" || user.role === "admin") && (
            <Link href={dashboardHref} className="focus-ring flex items-center gap-1.5 rounded transition-colors hover:text-gold-deep">
              <LayoutDashboard size={15} />
              {t.nav.dashboard}
            </Link>
          )}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitcher />
          {user ? (
            <button
              onClick={logout}
              className="focus-ring flex items-center gap-1.5 rounded-full bg-ink px-4 py-1.5 text-sm font-medium text-sand transition-opacity hover:opacity-90"
            >
              <LogOut size={14} />
              {t.nav.logout}
            </button>
          ) : (
            <Link
              href="/login"
              className="focus-ring rounded-full bg-gold px-4 py-1.5 text-sm font-semibold text-ink transition-opacity hover:opacity-90"
            >
              {t.nav.login}
            </Link>
          )}
        </div>

        <button className="focus-ring rounded p-2 text-ink md:hidden" onClick={() => setOpen((p) => !p)} aria-label="Menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-ink/10 px-4 pb-4 md:hidden">
          <nav className="flex flex-col gap-3 pt-3 font-utility text-sm font-medium text-ink/80">
            {links.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="focus-ring rounded">
                {link.label}
              </Link>
            ))}
            {user && (user.role === "agent" || user.role === "admin") && (
              <Link href={dashboardHref} onClick={() => setOpen(false)} className="focus-ring flex items-center gap-1.5 rounded">
                <LayoutDashboard size={15} />
                {t.nav.dashboard}
              </Link>
            )}
            <Link href="/favorites" onClick={() => setOpen(false)} className="focus-ring flex items-center gap-1.5 rounded">
              <Heart size={15} />
              {t.nav.favorites}
            </Link>
            <div className="flex items-center justify-between pt-2">
              <LanguageSwitcher />
              {user ? (
                <button onClick={logout} className="focus-ring rounded-full bg-ink px-4 py-1.5 text-sm font-medium text-sand">
                  {t.nav.logout}
                </button>
              ) : (
                <Link href="/login" onClick={() => setOpen(false)} className="focus-ring rounded-full bg-gold px-4 py-1.5 text-sm font-semibold text-ink">
                  {t.nav.login}
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
