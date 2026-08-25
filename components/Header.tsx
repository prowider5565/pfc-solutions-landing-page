import { getLocale, getTranslations } from "next-intl/server";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import MainMenuList from "@/components/MainMenuList";
import { Link } from "@/i18n/navigation";
import { CTA_PATH, localeHref } from "@/lib/menu";

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
                  {/* Two variants: this header is absolute over the hero, and
                      below ~992px the hero card goes full-bleed so the black
                      logo would sit on near-black. The light variant is the
                      same artwork filled #FFFFFF; CSS swaps them by width, so
                      only one is ever visible and the alt text lives on it. */}
                  <Link className="icon-masking" href="/">
                    <img
                      className="zoom-130 logo-dark"
                      src="/assets/img/logo.svg"
                      alt="PFC Solutions"
                    />
                    <img
                      className="zoom-130 logo-light"
                      src="/assets/img/logo-footer.svg"
                      alt="PFC Solutions"
                    />
                  </Link>
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
                    className="th-btn2"
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
