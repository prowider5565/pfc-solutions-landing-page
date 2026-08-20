const SLIDER_OPTIONS =
  '{"breakpoints":{"0":{"slidesPerView":"2"},"992":{"slidesPerView":"4"}},"autoplay":{"delay":0,"disableOnInteraction":false},"noSwiping":"false","speed":10000,"spaceBetween":24}';

// Eight slides; the last two repeat images 3 and 4 (about.html:1139-1156).
const GALLERY_IMAGES = [1, 2, 3, 4, 5, 6, 3, 4];

/** Source: about.html:1074-1162 */
export default function Gallery() {
  return (
    <div className="overflow-hidden space-bottom">
      <div className="container">
        <div className="title-area text-center">
          <span className="sub-title style3 text-anime-style-2">[ Join Us ]</span>
          <h2 className="sec-title h3 text-anime-style-3">Discover Your Impact</h2>
        </div>
      </div>
      <div className="">
        <div className="container-fluid p-0">
          <div
            className="swiper th-slider gallery-slider2"
            data-slider-options={SLIDER_OPTIONS}
          >
            <div className="swiper-wrapper">
              {GALLERY_IMAGES.map((n, i) => {
                const src = `/assets/img/gallery/gallery_2_${n}.jpg`;
                return (
                  <div className="swiper-slide" key={i}>
                    <div className="gallery-box">
                      <div className="box-img global-img">
                        <img src={src} alt="gallery image" />
                        <a href={src} className="icon-btn th-popup-image">
                          <i className="far fa-plus"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
