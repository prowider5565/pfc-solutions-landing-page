import Image from "next/image";
import { getTranslations } from "next-intl/server";

type AboutBlock = {
  title: string;
  paragraphs: string[];
};

export default async function AboutOverview() {
  const t = await getTranslations("aboutOverview");
  const service = t.raw("service") as AboutBlock;
  const mission = t.raw("mission") as AboutBlock;
  const feedback = t.raw("feedback") as AboutBlock;

  return (
    <section className="about-overview space" aria-labelledby="about-overview-title">
      <div className="container th-container4">
        <div className="about-overview__service">
          <div className="about-overview__heading">
            <h2
              className="sec-title h3 text-anime-style-3"
              id="about-overview-title"
            >
              {service.title}
            </h2>

            <div className="about-overview__visual" aria-hidden="true">
              <span className="about-overview__back-card about-overview__back-card--blue" />
              <span className="about-overview__back-card about-overview__back-card--dark" />

              <div className="about-overview__photo">
                <Image
                  src="/assets/img/hero/aboutus.jpeg"
                  alt=""
                  fill
                  sizes="(max-width: 991px) 90vw, 520px"
                />
              </div>
            </div>
          </div>

          <div className="about-overview__copy">
            {service.paragraphs.map((paragraph, index) => (
              <p
                className={index === 0 ? "about-overview__lead" : undefined}
                key={paragraph}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="about-overview__panels">
          {[mission, feedback].map((block) => (
            <article className="about-overview__panel" key={block.title}>
              <h3 className="about-overview__panel-title">{block.title}</h3>
              <div className="about-overview__panel-copy">
                {block.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
