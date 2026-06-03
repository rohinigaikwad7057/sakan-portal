export type PropertyType = "apartment" | "villa" | "townhouse" | "office";
export type ListingStatus = "pending" | "approved" | "rejected";
export type Role = "user" | "agent" | "admin";

export interface Listing {
  id: string;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  price: number;
  type: PropertyType;
  bedrooms: number;
  bathrooms: number;
  area: number; // sq ft
  city: { en: string; ar: string };
  location: { en: string; ar: string };
  image: string;
  status: ListingStatus;
  views: number;
  agentId: string;
  agentName: string;
  featured: boolean;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export interface FilterState {
  query: string;
  city: string;
  type: string;
  minPrice: number;
  maxPrice: number;
  bedrooms: string;
}
