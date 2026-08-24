"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";

export default function Preloader() {
  const locale = useLocale();
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    // main.js is loaded only once, but this component can be rendered again
    // after client-side locale navigation. Own the dismissal here so a new
    // preloader can never remain over the newly translated page.
    setVisible(true);
    setExiting(false);

    const exitTimer = window.setTimeout(() => setExiting(true), 1000);
    const hideTimer = window.setTimeout(() => setVisible(false), 2000);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(hideTimer);
    };
  }, [locale]);

  return (
    <>
      <div className="mouseCursor cursor-outer"></div>
      <div className="mouseCursor cursor-inner"></div>

      {visible && (
        <div id="preloader">
          <div
            className="preloader-bg preloader-bg-one"
            style={{ transform: exiting ? "translateY(-100%)" : undefined }}
          ></div>
          <div
            className="preloader-bg preloader-bg-two"
            style={{ transform: exiting ? "translateY(100%)" : undefined }}
          ></div>
          <div
            className="loader-wrapper"
            style={{ opacity: exiting ? 0 : undefined }}
            role="img"
            aria-label="PFC Solutions"
          >
            <img
              className="loader-letter"
              src="/assets/img/pfc-loading/P.svg"
              alt=""
              draggable={false}
            />
            <img
              className="loader-letter"
              src="/assets/img/pfc-loading/F.svg"
              alt=""
              draggable={false}
            />
            <img
              className="loader-letter"
              src="/assets/img/pfc-loading/C.svg"
              alt=""
              draggable={false}
            />
            <div className="loader"></div>
          </div>
        </div>
      )}
    </>
  );
}
