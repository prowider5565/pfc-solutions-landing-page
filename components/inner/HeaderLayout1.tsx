import MainMenuList from "@/components/MainMenuList";

/** Inner-page header. Source: about.html:218-447 (identical in contact.html).
 *  Differs from the homepage's header-layout8 in wrapper classes, the logo
 *  asset, the extra .container nesting, and the header-button contents. */
export default function HeaderLayout1() {
  return (
    <header className="th-header header-layout1">
      <div className="container th-container">
        <div className="menu-area">
          <div className="sticky-wrapper">
            {/* Main Menu Area */}
            <div className="container">
              <div className="row align-items-center justify-content-between">
                <div className="col-auto">
                  <div className="header-logo">
                    <a href="home-ai-startup.html">
                      <img src="/assets/img/logo.svg" alt="Aior " />
                    </a>
                  </div>
                </div>
                <div className="col-auto">
                  <nav className="main-menu style2 d-none d-xl-inline-block">
                    <MainMenuList />
                  </nav>
                </div>
                <div className="col-auto">
                  <div className="header-button">
                    <a href="/contact" className="th-btn">
                      Contact Us{" "}
                      <span className="icon">
                        <img src="/assets/img/icon/arrow-right.svg" alt="" />
                      </span>
                    </a>
                    <a href="#" className="icon-btn sideMenuToggler d-none d-md-block">
                      <img src="/assets/img/icon/grid.svg" alt="" />
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
      </div>
    </header>
  );
}
