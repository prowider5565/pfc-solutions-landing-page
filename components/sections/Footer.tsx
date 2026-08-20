import { getLocale, getTranslations } from "next-intl/server";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { localeAnchor, navAnchors } from "@/lib/menu";

/**
 * CLAUDE.md §4.12 — logo + positioning line · navigation · services · contact,
 * with a bottom bar carrying the copyright, a privacy link and a repeat of the
 * language switcher.
 *
 * The positioning statement and all four contact details are `[TBC — …]`
 * placeholders: CLAUDE.md describes what the footer contains but supplies none
 * of the actual values. They are rendered visibly so they cannot ship unnoticed.
 */
export default async function Footer() {
  const locale = await getLocale();
  const t = await getTranslations("footer");
  const tNav = await getTranslations("nav");
  const tServices = await getTranslations("services");
  const services = tServices.raw("items") as { name: string }[];

  return (
    <footer
      className="footer-wrapper footer-layout2 footer-layout8"
      data-bg-src="/assets/img/bg/footer_bg_3.png"
    >
      <div className="container th-container5">
        <div className="row gy-4 justify-content-between pt-60">
          <div className="col-md-6 col-xl-4">
            <div className="widget footer-widget">
              <div className="th-widget-about">
                <div className="about-logo mb-20">
                  <img src="/assets/img/logo9.svg" alt="PFC Solutions" />
                </div>
                <p className="about-text">{t("positioning")}</p>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-xl-auto">
            <div className="widget widget_nav_menu footer-widget">
              <h3 className="widget_title">{t("navHeading")}</h3>
              <div className="menu-all-pages-container">
                <ul className="menu">
                  {navAnchors.map((item) => (
                    <li key={item.key}>
                      <a href={localeAnchor(locale, item.hash)}>{tNav(item.key)}</a>
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
                      <a href={localeAnchor(locale, "services")}>{s.name}</a>
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
                  <li>{t("phone")}</li>
                  <li>{t("email")}</li>
                  <li>{t("telegram")}</li>
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
                    <a href={localeAnchor(locale, "contact")}>{t("privacyLink")}</a>
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
