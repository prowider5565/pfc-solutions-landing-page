"use client";

import { useEffect } from "react";

/**
 * The template's 17 scripts, in the exact order the original page loads them
 * (home-ai-chatbot-tool.html:1267-1298). Order is load-bearing: every jQuery
 * plugin needs jQuery present, the GSAP plugins need gsap, and main.js must be
 * last because it initialises everything else.
 */
const SCRIPTS = [
  "/assets/js/vendor/jquery-3.7.1.min.js",
  "/assets/js/swiper-bundle.min.js",
  "/assets/js/bootstrap.min.js",
  "/assets/js/jquery.magnific-popup.min.js",
  "/assets/js/jquery.counterup.min.js",
  "/assets/js/circle-progress.js",
  "/assets/js/jquery-ui.min.js",
  "/assets/js/imagesloaded.pkgd.min.js",
  "/assets/js/isotope.pkgd.min.js",
  "/assets/js/nice-select.min.js",
  "/assets/js/wow.min.js",
  "/assets/js/gsap.min.js",
  "/assets/js/ScrollTrigger.min.js",
  "/assets/js/SplitText.js",
  "/assets/js/DrawSVGPlugin3.min.js",
  "/assets/js/lenis.min.js",
  "/assets/js/main.js",
];

// Module scope, not component state: React StrictMode mounts effects twice in
// development, and loading jQuery twice would re-run every plugin registration.
let injected = false;

export default function ThemeScripts() {
  useEffect(() => {
    if (injected) return;
    injected = true;

    // Deliberately no cleanup/abort flag. React StrictMode runs an effect's
    // cleanup immediately after the first mount in development; aborting the
    // loop there would stop the sequence after jQuery and main.js would never
    // run. These scripts are global and load once per page load, so there is
    // nothing to tear down — the `injected` guard above is the only guard needed.
    (async () => {
      for (const src of SCRIPTS) {
        await new Promise<void>((resolve) => {
          const el = document.createElement("script");
          el.src = src;
          // async=false preserves execution order for dynamically inserted scripts.
          el.async = false;
          el.onload = () => resolve();
          el.onerror = () => {
            console.error(`[ThemeScripts] failed to load ${src}`);
            resolve();
          };
          document.body.appendChild(el);
        });
      }

      // main.js registers three behaviours inside DOMContentLoaded listeners
      // (the pinned "awards" stack at :1249, the project parallax at :1281 and
      // the CTA fan-out at :1617). Because these scripts are injected from an
      // effect — i.e. after hydration — that event has long since fired, so
      // those listeners would never run. Re-dispatching it once, after every
      // script has loaded, lets them register. It bubbles from document to
      // window, which covers both listener targets.
      document.dispatchEvent(new Event("DOMContentLoaded", { bubbles: true }));
      window.dispatchEvent(new Event("theme:scripts-ready"));
    })();
  }, []);

  return null;
}
