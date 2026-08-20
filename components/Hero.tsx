function Rating({ children }: { children?: React.ReactNode }) {
  return (
    <span className="rating">
      <i className="fa-sharp fa-solid fa-star-sharp"></i>
      <i className="fa-sharp fa-solid fa-star-sharp"></i>
      <i className="fa-sharp fa-solid fa-star-sharp"></i>
      <i className="fa-sharp fa-solid fa-star-sharp"></i>
      <i className="fa-sharp fa-solid fa-star-sharp"></i>
      {children}
    </span>
  );
}

export default function Hero() {
  return (
    <div
      className="th-hero-wrapper hero-8"
      id="hero"
      data-bg-src="/assets/img/bg/hero_bg_8.png"
    >
      <div className="container th-container5">
        <div className="row align-items-center">
          <div className="col-xl-8">
            <div className="hero-style8">
              <Rating>5/5 (1850+ reviews)</Rating>
              <h1 className="hero-title">
                Smart <span className="title"> Conversations</span>. Seamless Customer Experiences
              </h1>
              <p className="hero-text">
                Boost engagement, automate support, and scale your business with our AI-powered
                chatbot tool.
              </p>
              <div className="hero-wrapp">
                <div className="btn-group justify-content-center justify-content-xl-start">
                  <a href="contact.html" className="th-btn2 btn-gradient">
                    Build Your Chatbot
                  </a>
                  <a href="contact.html" className="th-btn2 style5">
                    Book a Demo
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4">
            <div className="hero-img7 movingX">
              <img src="/assets/img/hero/hero-img6.png" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div
        className="shape-mockup d-none d-xxl-block spin"
        data-top="21%"
        data-left="8%"
      >
        <img src="/assets/img/shape/element-15.svg" alt="" />
      </div>
    </div>
  );
}
