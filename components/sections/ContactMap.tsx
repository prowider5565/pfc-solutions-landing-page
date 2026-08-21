import { getTranslations } from "next-intl/server";

const MAP_SRC =
  "https://www.google.com/maps?q=Tashkent%2C%20Uzbekistan&output=embed";

/** City-level map below the contact form until a confirmed address is supplied. */
export default async function ContactMap() {
  const t = await getTranslations("finalCta");

  return (
    <div className="overflow-hidden space-extra-bottom">
      <div className="contact-map">
        <iframe
          src={MAP_SRC}
          title={t("mapTitle")}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        <div className="contact-icon" aria-hidden="true">
          <img src="/assets/img/icon/location-dot.svg" alt="" />
        </div>
      </div>
    </div>
  );
}
