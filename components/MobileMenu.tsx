import { blogLinks, caseStudiesLinks, homeLinks, pagesLinks } from "@/lib/menu";

export default function MobileMenu() {
  return (
    <div className="th-menu-wrapper">
      <div className="th-menu-area text-center">
        <button className="th-menu-toggle">
          <i className="fal fa-times"></i>
        </button>
        <div className="mobile-logo">
          <a href="home-ai-startup.html">
            <img src="/assets/img/logo.svg" alt="Aior " />
          </a>
        </div>

        <div className="th-mobile-menu">
          <ul>
            <li className="menu-item-has-children">
              <a href="home-ai-startup.html">Home</a>
              <ul className="sub-menu">
                {homeLinks.map((link) => (
                  <li key={link.href}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <a href="about.html">About Us</a>
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
        </div>
      </div>
    </div>
  );
}
