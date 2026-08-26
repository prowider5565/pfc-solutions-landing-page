import { getTranslations } from "next-intl/server";

type Technology = {
  name: string;
  slug: string;
};

const TECHNOLOGIES: Technology[] = [
  { name: "GitHub", slug: "github" },
  { name: "GitLab", slug: "gitlab" },
  { name: "Python", slug: "python" },
  { name: "JavaScript", slug: "javascript" },
  { name: "Docker", slug: "docker" },
  { name: "Kubernetes", slug: "kubernetes" },
  { name: "Slack", slug: "slack" },
  { name: "Trello", slug: "trello" },
];

export default async function Technologies() {
  const t = await getTranslations("homepageExtras.technologies");

  return (
    <section
      className="technology-section space overflow-hidden"
      id="technologies"
      aria-labelledby="technologies-title"
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="title-area text-center">
              <h2 className="sec-title h3 text-anime-style-3" id="technologies-title">
                {t("title")}
              </h2>
            </div>
          </div>
        </div>
        <div className="integration-area technology-template-area">
          <div className="integration-wrapp">
            <div>
              <div className="integration-shape" aria-hidden="true">
                <img src="/assets/img/shape/line-shape3.png" alt="" />
              </div>
              <div className="integration-logo pfc-integration-logo">
                <img src="/assets/img/logo.svg" alt="PFC Solutions" />
              </div>
            </div>
          </div>
          <div className="box-wrapp technology-template-icons">
            {TECHNOLOGIES.map((technology) => (
              <div
                className="integration-icon"
                aria-label={technology.name}
                title={technology.name}
                key={technology.name}
              >
                <img
                  src={`/assets/img/technologies/${technology.slug}.svg`}
                  alt=""
                  aria-hidden="true"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
