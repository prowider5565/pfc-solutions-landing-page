import type { Metadata } from "next";
import ThemeScripts from "@/components/ThemeScripts";

export const metadata: Metadata = {
  title: "Aior - AI & SaaS - Home AI chatbot tool",
  description: "Aior  - AI & SaaS",
  keywords: "Aior  - AI & SaaS",
  authors: [{ name: "themehour" }],
  robots: "INDEX,FOLLOW",
};

const APPLE_ICON_SIZES = [57, 60, 72, 76, 114, 120, 144, 152, 180];

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html className="no-js" lang="zxx">
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
        <link rel="stylesheet" href="/assets/css/magnific-popup.min.css" />
        <link rel="stylesheet" href="/assets/css/swiper-bundle.min.css" />
        <link rel="stylesheet" href="/assets/css/style.css" />
      </head>
      <body className="theme7">
        {children}
        <ThemeScripts />
      </body>
    </html>
  );
}
