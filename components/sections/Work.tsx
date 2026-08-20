import { getTranslations } from "next-intl/server";

type Project = { name: string; sector: string };
type BekuzRow = { requirement: string; solution: string };

const SLIDER_OPTIONS =
  '{"loop":false,"mousewheel": {"enabled": true,"sensitivity": 4, "releaseOnEdges":true},"breakpoints":{"0":{"slidesPerView":1},"576":{"slidesPerView":"1"},"991":{"slidesPerView":"2"},"1356":{"slidesPerView":"3"},"1500":{"slidesPerView":"4"}}}';

/**
 * CLAUDE.md §4.8 — twelve projects in two groups, plus the Bekuz deep-dive.
 *
 * Project names are proper nouns and stay untranslated. Only Bekuz has detail
 * in CLAUDE.md; the other eleven are name + sector, which is all the source
 * provides. The accompanying note about measurable results is rendered verbatim.
 */
export default async function Work() {
  const t = await getTranslations("work");
  const management = t.raw("management") as Project[];
  const web = t.raw("web") as Project[];
  const bekuz = t.raw("bekuz") as BekuzRow[];

  const all = [
    ...management.map((p) => ({ ...p, group: t("groupManagement") })),
    ...web.map((p) => ({ ...p, group: t("groupWeb") })),
  ];

  return (
    <section className="service-area3 overflow-hidden space" id="work">
      <div className="container th-container5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="title-area text-center">
              <h2 className="sec-title h3 text-anime-style-3">{t("title")}</h2>
            </div>
          </div>
        </div>

        <div
          className="swiper th-slider has-shadow serviceSlider9"
          id="workSlider"
          data-slider-options={SLIDER_OPTIONS}
        >
          <div className="swiper-wrapper">
            {all.map((project, i) => (
              <div className="swiper-slide" key={`${project.name}-${i}`}>
                <div className="service-box style2">
                  <div className="box-wrapp">
                    <div className="box-content">
                      <span className="sub-title style2">{project.group}</span>
                      <h3 className="box-title">{project.name}</h3>
                      <p className="box-text">{project.sector}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured deep-dive — the only project with detailed content */}
        <div className="row justify-content-center mt-60">
          <div className="col-lg-10">
            <div className="title-area text-center mb-30">
              <h3 className="sec-title h4 mb-0">{t("bekuzTitle")}</h3>
            </div>
            <div className="available-list">
              <ul>
                {bekuz.map((row, i) => (
                  <li key={i}>
                    <strong>{row.requirement}</strong> — {row.solution}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="row justify-content-center mt-40">
          <div className="col-lg-10">
            <p className="box-text text-center mb-0">{t("note")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
