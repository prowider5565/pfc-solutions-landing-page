import { getLocale, getTranslations } from "next-intl/server";
import { localeHref, navRoutes } from "@/lib/menu";

/**
 * The <ul> inside <nav class="main-menu">, shared by both header layouts —
 * header-layout8 on the homepage and header-layout1 on the inner pages.
 * Only the surrounding <nav> classes differ, so the list lives here.
 *
 * Multipage model: each item is a real route. Labels come from the `nav`
 * namespace of the message files, hrefs carry the active locale segment.
 */
export default async function MainMenuList() {
  const locale = await getLocale();
  const t = await getTranslations("nav");

  return (
    <ul>
      {navRoutes.map((item) => (
        <li key={item.key}>
          <a href={localeHref(locale, item.path)}>{t(item.key)}</a>
        </li>
      ))}
    </ul>
  );
}
