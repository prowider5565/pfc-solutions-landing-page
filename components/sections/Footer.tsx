import { getLocale, getTranslations } from "next-intl/server";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { localeHref, navRoutes } from "@/lib/menu";

/**
 * CLAUDE.md §4.12 — logo + positioning line · navigation · services · contact,
 * with a bottom bar carrying the copyright, a privacy link and a repeat of the
 * language switcher.
 *
 * The positioning statement and the contact details live in `messages/*.json`;
 * phone, email and Telegram are the same value in every locale, only their
 * labels are translated.
 */
export default async function Footer() {
  const locale = await getLocale();
  const t = await getTranslations("footer");
  const tNav = await getTranslations("nav");
  const tServices = await getTranslations("services");
  const services = tServices.raw("items") as { name: string }[];

  return (
    <footer
      className="footer-wrapper footer-layout2 footer-layout8 background-image"
      id="footer"
      style={{ backgroundImage: "url('/assets/img/bg/footer_bg_3_blue.png')" }}
    >
      <div className="widget-area pfc-footer-top-area">
        <div className="container th-container5">
          <div className="footer-top">
            <div className="row gx-40 gy-4 align-items-center justify-content-center justify-content-lg-between">
              <div className="col-lg-5">
                <div className="footer-logo pfc-footer-hero-logo">
                  <img src="/assets/img/logo-footer.svg" alt="PFC Solutions" />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="ps-xl-5">
                  <h2 className="box-title text-white">PFC Solutions</h2>
                  <div className="btn-group justify-content-center justify-content-lg-start">
                    <a href={localeHref(locale, "/contact")} className="th-btn2 btn-gradient">
                      {tNav("cta")}
                    </a>
                    <a href={localeHref(locale, "/approach")} className="th-btn2 style3">
                      Discovery
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container th-container5 pfc-footer-main">
        <div className="row gy-4 justify-content-between">
          <div className="col-md-6 col-xl-4">
            <div className="widget footer-widget">
              <div className="th-widget-about">
                <p className="about-text">{t("positioning")}</p>
                <div className="th-social pfc-footer-social">
                  <a href="https://t.me/pfcsolutions" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
                    <i className="fab fa-telegram-plane" />
                  </a>
                  <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <i className="fab fa-linkedin-in" />
                  </a>
                  <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <i className="fa-brands fa-instagram" />
                  </a>
                  <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    <i className="fab fa-facebook-f" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-xl-auto">
            <div className="widget widget_nav_menu footer-widget">
              <h3 className="widget_title">{t("navHeading")}</h3>
              <div className="menu-all-pages-container">
                <ul className="menu">
                  {navRoutes.map((item) => (
                    <li key={item.key}>
                      <a href={localeHref(locale, item.path)}>{tNav(item.key)}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-xl-auto">
            <div className="widget widget_nav_menu footer-widget">
              <h3 className="widget_title">{t("servicesHeading")}</h3>
              <div className="menu-all-pages-container">
                <ul className="menu">
                  {services.map((s) => (
                    <li key={s.name}>
                      <a href={localeHref(locale, "/services")}>{s.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-xl-auto">
            <div className="widget widget_nav_menu footer-widget">
              <h3 className="widget_title">{t("contactHeading")}</h3>
              <div className="menu-all-pages-container">
                <ul className="menu">
                  <li>{t("address")}</li>
                  <li>
                    {t("phoneLabel")}:{" "}
                    <a href={`tel:${t("phone").replace(/\s/g, "")}`}>{t("phone")}</a>
                  </li>
                  <li>
                    {t("emailLabel")}:{" "}
                    <a href={`mailto:${t("email")}`}>{t("email")}</a>
                  </li>
                  <li>
                    {t("telegramLabel")}:{" "}
                    <a
                      href={`https://t.me/${t("telegram").replace("@", "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t("telegram")}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container th-container5">
        <div className="copyright-wrap">
          <div className="row gy-2 align-items-center justify-content-between">
            <div className="col-md-auto">
              <p className="copyright-text mb-0">{t("copyright")}</p>
            </div>
            <div className="col-md-auto">
              <div className="footer-links d-inline-block me-3">
                <ul>
                  <li>
                    <a href={localeHref(locale, "/contact")}>{t("privacyLink")}</a>
                  </li>
                </ul>
              </div>
              <LanguageSwitcher variant="inline" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
