/** Source: about.html:464-529 */
export default function AboutStory() {
  return (
    <div className="overflow-hidden overflow-hidden space-top" id="about-sec">
      <div className="container th-container5">
        <div className="row gy-4">
          <div className="col-xl-8 mb-30 mb-xl-0">
            <div className="title-area mb-30">
              <span className="sub-title style3 text-anime-style-2">[ Our Story ]</span>
              <h2 className="sec-title style2 text-anime-style-3">
                Aior AI Startup is{" "}
                <span className="d-block">
                  Empowering Every Industry <span className="d-block">by Trusworthy</span>
                </span>
              </h2>
            </div>
            <ul className="nav about-tab" id="aboutTab" role="tablist">
              <li className="nav-item" role="presentation">
                <a
                  className="nav-link active"
                  id="mission-tab"
                  data-bs-toggle="tab"
                  href="#mission"
                  role="tab"
                  aria-controls="mission"
                  aria-selected="false"
                >
                  Mission
                </a>
              </li>
              <li className="nav-item" role="presentation">
                <a
                  className="nav-link"
                  id="vision-tab"
                  data-bs-toggle="tab"
                  href="#vision"
                  role="tab"
                  aria-controls="vision"
                  aria-selected="false"
                >
                  Vision
                </a>
              </li>
            </ul>
            <div className="tab-content" id="aboutTabContent">
              <div
                className="tab-pane fade show active"
                id="mission"
                role="tabpanel"
                aria-labelledby="mission-tab"
              >
                <p className="about-text">
                  Aior Inspire Platform is a full-stack AI platform for enterprise. From GPU cloud
                  management, job scheduling, model training, inference, to agent building, its
                  one-stop toolchain empowers industries to develop and deploy their own AI models,
                  unleashing signiﬁcant potential for businesses to adopt AI.{" "}
                </p>
              </div>
              <div
                className="tab-pane fade"
                id="vision"
                role="tabpanel"
                aria-labelledby="vision-tab"
              >
                <p className="about-text">
                  Our vision is to empower enterprises worldwide with a unified AI ecosystem that
                  simplifies innovation, accelerates deployment, and democratizes artificial
                  intelligence. Through an end-to-end full-stack AI platform, Aior Inspire aims to
                  enable businesses to seamlessly build, scale, and deploy intelligent
                  solutions—driving sustainable growth, operational excellence, and a smarter future
                  powered by AI.
                </p>
              </div>
            </div>
            <div className="btn-group mt-50">
              <a href="/about" className="th-btn">
                Learn More{" "}
                <span className="icon">
                  <img src="/assets/img/icon/arrow-right.svg" alt="" />
                </span>
              </a>
            </div>
            <div className="img-box2">
              <div className="img1">
                <img src="/assets/img/normal/about_2_1.jpg" alt="About" />
                <div className="th-experience wow fadeInUp" data-wow-delay=".4s">
                  <div className="th-experience_content">
                    <h2 className="experience-year">
                      <span className="counter-number">65</span>+
                    </h2>
                    <p className="experience-text">Successful Projects</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4">
            <div className="">
              <div className="img-box3">
                <div className="img1 image scale">
                  <img src="/assets/img/normal/about_1_2.jpg" alt="About" />
                </div>
                <div className="img2">
                  <img src="/assets/img/normal/about_1_1.png" alt="About" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="shape-mockup d-none d-lg-block spin"
        data-top="30%"
        data-right="40%"
      >
        <img src="/assets/img/shape/circle-1.png" alt="" />
      </div>
    </div>
  );
}
