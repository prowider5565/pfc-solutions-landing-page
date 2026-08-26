import { getTranslations } from "next-intl/server";
import WorkflowTimelineList from "./WorkflowTimelineList";

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

        <div className="row justify-content-center mt-40">

        </div>

        {/* Block D — the six delivery stages, as the shared timeline. Rendered
            without a heading of its own: this section's h2 above already reads
            "Qanday ishlaymiz", and the homepage wrapper (WorkflowTimeline)
            supplies that heading only where there isn't one already. */}
        <div className="mt-60">
          <WorkflowTimelineList />
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
