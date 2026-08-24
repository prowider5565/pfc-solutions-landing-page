import { getLocale, getTranslations } from "next-intl/server";
import { CTA_PATH, localeHref } from "@/lib/menu";

/** CLAUDE.md §4.2 — hero-8 shape from the Aior template.
 *  The template's "5/5 (1850+ reviews)" rating is deliberately gone: §9 forbids
 *  invented metrics. The eyebrow takes that slot instead. */
export default async function Hero() {
  const locale = await getLocale();
  const t = await getTranslations("hero");

  return (
    <div
      className="th-hero-wrapper hero-8 background-image"
      id="hero"
      style={{ backgroundImage: "url('/assets/img/bg/hero_bg_8_blue.png')" }}
    >
      <div className="container th-container5">
        <div className="row align-items-center">
          <div className="col-xl-7">
            <div className="hero-style8">
              <div
                className="hero-title-star d-none d-xxl-block spin"
                aria-hidden="true"
              >
                <img src="/assets/img/shape/element-15.svg" alt="" />
              </div>
              <h1 className="hero-title">
                {t("headlineLine1")}{" "}
                <span className="title">{t("headlineLine2")}</span>
              </h1>
              <p className="hero-text">{t("sub")}</p>
              <div className="hero-wrapp">
                <div className="btn-group justify-content-center justify-content-xl-start">
                  <a
                    href={localeHref(locale, CTA_PATH)}
                    className="th-btn2"
                  >
                    {t("ctaPrimary")}
                  </a>
                  <a
                    href={localeHref(locale, "/approach")}
                    className="th-btn2"
                  >
                    {t("ctaSecondary")}
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-5">
            <div className="hero-img7 hero-img7--photo hero-img7--pulse">
              <img
                src="/assets/img/hero/digital_brain_pulse.gif"
                alt="Human brain transitioning into animated cyan computational circuitry"
                draggable={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
