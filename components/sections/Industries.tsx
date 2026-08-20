import { getTranslations } from "next-intl/server";

type Item = { name: string; entry: string };

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
    <div className="space overflow-hidden" id="industries">
      <div className="container th-container5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="title-area text-center">
              <h2 className="sec-title h3 text-anime-style-3">{t("title")}</h2>
              <p className="box-text">{t("subline")}</p>
            </div>
          </div>
        </div>
        <div className="row gy-4 justify-content-center">
          {items.map((item) => (
            <div className="col-md-6 col-xl-4" key={item.name}>
              <div className="choose-item">
                <div className="choose-content">
                  <h3 className="box-title">{item.name}</h3>
                  <span className="box-subtitle">{item.entry}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
