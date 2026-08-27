import { getTranslations } from "next-intl/server";
import ContactMap from "@/components/sections/ContactMap";
import ContactForm from "@/components/ContactForm";
import { INDUSTRY_CARD_KEYS } from "@/lib/industries";

const TITLE_ID = "contact-title";

export default async function FinalCta() {
  const t = await getTranslations("finalCta");
  const tNav = await getTranslations("nav");
  const tIndustries = await getTranslations("industries");

  // Options are assembled here rather than in the client component so the
  // industry names stay in the message files and out of the JS bundle. The
  // five card industries are index-matched to INDUSTRY_CARD_KEYS — the same
  // coupling /industries relies on for its icons — then "other" is appended.
  const industryNames = tIndustries.raw("items") as { name: string }[];
  const industryOptions = [
    ...INDUSTRY_CARD_KEYS.map((value, index) => ({
      value,
      label: industryNames[index].name,
    })),
    { value: "other", label: tIndustries("other") },
  ];

  return (
    <>
      <section
        className="contact-sec space overflow-hidden background-image"
        style={{ backgroundImage: "url('/assets/img/bg/contact_bg_1.jpg')" }}
        id="contact"
        aria-labelledby={TITLE_ID}
      >
        <div className="container th-container4">
          <div className="contact-area">
            {/* Template's contact layout (contact.html): the form in col-xl-8
                with a client pull-quote alongside it in col-xl-4, bottom-
                aligned. */}
            <div className="row gy-40 gx-100 align-items-end">
              <div className="col-xl-8">
                <ContactForm
                  titleId={TITLE_ID}
                  industries={industryOptions}
                  labels={{
                    title: t("headline"),
                    intro: t("body"),
                    name: t("fields.name"),
                    company: t("fields.company"),
                    industry: t("fields.industry"),
                    phone: t("fields.phone"),
                    problem: t("fields.problem"),
                    submit: tNav("cta"),
                    sending: t("sending"),
                    success: t("success"),
                    error: t("error"),
                    privacy: t("privacy"),
                  }}
                />
              </div>
              <div className="col-xl-4">
                {/* Not a new claim: this is one verbatim sentence from the
                    first homepage testimonial, same speaker and role, so the
                    page adds no result that isn't already attributed. */}
                <figure className="contact-review">
                  <div className="box-profile">
                    <div className="box-author">
                      {/* Decorative: a generic avatar illustration, not a
                          photograph of this person, and the figcaption below
                          already names them. */}
                      <img
                        src="/assets/img/normal/feedback_profile_image.png"
                        alt=""
                        aria-hidden="true"
                      />
                    </div>
                    <div className="box-quote">
                      <img src="/assets/img/icon/quote3.svg" alt="" aria-hidden="true" />
                    </div>
                  </div>
                  {/* A <blockquote> here would pick up style.css:10791 — the
                      template's WordPress pull-quote treatment (border, tinted
                      panel, ::before glyph) — on top of the card's own. The
                      <figure>/<figcaption> pair already carries the quote-and-
                      attribution semantics, so the text stays a <p>. */}
                  <p className="box-text">{t("review.body")}</p>
                  <figcaption className="box-info">
                    <h3 className="box-title">{t("review.name")}</h3>
                    <span className="box-desig">{t("review.role")}</span>
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ContactMap />
    </>
  );
}
