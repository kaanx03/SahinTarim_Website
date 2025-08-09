// app/products/page.js - SEO eklenmiş versiyon
"use client";

import ProductsPage from "@/app/components/ProductsPage";
import { CartProvider } from "@/app/contexts/CartContext";
import Head from "next/head";

export default function Products() {
  return (
    <>
      {/* Products Sayfası SEO */}
      <Head>
        {/* Meta Tags */}
        <title>
          Ürünlerimiz - Kaliteli Elma Fidanları ve Tohum Çeşitleri | Şahintarım
        </title>
        <meta
          name="description"
          content="Şahintarım'ın geniş ürün kataloğunu keşfedin. Granny Smith, Starking, Gala, Golden Delicious elma fidanları ve organik tohum çeşitleri. Tüm Türkiye'ye hızlı kargo."
        />
        <meta
          name="keywords"
          content="elma fidanı çeşitleri, granny smith fidan, starking elma fidanı, gala elma fidanı, golden delicious fidan, organik tohum, meyve fidanı satış, niğde elma fidanı"
        />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="Ürünlerimiz - Kaliteli Elma Fidanları ve Tohum Çeşitleri | Şahintarım"
        />
        <meta
          property="og:description"
          content="Geniş ürün kataloğumuzdan en kaliteli elma fidanlarını ve organik tohumları keşfedin. 15+ yıl deneyim, kalite garantisi."
        />
        <meta property="og:image" content="/images/og-sahintarim.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          content="Şahintarım Ürün Kataloğu - Elma Fidanları"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sahintarim.com/products" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Ürünlerimiz - Kaliteli Elma Fidanları | Şahintarım"
        />
        <meta
          name="twitter:description"
          content="Geniş ürün kataloğumuzdan en kaliteli elma fidanlarını keşfedin."
        />
        <meta name="twitter:image" content="/images/og-sahintarim.jpg" />

        {/* Canonical */}
        <link rel="canonical" href="https://sahintarim.com/products" />

        {/* JSON-LD Structured Data - Product Catalog */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              "@id": "https://sahintarim.com/products#webpage",
              url: "https://sahintarim.com/products",
              name: "Ürünlerimiz - Elma Fidanları",
              description:
                "Şahintarım'ın kaliteli elma fidanları ve tohum çeşitleri",
              isPartOf: {
                "@id": "https://sahintarim.com/#website",
              },
              about: {
                "@type": "Thing",
                name: "Elma Fidanları",
                description: "Organik ve kaliteli elma fidanı çeşitleri",
              },
              mainEntity: {
                "@type": "ItemList",
                name: "Elma Fidanı Çeşitleri",
                description:
                  "Şahintarım kalitesiyle yetiştirilen elma fidanları",
                numberOfItems: "4",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    item: {
                      "@type": "Product",
                      name: "Granny Smith Elma Fidanı",
                      description:
                        "Ekşi ve çıtır dokusuyla ünlü Granny Smith elma fidanı",
                      category: "Elma Fidanı",
                      brand: "Şahintarım",
                    },
                  },
                  {
                    "@type": "ListItem",
                    position: 2,
                    item: {
                      "@type": "Product",
                      name: "Starking Elma Fidanı",
                      description:
                        "Kırmızı rengi ve lezzetiyle öne çıkan Starking elma fidanı",
                      category: "Elma Fidanı",
                      brand: "Şahintarım",
                    },
                  },
                  {
                    "@type": "ListItem",
                    position: 3,
                    item: {
                      "@type": "Product",
                      name: "Gala Elma Fidanı",
                      description:
                        "Erken hasat yapılan, tatlı ve aromatik Gala elma fidanı",
                      category: "Elma Fidanı",
                      brand: "Şahintarım",
                    },
                  },
                  {
                    "@type": "ListItem",
                    position: 4,
                    item: {
                      "@type": "Product",
                      name: "Golden Delicious Elma Fidanı",
                      description:
                        "Bal tadında aroması olan Golden Delicious elma fidanı",
                      category: "Elma Fidanı",
                      brand: "Şahintarım",
                    },
                  },
                ],
              },
              breadcrumb: {
                "@type": "BreadcrumbList",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "Ana Sayfa",
                    item: "https://sahintarim.com",
                  },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: "Ürünlerimiz",
                    item: "https://sahintarim.com/products",
                  },
                ],
              },
            }),
          }}
        />
      </Head>

      <CartProvider>
        <ProductsPage />
      </CartProvider>
    </>
  );
}
