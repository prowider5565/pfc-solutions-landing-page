import { getLocale, getTranslations } from "next-intl/server";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { CTA_PATH, localeHref, navRoutes } from "@/lib/menu";

export default async function MobileMenu() {
  const locale = await getLocale();
  const t = await getTranslations("nav");

  return (
    <div className="th-menu-wrapper">
      <div className="th-menu-area text-center">
        <button className="th-menu-toggle">
          <i className="fal fa-times"></i>
        </button>
        <div className="mobile-logo">
          <a href={localeHref(locale)}>
            <img src="/assets/img/logo.svg" alt="PFC Solutions" />
          </a>
        </div>

        <div className="th-mobile-menu">
          <ul>
            {navRoutes.map((item) => (
              <li key={item.key}>
                <a href={localeHref(locale, item.path)}>{t(item.key)}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* The header's .header-button block is d-none d-xl-block, so below
            1200px this drawer is the only place the language control and the
            primary CTA exist. CLAUDE.md §4.1 requires the language control
            here; the CTA follows it because §8.7 asks for one primary call to
            action that repeats through the page, and below xl the header has
            none. */}
        <div className="mt-30">
          <LanguageSwitcher variant="inline" />
        </div>
        <div className="mt-30 pfc-menu-cta">
          <a href={localeHref(locale, CTA_PATH)} className="th-btn2">
            {t("cta")}
          </a>
        </div>
      </div>
    </div>
  );
}
