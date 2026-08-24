import { getTranslations } from "next-intl/server";

type Item = { title: string; body: string; proof: string };

/**
 * CLAUDE.md §4.4 — five differentiators, each carrying a PROOF line.
 * Uses the numbered `award-item` shape from about.html.
 *
 * This section carries the `#about` nav anchor: in the CLAUDE.md one-page
 * model, "About" is where the company explains itself, and §4.4 is that content.
 */
export default async function Differentiators() {
  const t = await getTranslations("differentiators");
  const items = t.raw("items") as Item[];

  return (
    <section
      className="award-area overflow-hidden space background-image"
      id="about"
      style={{ backgroundImage: "url('/assets/img/bg/dots_bg_1.png')" }}
    >
      <div className="title-area text-center">
        <h2 className="sec-title style2 text-anime-style-3">{t("title")}</h2>
      </div>
      <div className="container th-container5">
        <div className="award-wrapp">
          {items.map((item) => (
            <div className="award-item" key={item.title}>
              <h3 className="box-title">{item.title}</h3>
              <div className="box-content">
                <p className="box-text mb-10">{item.body}</p>
                <span className="year">{item.proof}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        className="shape-mockup jumpAni d-none d-lg-block"
        data-top="20%"
        data-left="5%"
      >
        <img src="/assets/img/shape/element-5.png" alt="" />
      </div>
    </section>
  );
}
