"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { localeHref, navRoutes } from "@/lib/menu";

/**
 * The <ul> inside <nav class="main-menu">, shared by both header layouts —
 * header-layout8 on the homepage and header-layout1 on the inner pages.
 * Only the surrounding <nav> classes differ, so the list lives here.
 *
 * Multipage model: each item is a real route. Labels come from the `nav`
 * namespace of the message files, hrefs carry the active locale segment.
 */
export default function MainMenuList() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("nav");

  return (
    <ul>
      {navRoutes.map((item) => {
        const isActive =
          pathname === item.path || pathname.startsWith(`${item.path}/`);

        return (
          <li className={isActive ? "active" : undefined} key={item.key}>
            <a
              href={localeHref(locale, item.path)}
              aria-current={isActive ? "page" : undefined}
            >
              {t(item.key)}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
