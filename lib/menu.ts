export type MenuLink = { href: string; label: string };

/**
 * Primary navigation — multipage model.
 *
 * Each nav item is a real route rather than an on-page anchor. `key` indexes
 * into the `nav` namespace of messages/{locale}.json; `path` is appended after
 * the locale segment.
 */
export const navRoutes = [
  { key: "services", path: "/services" },
  { key: "approach", path: "/approach" },
  { key: "industries", path: "/industries" },
  { key: "work", path: "/work" },
  { key: "about", path: "/about" },
  { key: "faq", path: "/faq" },
] as const;

/**
 * Build a locale-prefixed href. next-intl runs with localePrefix "always", so
 * every internal path carries its locale segment — a bare "/contact" would 404.
 */
export function localeHref(locale: string, path = "") {
  return `/${locale}${path}`;
}

/** CLAUDE.md §4.1 `cta` — the single conversion action across the whole site.
 *  Label comes from messages (`nav.cta`); the target is the contact route. */
export const CTA_PATH = "/contact";
