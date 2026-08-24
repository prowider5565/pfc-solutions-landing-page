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

          /* The template cursor uses difference blending, which turns the
             site blue green/orange over light and photographic backgrounds.
             Keep every cursor state on the actual PFC blue instead. */
          body.theme7 .cursor-outer,
          body.theme7 .cursor-inner,
          body.theme7 .cursor-inner span{mix-blend-mode:normal!important}
          body.theme7 .cursor-outer.cursor-hover,
          body.theme7 .cursor-outer.cursor-big{background-color:var(--theme-color)}

        `}</style>
      </head>
      <body className="theme7">
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
        <ThemeScripts />
      </body>
    </html>
  );
}
