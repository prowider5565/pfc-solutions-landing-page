import { blogLinks, caseStudiesLinks, pagesLinks } from "@/lib/menu";

/**
 * The <ul> inside <nav class="main-menu">, shared by both header layouts —
 * header-layout8 on the homepage and header-layout1 on the inner pages.
 * Only the surrounding <nav> classes differ, so the list lives here.
 *
 * The template's "Home" mega-menu (a demo switcher for the 11 homepage
 * variants) has been removed — it is vendor demo navigation, not site
 * navigation. `megaMenuCards` and `homeLinks` remain in lib/menu.ts, unused.
 */
export default function MainMenuList() {
  return (
    <ul>
      <li>
        <a href="/about">About Us</a>
      </li>
      <li>
        <a href="features.html">Features</a>
      </li>

      <li className="menu-item-has-children">
        <a href="#">Case Studies</a>
        <ul className="sub-menu">
          {caseStudiesLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
      </li>
      <li className="menu-item-has-children">
        <a href="#">Pages</a>
        <ul className="sub-menu">
          {pagesLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
      </li>

      <li className="menu-item-has-children">
        <a href="#">Blog</a>
        <ul className="sub-menu">
          {blogLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
      </li>
    </ul>
  );
}
