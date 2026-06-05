"use client";

import { useLanguage } from "@/context/LanguageContext";
import { cities } from "@/data/listings";
import { FilterState } from "@/lib/types";
import { RotateCcw, Search } from "lucide-react";

interface FilterBarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  resultCount: number;
}

export const DEFAULT_FILTERS: FilterState = {
  query: "",
  city: "",
  type: "",
  minPrice: 0,
  maxPrice: 600000,
  bedrooms: "",
};

export function FilterBar({ filters, onChange, resultCount }: FilterBarProps) {
  const { t, locale } = useLanguage();

  const update = (patch: Partial<FilterState>) => onChange({ ...filters, ...patch });

  return (
    <div className="rounded-2xl border border-ink/10 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg font-semibold text-ink">{t.filters.title}</h2>
        <button
          onClick={() => onChange(DEFAULT_FILTERS)}
          className="focus-ring flex items-center gap-1 text-sm text-muted transition-colors hover:text-gold-deep"
        >
          <RotateCcw size={14} />
          {t.filters.reset}
        </button>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <div className="relative lg:col-span-2">
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            value={filters.query}
            onChange={(e) => update({ query: e.target.value })}
            placeholder={t.hero.searchPlaceholder}
            className="focus-ring w-full rounded-lg border border-ink/15 bg-sand px-9 py-2 text-sm text-ink outline-none"
          />
        </div>

        <select
          value={filters.city}
          onChange={(e) => update({ city: e.target.value })}
          className="focus-ring w-full rounded-lg border border-ink/15 bg-sand px-3 py-2 text-sm text-ink outline-none"
        >
          <option value="">{t.filters.allCities}</option>
          {cities.map((c) => (
            <option key={c.en} value={c.en}>
              {c[locale]}
            </option>
          ))}
        </select>

        <select
          value={filters.type}
          onChange={(e) => update({ type: e.target.value })}
          className="focus-ring w-full rounded-lg border border-ink/15 bg-sand px-3 py-2 text-sm text-ink outline-none"
        >
          <option value="">{t.filters.allTypes}</option>
          <option value="apartment">{t.filters.apartment}</option>
          <option value="villa">{t.filters.villa}</option>
          <option value="townhouse">{t.filters.townhouse}</option>
          <option value="office">{t.filters.office}</option>
        </select>

        <select
          value={filters.bedrooms}
          onChange={(e) => update({ bedrooms: e.target.value })}
          className="focus-ring w-full rounded-lg border border-ink/15 bg-sand px-3 py-2 text-sm text-ink outline-none"
        >
          <option value="">{t.filters.bedrooms}: {t.filters.any}</option>
          {[0, 1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              {t.filters.bedrooms}: {n}+
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-5">
        <div className="col-span-2 lg:col-span-2">
          <label className="font-utility text-xs uppercase tracking-wide text-muted">
            {t.filters.minPrice}: AED {filters.minPrice.toLocaleString()}
          </label>
          <input
            type="range"
            min={0}
            max={600000}
            step={10000}
            value={filters.minPrice}
            onChange={(e) => update({ minPrice: Number(e.target.value) })}
            className="mt-1 w-full accent-[var(--color-gold)]"
          />
        </div>
        <div className="col-span-2 lg:col-span-2">
          <label className="font-utility text-xs uppercase tracking-wide text-muted">
            {t.filters.maxPrice}: AED {filters.maxPrice.toLocaleString()}
          </label>
          <input
            type="range"
            min={0}
            max={600000}
            step={10000}
            value={filters.maxPrice}
            onChange={(e) => update({ maxPrice: Number(e.target.value) })}
            className="mt-1 w-full accent-gold"
          />
        </div>
        <div className="col-span-4 flex items-end justify-end lg:col-span-1">
          <span className="font-utility text-sm text-muted">
            {resultCount} {t.filters.results}
          </span>
        </div>
      </div>
    </div>
  );
}
