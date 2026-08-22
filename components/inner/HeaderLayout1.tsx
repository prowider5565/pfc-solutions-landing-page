import { getLocale, getTranslations } from "next-intl/server";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import MainMenuList from "@/components/MainMenuList";
import { Link } from "@/i18n/navigation";
import { CTA_PATH, localeHref } from "@/lib/menu";

/** Inner-page header (header-layout1). Differs from the homepage's
 *  header-layout8 in wrapper classes, the logo asset, the extra .container
 *  nesting, and the header-button contents. */
export default async function HeaderLayout1() {
  const locale = await getLocale();
  const t = await getTranslations("nav");

  return (
    <header className="th-header header-layout1">
      <div className="container th-container">
        <div className="menu-area">
          <div className="sticky-wrapper">
            {/* Main Menu Area */}
            <div className="container">
              <div className="row align-items-center justify-content-between">
                <div className="col-auto">
                  <div className="header-logo">
                    <Link href="/">
                      <img src="/assets/img/logo.svg" alt="PFC Solutions" />
                    </Link>
                  </div>
                </div>
                <div className="col-auto">
                  <nav className="main-menu style2 d-none d-xl-inline-block">
                    <MainMenuList />
                  </nav>
                </div>
                <div className="col-auto">
                  <div className="header-button">
                    <LanguageSwitcher />
                    <a href={localeHref(locale, CTA_PATH)} className="th-btn2">
                      {t("cta")}
                    </a>
                    <button type="button" className="th-menu-toggle d-inline-block d-xl-none">
                      <i className="far fa-bars"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
