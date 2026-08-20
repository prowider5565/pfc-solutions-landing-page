import { getLocale, getTranslations } from "next-intl/server";
import { localeAnchor, navAnchors } from "@/lib/menu";

/**
 * The <ul> inside <nav class="main-menu">, shared by both header layouts —
 * header-layout8 on the homepage and header-layout1 on the inner pages. Only
 * the surrounding <nav> classes differ, so the list lives here.
 *
 * Follows the CLAUDE.md §4.1 navigation model: five flat section anchors, no
 * dropdowns. Labels come from the `nav` namespace of the message files, and
 * hrefs carry the active locale segment.
 */
export default async function MainMenuList() {
  const locale = await getLocale();
  const t = await getTranslations("nav");

  return (
    <ul>
      {navAnchors.map((item) => (
        <li key={item.key}>
          <a href={localeAnchor(locale, item.hash)}>{t(item.key)}</a>
        </li>
      ))}
    </ul>
  );
}
