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
      style={{ backgroundImage: "url('/assets/img/bg/footer_bg_3_blue.png')" }}
    >
      <div className="container th-container5">
        <div className="row gy-4 justify-content-between pt-60">
          <div className="col-md-6 col-xl-4">
            <div className="widget footer-widget">
              <div className="th-widget-about">
                <div className="about-logo mb-20">
                  <img src="/assets/img/logo-footer.svg" alt="PFC Solutions" />
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
