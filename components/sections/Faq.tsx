import { getTranslations } from "next-intl/server";

type Item = { q: string; a: string };

/**
 * CLAUDE.md §4.10 — six questions on the template's Bootstrap accordion.
 *
 * The answers in CLAUDE.md are shorthand notes rather than prose (two have no
 * note at all), so the answer text in the message files was assembled from copy
 * that already exists elsewhere in CLAUDE.md — §4.5 Block A, the Block C fine
 * print, §4.4 proof lines and the §4.6 duration column — in all three
 * languages. Nothing was invented; see the port notes.
 */
export default async function Faq() {
  const t = await getTranslations("faq");
  const items = t.raw("items") as Item[];

  return (
    <div className="faq-area3 position-relative overflow-hidden space" id="faq">
      <div className="container th-container5">
        <div className="row gy-4 justify-content-center">
          <div className="col-xl-8">
            <div className="title-area mb-40 text-center">
              <h2 className="sec-title h3 text-anime-style-3">{t("title")}</h2>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="accordion-area accordion" id="faqAccordion">
              {items.map((item, i) => {
                const n = i + 1;
                const open = i === 0;
                return (
                  <div
                    className={`accordion-card style3 ${open ? "active" : ""} wow fadeInUp`}
                    data-wow-delay={`.${n}s`}
                    key={n}
                  >
                    <h3 className="accordion-header" id={`heading-${n}`}>
                      <button
                        className={`accordion-button ${open ? "" : "collapsed"}`}
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#collapse-${n}`}
                        aria-expanded={open}
                        aria-controls={`collapse-${n}`}
                      >
                        {item.q}
                      </button>
                    </h3>
                    <div
                      id={`collapse-${n}`}
                      className={`accordion-collapse collapse ${open ? "show" : ""}`}
                      aria-labelledby={`heading-${n}`}
                      data-bs-parent="#faqAccordion"
                      role="region"
                    >
                      <div className="accordion-body">
                        <p className="faq-text">{item.a}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
