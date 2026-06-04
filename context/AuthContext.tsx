"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User, Role } from "@/lib/types";

const DEMO_USERS: Record<Role, User> = {
  user: { id: "u-1", name: "Visitor", email: "visitor@sakan.ae", role: "user" },
  agent: { id: "agent-1", name: "Layla Haddad", email: "layla@sakan.ae", role: "agent" },
  admin: { id: "admin-1", name: "Admin", email: "admin@sakan.ae", role: "admin" },
};

interface AuthContextValue {
  user: User | null;
  loginAs: (role: Role) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("sakan-user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        // ignore corrupt storage
      }
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    if (user) {
      window.localStorage.setItem("sakan-user", JSON.stringify(user));
    } else {
      window.localStorage.removeItem("sakan-user");
    }
  }, [user, hydrated]);

  const loginAs = (role: Role) => setUser(DEMO_USERS[role]);
  const logout = () => setUser(null);

  return <AuthContext.Provider value={{ user, loginAs, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
