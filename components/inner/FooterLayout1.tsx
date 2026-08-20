import type { MenuLink } from "@/lib/menu";

const PRODUCT: MenuLink[] = [
  { href: "#", label: "Features" },
  { href: "/contact", label: "Benefites" },
  { href: "/contact", label: "Integrations" },
  { href: "/contact", label: "Pricing" },
  { href: "/contact", label: "Changelog" },
];

const SERVICE: MenuLink[] = [
  { href: "/contact", label: "24/7 Support" },
  { href: "/contact", label: "Enhanced User Experience" },
  { href: "/contact", label: "API Access" },
  { href: "/contact", label: "Monthly Subscription" },
  { href: "/contact", label: "Version History" },
];

const ABOUT_TOOL: MenuLink[] = [
  { href: "/contact", label: "Customizable" },
  { href: "/contact", label: "Increased Efficiency" },
  { href: "/contact", label: "Third-party Apps" },
  { href: "/contact", label: "One-time Purchase" },
  { href: "/contact", label: "Update Log" },
];

function LinkWidget({
  title,
  links,
  extraClass = "",
}: {
  title: string;
  links: MenuLink[];
  extraClass?: string;
}) {
  return (
    <div className="col-md-6 col-xl-auto">
      <div className={`widget widget_nav_menu ${extraClass}footer-widget`}>
        <h3 className="widget_title">{title}</h3>
        <div className="menu-all-pages-container">
          <ul className="menu">
            {links.map((link, i) => (
              <li key={`${link.href}-${i}`}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/** Inner-page footer. Source: about.html:1166-1260 (identical in contact.html). */
export default function FooterLayout1() {
  return (
    <footer
      className="footer-wrapper footer-layout1"
      data-bg-src="/assets/img/bg/footer_bg_1.jpg"
    >
      <div className="widget-area">
        <div className="container th-container5">
          <div className="footer-top">
            <h2 className="box-title text-white">Start Your AI Journey With Our Experts</h2>
            <div className="">
              <form className="newsletter-form">
                <input
                  className="form-control"
                  type="email"
                  placeholder="Enter your email to stay inform"
                  required={true}
                />{" "}
                <button type="submit" className="th-btn">
                  Start Free Trial{" "}
                  <span className="icon">
                    <img src="/assets/img/icon/arrow-right.svg" alt="" />
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="container th-container5">
          <div className="row gy-4 justify-content-between">
            <div className="col-md-6 col-xl-3">
              <div className="widget footer-widget mb-0">
                <div className="th-widget-about">
                  <div className="about-logo">
                    <a href="index.html">
                      <img src="/assets/img/logo-white.svg" alt="Aior " />
                    </a>
                  </div>
                  <p className="about-text">
                    Aior is a startup design agency based in Canada
                  </p>
                  <div className="th-social">
                    <a href="https://www.facebook.com/">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="https://www.twitter.com/">
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a href="https://www.youtube.com/">
                      <i className="fa-brands fa-instagram"></i>
                    </a>
                    <a href="https://www.linkedin.com/">
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                    <a href="https://www.youtube.com/">
                      <i className="fab fa-youtube"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <LinkWidget title="Product" links={PRODUCT} extraClass="footer-line " />
            <LinkWidget title="Service" links={SERVICE} extraClass=" footer-line " />
            <LinkWidget title="About Tool" links={ABOUT_TOOL} />
          </div>
        </div>
      </div>
      <div className="container th-container5">
        <div className="copyright-wrap">
          <div className="row gy-2 align-items-center justify-content-between">
            <div className="col-xl-6">
              <p className="copyright-text">
                <i className="fal fa-copyright"></i> Copyright{" "}
                <a href="https://themeforest.net/user/themehour">Aior </a> 2026 . All Rights
                Reserved.
              </p>
            </div>
            <div className="col-xl-6 text-center text-xl-end">
              <div className="footer-links">
                <ul>
                  <li>
                    <a href="/about">Privacy Policy</a>
                  </li>
                  <li>
                    <a href="/about">Terms of Services</a>
                  </li>
                  <li>
                    <a href="/about">Cookis Policy</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
