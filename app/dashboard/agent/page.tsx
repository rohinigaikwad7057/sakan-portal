"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import { Plus, Eye, Pencil, Trash2 } from "lucide-react";
import { listings as initialListings } from "@/data/listings";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { ListingStatus, Listing } from "@/lib/types";

const statusStyles: Record<ListingStatus, string> = {
  approved: "bg-teal/10 text-teal",
  pending: "bg-gold/15 text-gold-deep",
  rejected: "bg-red-100 text-red-600",
};

export default function AgentDashboardPage() {
  const { t, locale } = useLanguage();
  const { user } = useAuth();
  const router = useRouter();
  const [items, setItems] = useState<Listing[]>(initialListings);

  useEffect(() => {
    if (!user) router.push("/login");
  }, [user, router]);

  if (!user) return null;

  const mine = items.filter((l) => l.agentId === (user.role === "agent" ? user.id : items[0].agentId));
  const totalViews = mine.reduce((sum, l) => sum + l.views, 0);
  const active = mine.filter((l) => l.status === "approved").length;
  const pending = mine.filter((l) => l.status === "pending").length;

  const remove = (id: string) => setItems((prev) => prev.filter((l) => l.id !== id));

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-sm text-muted">
            {t.dashboard.welcome}, {user.name}
          </p>
          <h1 className="font-display text-3xl font-semibold text-ink">{t.dashboard.agentTitle}</h1>
        </div>
        <button className="focus-ring flex items-center gap-2 rounded-full bg-gold px-4 py-2 text-sm font-semibold text-ink transition-opacity hover:opacity-90">
          <Plus size={16} />
          {t.dashboard.addListing}
        </button>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label={t.dashboard.myListings} value={mine.length} />
        <StatCard label={t.dashboard.totalViews} value={totalViews.toLocaleString()} />
        <StatCard label={t.dashboard.pendingReview} value={pending} />
      </div>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-ink/10 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-ink/10 bg-sand text-xs uppercase tracking-wide text-muted">
            <tr>
              <th className="px-4 py-3">{t.nav.listings}</th>
              <th className="px-4 py-3">{t.filters.city}</th>
              <th className="px-4 py-3">AED</th>
              <th className="px-4 py-3">{t.dashboard.totalViews}</th>
              <th className="px-4 py-3">{t.dashboard.status}</th>
              <th className="px-4 py-3 text-right">{t.dashboard.actions}</th>
            </tr>
          </thead>
          <tbody>
            {mine.map((listing) => (
              <tr key={listing.id} className="border-b border-ink/5 last:border-0">
                <td className="flex items-center gap-3 px-4 py-3">
                  <div className="relative h-10 w-14 overflow-hidden rounded-md">
                    <Image src={listing.image} alt={listing.title[locale]} fill className="object-cover" />
                  </div>
                  <span className="font-medium text-ink">{listing.title[locale]}</span>
                </td>
                <td className="px-4 py-3 text-ink/70">{listing.city[locale]}</td>
                <td className="px-4 py-3 font-utility text-ink/70">{listing.price.toLocaleString()}</td>
                <td className="px-4 py-3 text-ink/70">
                  <span className="flex items-center gap-1">
                    <Eye size={14} /> {listing.views}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[listing.status]}`}>
                    {t.dashboard[listing.status]}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="focus-ring rounded p-1.5 text-ink/60 transition-colors hover:text-gold-deep" aria-label={t.dashboard.edit}>
                      <Pencil size={15} />
                    </button>
                    <button
                      onClick={() => remove(listing.id)}
                      className="focus-ring rounded p-1.5 text-ink/60 transition-colors hover:text-red-500"
                      aria-label={t.dashboard.delete}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-2xl border border-ink/10 bg-white p-5">
      <p className="font-display text-3xl font-semibold text-ink">{value}</p>
      <p className="mt-1 text-sm text-muted">{label}</p>
    </div>
  );
}
