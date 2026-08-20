const CARD_COUNT = 3;

function Stars() {
  return (
    <span className="rating">
      <i className="fa-sharp fa-solid fa-star-sharp"></i>
      <i className="fa-sharp fa-solid fa-star-sharp"></i>
      <i className="fa-sharp fa-solid fa-star-sharp"></i>
      <i className="fa-sharp fa-solid fa-star-sharp"></i>
      <i className="fa-sharp fa-solid fa-star-sharp"></i>
    </span>
  );
}

export default function Testimonial() {
  return (
    <section
      className="testi-sec2 overflow-hidden position-relative space overflow-hidden"
      id="testi-sec"
    >
      <div className="container th-container5">
        <div className="row gy-4 justify-content-between">
          <div className="col-xl-5">
            <div className="title-area pe-xl-4 text-xl-start text-center">
              <span className="sub-title style3 text-anime-style-2">[ Testimonials ]</span>
              <h2 className="sec-title h3 text-anime-style-3">
                What our Clients say About Aiorbot
              </h2>
            </div>
            <div className=" text-xl-start text-center">
              <a href="/contact" className="th-btn2 btn-gradient">
                Explore All
              </a>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="testi-wrapper d-flex flex-column justify-content-center">
              {Array.from({ length: CARD_COUNT }).map((_, i) => (
                <div className="testi-card2" key={i}>
                  <div className="box-wrapp">
                    <div className="box-profile">
                      <div className="box-author">
                        <img src="/assets/img/testimonial/testi_2_1.png" alt="Avater" />
                      </div>
                      <div className="box-quote">
                        <img src="/assets/img/icon/quote6.svg" alt="" />
                      </div>
                    </div>
                    <Stars />
                  </div>
                  <p className="box-text">
                    &quot;Unrivaled brilliance surpassing all others. Highly recommended for novices
                    and experts alike. We will hire them for sure anytime.&quot;
                  </p>
                  <div className="box-info">
                    <h3 className="box-title">John Peter</h3>
                    <span className="box-desig">CEO and Co-founder</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
