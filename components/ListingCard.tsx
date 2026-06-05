"use client";

import Link from "next/link";
import Image from "next/image";
import { BedDouble, Bath, Ruler, Heart, MapPin } from "lucide-react";
import { Listing } from "@/lib/types";
import { useLanguage } from "@/context/LanguageContext";
import { useFavorites } from "@/context/FavoritesContext";

export function ListingCard({ listing }: { listing: Listing }) {
  const { t, locale } = useLanguage();
  const { isFavorite, toggleFavorite } = useFavorites();
  const saved = isFavorite(listing.id);

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-sm transition-shadow hover:shadow-lg">
      <Link href={`/listings/${listing.id}`} className="block">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={listing.image}
            alt={listing.title[locale]}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          {listing.featured && (
            <span className="absolute left-3 top-3 rounded-full bg-gold px-3 py-1 font-utility text-xs font-semibold text-ink">
              {t.listing.featured}
            </span>
          )}
        </div>
      </Link>

      <button
        onClick={() => toggleFavorite(listing.id)}
        aria-label={t.listing.save}
        className="focus-ring absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink shadow transition-colors hover:text-gold-deep"
      >
        <Heart size={17} fill={saved ? "currentColor" : "none"} className={saved ? "text-gold-deep" : ""} />
      </button>

      <div className="p-4">
        <p className="flex items-center gap-1 font-utility text-xs uppercase tracking-wide text-muted">
          <MapPin size={13} />
          {listing.location[locale]}, {listing.city[locale]}
        </p>
        <Link href={`/listings/${listing.id}`}>
          <h3 className="mt-1 font-display text-lg font-semibold leading-snug text-ink transition-colors group-hover:text-gold-deep">
            {listing.title[locale]}
          </h3>
        </Link>

        <div className="mt-3 flex items-center gap-4 text-sm text-ink/70">
          {listing.bedrooms > 0 && (
            <span className="flex items-center gap-1">
              <BedDouble size={15} /> {listing.bedrooms}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Bath size={15} /> {listing.bathrooms}
          </span>
          <span className="flex items-center gap-1">
            <Ruler size={15} /> {listing.area.toLocaleString()} {t.listing.sqft}
          </span>
        </div>

        <div className="mt-4 flex items-baseline justify-between border-t border-ink/10 pt-3">
          <p className="font-utility text-lg font-semibold text-ink">
            AED {listing.price.toLocaleString()}
            <span className="ms-1 text-xs font-normal text-muted">{t.listing.perYear}</span>
          </p>
          <Link href={`/listings/${listing.id}`} className="focus-ring text-sm font-semibold text-gold-deep hover:underline">
            {t.listing.viewDetails}
          </Link>
        </div>
      </div>
    </div>
  );
}
