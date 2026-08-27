import { defineRouting } from "next-intl/routing";

/** CLAUDE.md §2: locales uz (default, Latin script), ru, en. `/` → `/uz`. */
export const routing = defineRouting({
  locales: ["uz", "ru", "en"],
  defaultLocale: "uz",
  // Off, or the middleware negotiates the locale from `accept-language` and
  // the NEXT_LOCALE cookie, so `/` sent a Russian or English browser to /ru
  // or /en. §2 wants `/` → `/uz` unconditionally; visitors choose another
  // language with the header switcher, which navigates to an explicit path.
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
