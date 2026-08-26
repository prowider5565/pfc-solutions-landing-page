/**
 * The industry vocabulary, shared by the /industries cards, the contact form's
 * select and the API route that forwards a submission to Telegram.
 *
 * Keys are identifiers, never copy: they travel over the wire, so they must be
 * byte-identical in every locale. Display names live in messages/{locale}.json
 * under `industries`; the Telegram labels below are the one exception, because
 * that message is written in Uzbek regardless of the visitor's locale.
 */

/** The five with a card on /industries — CLAUDE.md §4.7, in that exact order.
 *  Index-matched to `industries.items` in every message file: the cards read
 *  their copy by index, so reordering one without the other misfiles a lead. */
export const INDUSTRY_CARD_KEYS = [
  "manufacturing",
  "logistics",
  "construction",
  "horeca",
  "retail",
] as const;

/** What the contact form offers. "other" has no card — it is the escape hatch
 *  for a business that fits none of the five, so the field can stay optional
 *  without forcing a wrong answer. */
export const INDUSTRY_KEYS = [...INDUSTRY_CARD_KEYS, "other"] as const;

export type IndustryCardKey = (typeof INDUSTRY_CARD_KEYS)[number];
export type IndustryKey = (typeof INDUSTRY_KEYS)[number];

/**
 * Canonical Uzbek names, sent to Telegram whatever locale the visitor used, so
 * every notification reads the same and stays scannable. Kept in sync with
 * `industries.items[].name` in messages/uz.json by hand — they are the same
 * five names, but this copy is deliberately not read from the message files:
 * the API route has no locale, and a lead's record should not change wording
 * because someone edited the Uzbek page copy.
 */
export const INDUSTRY_TELEGRAM_LABELS: Record<IndustryKey, string> = {
  manufacturing: "Ishlab chiqarish va zavodlar",
  logistics: "Logistika va ombor",
  construction: "Qurilish",
  horeca: "HoReCa — restoran va mehmonxona",
  retail: "Savdo — chakana va ulgurji",
  other: "Boshqa",
};

export function isIndustryKey(value: unknown): value is IndustryKey {
  return (
    typeof value === "string" &&
    (INDUSTRY_KEYS as readonly string[]).includes(value)
  );
}
