import { getLocale, getTranslations } from "next-intl/server";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import MainMenuList from "@/components/MainMenuList";
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
                  {/* Plain <a>, like every other internal link here: a
                      client-side navigation would remount the DOM out from
                      under main.js's jQuery/GSAP bindings. See the note in
                      LanguageSwitcher. */}
                  <a className="icon-masking" href={localeHref(locale)}>
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
                  </a>
                </div>
              </div>
              <div className="col-auto">
                {/* xl, not the template's lg. Between 992 and 1199 the
                    template shows the nav while .header-button stays
                    d-none d-xl-block, so the CTA and the language switcher
                    both vanish with no drawer to reach them — and PFC's five
                    localized labels are wider than the demo's, so the nav
                    also spilled off the hero's white notch. Switching the
                    drawer on at the same breakpoint the buttons appear at
                    closes that gap, and matches HeaderLayout1, which the
                    template itself builds on xl. */}
                <nav className="main-menu d-none d-xl-inline-block">
                  <MainMenuList />
                </nav>
                <button type="button" className="th-menu-toggle d-block d-xl-none">
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
