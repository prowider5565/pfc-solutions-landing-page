"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Scroll animation for the workflow timeline. Copy is rendered by the server
 * parent and passed through as children, so no text ships in the client bundle.
 *
 * The governing rule: the markup and CSS are authored in their FINISHED state —
 * rail fully drawn, dots lit, rows opaque. This file opts *into* the hidden
 * state by adding `wt-js`. Nothing is ever hidden by CSS or by SSR markup, so a
 * script failure, a slow network or a reduced-motion preference all degrade to
 * a plain readable timeline instead of an invisible section.
 *
 * ThemeScripts injects GSAP from an effect, i.e. after hydration, so the globals
 * may not exist on first run. Try once, then
 * retry on "theme:scripts-ready".
 */

/** Viewport line the rail head is pinned to — see the geometry note below.
 *  This is also the dots' trigger line; the two MUST stay equal. */
const RAIL_LINE = "55%";
const ROW_START = "top 88%";

type TriggerVars = {
  id?: string;
  trigger: Element;
  start?: string;
  end?: string;
  scrub?: boolean;
  once?: boolean;
  toggleActions?: string;
  invalidateOnRefresh?: boolean;
  onEnter?: () => void;
  onLeaveBack?: () => void;
};
type TriggerInstance = { vars: { id?: unknown }; refresh: () => void };
type ScrollTriggerLike = {
  create: (vars: TriggerVars) => unknown;
  getAll: () => TriggerInstance[];
  addEventListener: (event: string, fn: () => void) => void;
  removeEventListener: (event: string, fn: () => void) => void;
};
type MatchMediaContext = { conditions?: Record<string, boolean> };
type MatchMediaLike = {
  add: (
    conditions: Record<string, string>,
    fn: (ctx: MatchMediaContext) => (() => void) | void,
  ) => void;
  revert: () => void;
};
type Tweenable = Element | Element[] | (Element | null)[] | null;
type TimelineLike = {
  from: (
    target: Tweenable,
    vars: Record<string, unknown>,
    position?: string | number,
  ) => TimelineLike;
};
type GsapLike = {
  matchMedia: (scope?: Element) => MatchMediaLike;
  set: (target: Tweenable, vars: Record<string, unknown>) => void;
  to: (target: Tweenable, vars: Record<string, unknown>) => void;
  from: (target: Tweenable, vars: Record<string, unknown>) => void;
  timeline: (vars?: Record<string, unknown>) => TimelineLike;
  utils: { toArray: (target: string, scope?: Element) => Element[] };
};
type GsapWindow = Window & { gsap?: GsapLike; ScrollTrigger?: ScrollTriggerLike };

