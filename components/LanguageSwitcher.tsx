"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

type Variant = "dropdown" | "inline";

/**
 * CLAUDE.md §2 — language control that preserves the current path.
 * `usePathname` from i18n/navigation returns the pathname without the locale
 * prefix, so handing it back to <Link locale=…> swaps only the locale segment.
 *
 * Two shapes:
 *  - "dropdown" (header): the template's round .icon-btn with a globe, opening a
 *    panel. Restores the icon-button-plus-CTA layout the template ships with.
 *  - "inline" (footer, mobile menu): three plain text links; a 56px circle would
 *    look wrong in a copyright bar or a stacked mobile nav.
 *
 * The Aior template has no dropdown pattern outside .main-menu, so the panel is
 * styled in the <style> block in app/[locale]/layout.tsx from the template's own
 * custom properties.
 */
export default function LanguageSwitcher({
  variant = "dropdown",
}: {
  variant?: Variant;
}) {
  const active = useLocale();
  const pathname = usePathname();
  const t = useTranslations("nav");

  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(e: MouseEvent | TouchEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  if (variant === "inline") {
    return (
      <div className="lang-switcher lang-switcher--inline" role="group" aria-label={t("language")}>
        {routing.locales.map((locale) => (
          <Link
            key={locale}
            href={pathname}
            locale={locale}
            className={locale === active ? "is-active" : undefined}
            aria-current={locale === active ? "true" : undefined}
          >
            {locale.toUpperCase()}
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div className="lang-switcher" ref={rootRef}>
      <button
        ref={triggerRef}
        type="button"
        className="icon-btn"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={t("language")}
        onClick={() => setOpen((v) => !v)}
      >
        <i className="fa-solid fa-globe" aria-hidden="true"></i>
      </button>

      <ul className={`lang-dropdown${open ? " is-open" : ""}`} role="menu">
        {routing.locales.map((locale) => (
          <li key={locale} role="none">
            <Link
              href={pathname}
              locale={locale}
              role="menuitem"
              className={locale === active ? "is-active" : undefined}
              aria-current={locale === active ? "true" : undefined}
              onClick={() => setOpen(false)}
            >
              {locale.toUpperCase()}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
