"use client";

import { useRouter } from "next/navigation";
import { User, Briefcase, ShieldCheck } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { Role } from "@/lib/types";

export default function LoginPage() {
  const { t } = useLanguage();
  const { loginAs } = useAuth();
  const router = useRouter();

  const handleLogin = (role: Role) => {
    loginAs(role);
    if (role === "agent") router.push("/dashboard/agent");
    else if (role === "admin") router.push("/dashboard/admin");
    else router.push("/listings");
  };

  return (
    <div className="lattice-pattern flex min-h-[70vh] items-center justify-center bg-sand-deep px-4 py-16">
      <div className="w-full max-w-md rounded-2xl border border-ink/10 bg-white p-8 shadow-sm">
        <h1 className="font-display text-2xl font-semibold text-ink">{t.auth.loginTitle}</h1>
        <p className="mt-2 text-sm text-muted">{t.auth.loginSubtitle}</p>

        <form className="mt-6 space-y-3" onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            placeholder={t.auth.email}
            className="focus-ring w-full rounded-lg border border-ink/15 bg-sand px-3 py-2 text-sm outline-none"
          />
          <input
            type="password"
            placeholder={t.auth.password}
            className="focus-ring w-full rounded-lg border border-ink/15 bg-sand px-3 py-2 text-sm outline-none"
          />
          <button
            type="button"
            onClick={() => handleLogin("user")}
            className="focus-ring w-full rounded-lg bg-ink px-4 py-2 text-sm font-semibold text-sand transition-opacity hover:opacity-90"
          >
            {t.auth.submit}
          </button>
        </form>

        <div className="mt-6 border-t border-ink/10 pt-5">
          <p className="font-utility text-xs uppercase tracking-wide text-muted">{t.auth.demoAccounts}</p>
          <div className="mt-3 space-y-2">
            <button
              onClick={() => handleLogin("user")}
              className="focus-ring flex w-full items-center gap-2 rounded-lg border border-ink/10 px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-sand"
            >
              <User size={15} /> {t.auth.asUser}
            </button>
            <button
              onClick={() => handleLogin("agent")}
              className="focus-ring flex w-full items-center gap-2 rounded-lg border border-ink/10 px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-sand"
            >
              <Briefcase size={15} /> {t.auth.asAgent}
            </button>
            <button
              onClick={() => handleLogin("admin")}
              className="focus-ring flex w-full items-center gap-2 rounded-lg border border-ink/10 px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-sand"
            >
              <ShieldCheck size={15} /> {t.auth.asAdmin}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
