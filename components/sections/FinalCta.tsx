import { getTranslations } from "next-intl/server";
import ContactMap from "@/components/sections/ContactMap";
import ContactForm from "@/components/ContactForm";

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
              <ContactForm
                labels={{
                  name: t("fields.name"),
                  company: t("fields.company"),
                  phone: t("fields.phone"),
                  problem: t("fields.problem"),
                  submit: tNav("cta"),
                  sending: t("sending"),
                  success: t("success"),
                  error: t("error"),
                  privacy: t("privacy"),
                  botInstruction: t("botInstruction"),
                }}
              />
            </div>
          </div>
        </div>
      </div>
      </section>
      <ContactMap />
    </>
  );
}
