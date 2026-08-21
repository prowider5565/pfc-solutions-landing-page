import { getLocale, getTranslations } from "next-intl/server";
import { localeHref } from "@/lib/menu";

/** Inner-page title banner. The template's own misspelling "breadcumb" is
 *  preserved, because style.css targets those class names. */
export default async function Breadcrumb({ title }: { title: string }) {
  const locale = await getLocale();
  const t = await getTranslations("nav");

  return (
    <div className="breadcumb-wrapper " data-bg-src="/assets/img/bg/breadcumb-bg.jpg">
      <div className="container">
        <div className="breadcumb-content">
          <h1 className="breadcumb-title text-anime-style-3">{title}</h1>
          <ul className="breadcumb-menu wow fadeInUp">
            <li>
              <a href={localeHref(locale)}>{t("home")}</a>
            </li>
            <li>{title}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
