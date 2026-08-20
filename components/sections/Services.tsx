import { getTranslations } from "next-intl/server";

type Item = { name: string; duration: string };

const ICONS = [
  "feature_4_1.svg",
  "feature_4_2.svg",
  "feature_4_3.svg",
  "feature_4_4.svg",
  "feature_4_5.svg",
  "feature_4_6.svg",
];

/**
 * CLAUDE.md §4.6 — six services on the template's 6-card feature-grid4 (an
 * exact count match).
 *
 * Renders name + typical duration only. §4.6 also promises a one-line
 * description and an expandable "what's not included" list per service, but
 * that copy does not exist in CLAUDE.md yet, so those are simply absent rather
 * than filled with invented text.
 */
export default async function Services() {
  const t = await getTranslations("services");
  const items = t.raw("items") as Item[];

  return (
    <section className="feature-area2 space" id="services">
      <div className="container th-container5">
        <div className="row justify-content-center">
          <div className="col-lg-9">
            <div className="title-area text-center">
              <h2 className="sec-title h3 text-anime-style-3">{t("title")}</h2>
            </div>
          </div>
        </div>
        <div className="row gy-4">
          {items.map((item, i) => (
            <div className="col-md-6 col-xl-4" key={item.name}>
              <div className="feature-grid4">
                <div className="shape"></div>
                <div className="box-icon">
                  <img src={`/assets/img/icon/${ICONS[i]}`} alt="" />
                </div>
                <div>
                  <h3 className="box-title">{item.name}</h3>
                  {item.duration !== "—" && (
                    <p className="box-text">{item.duration}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
