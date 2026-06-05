"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { listings } from "@/data/listings";

export function Hero() {
  const { t, locale } = useLanguage();
  const router = useRouter();
  const [query, setQuery] = useState("");

  const cityCount = new Set(listings.map((l) => l.city.en)).size;
  const agentCount = new Set(listings.map((l) => l.agentId)).size;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/listings?q=${encodeURIComponent(query)}`);
  };

  return (
    <section className="lattice-pattern-dark relative overflow-hidden bg-ink text-sand">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <p className="font-utility text-sm uppercase tracking-[0.2em] text-gold">{t.hero.eyebrow}</p>
        <h1 className="mt-4 max-w-2xl font-display text-4xl font-semibold leading-tight sm:text-6xl">
          {t.hero.title}
        </h1>
        <p className="mt-5 max-w-xl text-base text-sand/75 sm:text-lg">{t.hero.subtitle}</p>

        <form onSubmit={handleSearch} className="mt-8 flex max-w-lg flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink/50" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              placeholder={t.hero.searchPlaceholder}
              className="focus-ring w-full rounded-full border border-sand/20 bg-sand px-11 py-3 text-sm text-ink outline-none"
            />
          </div>
          <button
            type="submit"
            className="focus-ring flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-ink transition-opacity hover:opacity-90"
          >
            {t.hero.cta}
            <ArrowRight size={16} />
          </button>
        </form>

        <dl className="mt-14 grid max-w-md grid-cols-3 gap-6 border-t border-sand/15 pt-8">
          <div>
            <dt className="font-display text-3xl font-semibold text-gold">{listings.length}</dt>
            <dd className="mt-1 text-xs text-sand/60">{t.hero.stat1Label}</dd>
          </div>
          <div>
            <dt className="font-display text-3xl font-semibold text-gold">{agentCount}</dt>
            <dd className="mt-1 text-xs text-sand/60">{t.hero.stat2Label}</dd>
          </div>
          <div>
            <dt className="font-display text-3xl font-semibold text-gold">{cityCount}</dt>
            <dd className="mt-1 text-xs text-sand/60">{t.hero.stat3Label}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
