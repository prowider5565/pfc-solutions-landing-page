// Slide order in the source repeats logos 1 and 2 at the end (source lines 430-485).
const BRAND_LOGOS = [1, 2, 3, 4, 5, 6, 1, 2];

const SLIDER_OPTIONS =
  '{"breakpoints":{"0":{"slidesPerView":2},"476":{"slidesPerView":"2"},"768":{"slidesPerView":"2"},"992":{"slidesPerView":"3"},"1200":{"slidesPerView":"4"},"1400":{"slidesPerView":"6"}}}';

export default function BrandSlider() {
  return (
    <div className="overflow-hidden space">
      <div className="container th-container5">
        <div className="row">
          <div className="title-area mb-20 text-center">
            <h2 className="h6 fw-normal  text-anime-style-2">Trusted by the best companies</h2>
          </div>
        </div>
        <div className="slider-area">
          <div
            className="swiper th-slider"
            id="brandSlider1"
            data-slider-options={SLIDER_OPTIONS}
          >
            <div className="swiper-wrapper">
              {BRAND_LOGOS.map((n, i) => (
                <div className="swiper-slide" key={i}>
                  <div className="brand-item style2">
                    <a href="">
                      <img src={`/assets/img/brand/brand_2_${n}.svg`} alt="Brand Logo" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
