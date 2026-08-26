import { getTranslations } from "next-intl/server";

type Item = { name: string; entry: string; description: string };

/** Index-matched to industries.items. Identifiers, not copy — the same file is
 *  served for every locale, so these live here rather than in the messages. */
const INDUSTRY_ICONS = [
  "/assets/img/icon/industries/manufacturing.svg",
  "/assets/img/icon/industries/logistics.svg",
  "/assets/img/icon/industries/construction.svg",
  "/assets/img/icon/industries/horeca.svg",
  "/assets/img/icon/industries/retail.svg",
] as const;

/**
 * CLAUDE.md §4.7 — five industries, no ranking, each with its entry point.
 *
 * Layout is the template's own features.html "Service Area": a
 * `.row gy-4 justify-content-center` of `.col-md-6 col-xl-4` cards, each a
 * `.service-box2` (gradient icon tile, title, text). All of that styling
 * already ships in assets/css/style.css:26385 — nothing here re-implements it.
 *
 * Two deliberate departures from that reference:
 *  - No "View Details" button. There is no per-industry page to link to, and
 *    CLAUDE.md §8.7 allows exactly one primary CTA on the page. The entry-point
 *    line takes the slot the button vacated, so the card keeps its proportions
 *    instead of ending in 35px of dead space.
 *  - Icons are drawn per industry rather than reusing service_3_*.svg, which
 *    are generic. Same line-art family: 1.5 stroke, #7B5DFF, round caps.
 *
 * Five cards in a three-column grid leaves two on the second row;
 * justify-content-center centres them, which is what the reference does too.
 */
export default async function Industries() {
  const t = await getTranslations("industries");
  const tNav = await getTranslations("nav");
  const items = t.raw("items") as Item[];

  return (
    <section
      className="position-relative overflow-hidden space"
      id="industries"
      /* aria-label rather than aria-labelledby: the reference section has no
         heading of its own, and the only text above the grid is the subline —
         a sentence, which would read badly as a region name. The page's h1
         (the breadcrumb) already says "Industries". */
      aria-label={t("title")}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="title-area text-center">
              <p className="sec-text industry-subline">{t("subline")}</p>
            </div>
          </div>
        </div>

        <div className="row gy-4 justify-content-center industry-grid">
          {items.map((item, index) => (
            <div className="col-md-6 col-xl-4" key={item.name}>
              <div className="service-box2">
                <div className="box-icon">
                  {/* Decorative: the industry is named in the heading right
                      below it, so an alt here would only repeat that. */}
                  <img src={INDUSTRY_ICONS[index]} alt="" aria-hidden="true" />
                </div>
                <div className="box-content">
                  {/* h3, not the reference's h2: the page's h1 is the
                      breadcrumb title and the subline sits above these, so
                      jumping to h2 here would skip a level. */}
                  <h3 className="box-title" id={`industry-${index}-title`}>
                    {item.name}
                  </h3>
                  <p className="box-text">{item.description}</p>
                  <div className="industry-foot">
                    <p className="industry-entry">
                      <span className="industry-entry__label">
                        {t("entryLabel")}
                      </span>
                      {item.entry}
                    </p>
                    {/* Inert for now — no handler and no href, per the brief.
                        A real <button> rather than a disabled one, so it stays
                        in the tab order and reads normally; the accessible name
                        is the site-wide CTA label, and aria-describedby points
                        at the card heading so a screen-reader user hears which
                        of the five identical buttons this is. */}
                    <button
                      type="button"
                      className="th-btn2 industry-cta"
                      aria-describedby={`industry-${index}-title`}
                    >
                      {tNav("cta")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
