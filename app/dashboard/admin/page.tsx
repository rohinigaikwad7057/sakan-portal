"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Check, X } from "lucide-react";
import { listings as initialListings } from "@/data/listings";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { ListingStatus, Listing } from "@/lib/types";

const statusStyles: Record<ListingStatus, string> = {
  approved: "bg-teal/10 text-teal",
  pending: "bg-gold/15 text-gold-deep",
  rejected: "bg-red-100 text-red-600",
};

const platformUsers = [
  { id: "agent-1", name: "Layla Haddad", email: "layla@sakan.ae", role: "agent" as const },
  { id: "agent-2", name: "Omar Suleiman", email: "omar@sakan.ae", role: "agent" as const },
  { id: "agent-3", name: "Fatima Al Suwaidi", email: "fatima@sakan.ae", role: "agent" as const },
  { id: "agent-4", name: "Hassan Youssef", email: "hassan@sakan.ae", role: "agent" as const },
  { id: "admin-1", name: "Admin", email: "admin@sakan.ae", role: "admin" as const },
];

export default function AdminDashboardPage() {
  const { t, locale } = useLanguage();
  const { user } = useAuth();
  const router = useRouter();
  const [items, setItems] = useState<Listing[]>(initialListings);

  useEffect(() => {
    if (!user) router.push("/login");
    else if (user.role !== "admin") router.push("/dashboard/agent");
  }, [user, router]);

  if (!user || user.role !== "admin") return null;

  const setStatus = (id: string, status: ListingStatus) =>
    setItems((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));

  const pending = items.filter((l) => l.status === "pending");

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <p className="text-sm text-muted">
        {t.dashboard.welcome}, {user.name}
      </p>
      <h1 className="font-display text-3xl font-semibold text-ink">{t.dashboard.adminTitle}</h1>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label={t.dashboard.allListings} value={items.length} />
        <StatCard label={t.dashboard.pendingReview} value={pending.length} />
        <StatCard label={t.dashboard.allUsers} value={platformUsers.length} />
      </div>

      <h2 className="mt-10 font-display text-xl font-semibold text-ink">{t.dashboard.allListings}</h2>
      <div className="mt-4 overflow-x-auto rounded-2xl border border-ink/10 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-ink/10 bg-sand text-xs uppercase tracking-wide text-muted">
            <tr>
              <th className="px-4 py-3">{t.nav.listings}</th>
              <th className="px-4 py-3">{t.listing.agent}</th>
              <th className="px-4 py-3">{t.filters.city}</th>
              <th className="px-4 py-3">{t.dashboard.status}</th>
              <th className="px-4 py-3 text-right">{t.dashboard.actions}</th>
            </tr>
          </thead>
          <tbody>
            {items.map((listing) => (
              <tr key={listing.id} className="border-b border-ink/5 last:border-0">
                <td className="flex items-center gap-3 px-4 py-3">
                  <div className="relative h-10 w-14 overflow-hidden rounded-md">
                    <Image src={listing.image} alt={listing.title[locale]} fill className="object-cover" />
                  </div>
                  <span className="font-medium text-ink">{listing.title[locale]}</span>
                </td>
                <td className="px-4 py-3 text-ink/70">{listing.agentName}</td>
                <td className="px-4 py-3 text-ink/70">{listing.city[locale]}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[listing.status]}`}>
                    {t.dashboard[listing.status]}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setStatus(listing.id, "approved")}
                      className="focus-ring rounded p-1.5 text-ink/60 transition-colors hover:text-teal"
                      aria-label={t.dashboard.approve}
                    >
                      <Check size={15} />
                    </button>
                    <button
                      onClick={() => setStatus(listing.id, "rejected")}
                      className="focus-ring rounded p-1.5 text-ink/60 transition-colors hover:text-red-500"
                      aria-label={t.dashboard.reject}
                    >
                      <X size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="mt-10 font-display text-xl font-semibold text-ink">{t.dashboard.allUsers}</h2>
      <div className="mt-4 overflow-x-auto rounded-2xl border border-ink/10 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-ink/10 bg-sand text-xs uppercase tracking-wide text-muted">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">{t.dashboard.role}</th>
            </tr>
          </thead>
          <tbody>
            {platformUsers.map((u) => (
              <tr key={u.id} className="border-b border-ink/5 last:border-0">
                <td className="px-4 py-3 font-medium text-ink">{u.name}</td>
                <td className="px-4 py-3 text-ink/70">{u.email}</td>
                <td className="px-4 py-3 capitalize text-ink/70">{u.role}</td>
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
