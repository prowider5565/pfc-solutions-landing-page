import { getTranslations } from "next-intl/server";

/**
 * CLAUDE.md §4.9 — the qualifier. Deliberately blunt; this section filters.
 *
 * §9 is explicit that the "not a fit" column must not be softened, so both
 * columns render with equal weight and the closing line is kept verbatim.
 */
export default async function Fit() {
  const t = await getTranslations("fit");
  const good = t.raw("good") as string[];
  const bad = t.raw("bad") as string[];

  return (
    <section className="space overflow-hidden position-relative" id="fit">
      <div className="container th-container5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="title-area text-center">
              <h2 className="sec-title h3 text-anime-style-3">{t("title")}</h2>
            </div>
          </div>
        </div>
        <div className="row gy-4 justify-content-center">
          <div className="col-lg-6">
            <div className="price-card style2 extra th-ani active">
              <div className="box-content">
                <h3 className="box-title">{t("goodHeading")}</h3>
              </div>
              <div className="available-list">
                <ul>
                  {good.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="price-card style2 extra th-ani">
              <div className="box-content">
                <h3 className="box-title">{t("badHeading")}</h3>
              </div>
              <div className="available-list">
                <ul>
                  {bad.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="row justify-content-center mt-50">
          <div className="col-lg-9">
            <p className="box-text text-center mb-0">{t("closing")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
