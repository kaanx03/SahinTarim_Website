import { SpeedInsights } from "@vercel/speed-insights/next";
import "./styles/globals.css";
import "./styles/components.css";
import "./styles/home.css";
import "./styles/product-detail.css";
import "./styles/product-list.css";
import "./styles/page.css";
import "./styles/about.css";
import "./styles/contact.css";

export const metadata = {
  title: {
    default:
      "Şahintarım - Kaliteli Tohum, Fidan ve Elma Fidanları | Niğde Tarım Ürünleri",
    template: "%s | Şahintarım",
  },
  description:
    "Niğde'nin en güvenilir tarım ürünleri mağazası Şahintarım. Kaliteli elma fidanları, sebze tohumları, meyve ağacı fidanları ve organik tohum çeşitleri. 25+ yıl deneyim, hızlı teslimat, kalite garantisi.",
  keywords: [
    "tohum satışı",
    "fidan satışı",
    "elma fidanı",
    "sebze tohumu",
    "meyve ağacı fidanı",
    "organik tohum",
    "Niğde tohum",
    "tarım ürünleri",
    "bahçe malzemeleri",
    "çiçek tohumu",
  ],
  authors: [{ name: "Şahintarım Tarım Ürünleri" }],
  creator: "Şahintarım",
  publisher: "Şahintarım",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://sahintarim.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Şahintarım - Kaliteli Tohum, Fidan ve Elma Fidanları | Niğde",
    description:
      "Niğde'nin en güvenilir tarım ürünleri mağazası. 25+ yıl deneyimle kaliteli tohum ve fidan satışı. Hızlı teslimat ve kalite garantisi.",
    url: "https://sahintarim.com",
    siteName: "Şahintarım Tarım Ürünleri",
    images: [
      {
        url: "/images/og-sahintarim.jpg",
        width: 1200,
        height: 630,
        alt: "Şahintarım - Kaliteli Tohum ve Fideler",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Şahintarım - Kaliteli Tohum, Fidan ve Elma Fidanları",
    description:
      "Niğde'nin en güvenilir tarım ürünleri mağazası. Kaliteli tohum ve fidan satışı.",
    images: ["/images/og-sahintarim.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicons/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      {
        url: "/favicons/apple-icon-57x57.png",
        sizes: "57x57",
        type: "image/png",
      },
      {
        url: "/favicons/apple-icon-60x60.png",
        sizes: "60x60",
        type: "image/png",
      },
      {
        url: "/favicons/apple-icon-72x72.png",
        sizes: "72x72",
        type: "image/png",
      },
      {
        url: "/favicons/apple-icon-76x76.png",
        sizes: "76x76",
        type: "image/png",
      },
      {
        url: "/favicons/apple-icon-114x114.png",
        sizes: "114x114",
        type: "image/png",
      },
      {
        url: "/favicons/apple-icon-120x120.png",
        sizes: "120x120",
        type: "image/png",
      },
      {
        url: "/favicons/apple-icon-144x144.png",
        sizes: "144x144",
        type: "image/png",
      },
      {
        url: "/favicons/apple-icon-152x152.png",
        sizes: "152x152",
        type: "image/png",
      },
      {
        url: "/favicons/apple-icon-180x180.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    other: [
      {
        rel: "icon",
        url: "/favicons/android-icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
  },
  manifest: "/manifest.json",
  other: {
    "msapplication-TileColor": "#2E7D32",
    "msapplication-TileImage": "/favicons/ms-icon-144x144.png",
    "theme-color": "#2E7D32",
    "geo.region": "TR-51",
    "geo.placename": "Niğde",
    "geo.position": "37.9667;34.6833",
    ICBM: "37.9667, 34.6833",
    language: "Turkish",
    "content-language": "tr",
    rating: "general",
    distribution: "global",
    "revisit-after": "7 days",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <head>
        {/* External stylesheets */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
          integrity="sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": "https://sahintarim.com/#organization",
              name: "Şahintarım Tarım Ürünleri",
              alternateName: "Şahintarım",
              description:
                "Niğde'nin en güvenilir tarım ürünleri mağazası. Kaliteli tohum, fidan ve elma fidanları satışı.",
              url: "https://sahintarim.com",
              telephone: "+905332234645",
              email: "sahintarimcilik@gmail.com",
              image: {
                "@type": "ImageObject",
                url: "https://sahintarim.com/favicon.ico",
                width: 512,
                height: 512,
              },
              logo: {
                "@type": "ImageObject",
                url: "https://sahintarim.com/favicon.ico",
                width: 512,
                height: 512,
              },
              address: {
                "@type": "PostalAddress",
                addressLocality: "Niğde",
                addressRegion: "Niğde",
                addressCountry: "TR",
                postalCode: "51000",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 37.9667,
                longitude: 34.6833,
              },
              openingHours: ["Mo-Fr 09:00-18:00", "Sa 09:00-17:00"],
              priceRange: "₺₺",
              paymentAccepted: ["Cash", "Credit Card"],
              currenciesAccepted: "TRY",
              areaServed: {
                "@type": "City",
                name: "Niğde",
              },
              serviceArea: {
                "@type": "GeoCircle",
                geoMidpoint: {
                  "@type": "GeoCoordinates",
                  latitude: 37.9667,
                  longitude: 34.6833,
                },
                geoRadius: "50000",
              },
              sameAs: ["https://wa.me/905332234645"],
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Tarım Ürünleri",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Product",
                      name: "Elma Fidanları",
                      category: "Meyve Fidanı",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Product",
                      name: "Sebze Tohumları",
                      category: "Tohum",
                    },
                  },
                ],
              },
            }),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": "https://sahintarim.com/#website",
              url: "https://sahintarim.com",
              name: "Şahintarım Tarım Ürünleri",
              description:
                "Kaliteli tohum, fidan ve elma fidanları satış mağazası",
              inLanguage: "tr-TR",
              potentialAction: [
                {
                  "@type": "SearchAction",
                  target: {
                    "@type": "EntryPoint",
                    urlTemplate:
                      "https://sahintarim.com/products?search={search_term_string}",
                  },
                  "query-input": "required name=search_term_string",
                },
              ],
            }),
          }}
        />
      </head>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
