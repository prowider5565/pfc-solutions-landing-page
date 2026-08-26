import { getTranslations } from "next-intl/server";

type Testimonial = {
  body: string;
  name: string;
  role: string;
};

function Stars() {
  return (
    <span className="rating" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, index) => (
        <i className="fa-sharp fa-solid fa-star-sharp" key={index} />
      ))}
    </span>
  );
}

export default async function Testimonials() {
  const t = await getTranslations("homepageExtras.testimonials");
  const items = t.raw("items") as Testimonial[];

  return (
    <section
      className="testi-sec2 testimonial-section overflow-hidden position-relative space"
      id="testi-sec"
      aria-labelledby="testimonials-title"
    >
      <div className="container th-container5">
        <div className="row gy-4 justify-content-center">
          <div className="col-xl-10">
            <div className="title-area text-center">
              <h2
                className="sec-title h3 text-anime-style-3"
                id="testimonials-title"
              >
                {t("title")}
              </h2>
            </div>
          </div>
          <div className="col-xl-10">
            <div className="testi-wrapper d-flex flex-column align-items-center justify-content-center">
              {items.map((item) => (
                <article className="testi-card2" key={item.name}>
                  <div className="box-wrapp">
                    <div className="box-profile">
                      <div className="box-author">
                        <img
                          src="/assets/img/normal/feedback_profile_image.png"
                          alt={item.name}
                        />
                      </div>
                      <div className="box-quote">
                        <img src="/assets/img/icon/quote6.svg" alt="" />
                      </div>
                    </div>
                    <Stars />
                  </div>
                  <p className="box-text">{item.body}</p>
                  <div className="box-info">
                    <h3 className="box-title">{item.name}</h3>
                    <span className="box-desig">{item.role}</span>
                  </div>
                </article>
              ))}
            </div>
            <p className="testimonial-closing text-center">
              {t("closing")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
