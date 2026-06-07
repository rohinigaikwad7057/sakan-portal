"use client";

import { Suspense, useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ListingCard } from "@/components/ListingCard";
import { FilterBar, DEFAULT_FILTERS } from "@/components/FilterBar";
import { listings } from "@/data/listings";
import { FilterState } from "@/lib/types";
import { useLanguage } from "@/context/LanguageContext";

function ListingsContent() {
  const { t, locale } = useLanguage();
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);

  useEffect(() => {
    const q = searchParams.get("q");
    if (q) setFilters((prev) => ({ ...prev, query: q }));
  }, [searchParams]);

  const filtered = useMemo(() => {
    return listings.filter((listing) => {
      if (listing.status !== "approved") return false;
      const query = filters.query.trim().toLowerCase();
      if (query) {
        const haystack = `${listing.title.en} ${listing.title.ar} ${listing.location.en} ${listing.location.ar} ${listing.city.en} ${listing.city.ar}`.toLowerCase();
        if (!haystack.includes(query)) return false;
      }
      if (filters.city && listing.city.en !== filters.city) return false;
      if (filters.type && listing.type !== filters.type) return false;
      if (filters.bedrooms && listing.bedrooms < Number(filters.bedrooms)) return false;
      if (listing.price < filters.minPrice || listing.price > filters.maxPrice) return false;
      return true;
    });
  }, [filters]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-3xl font-semibold text-ink">{t.nav.listings}</h1>

      <div className="mt-6">
        <FilterBar filters={filters} onChange={setFilters} resultCount={filtered.length} />
      </div>

      {filtered.length === 0 ? (
        <p className="mt-12 text-center text-muted">{t.favorites.empty}</p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function ListingsPage() {
  return (
    <Suspense>
      <ListingsContent />
    </Suspense>
  );
}
