"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, BedDouble, Bath, Ruler, MapPin, Heart, Send } from "lucide-react";
import { listings } from "@/data/listings";
import { useLanguage } from "@/context/LanguageContext";
import { useFavorites } from "@/context/FavoritesContext";

export default function ListingDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { t, locale } = useLanguage();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [sent, setSent] = useState(false);

  const listing = listings.find((l) => l.id === id);

  if (!listing) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
        <p className="text-muted">Listing not found.</p>
        <Link href="/listings" className="focus-ring mt-4 inline-block text-gold-deep hover:underline">
          {t.listing.backToListings}
        </Link>
      </div>
    );
  }

  const saved = isFavorite(listing.id);
  const typeLabel = t.filters[listing.type as "apartment" | "villa" | "townhouse" | "office"];

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <button
        onClick={() => router.back()}
        className="focus-ring flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-gold-deep"
      >
        <ArrowLeft size={15} />
        {t.listing.backToListings}
      </button>

      <div className="mt-4 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="relative h-72 w-full overflow-hidden rounded-2xl sm:h-96">
            <Image src={listing.image} alt={listing.title[locale]} fill className="object-cover" priority />
            {listing.featured && (
              <span className="absolute left-4 top-4 rounded-full bg-gold px-3 py-1 font-utility text-xs font-semibold text-ink">
                {t.listing.featured}
              </span>
            )}
          </div>

          <div className="mt-6 flex items-start justify-between gap-4">
            <div>
              <p className="flex items-center gap-1 font-utility text-xs uppercase tracking-wide text-muted">
                <MapPin size={13} />
                {listing.location[locale]}, {listing.city[locale]}
              </p>
              <h1 className="mt-1 font-display text-3xl font-semibold text-ink">{listing.title[locale]}</h1>
            </div>
            <button
              onClick={() => toggleFavorite(listing.id)}
              className="focus-ring flex items-center gap-1.5 rounded-full border border-ink/15 px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-ink hover:text-sand"
            >
              <Heart size={15} fill={saved ? "currentColor" : "none"} />
              {saved ? t.listing.saved : t.listing.save}
            </button>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 rounded-2xl border border-ink/10 bg-white p-5 sm:grid-cols-4">
            <Stat icon={<BedDouble size={18} />} label={t.listing.beds} value={listing.bedrooms} />
            <Stat icon={<Bath size={18} />} label={t.listing.baths} value={listing.bathrooms} />
            <Stat icon={<Ruler size={18} />} label={t.listing.sqft} value={listing.area.toLocaleString()} />
            <Stat icon={<MapPin size={18} />} label={t.filters.type} value={typeLabel} />
          </div>

          <div className="mt-6">
            <h2 className="font-display text-xl font-semibold text-ink">{t.listing.description}</h2>
            <p className="mt-2 leading-relaxed text-ink/75">{listing.description[locale]}</p>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-2xl border border-ink/10 bg-white p-5">
            <p className="font-utility text-2xl font-semibold text-ink">
              AED {listing.price.toLocaleString()}
              <span className="ms-1 text-sm font-normal text-muted">{t.listing.perYear}</span>
            </p>
            <p className="mt-3 text-sm text-muted">
              {t.listing.agent}: <span className="font-medium text-ink">{listing.agentName}</span>
            </p>

            {sent ? (
              <p className="mt-4 rounded-lg bg-teal/10 p-3 text-sm text-teal">{t.listing.inquirySent}</p>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
                className="mt-4 space-y-3"
              >
                <input
                  required
                  placeholder={t.auth.email}
                  type="email"
                  className="focus-ring w-full rounded-lg border border-ink/15 bg-sand px-3 py-2 text-sm outline-none"
                />
                <textarea
                  required
                  rows={3}
                  placeholder={t.listing.contactAgent}
                  className="focus-ring w-full rounded-lg border border-ink/15 bg-sand px-3 py-2 text-sm outline-none"
                />
                <button
                  type="submit"
                  className="focus-ring flex w-full items-center justify-center gap-2 rounded-lg bg-gold px-4 py-2 text-sm font-semibold text-ink transition-opacity hover:opacity-90"
                >
                  <Send size={15} />
                  {t.listing.sendInquiry}
                </button>
              </form>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) {
  return (
    <div className="flex flex-col items-center gap-1 text-center">
      <span className="text-gold-deep">{icon}</span>
      <span className="font-utility text-sm font-semibold text-ink">{value}</span>
      <span className="text-xs text-muted">{label}</span>
    </div>
  );
}
