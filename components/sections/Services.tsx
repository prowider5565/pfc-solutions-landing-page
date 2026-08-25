import { getLocale, getTranslations } from "next-intl/server";
import { localeHref } from "@/lib/menu";
import { SERVICE_DEFINITIONS } from "@/lib/services";

type Item = { name: string; duration: string; description: string };

export default async function Services() {
  const locale = await getLocale();
  const t = await getTranslations("services");
  const items = t.raw("items") as Item[];

  return (
    <section className="overflow-hidden space" id="services">
      <div className="container th-container5">
        <div className="row gy-4 justify-content-center services-case-grid">
          {SERVICE_DEFINITIONS.map((service, index) => {
            const item = items[index];
            const detailHref = localeHref(locale, `/services/${service.slug}`);

            return (
              <div className="col-lg-6" key={service.slug}>
                <article className="case-study">
                  <div className="box-img">
                    <img
                      src={`/assets/services-images/${service.image}`}
                      alt={item.name}
                    />
                  </div>
                  <div className="box-content">
                    <div className="date">
                      <span className="icon">
                        <i className="fa-regular fa-calendar-days"></i>
                      </span>
                      {item.duration}
                    </div>
                    <h2 className="box-title">{item.name}</h2>
                    <p className="box-text">{item.description}</p>
                    <div className="btn-group">
                      <a href={detailHref} className="th-btn2 style3">
                        {t("viewDetails")}
                      </a>
                    </div>
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
