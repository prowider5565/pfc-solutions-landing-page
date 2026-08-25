import { getTranslations } from "next-intl/server";

type Project = { name: string; sector: string; description: string };

const PROJECT_IMAGES: Record<string, string> = {
  "Sut yig'ish tizimi": "/assets/img/projects-images/lactalis.avif",
  "Mezon Akademiya": "/assets/img/projects-images/mezon-akademiya.avif",
  UstaBarber: "/assets/img/projects-images/ustabarber.avif",
  Tikoncha: "/assets/img/projects-images/tikoncha.avif",
};

const PROJECT_FALLBACK_IMAGES = [
  "/assets/img/case-studies/case_study_1_1.jpg",
  "/assets/img/case-studies/case_study_1_2.jpg",
  "/assets/img/case-studies/case_study_1_3.jpg",
  "/assets/img/case-studies/case_study_1_4.jpg",
  "/assets/img/case-studies/case_study_1_5.jpg",
  "/assets/img/case-studies/case_study_1_6.jpg",
] as const;

/**
 * Twelve projects presented in the alternating Case Studies 2 layout.
 */
export default async function Work() {
  const t = await getTranslations("work");
  const management = t.raw("management") as Project[];
  const web = t.raw("web") as Project[];
  const all = [...management, ...web];

  return (
    <section className="overflow-hidden space" id="work">
      <div className="container th-container5">
        <div className="row justify-content-center case-study-list">
          {all.map((project, index) => {
            const image =
              PROJECT_IMAGES[project.name] ??
              PROJECT_FALLBACK_IMAGES[index % PROJECT_FALLBACK_IMAGES.length];

            return (
              <div className="col-12 case-study_wrapp" key={project.name}>
                <article className="case-study style2 case-study--clean">
                  <div className="box-img">
                    <img
                      src={image}
                      alt={project.name}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="box-content2">
                    <p className="case-study__eyebrow">{project.sector}</p>
                    <h2 className="box-title">{project.name}</h2>
                    <p className="box-text">{project.description}</p>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
