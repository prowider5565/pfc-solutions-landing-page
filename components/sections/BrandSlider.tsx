import { getTranslations } from "next-intl/server";

const BRAND_LOGOS = [1, 2, 3, 4, 5, 6, 1, 2];

const SLIDER_OPTIONS =
  '{"breakpoints":{"0":{"slidesPerView":2},"476":{"slidesPerView":"2"},"768":{"slidesPerView":"2"},"992":{"slidesPerView":"3"},"1200":{"slidesPerView":"4"},"1400":{"slidesPerView":"6"}}}';

export default async function BrandSlider() {
  const t = await getTranslations("homepageExtras.trusted");

  return (
    <section className="overflow-hidden space" aria-labelledby="trusted-title">
      <div className="container th-container5">
        <div className="row">
          <div className="title-area mb-20 text-center">
            <h2
              className="h6 fw-normal text-anime-style-2"
              id="trusted-title"
            >
              {t("title")}
            </h2>
          </div>
        </div>
        <div className="slider-area">
          <div
            className="swiper th-slider"
            id="brandSlider1"
            data-slider-options={SLIDER_OPTIONS}
          >
            <div className="swiper-wrapper">
              {BRAND_LOGOS.map((number, index) => (
                <div className="swiper-slide" key={`${number}-${index}`}>
                  <div className="brand-item style2">
                    <img
                      src={`/assets/img/brand/brand_2_${number}.svg`}
                      alt={t("logoAlt")}
                    />
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
