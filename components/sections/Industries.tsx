import { getTranslations } from "next-intl/server";

type Item = { name: string; entry: string };

const INDUSTRY_ICONS = [
  "fa-industry",
  "fa-warehouse",
  "fa-helmet-safety",
  "fa-hotel",
  "fa-store",
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
    <section className="industries-showcase space overflow-hidden" id="industries">
      <div className="industries-showcase__glow industries-showcase__glow--one" />
      <div className="industries-showcase__glow industries-showcase__glow--two" />
      <div className="container th-container5">
        <div className="row justify-content-center">
          <div className="col-lg-9 col-xl-7">
            <div className="industries-showcase__heading title-area text-center">
              <h2 className="sec-title h3 text-anime-style-3">{t("title")}</h2>
              <p className="box-text">{t("subline")}</p>
            </div>
          </div>
        </div>

        <div className="industries-grid">
          {items.map((item, index) => (
            <article
              className="industry-card wow fadeInUp"
              data-wow-delay={`${index * 0.08}s`}
              key={item.name}
            >
              <div className="industry-card__top">
                <span className="industry-card__icon" aria-hidden="true">
                  <i className={`fa-solid ${INDUSTRY_ICONS[index]}`} />
                </span>
                <span className="industry-card__mark" aria-hidden="true" />
              </div>

              <div className="industry-card__content">
                <h3>{item.name}</h3>
                <div className="industry-card__entry">
                  <span>{t("entryLabel")}</span>
                  <p>{item.entry}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
