import { blogLinks, caseStudiesLinks, megaMenuCards, pagesLinks } from "@/lib/menu";

export default function Header() {
  return (
    <header className="th-header header-layout8 header-absolute">
      <div className="sticky-wrapper">
        {/* Main Menu Area */}
        <div className="container th-container">
          <div className="menu-area">
            <div className="row align-items-center justify-content-between">
              <div className="col-auto">
                <div className="header-logo">
                  <a className="icon-masking" href="home-ai-startup.html">
                    <img src="/assets/img/logo8.svg" alt="Aior " />
                  </a>
                </div>
              </div>
              <div className="col-auto">
                <nav className="main-menu d-none d-lg-inline-block">
                  <ul>
                    <li className="menu-item-has-children">
                      <a href="home-ai-startup.html">Home</a>
                      <ul className="mega-menu mega-menu-content allow-natural-scroll">
                        <li>
                          <div className="container">
                            <div className="row gy-4">
                              {megaMenuCards.map((card) => (
                                <div className="col-lg-4" key={card.slug}>
                                  <div className="mega-menu-box">
                                    <div className="mega-menu-img">
                                      <img src={`/assets/img/pages/${card.img}`} alt={card.alt} />
                                      <div className="btn-wrap">
                                        <a href={`${card.slug}.html`} className="th-btn">
                                          Multipage
                                        </a>
                                        <a href={`${card.slug}-op.html`} className="th-btn">
                                          Onepage
                                        </a>
                                      </div>
                                    </div>

                                    <h2 className="mega-menu-title">
                                      <a href={`${card.slug}.html`}>{card.title}</a>
                                    </h2>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </li>
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
                </nav>
                <button type="button" className="th-menu-toggle d-block d-lg-none">
                  <i className="far fa-bars"></i>
                </button>
              </div>
              <div className="col-auto d-none d-xl-block">
                <div className="header-button">
                  <a href="contact.html" className="icon-btn">
                    <i className="fa-solid fa-user"></i>
                  </a>
                  <a href="contact.html" className="th-btn2 btn-gradient">
                    Start Free Trial
                  </a>
                  <button type="button" className="th-menu-toggle d-inline-block d-xl-none">
                    <i className="far fa-bars"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
