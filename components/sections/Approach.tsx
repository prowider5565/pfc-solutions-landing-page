import { getTranslations } from "next-intl/server";

type Row = { free: string; paid: string };
type Tier = { name: string; duration: string; price: string; when: string };

/**
 * CLAUDE.md §4.5 — the most important section, four blocks:
 *   A  why Discovery is paid (a four-point contrast)
 *   B  Discovery in four steps
 *   C  the three Discovery pricing tiers
 *   D  the six delivery stages
 *
 * Block C keeps the template's price-card shape but drops the monthly/yearly
 * toggle it shipped with — Discovery tiers are one-off fees, not subscriptions,
 * so a recurring toggle would misrepresent the offer.
 */
export default async function Approach() {
  const t = await getTranslations("approach");
  const rows = t.raw("blockA.rows") as Row[];
  const steps = t.raw("blockB.steps") as string[];
  const tiers = t.raw("blockC.tiers") as Tier[];
  const stages = t.raw("blockD.stages") as string[];

  return (
    <section className="space overflow-hidden position-relative" id="approach">
      <div className="container th-container5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="title-area text-center">
              <h2 className="sec-title h3 text-anime-style-3">{t("title")}</h2>
            </div>
          </div>
        </div>

        {/* Block A — free analysis vs paid Discovery */}
        <div className="row gy-4 justify-content-center mb-60">
          <div className="col-lg-6">
            <div className="price-card style2 extra th-ani">
              <div className="box-content">
                <h3 className="box-title">{t("blockA.freeHeading")}</h3>
              </div>
              <div className="available-list">
                <ul>
                  {rows.map((row, i) => (
                    <li key={i}>{row.free}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="price-card style2 extra th-ani active">
              <div className="box-content">
                <h3 className="box-title">{t("blockA.paidHeading")}</h3>
              </div>
              <div className="available-list">
                <ul>
                  {rows.map((row, i) => (
                    <li key={i}>{row.paid}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Block B — Discovery in four steps */}
        <div className="row gy-4 mb-30">
          {steps.map((step, i) => (
            <div className="col-md-6 col-xl-3" key={i}>
              <div className="process-card2 wow fadeInUp" data-wow-delay={`.${(i + 1) * 2}s`}>
                <span className="number">{`0${i + 1}`}</span>
                <div className="box-content">
                  <p className="box-text">{step}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="row justify-content-center mb-60">
          <div className="col-lg-8">
            <p className="box-text text-center mb-0">{t("blockB.caption")}</p>
          </div>
        </div>

        {/* Block C — Discovery pricing */}
        <div className="row gy-4 justify-content-center">
          {tiers.map((tier, i) => (
            <div className="col-xl-4 col-md-6" key={tier.name}>
              <div className={`price-card style2 extra th-ani ${i === 1 ? "active" : ""}`}>
                <div className="box-content">
                  <h3 className="box-title">{tier.name}</h3>
                  <h4 className="box-price">{tier.price}</h4>
                  <p className="subtitle">{tier.duration}</p>
                </div>
                <div className="available-list">
                  <ul>
                    <li>{tier.when}</li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="row justify-content-center mt-40">
          <div className="col-lg-10">
            <div className="cta-card-wrapp p-4">
              <p className="box-text mb-10">{t("blockC.callout")}</p>
              <p className="fs-18 mb-0">
                <small>{t("blockC.finePrint")}</small>
              </p>
            </div>
          </div>
        </div>

        {/* Block D — the six delivery stages */}
        <div className="row gy-4 justify-content-center mt-60">
          {stages.map((stage, i) => (
            <div className="col-6 col-md-4 col-xl-2" key={i}>
              <div className="process-card2 wow fadeInUp" data-wow-delay={`.${i + 1}s`}>
                <span className="number">{`0${i + 1}`}</span>
                <div className="box-content">
                  <h3 className="box-title">{stage}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="row justify-content-center mt-40">
          <div className="col-lg-10 text-center">
            <p className="box-text mb-10">{t("blockD.rhythm")}</p>
            <p className="fs-20 mb-0">{t("blockD.guarantee")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
