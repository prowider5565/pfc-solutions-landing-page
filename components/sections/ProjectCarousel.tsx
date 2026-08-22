"use client";

import { useEffect, useRef } from "react";

type Project = { name: string; sector: string; group: string };

type SwiperInstance = {
  autoplay?: { start: () => void };
  destroy?: (deleteInstance?: boolean, cleanStyles?: boolean) => void;
  params?: { autoplay?: typeof AUTOPLAY_OPTIONS };
};

type SliderElement = HTMLDivElement & { swiper?: SwiperInstance };
type SwiperConstructor = new (
  element: HTMLElement,
  options: typeof SWIPER_OPTIONS,
) => SwiperInstance;

const AUTOPLAY_OPTIONS = {
  delay: 2500,
  disableOnInteraction: false,
  pauseOnMouseEnter: true,
};

const SWIPER_OPTIONS = {
  loop: true,
  speed: 900,
  autoplay: AUTOPLAY_OPTIONS,
  mousewheel: {
    enabled: true,
    sensitivity: 4,
    releaseOnEdges: true,
  },
  breakpoints: {
    0: { slidesPerView: 1 },
    576: { slidesPerView: 1 },
    991: { slidesPerView: 2 },
    1356: { slidesPerView: 3 },
    1500: { slidesPerView: 4 },
  },
};

const SERIALIZED_OPTIONS = JSON.stringify(SWIPER_OPTIONS);

export default function ProjectCarousel({ projects }: { projects: Project[] }) {
  const sliderRef = useRef<SliderElement>(null);

  useEffect(() => {
    let ownedInstance: SwiperInstance | undefined;

    const initialize = () => {
      const element = sliderRef.current;
      if (!element) return;

      // main.js initializes sliders present on the initial page. When this
      // route is entered later, initialize it here instead. Existing instances
      // are retained and simply have autoplay restarted.
      if (element.swiper) {
        if (element.swiper.params) {
          element.swiper.params.autoplay = AUTOPLAY_OPTIONS;
        }
        element.swiper.autoplay?.start();
        return;
      }

      const Swiper = (window as Window & { Swiper?: SwiperConstructor }).Swiper;
      if (typeof Swiper !== "function") return;

      ownedInstance = new Swiper(element, SWIPER_OPTIONS);
    };

    initialize();
    window.addEventListener("theme:scripts-ready", initialize);

    return () => {
      window.removeEventListener("theme:scripts-ready", initialize);
      ownedInstance?.destroy?.(true, true);
    };
  }, []);

  return (
    <div
      ref={sliderRef}
      className="swiper th-slider has-shadow serviceSlider9"
      id="workSlider"
      data-slider-options={SERIALIZED_OPTIONS}
    >
      <div className="swiper-wrapper">
        {projects.map((project, i) => (
          <div className="swiper-slide" key={`${project.name}-${i}`}>
            <div className="service-box style2">
              <div className="box-wrapp">
                <div className="box-content">
                  <span className="sub-title style2">{project.group}</span>
                  <h3 className="box-title">{project.name}</h3>
                  <p className="box-text">{project.sector}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
