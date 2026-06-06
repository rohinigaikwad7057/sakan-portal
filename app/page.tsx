"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/Hero";
import { ListingCard } from "@/components/ListingCard";
import { listings } from "@/data/listings";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const { t } = useLanguage();
  const featured = listings.filter((l) => l.featured && l.status === "approved");

  return (
    <div>
      <Hero />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="font-utility text-xs uppercase tracking-[0.2em] text-gold-deep">{t.listing.featured}</p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-ink">{t.nav.listings}</h2>
          </div>
          <Link href="/listings" className="focus-ring flex items-center gap-1 text-sm font-semibold text-gold-deep hover:underline">
            {t.hero.cta}
            <ArrowRight size={15} />
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </section>
    </div>
  );
}
