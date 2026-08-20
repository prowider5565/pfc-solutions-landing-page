import { defineRouting } from "next-intl/routing";

/** CLAUDE.md §2: locales uz (default, Latin script), ru, en. `/` → `/uz`. */
export const routing = defineRouting({
  locales: ["uz", "ru", "en"],
  defaultLocale: "uz",
});

export type Locale = (typeof routing.locales)[number];
