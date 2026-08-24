import { getTranslations } from "next-intl/server";

const MAP_SRC =
  "https://www.google.com/maps?q=40.997087%2C71.601802&z=16&output=embed";

/** Exact office location: Microdistrict 5, Namangan (40.997087, 71.601802). */
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
