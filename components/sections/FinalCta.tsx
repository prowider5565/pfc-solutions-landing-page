import { getTranslations } from "next-intl/server";
import ContactMap from "@/components/sections/ContactMap";

/**
 * CLAUDE.md §4.11 — the single conversion action on the page.
 *
 * Four fields only (name, company, phone, problem) — the Aior template's
 * contact form had five and a service dropdown; both are gone. The submit
 * button reuses the primary CTA label, per §4.11.
 *
 * The form has no working endpoint yet: the template posted to mail.php, which
 * does not exist under Next.js. Wiring a real handler is a separate task.
 */
export default async function FinalCta() {
  const t = await getTranslations("finalCta");
  const tNav = await getTranslations("nav");

  return (
    <>
      <section
        className="contact-sec space overflow-hidden background-image"
        style={{ backgroundImage: "url('/assets/img/bg/contact_bg_1.jpg')" }}
        id="contact"
      >
      <div className="container th-container4">
        <div className="contact-area">
          <div className="row justify-content-center">
            <div className="col-xl-9">
              <div className="title-area text-center">
                <h2 className="sec-title h3 text-anime-style-3">{t("headline")}</h2>
                <p className="box-text">{t("body")}</p>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-xl-9">
              <form className="contact-form ajax-contact">
                <div className="row">
                  <div className="form-group col-md-6">
                    <label className="visually-hidden" htmlFor="name">
                      {t("fields.name")}
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      id="name"
                      placeholder={t("fields.name")}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label className="visually-hidden" htmlFor="company">
                      {t("fields.company")}
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="company"
                      id="company"
                      placeholder={t("fields.company")}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label className="visually-hidden" htmlFor="phone">
                      {t("fields.phone")}
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      name="phone"
                      id="phone"
                      placeholder={t("fields.phone")}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label className="visually-hidden" htmlFor="problem">
                      {t("fields.problem")}
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="problem"
                      id="problem"
                      placeholder={t("fields.problem")}
                    />
                  </div>
                  <div className="form-btn col-12 text-center">
                    <button type="submit" className="th-btn2">{tNav("cta")}</button>
                    <p className="box-text mt-20 mb-0">{t("privacy")}</p>
                  </div>
                </div>
                <p className="form-messages mb-0 mt-3"></p>
              </form>
            </div>
          </div>
        </div>
      </div>
      </section>
      <ContactMap />
    </>
  );
}