export default function WorkflowTimelineMotion({
  children,
}: {
  children: ReactNode;
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let mm: MatchMediaLike | undefined;
    let disposed = false;
    let disposeExtras: (() => void) | undefined;

    /**
     * Bound the rail to the first and last dot centres. Left to CSS the rail
     * would span the whole list, which overshoots the final dot by ~430px of
     * empty track. It also makes the scrub exact: because the rail now starts
     * and ends on dot centres, filling it from 0 to 1 maps precisely onto the
     * dots, so each lights as the head reaches it.
     *
     * Runs even when GSAP is absent — this is layout, not motion.
     */
    const measureRail = () => {
      const rail = root.querySelector<HTMLElement>(".wt-rail");
      const dots = root.querySelectorAll<HTMLElement>(".wt-dot");
      const first = dots[0];
      const last = dots[dots.length - 1];
      if (!rail || !first || !last) return;
      const origin = root.getBoundingClientRect().top;
      const a = first.getBoundingClientRect();
      const b = last.getBoundingClientRect();
      const top = a.top - origin + a.height / 2;
      const bottom = b.top - origin + b.height / 2;
      root.style.setProperty("--wt-rail-top", `${top}px`);
      root.style.setProperty("--wt-rail-height", `${bottom - top}px`);
    };

    measureRail();

    const initialize = () => {
      // Whichever of the two entry points fires first wins; the other no-ops.
      // Also makes StrictMode's mount -> cleanup -> mount idempotent.
      if (mm) return;

      const w = window as GsapWindow;
      const gsap = w.gsap;
      const ScrollTrigger = w.ScrollTrigger;
      // Scripts not here yet, or never arriving. Leave the DOM exactly as
      // rendered: rail drawn, dots lit, rows opaque.
      if (!gsap || !ScrollTrigger) return;

      // Scoped, so selector strings resolve inside root rather than document.
      mm = gsap.matchMedia(root);

      mm.add(
        {
          // Exhaustive on purpose: a lone "reduce" condition would not run the
          // callback at all when the user has no motion preference set.
          reduce: "(prefers-reduced-motion: reduce)",
          isNarrow: "(max-width: 991.98px)",
          isWide: "(min-width: 992px)",
        },
        (ctx) => {
          // GSAP 3.14's MatchMedia.kill() neither empties `contexts` nor
          // deregisters from the global registry, so a media-query crossing
          // *after* unmount can re-invoke this against a detached root.
          if (disposed || !root.isConnected) return;
          // CLAUDE.md acceptance criterion 10: touch nothing.
          if (ctx.conditions?.reduce) return;

          // Only past this point may anything be hidden.
          root.classList.add("wt-js");

          const rail = root.querySelector<HTMLElement>(".wt-rail");
          const fill = root.querySelector<HTMLElement>(".wt-rail__fill");
          const dots = gsap.utils.toArray(".wt-dot", root);
          const rows = gsap.utils.toArray(".wt-row", root);
          const isNarrow = !!ctx.conditions?.isNarrow;
          // Narrow is a single column beside a gutter rail, so there is no
          // "own side" to come from — it rises. From lg up the two halves
          // straddle the centre rail and each slides in from its outer edge.
          const rise = isNarrow ? 24 : 0;
          const slide = isNarrow ? 0 : 64;

          if (rail && fill) {
            gsap.set(fill, { scaleY: 0, transformOrigin: "top center" });
            // Geometry: the trigger is the rail itself, which measureRail has
            // bounded to the first and last dot centres. So at progress p the
            // rail top sits at RAIL_LINE - p*railHeight and the head lands
            // exactly on RAIL_LINE — for any height, locale or breakpoint.
            // That is why the dots below can use the same line and stay in
            // sync with no offset arithmetic.
            gsap.to(fill, {
              scaleY: 1,
              ease: "none",
              scrollTrigger: {
                id: "wt-rail",
                trigger: rail,
                start: "top " + RAIL_LINE,
                end: "bottom " + RAIL_LINE,
                // Must be `true`, never a number: numeric scrub lags the head
                // behind RAIL_LINE and desyncs it from the dot triggers.
                scrub: true,
                invalidateOnRefresh: true,
              },
            });
          }

          dots.forEach((dot, i) => {
            // Explicit callbacks rather than toggleClass + end:"max". A
            // toggled class is bound to the trigger's *active* window, and a
            // trigger is not active once scroll reaches its end — so at the
            // bottom of the page every dot went dark again. Adding on the way
            // down and removing only on the way back up is what actually
            // mirrors the rail.
            ScrollTrigger.create({
              id: "wt-dot-" + i,
              trigger: dot,
              start: "center " + RAIL_LINE,
              onEnter: () => dot.classList.add("is-lit"),
              onLeaveBack: () => dot.classList.remove("is-lit"),
            });
          });

          // GSAP can arrive a second or more after hydration. A row already on
          // screen by then must not be yanked to opacity 0 and re-revealed.
          const fold = window.innerHeight;
          rows.forEach((row, i) => {
            if (row.getBoundingClientRect().top < fold * 0.88) return;

            const body = row.querySelector<HTMLElement>(".wt-body");
            const media = row.querySelector<HTMLElement>(".wt-media");
            // Which grid column each half occupies — the CSS puts .wt-body left
            // and .wt-media right, and .wt-row--flip swaps them. Each half
            // therefore travels inward toward the rail, so the row visibly
            // assembles around its dot instead of drifting up as one block.
            const flip = row.classList.contains("wt-row--flip");
            const bodyX = flip ? slide : -slide;

            // Lead with whichever half sits first in reading order: the image
            // is stacked above the text below lg, side by side above it.
            const lead = isNarrow ? media : body;
            const follow = isNarrow ? body : media;
            const leadX = isNarrow ? 0 : bodyX;
            const followX = isNarrow ? 0 : -bodyX;

            const REVEAL = { opacity: 0, duration: 0.7, ease: "power3.out" };

            gsap
              .timeline({
                scrollTrigger: {
                  id: "wt-row-" + i,
                  trigger: row,
                  start: ROW_START,
                  once: true,
                },
              })
              .from(lead, { ...REVEAL, x: leadX, y: rise })
              // "<0.12" — 0.12s after the previous tween *starts*, not after it
              // ends, so the two halves overlap into one gesture rather than
              // reading as two separate reveals.
              .from(follow, { ...REVEAL, x: followX, y: rise }, "<0.12");
          });

          // Runs on revert, media change and unmount.
          return () => {
            root.classList.remove("wt-js");
          };
        },
      );

      // Re-measure the rail before ScrollTrigger recomputes any position,
      // otherwise a resize leaves the fill mapped to the old dot spacing.
      ScrollTrigger.addEventListener("refreshInit", measureRail);
      cleanupRefreshInit = () =>
        ScrollTrigger.removeEventListener("refreshInit", measureRail);

      // Refresh OUR triggers only. A global ScrollTrigger.refresh() would also
      // re-measure main.js's pinned .award-area trigger, which can survive a
      // client-side route change with a detached element.
      refreshOwn = () => {
        ScrollTrigger.getAll().forEach((t) => {
          if (typeof t.vars.id === "string" && t.vars.id.startsWith("wt-")) {
            t.refresh();
          }
        });
      };

      // font-display:swap reflows every heading above and inside the section.
      document.fonts?.ready.then(schedule).catch(() => {});
      schedule();
    };

    // Set up outside initialize() so the rail stays correctly bounded even if
    // the theme scripts never arrive — measuring is React's job, not GSAP's.
    let raf = 0;
    let refreshOwn: (() => void) | undefined;
    let cleanupRefreshInit: (() => void) | undefined;
    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        measureRail();
        refreshOwn?.();
      });
    };
    // Locale text length, late image decode, viewport changes. Safe from
    // feedback loops: only transform/opacity are animated, and neither
    // changes layout size.
    const observer = new ResizeObserver(schedule);
    observer.observe(root);
    disposeExtras = () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      cleanupRefreshInit?.();
    };

    initialize(); // client-side navigation: scripts already loaded
    window.addEventListener("theme:scripts-ready", initialize); // first load

    return () => {
      disposed = true;
      window.removeEventListener("theme:scripts-ready", initialize);
      disposeExtras?.();
      // Kills only this component's tweens and ScrollTriggers, and reverts
      // every inline style GSAP wrote. main.js's triggers are untouched.
      mm?.revert();
      mm = undefined;
    };
  }, []);

  return (
    <div className="wt-timeline" ref={rootRef}>
      <div className="wt-rail" aria-hidden="true">
        <span className="wt-rail__fill" />
      </div>
      {children}
    </div>
  );
}
