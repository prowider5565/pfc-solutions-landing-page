import { getTranslations } from "next-intl/server";

type Item = { quote: string; pain: string };

/** Placeholder icon, identical on all six cards — a quote mark suits cards that
 *  are literally customer quotes. To be replaced by the dedicated icon set. */
const PLACEHOLDER_ICON = "/assets/img/icon/quote6.svg";

/** CLAUDE.md §4.3 — six customer quotes paired with the real underlying pain.
 *  Uses the same feature-grid4 6-card shape as Services (exact count match). */
export default async function Problem() {
  const t = await getTranslations("problem");
  const items = t.raw("items") as Item[];

  return (
    <section className="feature-area2 space" id="problem">
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
            <div className="col-md-6 col-xl-4" key={i}>
              <div className="feature-grid4">
                <div className="shape"></div>
                <div className="box-icon">
                  <img src={PLACEHOLDER_ICON} alt="" />
                </div>
                <div>
                  <h3 className="box-title">{item.quote}</h3>
                  <p className="box-text">{item.pain}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="row justify-content-center mt-50">
          <div className="col-lg-9">
            <h3 className="sec-title h4 text-center mb-0 text-anime-style-3">
              {t("closing")}
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}
