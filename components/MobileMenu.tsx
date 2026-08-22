import { getLocale, getTranslations } from "next-intl/server";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Link } from "@/i18n/navigation";
import { localeHref, navRoutes } from "@/lib/menu";

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
          <Link href="/">
            <img src="/assets/img/logo.svg" alt="PFC Solutions" />
          </Link>
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
            1200px this is the only language control on the page.
            CLAUDE.md §4.1 requires it in the collapsible nav. */}
        <div className="mt-30">
          <LanguageSwitcher variant="inline" />
        </div>
      </div>
    </div>
  );
}
