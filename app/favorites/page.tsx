"use client";

import Link from "next/link";
import { ListingCard } from "@/components/ListingCard";
import { listings } from "@/data/listings";
import { useFavorites } from "@/context/FavoritesContext";
import { useLanguage } from "@/context/LanguageContext";

export default function FavoritesPage() {
  const { t } = useLanguage();
  const { favorites } = useFavorites();
  const saved = listings.filter((l) => favorites.includes(l.id));

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-3xl font-semibold text-ink">{t.favorites.title}</h1>

      {saved.length === 0 ? (
        <div className="mt-10 text-center">
          <p className="text-muted">{t.favorites.empty}</p>
          <Link href="/listings" className="focus-ring mt-3 inline-block text-gold-deep hover:underline">
            {t.favorites.browse}
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {saved.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );
}
