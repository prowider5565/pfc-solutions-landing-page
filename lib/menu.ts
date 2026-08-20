export type MenuLink = { href: string; label: string };

/**
 * Primary navigation, per CLAUDE.md §4.1.
 *
 * CLAUDE.md specifies a single landing page, so these are section anchors, not
 * routes. `key` indexes into the `nav` namespace of messages/{locale}.json;
 * `hash` is the section id on the landing page.
 */
export const navAnchors = [
  { key: "services", hash: "services" },
  { key: "approach", hash: "approach" },
  { key: "industries", hash: "industries" },
  { key: "work", hash: "work" },
  { key: "about", hash: "about" },
] as const;

/**
 * Build a locale-prefixed href. next-intl runs with localePrefix "always", so
 * every internal path carries its locale segment — a bare "/contact" would 404.
 */
export function localeHref(locale: string, path = "") {
  return `/${locale}${path}`;
}

/** Anchor onto the landing page, e.g. localeAnchor("uz", "services") → "/uz#services" */
export function localeAnchor(locale: string, hash: string) {
  return `/${locale}#${hash}`;
}

/** CLAUDE.md §4.1 `cta` — the single conversion action across the whole page.
 *  Label comes from messages (`nav.cta`); the target is the contact route. */
export const CTA_PATH = "/contact";
