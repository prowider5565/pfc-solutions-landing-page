import { getLocale, getTranslations } from "next-intl/server";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import MainMenuList from "@/components/MainMenuList";
import { CTA_PATH, localeHref } from "@/lib/menu";

// Server-only env var, so no NEXT_PUBLIC_ prefix is needed — this component
// renders on the server. Falls back to "/" so the logo is never a dead link
// when BASE_URL is unset (e.g. a fresh clone with no .env).
const BASE_URL = process.env.BASE_URL || "/";

export default async function Header() {
  const locale = await getLocale();
  const t = await getTranslations("nav");

  return (
    <header className="th-header header-layout8 header-absolute">
      <div className="sticky-wrapper">
        {/* Main Menu Area */}
        <div className="container th-container">
          <div className="menu-area">
            <div className="row align-items-center justify-content-between">
              <div className="col-auto">
                <div className="header-logo">
                  <a className="icon-masking" href={BASE_URL}>
                    <img src="/assets/img/logo8.svg" alt="PFC Solutions" />
                  </a>
                </div>
              </div>
              <div className="col-auto">
                <nav className="main-menu d-none d-lg-inline-block">
                  <MainMenuList />
                </nav>
                <button type="button" className="th-menu-toggle d-block d-lg-none">
                  <i className="far fa-bars"></i>
                </button>
              </div>
              <div className="col-auto d-none d-xl-block">
                <div className="header-button">
                  {/* Renders the template's round .icon-btn — restores the
                      icon-button + CTA layout header-layout8 ships with. */}
                  <LanguageSwitcher />
                  <a
                    href={localeHref(locale, CTA_PATH)}
                    className="th-btn2 btn-gradient"
                  >
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
    </header>
  );
}
