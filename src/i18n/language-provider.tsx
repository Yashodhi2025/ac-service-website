"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DEFAULT_LOCALE, LOCALE_STORAGE_KEY } from "./types";
import type { Locale, Messages } from "./types";
import { enMessages } from "./messages/en";
import { siMessages } from "./messages/si";

const dictionaries: Record<Locale, Messages> = {
  si: siMessages,
  en: enMessages,
};

type LanguageContextValue = {
  locale: Locale;
  setLocale: (next: Locale) => void;
  messages: Messages;
};

const LanguageContext = createContext<LanguageContextValue>({
  locale: DEFAULT_LOCALE,
  setLocale: () => {},
  messages: dictionaries[DEFAULT_LOCALE],
});

function readStoredLocale(): Locale {
  try {
    const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    if (stored === "en" || stored === "si") return stored;
  } catch {
    // Ignore storage failures in restricted contexts.
  }
  return DEFAULT_LOCALE;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    const stored = readStoredLocale();
    if (stored !== DEFAULT_LOCALE) {
      const frame = requestAnimationFrame(() => setLocaleState(stored));
      return () => cancelAnimationFrame(frame);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dataset.locale = locale;
    // Language change can alter line wrapping height; keep ScrollTrigger positions accurate.
    const timer = window.setTimeout(() => {
      try {
        ScrollTrigger.refresh();
      } catch {
        // Ignore if ScrollTrigger is not registered on the current route.
      }
    }, 80);
    return () => window.clearTimeout(timer);
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, next);
    } catch {
      // Ignore storage write failures.
    }
  }, []);

  const value = useMemo<LanguageContextValue>(
    () => ({
      locale,
      setLocale,
      messages: dictionaries[locale],
    }),
    [locale, setLocale]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}
