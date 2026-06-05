"use client";

import { useLanguage } from "@/context/LanguageContext";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="lattice-pattern-dark border-t border-ink/10 bg-ink text-sand">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <p className="font-display text-xl">{t.footer.tagline}</p>
        <p className="mt-2 max-w-xl text-sm text-sand/70">{t.footer.built}</p>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-sand/10 pt-4 text-xs text-sand/50">
          <span>© 2026 Sakan. {t.footer.rights}</span>
          <span className="font-utility">Next.js · TypeScript · Tailwind CSS</span>
        </div>
      </div>
    </footer>
  );
}
