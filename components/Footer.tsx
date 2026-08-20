import type { MenuLink } from "@/lib/menu";

const USE_CASES: MenuLink[] = [
  { href: "/contact", label: "Aiorchat AI" },
  { href: "faq.html", label: "Aiorchat vs Chatty AI" },
  { href: "/contact", label: "Convert Store visitors" },
  { href: "/contact", label: "Automate Support" },
  { href: "/contact", label: "Actionable Insights" },
];

const PRODUCTS: MenuLink[] = [
  { href: "/about", label: "Tech & Agency" },
  { href: "/contact", label: "Affiliate Program" },
  { href: "course.html", label: "Beacome a Partner" },
  { href: "course.html", label: "How it Works" },
  { href: "/contact", label: "Testimonials" },
];

const FEATURES: MenuLink[] = [
  { href: "features.html", label: "Real Time Analytics" },
  { href: "features.html", label: "Seamless Integration" },
  { href: "features.html", label: "Automated Reporting" },
  { href: "features.html", label: "Direct Support" },
  { href: "features.html", label: "Data Import/Export" },
];

function LinkWidget({ title, links }: { title: string; links: MenuLink[] }) {
  return (
    <div className="col-md-6 col-xl-auto">
      <div className="widget widget_nav_menu footer-widget">
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

export default function Footer() {
  return (
    <footer
      className="footer-wrapper footer-layout2 footer-layout8"
      data-bg-src="/assets/img/bg/footer_bg_3.png"
    >
      <div className="widget-area">
        <div className="container th-container5">
          <div className="footer-top ">
            <div className="row gx-40 gy-4 justify-content-center justify-content-lg-between">
              <div className="col-lg-5">
                <div className="footer-logo">
                  <img src="/assets/img/logo9.svg" alt="" />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="ps-xl-5">
                  <h2 className="box-title text-white">Try Aior Today Free</h2>
                  <div className="btn-group justify-content-center justify-content-lg-start">
                    <a href="/contact" className="th-btn2 btn-gradient">
                      Start Free Trial
                    </a>
                    <a href="/contact" className="th-btn2 style3">
                      Book a Demo
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container th-container5">
        <div className="row gy-4 justify-content-between">
          <div className="col-md-6 col-xl-4">
            <div className="widget footer-widget">
              <h3 className="widget_title">[ About us ]</h3>
              <div className="th-widget-about">
                <p className="about-text">
                  Aior is a digital production studio that brings your ideas to life through
                  visually captivating designs and interactive experiences.{" "}
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
                </div>
              </div>
            </div>
          </div>
          <LinkWidget title="[ Use Cases ]" links={USE_CASES} />
          <LinkWidget title="[ Products ]" links={PRODUCTS} />
          <LinkWidget title="[ Features ]" links={FEATURES} />
        </div>
      </div>
      <div className="container">
        <div className="copyright-wrap">
          <div className="row gy-2 align-items-center justify-content-between">
            <p className="copyright-text">
              <i className="fal fa-copyright"></i> Copyright{" "}
              <a href="https://themeforest.net/user/themehour">Aior </a> 2026 . All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
