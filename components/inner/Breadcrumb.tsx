import { getLocale, getTranslations } from "next-intl/server";
import { localeHref } from "@/lib/menu";

export type BreadcrumbItem = {
  href?: string;
  label: string;
};

/** Inner-page title banner. The template's own misspelling "breadcumb" is
 *  preserved, because style.css targets those class names. */
export default async function Breadcrumb({
  items,
  title,
}: {
  items?: BreadcrumbItem[];
  title: string;
}) {
  const locale = await getLocale();
  const t = await getTranslations("nav");
  const trail = items ?? [{ label: title }];

  return (
    <div
      className="breadcumb-wrapper background-image"
      style={{ backgroundImage: "url('/assets/img/bg/breadcumb-bg.jpg')" }}
    >
      <div className="container">
        <div className="breadcumb-content">
          <h1 className="breadcumb-title text-anime-style-3">{title}</h1>
          <ul className="breadcumb-menu wow fadeInUp">
            <li>
              <a href={localeHref(locale)}>{t("home")}</a>
            </li>
            {trail.map((item, index) => {
              const current = index === trail.length - 1;

              return (
                <li key={`${item.label}-${index}`}>
                  {!current && item.href ? (
                    <a href={localeHref(locale, item.href)}>{item.label}</a>
                  ) : (
                    <span aria-current={current ? "page" : undefined}>
                      {item.label}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
