"use client";

import { useEffect } from "react";
import "./styles/globals.css";
import "./styles/components.css";
import "./styles/home.css";
import "./styles/product-detail.css";
import "./styles/product-list.css";
import "./styles/page.css";
import "./styles/about.css";
import "./styles/contact.css";

export default function RootLayout({ children }) {
  // Font Awesome CDN eklemek için
  useEffect(() => {
    const fontAwesomeScript = document.createElement("script");
    fontAwesomeScript.src = "https://kit.fontawesome.com/a076d05399.js";
    fontAwesomeScript.crossOrigin = "anonymous";
    document.body.appendChild(fontAwesomeScript);

    return () => {
      // Temizleme
      if (document.body.contains(fontAwesomeScript)) {
        document.body.removeChild(fontAwesomeScript);
      }
    };
  }, []);

  return (
    <html lang="tr">
      <head>
        {/* Temel Meta Tags */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* SEO Meta Tags */}
        <title>
          Şahintarım - Kaliteli Tohum, Fidan ve Elma Fidanları | Niğde
        </title>
        <meta
          name="description"
          content="Niğde'nin en kaliteli tohum ve fidan satış mağazası. Elma fidanları, sebze tohumları, meyve ağacı fidanları ve organik tohum çeşitleri. Hızlı teslimat, kalite garantisi."
        />
        <meta
          name="keywords"
          content="tohum, fidan, elma fidanı, sebze tohumu, meyve ağacı, organik tohum, Niğde, tarım, bahçe, çiçek tohumu"
        />
        <meta name="author" content="Şahintarım" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Şahintarım - Kaliteli Tohum ve Fideler"
        />
        <meta
          property="og:description"
          content="Niğde'nin en kaliteli tohum ve fidan satış mağazası. Elma fidanları, sebze tohumları ve organik tohum çeşitleri."
        />
        <meta property="og:url" content="https://şahintarım.com" />
        <meta property="og:image" content="https://şahintarım.com/logo.ico" />
        <meta property="og:image:width" content="512" />
        <meta property="og:image:height" content="512" />
        <meta property="og:locale" content="tr_TR" />
        <meta property="og:site_name" content="Şahintarım" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Şahintarım - Kaliteli Tohum ve Fideler"
        />
        <meta
          name="twitter:description"
          content="Niğde'nin en kaliteli tohum ve fidan satış mağazası. Elma fidanları, sebze tohumları ve organik tohum çeşitleri."
        />
        <meta
          name="twitter:image"
          content="https://sahintarim.com/images/og-image.jpg"
        />

        {/* WhatsApp Önizleme */}
        <meta
          property="og:image:alt"
          content="Şahintarım - Kaliteli Tohum ve Fideler"
        />

        {/* Favicon ve İkonlar */}
        <link rel="icon" href="/logo.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="/logo.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/logo.ico" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://sahintarim.com" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Şahintarım",
              description:
                "Kaliteli tohum, fidan ve elma fidanları satış mağazası",
              url: "https://sahintarim.com",
              telephone: "+905332234645",
              email: "sahintarimcilik@gmail.com",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Niğde",
                addressCountry: "TR",
              },
              openingHours: "Mo-Fr 09:00-18:00",
              priceRange: "₺₺",
              image: "https://şahintarım.com/logo.ico",
              sameAs: ["https://wa.me/905332234645"],
            }),
          }}
        />

        {/* Font Awesome (Alternatif CDN) */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
          integrity="sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
