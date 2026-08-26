"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

type Variant = "dropdown" | "inline";

/**
 * next-intl's <Link> would normally do this for us, but we deliberately use a
 * plain <a> (see the note on the component below), so the cookie its click
 * handler writes has to be written here instead. Same shape as next-intl's
 * default `localeCookie`: name NEXT_LOCALE, path /, SameSite=Lax, session.
 * Without it, middleware's locale detection would keep sending a bare "/" to
 * the previously chosen locale.
 */
function syncLocaleCookie(locale: string) {
  document.cookie = `NEXT_LOCALE=${locale};path=/;sameSite=lax;`;
}

/**
 * CLAUDE.md §2 — language control that preserves the current path.
 * `usePathname` from i18n/navigation returns the pathname without the locale
 * prefix, so handing it back to <Link locale=…> swaps only the locale segment.
 *
 * Plain <a>, not next-intl's <Link>, and that is load-bearing. <Link> does a
 * client-side navigation: React unmounts the whole tree and mounts a fresh one
 * for the new locale. The template's jQuery/GSAP layer (main.js) initialises
 * exactly once per document — Swiper instances, the .sticky-wrapper scroll
 * handler and every ScrollTrigger stay bound to the DOM nodes React just threw
 * away — so after a soft locale switch the sticky header never appears, the
 * brand slider renders as a plain list and every pinned section is dead. An
 * <a> forces a real document load, which re-runs main.js against the new DOM.
 * Same reason MainMenuList and the header CTA use <a>.
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
  const localizedHref = (locale: string) =>
    `/${locale}${pathname === "/" ? "" : pathname}`;

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
          <a
            key={locale}
            href={localizedHref(locale)}
            hrefLang={locale}
            className={locale === active ? "is-active" : undefined}
            aria-current={locale === active ? "true" : undefined}
            onClick={() => syncLocaleCookie(locale)}
          >
            {locale.toUpperCase()}
          </a>
        ))}
      </div>
    );
  }

  return (
    <div className="lang-switcher" ref={rootRef}>
      <button
        ref={triggerRef}
        type="button"
        className="icon-btn lang-flag-btn"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={t("language")}
        onClick={() => setOpen((v) => !v)}
      >
        {/* The active locale's flag fills the circle edge to edge. */}
        <img src={`/assets/img/flags/${active}.svg`} alt="" aria-hidden="true" />
      </button>

      <ul className={`lang-dropdown${open ? " is-open" : ""}`} role="menu">
        {routing.locales.map((locale) => (
          <li key={locale} role="none">
            <a
              href={localizedHref(locale)}
              hrefLang={locale}
              role="menuitem"
              className={locale === active ? "is-active" : undefined}
              aria-current={locale === active ? "true" : undefined}
              onClick={() => {
                syncLocaleCookie(locale);
                setOpen(false);
              }}
            >
              <img
                className="lang-flag"
                src={`/assets/img/flags/${locale}.svg`}
                alt=""
                aria-hidden="true"
              />
              {locale.toUpperCase()}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
