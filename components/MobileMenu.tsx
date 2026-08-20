import { getLocale, getTranslations } from "next-intl/server";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { localeAnchor, navAnchors } from "@/lib/menu";

const BASE_URL = process.env.BASE_URL || "/";

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
          <a href={BASE_URL}>
            <img src="/assets/img/logo.svg" alt="PFC Solutions" />
          </a>
        </div>

        <div className="th-mobile-menu">
          <ul>
            {navAnchors.map((item) => (
              <li key={item.key}>
                <a href={localeAnchor(locale, item.hash)}>{t(item.key)}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* The header's .header-button block is d-none d-xl-block, so below
            1200px this is the only language control on the page.
            CLAUDE.md §4.1 requires it in the collapsible nav. */}
        <div className="mt-30">
          <LanguageSwitcher variant="inline" />
        </div>
      </div>
    </div>
  );
}
