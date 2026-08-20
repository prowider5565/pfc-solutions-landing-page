const MAIN_SLIDER_OPTIONS =
  '{"effect":"fade","paginationType":"fraction","spaceBetween":0,"thumbs":{"swiper":".testi-grid2-thumb"},"breakpoints":{"0":{"autoHeight":true},"576":{"autoHeight":false}}}';

const THUMB_SLIDER_OPTIONS =
  '{"effect":"slide","slidesPerView":"3","spaceBetween":32,"breakpoints":{"0":{"slidesPerView":1}}}';

const QUOTE =
  "“Aior's AI delivers unmatched precision and speed. After trying various cybersecurity solutions, we found none that compare. Their automated responses thwarted a significant data breach, and the compliance”";

const AUTHORS = [
  { img: "testi_3_1.png", name: "Jems Colin", role: "CTO, Ailitic" },
  { img: "testi_3_2.png", name: "John Peter", role: "Product Manager, Innovatech" },
];

const IMAGES = ["single-image-1.jpg", "single-image-2.jpg"];

/** Source: about.html:988-1070 — a fade slider paired with a thumbs slider. */
export default function AboutTestimonial() {
  return (
    <section className="overflow-hidden space" id="testi-sec">
      <div className="container">
        <div className="title-area text-center">
          <span className="sub-title style3 text-anime-style-2">[ Testimonials ]</span>
          <h2 className="sec-title h3 text-anime-style-3">What Our Clients Are Sayings</h2>
        </div>

        <div className="testiSlide">
          <div className="row gy-4 align-items-end">
            <div className="col-xl-6">
              <div
                className="swiper th-slider testiSlide4"
                id="testiSlide4"
                data-slider-options={MAIN_SLIDER_OPTIONS}
              >
                <div className="swiper-wrapper">
                  {IMAGES.map((img) => (
                    <div className="swiper-slide" key={img}>
                      <div className="testi-item_img">
                        <img src={`/assets/img/testimonial/${img}`} alt="" />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="slider-controller">
                  {/* The template points this at #testiSlide3 even though the
                      slider is #testiSlide4; kept as-is. */}
                  <div className="slider-pagination" data-slider-id="#testiSlide3"></div>
                </div>
                <div className="icon-box">
                  <button
                    data-slider-prev="#testiSlide4"
                    className="slider-arrow style2 default slider-prev"
                  >
                    <i className="fa-light fa-arrow-left"></i>
                  </button>
                  <button
                    data-slider-next="#testiSlide4"
                    className="slider-arrow style2 default slider-next"
                  >
                    <i className="fa-light fa-arrow-right"></i>
                  </button>
                </div>
                <div className="testi-wrapp">
                  <div className="discount-wrapp">
                    <div className="box-quote">
                      <img src="/assets/img/icon/quote4.svg" alt="" />
                    </div>
                    <div className="discount-tag">
                      <span className="discount-anime">
                        TRUSTED BY AIOR&#8217;S CLIENT * TRUSTED BY AIOR&#8217;S CLIENT * TRUSTED**
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6">
              <div
                className="swiper th-slider testi-grid2-thumb"
                data-slider-options={THUMB_SLIDER_OPTIONS}
                data-slider-tab="#testiSlide4"
              >
                <div className="swiper-wrapper">
                  {AUTHORS.map((author) => (
                    <div className="swiper-slide" key={author.img}>
                      <div className="testi-item">
                        <div className="box-content">
                          <p className="box-text">{QUOTE}</p>
                          <div className="box-profile">
                            <div className="box-author">
                              <img src={`/assets/img/testimonial/${author.img}`} alt="Avater" />
                            </div>
                            <div className="box-info">
                              <h2 className="box-title">{author.name}</h2>
                              <span className="box-desig">{author.role}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="shape-mockup d-none d-lg-block movingX"
        data-top="10%"
        data-right="10%"
      >
        <img src="/assets/img/shape/element-3.png" alt="" />
      </div>
    </section>
  );
}
