"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Languages } from "lucide-react";

export function LanguageSwitcher() {
  const { t, toggleLocale } = useLanguage();

  return (
    <button
      onClick={toggleLocale}
      className="focus-ring flex items-center gap-1.5 rounded-full border border-ink/15 px-3 py-1.5 text-sm font-medium text-ink transition-colors hover:bg-ink hover:text-sand"
    >
      <Languages size={15} />
      {t.common.language}
    </button>
  );
}
