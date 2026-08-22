import { getTranslations } from "next-intl/server";
import ProjectCarousel from "./ProjectCarousel";

type Project = { name: string; sector: string };
type BekuzRow = { requirement: string; solution: string };

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

        <ProjectCarousel projects={all} />

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
