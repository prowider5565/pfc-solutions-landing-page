import { getTranslations } from "next-intl/server";

type Item = { name: string; entry: string; description: string };

const INDUSTRY_IMAGES = [
  "/assets/img/industries-images/factroies_production.png",
  "/assets/img/industries-images/logistics.png",
  "/assets/img/industries-images/construction.png",
  "/assets/img/industries-images/restaurant.png",
  "/assets/img/case-studies/case_study_1_5.jpg",
] as const;

/**
 * CLAUDE.md §4.7 — five industries, no ranking, each with its entry point.
 *
 * This replaces the Aior template's client-logo strip that previously occupied
 * this slot: §9 forbids using client logos without permission.
 */
export default async function Industries() {
  const t = await getTranslations("industries");
  const items = t.raw("items") as Item[];

  return (
    <section className="overflow-hidden space" id="industries">
      <div className="container th-container5">
        <div className="row justify-content-center case-study-list">
          {items.map((item, index) => (
            <div className="col-12 case-study_wrapp" key={item.name}>
              <article className="case-study style2 case-study--clean">
                <div className="box-img">
                  <img
                    src={INDUSTRY_IMAGES[index]}
                    alt={item.name}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="box-content2">
                  <p className="case-study__eyebrow">
                    {t("entryLabel")}: {item.entry}
                  </p>
                  <h2 className="box-title">{item.name}</h2>
                  <p className="box-text">{item.description}</p>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
