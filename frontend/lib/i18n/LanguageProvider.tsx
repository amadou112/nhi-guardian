"use client";

import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { Dictionary, Lang, dictionaries } from "@/lib/i18n/dictionary";

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  dict: Dictionary;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "nhi-guardian-lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "fr") {
      setLangState(stored);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (next: Lang) => {
    setLangState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  };

  const value = useMemo<LanguageContextValue>(
    () => ({ lang, setLang, dict: dictionaries[lang] }),
    [lang]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}
