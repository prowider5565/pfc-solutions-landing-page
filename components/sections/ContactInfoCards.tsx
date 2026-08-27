import { getTranslations } from "next-intl/server";

/**
 * The template's "Contact Info Area" (contact.html) — three `.contact-media`
 * cards above the contact form. Markup is the template's, verbatim.
 *
 * The values come from the `footer` namespace rather than a second copy under
 * `finalCta`: the address, phone, email and Telegram handle already live there
 * and are rendered by the footer on every page, so this section reads the same
 * source instead of letting the two drift apart. Only the card headings are
 * new (`finalCta.info`).
 *
 * The template has three cards but PFC has four channels, so Telegram is
 * stacked under the phone number — the template's own Email and Phone cards
 * already stack two links each, and `.contact-media a` styles the second one
 * identically (style.css:17345).
 */
export default async function ContactInfoCards() {
  const t = await getTranslations("finalCta.info");
  const tFooter = await getTranslations("footer");

  const phone = tFooter("phone");
  const telegram = tFooter("telegram");

  return (
    <div className="space overflow-hidden">
      <div className="container">
        <div className="row gy-4">
          <div className="col-xl-4 col-md-6">
            <div className="contact-media">
              <div className="icon-btn">
                <i className="fa-sharp fa-solid fa-location-dot" aria-hidden="true" />
              </div>
              <div className="media-body">
                <h2 className="box-title">{t("locationTitle")}</h2>
                <p className="box-text">{tFooter("address")}</p>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-md-6">
            <div className="contact-media">
              <div className="icon-btn">
                <i className="fa-sharp fa-solid fa-envelope" aria-hidden="true" />
              </div>
              <div className="media-body">
                <h2 className="box-title">{t("emailTitle")}</h2>
                <p className="box-text">
                  <a href={`mailto:${tFooter("email")}`}>{tFooter("email")}</a>
                </p>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-md-6">
            <div className="contact-media">
              <div className="icon-btn">
                <i className="fa-sharp fa-solid fa-phone" aria-hidden="true" />
              </div>
              <div className="media-body">
                <h2 className="box-title">{t("phoneTitle")}</h2>
                <p className="box-text">
                  <a href={`tel:${phone.replace(/\s/g, "")}`}>{phone}</a>
                  <a
                    href={`https://t.me/${telegram.replace("@", "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {telegram}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
