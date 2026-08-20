const SLIDER_OPTIONS =
  '{"loop":false,"mousewheel": {"enabled": true,"sensitivity": 4, "releaseOnEdges":true},"breakpoints":{"0":{"slidesPerView":1},"576":{"slidesPerView":"1"},"991":{"slidesPerView":"1"},"1356":{"slidesPerView":"2"},"1500":{"slidesPerView":"3"}}}';

const BOX_TEXT =
  "From converting up to 44% of chats into sales and cutting support costs, to gaining actionable insights for new strategies, brands in any industry can thrive with Aiorchat..";

// The fourth slide repeats the first (source lines 763-776).
const SLIDES = [
  { img: "service_3_1.jpg", name: "Tropic feel", logo: "ser-logo1.png", delay: ".1s" },
  { img: "service_3_2.jpg", name: "Dalfilo interior", logo: "ser-logo2.png", delay: ".3s" },
  { img: "service_3_3.jpg", name: "Burger Motorsports", logo: "ser-logo3.png", delay: ".5s" },
  { img: "service_3_1.jpg", name: "Tropic feel", logo: "ser-logo1.png", delay: ".7s" },
];

export default function Service() {
  return (
    <section
      className="service-area3 positive-relative overflow-hidden space overflow-hidden"
      id="case-studies-sec"
    >
      <div className="container th-container5">
        <div className="row justify-content-lg-between justify-content-center align-items-center">
          <div className="col-lg-7">
            <div className="title-area text-center text-lg-start">
              <span className="sub-title style3 text-anime-style-2">[ Case Study ]</span>
              <h2 className="sec-title h3 text-anime-style-3">Success Stories</h2>
              <p className="wow fadeInUp fs-18">
                From converting up to 44% of chats into sales and cutting support costs, to gaining
                actionable insights for new strategies, brands in any industry can thrive with
                Aiorchat.{" "}
              </p>
            </div>
            <div className="sec-btn">
              <div className="icon-box d-flex justify-content-lg-start justify-content-center">
                <button
                  data-slider-prev="#serviceSlider9"
                  className="slider-arrow style2 default slider-prev"
                >
                  <img src="/assets/img/icon/arrow-left3.svg" alt="" />
                </button>
                <button
                  data-slider-next="#serviceSlider9"
                  className="slider-arrow style2 default slider-next"
                >
                  <img src="/assets/img/icon/arrow-right3.svg" alt="" />
                </button>
              </div>
            </div>
          </div>
          <div className="col-auto">
            <div className="btn-group mb-0 mb-md-5">
              <a href="case-studies.html" className="th-btn2 btn-gradient">
                All Success Stories
              </a>
            </div>
          </div>
        </div>
        <div
          className="swiper th-slider has-shadow serviceSlider9"
          id="serviceSlider9"
          data-slider-options={SLIDER_OPTIONS}
        >
          <div className="swiper-wrapper">
            {SLIDES.map((slide, i) => (
              <div className="swiper-slide" key={i}>
                <div className="service-box style2 wow fadeInUp" data-wow-delay={slide.delay}>
                  <div className="box-wrapp">
                    <div className="box-img">
                      <img src={`/assets/img/service/${slide.img}`} alt="" />
                    </div>
                    <div className="box-content">
                      <span className="sub-title style2">{slide.name}</span>
                      <h3 className="box-title">
                        <a href="case-studies-details.html">{slide.name}</a>
                      </h3>
                      <p className="box-text">{BOX_TEXT}</p>
                      <div className="icon">
                        <img src={`/assets/img/icon/${slide.logo}`} alt="" />
                      </div>
                      <a href="case-studies.html" className="icon-btn">
                        <span className="icon">
                          <img src="/assets/img/icon/arrow-right3.svg" alt="" />
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
