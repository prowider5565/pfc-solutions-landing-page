import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ThemeScripts from "@/components/ThemeScripts";
import { routing } from "@/i18n/routing";

const APPLE_ICON_SIZES = [57, 60, 72, 76, 114, 120, 144, 152, 180];

/** Prerender all three locales as static content. */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("title"),
    robots: "INDEX,FOLLOW",
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  // Required for static rendering — without it the page opts into dynamic.
  setRequestLocale(locale);

  return (
    <html lang={locale} dir="ltr" className="no-js">
      <head>
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />

        {/* Favicons */}
        {APPLE_ICON_SIZES.map((s) => (
          <link
            key={s}
            rel="apple-touch-icon"
            sizes={`${s}x${s}`}
            href={`/assets/img/favicons/apple-icon-${s}x${s}.png`}
          />
        ))}
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/assets/img/favicons/android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/assets/img/favicons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/assets/img/favicons/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/assets/img/favicons/favicon-16x16.png"
        />
        <link rel="manifest" href="/assets/img/favicons/manifest.json" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta
          name="msapplication-TileImage"
          content="/assets/img/favicons/ms-icon-144x144.png"
        />
        <meta name="theme-color" content="#ffffff" />

        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@100..800&family=Urbanist:ital,wght@0,100..900;1,100..900&family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />

        {/* Template stylesheets — order matters: style.css must come last. */}
        <link rel="stylesheet" href="/assets/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/assets/css/fontawesome.min.css" />
        <link rel="stylesheet" href="/assets/css/swiper-bundle.min.css" />
        <link rel="stylesheet" href="/assets/css/style.css" />

        {/* Language switcher — no counterpart in the Aior template, so it is
            styled here from the template's own custom properties. Declared
            after style.css so it wins without !important. */}
        <style>{`
          /* --- Language control --------------------------------------------
             The template has no dropdown pattern outside .main-menu, so the
             panel is built here from the template's own custom properties.
             The trigger is the template's .icon-btn, so it inherits the 56px
             circle and the header-layout8 grey fill / gradient hover. */
          .lang-switcher{position:relative;display:inline-flex;align-items:center}
          .lang-switcher > .icon-btn{cursor:pointer;padding:0}
          /* The active locale's flag fills the circle edge to edge. overflow
             clips it to the .icon-btn border-radius; object-fit stops the
             circular flag artwork distorting. */
          .lang-flag-btn{overflow:hidden;border:0}
          .lang-flag-btn img{
            width:100%;height:100%;object-fit:cover;display:block;margin:0
          }
          /* The template recolours icon images on hover
             (.icon-btn:hover img{filter:brightness(0) invert(1)}) so line-art
             glyphs read against the theme fill. On a flag that flattens the
             whole image to white — it looked like the button vanished. */
          .lang-flag-btn:hover img,
          .lang-flag-btn:focus-visible img{filter:none}
          .lang-dropdown .lang-flag{
            width:18px;height:18px;border-radius:50%;object-fit:cover;
            margin:0 8px -4px 0;display:inline-block
          }

          .lang-dropdown{
            position:absolute;top:calc(100% + 10px);right:0;z-index:999999;
            min-width:120px;margin:0;padding:6px;list-style:none;
            background-color:var(--white-color);
            border:1px solid var(--th-border-color);border-radius:12px;
            box-shadow:0 12px 40px rgba(10,27,61,.12);
            opacity:0;visibility:hidden;transform:translateY(-6px);
            transition:opacity .2s ease,transform .2s ease,visibility .2s
          }
          .lang-dropdown.is-open{opacity:1;visibility:visible;transform:translateY(0)}
          .lang-dropdown a{
            display:block;padding:8px 14px;border-radius:8px;
            font-family:var(--body-font);font-size:14px;font-weight:600;line-height:1.3;
            color:var(--title-color);text-decoration:none;
            transition:color .2s,background-color .2s
          }
          .lang-dropdown a:hover{background-color:var(--smoke-color2)}
          .lang-dropdown a.is-active{color:var(--theme-color)}

          /* Inline variant — footer bottom bar and the mobile menu, where a
             56px circle would be out of place. */
          .lang-switcher--inline{display:inline-flex;align-items:center;gap:2px;vertical-align:middle}
          .lang-switcher--inline a{
            display:inline-block;padding:4px 8px;border-radius:4px;
            font-family:var(--body-font);font-size:13px;font-weight:600;line-height:1.2;
            color:var(--body-color);text-decoration:none;transition:color .2s,background-color .2s
          }
          .lang-switcher--inline a:hover{color:var(--theme-color)}
          .lang-switcher--inline a.is-active{color:var(--theme-color);font-weight:700}
          .footer-wrapper .lang-switcher--inline a{color:var(--light-color)}
          .footer-wrapper .lang-switcher--inline a:hover,
          .footer-wrapper .lang-switcher--inline a.is-active{color:var(--theme-color2)}
          .th-menu-wrapper .lang-switcher--inline a{color:var(--title-color)}
          .th-menu-wrapper .lang-switcher--inline a.is-active{color:var(--theme-color)}

          /* Logo +10%. logo.svg has an intrinsic 213x80 and no CSS width, so
             it rendered at 213px; 234px is that plus 10%. Applies to both
             header layouts (homepage header-layout8 and the inner
             header-layout1), which share the .header-logo wrapper. */
          .header-logo img{width:234px;max-width:100%;height:auto}

          /* Problem cards: Bootstrap columns already give equal widths, but the
             card inside each column only grew to fit its own text, so heights
             varied with copy length. Stretching the card to fill its column
             equalises them; column-flex keeps the icon top-aligned. */
          #problem .feature-grid4{height:100%;display:flex;flex-direction:column}
          #problem .feature-grid4 > div:last-child{flex:1 1 auto}

          .technology-template-area{
            position:relative;z-index:2;max-width:1280px;margin:0 auto
          }
          .technology-template-area .integration-wrapp{
            position:relative;z-index:2;display:flex;justify-content:center;
            margin-top:64px
          }
          .technology-template-area .integration-shape img{
            display:block;width:min(1099px,88vw);height:auto;margin:0 auto
          }
          .technology-template-area .integration-logo{
            position:absolute;top:-50px;left:50%;transform:translateX(-50%)
          }
          .technology-template-area .integration-logo img{
            display:block;width:102px;height:102px
          }
          .technology-template-area .box-wrapp{
            display:flex;justify-content:center;align-items:flex-start;
            margin-top:-40px
          }
          .technology-template-area .technology-icon{
            position:relative;z-index:2;min-width:132px;width:132px;height:132px;
            line-height:132px;text-align:center;background-color:#EBF3FF;
            border-radius:50%;display:flex;align-items:center;justify-content:center;
            color:var(--title-color)
          }
          .technology-template-area .technology-icon:nth-child(1){margin:-60px 0 0 0}
          .technology-template-area .technology-icon:nth-child(2){margin:0 0 0 -28px;background-color:#EFFAFF}
          .technology-template-area .technology-icon:nth-child(3){margin:-50px 0 0 -8px;background-color:#FFF1EE}
          .technology-template-area .technology-icon:nth-child(4){margin:-30px -2px -30px -24px;background-color:#EDF5F3}
          .technology-template-area .technology-icon:nth-child(5){margin:-60px 0 0 -8px;background-color:#E8F1FF}
          .technology-template-area .technology-icon:nth-child(6){margin:0 0 0 -18px;background-color:#FFF2ED}
          .technology-template-area .technology-icon:nth-child(7){margin:-60px 0 0 -34px;background-color:#E5FEFF}
          .technology-template-area .technology-icon:nth-child(8){margin:0 0 0 -34px;background-color:#F4F7FF}
          .technology-template-area .technology-icon:nth-child(9){margin:-60px 0 0 -34px;background-color:#EBF3FF}
          .technology-template-area .technology-icon:nth-child(10){margin:0 0 0 -34px;background-color:#EFFAFF}
          .technology-template-area .technology-icon:nth-child(11){margin:-50px 0 0 -34px;background-color:#FFF1EE}
          .technology-template-area .technology-icon:nth-child(12){margin:-30px -2px -30px -34px;background-color:#EDF5F3}
          .technology-template-area .technology-icon:nth-child(13){margin:-60px 0 0 -34px;background-color:#E8F1FF}
          .technology-template-area .technology-icon:nth-child(14){margin:0 0 0 -34px;background-color:#FFF2ED}
          .technology-icon img{
            width:clamp(38px,4.5vw,62px);height:clamp(38px,4.5vw,62px);
            object-fit:contain
          }

          /* Closing proof line added beneath the template's pinned cards. */
          .testimonial-closing{
            margin:58px auto 0;max-width:1120px;
            font-family:var(--title-font);font-size:22px;font-weight:600;
            color:var(--title-color)
          }
          .testimonial-section .testi-card2{
            width:1120px;max-width:100%
          }
          .testimonial-section .testi-card2 .box-text,
          .testimonial-section .testi-card2 .box-info{
            padding-left:clamp(34px,4vw,64px)
          }

          /* Match the download-version footer logo9.svg implementation:
             its intrinsic and rendered box is 428x96. The PFC artwork keeps
             that exact desktop footprint and scales down on narrow screens. */
          .pfc-footer-main{
            padding-top:calc(var(--section-space) * 1.5);
            padding-bottom:80px
          }
          .pfc-footer-main .th-widget-about{max-width:428px}
          .pfc-footer-main .footer-widget{margin-bottom:130px}
          .pfc-footer-logo img{
            display:block;width:428px;height:96px;max-width:100%;object-fit:fill
          }

          /* The white notch at the header's top-right is carved by the hero's
             corner radius, so its width is fixed. The localized CTA labels are
             longer than the template's ("Suhbatga yozilish" / "Записаться на
             встречу" vs "Start Free Trial"), which widened .header-button and
             pushed the globe left onto the black curve. Trimming the button
             group keeps it inside the notch in every locale. */
          @media (min-width:1200px){
            .header-layout8 .header-button .th-btn2{font-size:16px;padding-left:22px;padding-right:22px}
            /* 39px = 46px − 15%. */
            .header-layout8 .header-button > .lang-switcher > .icon-btn{
              --btn-size:39px;--btn-font-size:16px
            }
            .header-layout1 .header-button > .lang-switcher > .icon-btn{
              --btn-size:39px;--btn-font-size:16px
            }
            /* Russian's CTA ("Записаться на встречу") is ~39px wider than the
               Uzbek one, which closes the gap to zero. Scoped to :lang(ru) so
               the other two locales keep the fuller button. */
            html[lang="ru"] .header-layout8 .header-button{margin-right:-14px}
            html[lang="ru"] .header-layout8 .header-button .th-btn2{
              font-size:15px;padding-left:18px;padding-right:18px
            }
          }

          /* Keep the desktop logo and action group centred in the hero
             artwork's white corner cutouts. A fixed template container can
             pull both controls inward on wide and zoom-adjusted viewports. */
          @media (min-width:1300px){
            .header-layout8 .th-container{
              max-width:100%;padding-left:24px;padding-right:28px
            }
          }

          /* --- Hero tuning -------------------------------------------------
             1) Hero headline 5% smaller than the template's h1 scale.
                Template: 84 / 67 (<=1500) / 57 (<=1199) / 44 (<=575) / 38 (<=375)
                Here:  79.8 / 63.65 / 54.15 / 41.8 / 36.1
             2) Hero content sits higher: top padding reduced, bottom kept.
                Template padding-top: 325 / 225 (<=1199) / 160 (<=575)
                Reducing the top padding shortens the column, and because the row
                is vertically centred the image only rises by half as much — the
                negative margin on .hero-img7 makes it travel the same distance.
                Scoped to >=1200px because the template resets that margin when
                the image stacks below the text.
             Max-width queries are ordered widest-to-narrowest so the cascade
             resolves the same way the template's own breakpoints do. */
          .hero-style8 .hero-title{font-size:79.8px}
          @media (max-width:1500px){.hero-style8 .hero-title{font-size:63.65px}}
          @media (max-width:1199px){.hero-style8 .hero-title{font-size:54.15px}}
          @media (max-width:575px){.hero-style8 .hero-title{font-size:41.8px}}
          @media (max-width:375px){.hero-style8 .hero-title{font-size:36.1px}}

          .hero-style8{padding-top:275px}
          @media (max-width:1199px){.hero-style8{padding-top:190px}}
          @media (max-width:575px){.hero-style8{padding-top:135px}}
          @media (min-width:1200px){.hero-8 .hero-img7{margin-top:-25px}}

          /* Hero headline uses the shared blue gradient. The background-clip
             pair is re-declared so the clip is not left behind on the old
             shorthand and the title stays aligned with the site-wide palette.
             NB: no backticks in this block — it lives inside a JS template
             literal, so a backtick would terminate the string. */
          .hero-style8 .hero-title .title{
            background:linear-gradient(122.43deg,var(--theme-color) 4.09%,var(--theme-color2) 100.57%);
            -webkit-background-clip:text;background-clip:text;
            -webkit-text-fill-color:transparent
          }

          /* Hero eyebrow: .sub-title is authored for light backgrounds
             (color:$title-color + light border), so it is near-invisible on the
             dark hero. The template's own hero used .rating, which is white. */
          .hero-style8 .sub-title{
            color:var(--white-color);
            border-color:rgba(255,255,255,.25)
          }
          .hero-style8 .sub-title:before{background-color:var(--theme-color2)}

          /* Keep the cursor blue without letting its enlarged outer ring hide
             headings and links underneath it. */
          body.theme7 .cursor-outer,
          body.theme7 .cursor-inner,
          body.theme7 .cursor-inner span{mix-blend-mode:normal!important}
          body.theme7 .cursor-outer.cursor-hover,
          body.theme7 .cursor-outer.cursor-big{background-color:rgba(46,134,255,.25)}

          /* Contact rows mix plain labels with links. Give the whole row an
             explicit light colour so address and labels remain readable. */
          .footer-layout2 .footer-widget.widget_nav_menu li{color:#D4D4D4}

          /* The shared pill button is inline-flex but does not set its cross-
             axis alignment. Centre the contact form label vertically. */
          .contact-form .th-btn2{align-items:center}

          /* Contact success confirmation: a short-lived modal-style toast
             with a clear success icon, without blocking user interaction. */
          .contact-success-popup{
            position:fixed;inset:0;z-index:10000002;display:grid;place-items:center;
            padding:20px;background:rgba(6,5,11,.12);pointer-events:none;
            animation:contactSuccessBackdrop .2s ease-out,
              contactSuccessFade .2s ease-in 1.8s forwards
          }
          .contact-success-popup__panel{
            width:min(520px,calc(100vw - 40px));padding:34px 30px;
            display:flex;flex-direction:column;align-items:center;gap:18px;
            color:var(--title-color);background:var(--white-color);
            border:1px solid rgba(46,134,255,.22);border-radius:20px;
            box-shadow:0 24px 70px rgba(6,5,11,.2);
            text-align:center;animation:contactSuccessPop .25s ease-out
          }
          .contact-success-popup__panel i{
            color:var(--theme-color);font-size:68px;line-height:1
          }
          .contact-success-popup__panel p{
            margin:0;max-width:430px;font-size:18px;font-weight:600;line-height:1.55
          }
          @keyframes contactSuccessBackdrop{
            from{opacity:0}to{opacity:1}
          }
          @keyframes contactSuccessPop{
            from{opacity:0;transform:translateY(18px) scale(.96)}
            to{opacity:1;transform:translateY(0) scale(1)}
          }
          @keyframes contactSuccessFade{
            to{opacity:0}
          }

          /* ================================================================
             RESPONSIVE — mobile & tablet
             Lives here rather than in style.css so template regeneration
             cannot drop it, and so it cascades after style.css without
             needing !important.
             ================================================================ */

          /* --- Approach Block C callout -----------------------------------
             Replaces the .cta-card-wrapp overlay this box used to borrow.
             A plain in-flow card: no absolute positioning, so Block D can no
             longer render on top of it, and no opacity:0 to hide it. */
          .approach-callout{
            background:var(--smoke-color4);
            border:1px solid rgba(6,5,11,.08);
            border-radius:16px;
            padding:28px 30px;
          }
          .approach-callout .box-text{margin-bottom:10px}
          .approach-callout small{color:var(--body-color);line-height:1.6;display:block}
          @media (max-width:575.98px){
            .approach-callout{padding:22px 20px;border-radius:14px}
          }

          /* --- Edge gutters -----------------------------------------------
             Bootstrap's container gutter is 12px, which leaves body copy
             almost touching the screen edge on phones (most visible in the
             footer, where nothing else adds inset). Rows use a -12px margin
             and columns a +12px padding, so raising the container padding
             moves content in without disturbing the grid maths. */
          @media (max-width:575.98px){
            .container,.th-container,.th-container2,.th-container3,
            .th-container4,.th-container5{
              padding-left:20px;padding-right:20px
            }
            .technology-template-area .integration-wrapp{margin-top:34px}
            .technology-template-area .integration-shape{display:none}
            .technology-template-area .integration-logo{display:none}
            .technology-template-area .box-wrapp{
              flex-wrap:wrap;gap:12px;margin-top:0
            }
            .technology-template-area .technology-icon{
              min-width:78px;width:78px;height:78px;line-height:78px;margin:0!important
            }
            .technology-icon img{width:36px;height:36px}
            .testimonial-section .testi-card2 .box-text,
            .testimonial-section .testi-card2 .box-info{padding-left:0}
            .testimonial-closing{margin-top:36px;font-size:19px;line-height:1.5}
            .pfc-footer-main{
              padding-top:calc(var(--section-space-mobile) * 1.5);
              padding-bottom:40px
            }
            .pfc-footer-main .footer-widget{margin-bottom:40px}
            .pfc-footer-logo img{height:auto}
          }

          /* --- Header logo contrast ---------------------------------------
             header-layout8 sits over the hero. Above ~992px the logo lands on
             the hero card's white notch, but below that the card is
             full-bleed and the black logo falls on near-black (#0A0A0A) —
             about 1.1:1, invisible. logo-footer.svg is the same 213x80
             artwork with fill #FFFFFF, so it is a drop-in swap. */
          .header-layout8 .header-logo .logo-light{display:none}
          @media (max-width:991.98px){
            .header-layout8 .header-logo .logo-dark{display:none}
            .header-layout8 .header-logo .logo-light{display:inline-block}
          }

          /* --- Touch targets ----------------------------------------------
             WCAG 2.5.8 asks for 24px minimum, Apple/Material for ~44px. The
             menu, language and breadcrumb links rendered 19-26px tall. Height
             is added with padding so nothing reflows horizontally. */
          @media (max-width:991.98px){
            .th-menu-area .menu li a,
            .th-menu-wrapper .menu li a{
              display:flex;align-items:center;min-height:44px
            }
            .lang-switcher--inline a{
              display:inline-flex;align-items:center;justify-content:center;
              min-height:44px;min-width:44px;padding:0 10px
            }
            .breadcumb-menu li a,.breadcumb-menu li{
              display:inline-flex;align-items:center;min-height:32px
            }
            .header-logo a,.mobile-logo a{display:inline-block;padding:6px 0}
            /* Footer nav/services columns render 21px-tall links. 40px clears
               WCAG 2.5.8 (24px) with room to spare and doubles as breathing
               space between stacked links, without the height blow-up a full
               44px on twelve links would cause. */
            .footer-wrapper .widget_nav_menu .menu li a{
              display:inline-flex;align-items:center;min-height:40px
            }
            /* Copyright-bar links (privacy, language repeat). */
            .footer-links li a{
              display:inline-flex;align-items:center;min-height:40px
            }
          }

          /* ================================================================
             WORKFLOW TIMELINE
             Everything here is authored in its FINISHED state: rail drawn,
             dots lit, rows opaque. The dimmed/animated states hang off .wt-js,
             which WorkflowTimelineMotion adds only once GSAP is present AND
             motion is allowed. If the theme scripts never load, or the visitor
             prefers reduced motion, this degrades to a static readable
             timeline rather than an invisible section.
             ================================================================ */
          .wt-timeline{position:relative}
          .wt-list{list-style:none;margin:0;padding:0;position:relative}

          /* Spans first dot centre to last dot centre. Those two custom
             properties are measured by WorkflowTimelineMotion, because CSS
             cannot express "stop at the last dot" - left to span the whole
             list the rail overshoots the final dot by ~430px of empty track.
             The fallbacks below are the no-JS state: a full-height rail, which
             is untidy at the tail but perfectly readable.
             Bounding it this way also makes the scrub exact - the fill maps
             directly onto the dot positions. See WorkflowTimelineMotion. */
          .wt-rail{
            position:absolute;width:2px;
            top:var(--wt-rail-top,0px);
            height:var(--wt-rail-height,100%);
            background:var(--th-border-color);pointer-events:none;z-index:0
          }
          .wt-rail__fill{
            position:absolute;left:0;top:0;width:100%;height:100%;display:block;
            background:linear-gradient(180deg,var(--theme-color),#8FC6FF)
          }

          .wt-row{position:relative;display:grid}
          .wt-dot{
            position:relative;z-index:2;
            display:inline-flex;align-items:center;justify-content:center;
            border-radius:50%;
            font-family:var(--title-font);font-weight:700;line-height:1;
            background:var(--theme-color);color:var(--white-color)
          }

          /* Cancels .box-title's text-transform:capitalize, which would
             otherwise render "Этап Планирования" and "Discovery Jarayoni". */
          .wt-title{text-transform:none;margin-bottom:16px}
          .wt-text{margin-bottom:14px}
          .wt-text:last-child{margin-bottom:0}

          .wt-media__frame{
            overflow:hidden;border-radius:20px;
            border:1px solid rgba(6,5,11,.08);background:var(--smoke-color4)
          }
          .wt-media__frame img{object-fit:cover;display:block}
          .wt-media__placeholder{
            display:flex;align-items:center;justify-content:center;
            background:linear-gradient(135deg,rgba(46,134,255,.10),rgba(143,198,255,.22))
          }
          .wt-media__placeholder span{
            font-family:var(--title-font);font-size:64px;font-weight:700;
            line-height:1;color:rgba(46,134,255,.30)
          }

          /* --- states owned by JS ---------------------------------------- */
          .wt-js .wt-dot{
            background:var(--smoke-color2);color:var(--body-color);
            transition:background-color .35s ease,color .35s ease,
              box-shadow .35s ease
          }
          .wt-js .wt-dot.is-lit{
            background:var(--theme-color);color:var(--white-color);
            box-shadow:0 0 0 6px rgba(46,134,255,.16)
          }

          /* --- mobile / tablet: rail in the left gutter, single column ---- */
          @media (max-width:991.98px){
            .wt-rail{left:21px}
            .wt-row{
              grid-template-columns:44px 1fr;column-gap:18px;align-items:start
            }
            .wt-row + .wt-row{margin-top:48px}
            .wt-dot{grid-column:1;grid-row:1;width:44px;height:44px;font-size:15px}
            .wt-media{grid-column:2;grid-row:1;margin-bottom:18px}
            .wt-body{grid-column:2;grid-row:2}
            .wt-title{font-size:22px}
          }

          /* --- desktop: rail centred, columns alternate ------------------- */
          @media (min-width:992px){
            .wt-rail{left:50%;margin-left:-1px}
            .wt-row{grid-template-columns:1fr 72px 1fr;align-items:start}
            .wt-row + .wt-row{margin-top:88px}
            .wt-dot{
              grid-column:2;grid-row:1;justify-self:center;
              width:56px;height:56px;font-size:18px
            }
            /* Explicit grid placement rather than a DOM reorder, so reading
               order never diverges from the markup. Stage 1 keeps its natural
               order (text left, image right); even stages flip. */
            .wt-body{grid-column:1;grid-row:1;padding-right:8px;align-self:start}
            .wt-media{grid-column:3;grid-row:1;padding-left:8px;align-self:start}
            .wt-row--flip .wt-body{grid-column:3;padding-right:0;padding-left:8px}
            .wt-row--flip .wt-media{grid-column:1;padding-left:0;padding-right:8px}
            .wt-title{font-size:28px}
          }

          @media (prefers-reduced-motion:reduce){
            .wt-dot{transition:none}
          }

          /* ================================================================
             CLAUDE.md acceptance criterion 10 - prefers-reduced-motion must
             disable all reveal animations. WOW.js 1.3.0 has no such support
             and writes visibility:hidden inline on every .wow box, so without
             this, Approach / Industries / Faq / Breadcrumb still animate and
             can even stay hidden. An author !important rule outranks a
             non-important inline declaration, so this un-hides them.
             ================================================================ */
          @media (prefers-reduced-motion:reduce){
            .wow,.wow.animated{
              visibility:visible!important;animation:none!important
            }
          }
        `}</style>
      </head>
      <body className="theme7">
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
        <ThemeScripts />
      </body>
    </html>
  );
}
