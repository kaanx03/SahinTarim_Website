// app/products/page.js - SEO eklenmiş versiyon - GOOGLE HATALARI DÜZELTİLDİ
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
        <title>Ürünlerimiz - Kaliteli Niğde Elma Fidanları | Şahintarım</title>
        <meta
          name="description"
          content="Şahintarım'ın kaliteli Niğde elma fidanı kataloğunu keşfedin. Granny Smith, Starking, Gala, Golden Delicious elma fidanları. Tüm Türkiye'ye hızlı kargo."
        />
        <meta
          name="keywords"
          content="niğde elma fidanı çeşitleri, granny smith fidan, starking elma fidanı, gala elma fidanı, golden delicious fidan, organik elma fidanı, meyve fidanı satış, niğde elma fidanı"
        />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="Ürünlerimiz - Kaliteli Niğde Elma Fidanları | Şahintarım"
        />
        <meta
          property="og:description"
          content="Kaliteli Niğde elma fidanlarımızı keşfedin. 15+ yıl deneyim, kalite garantisi."
        />
        <meta property="og:image" content="/images/og-sahintarim.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          content="Şahintarım Elma Fidanları Kataloğu"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sahintarim.com/products" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Ürünlerimiz - Kaliteli Niğde Elma Fidanları | Şahintarım"
        />
        <meta
          name="twitter:description"
          content="Kaliteli Niğde elma fidanlarımızı keşfedin."
        />
        <meta name="twitter:image" content="/images/og-sahintarim.jpg" />

        {/* Canonical */}
        <link rel="canonical" href="https://sahintarim.com/products" />

        {/* JSON-LD Structured Data - Product Catalog - DÜZELTİLDİ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              "@id": "https://sahintarim.com/products#webpage",
              url: "https://sahintarim.com/products",
              name: "Ürünlerimiz - Niğde Elma Fidanları",
              description: "Şahintarım'ın kaliteli Niğde elma fidanları",
              isPartOf: {
                "@id": "https://sahintarim.com/#website",
              },
              about: {
                "@type": "Thing",
                name: "Niğde Elma Fidanları",
                description: "Organik ve kaliteli Niğde elma fidanı çeşitleri",
              },
              mainEntity: {
                "@type": "ItemList",
                name: "Niğde Elma Fidanı Çeşitleri",
                description:
                  "Şahintarım kalitesiyle yetiştirilen Niğde elma fidanları",
                numberOfItems: "4",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    item: {
                      "@type": "Product",
                      "@id": "https://sahintarim.com/product/1",
                      name: "Niğde Granny Smith Elma Fidanı",
                      description:
                        "Niğde'nin yüksek rakımında yetişen, dünyaca ünlü Granny Smith çeşidi. Ekşi ve çıtır dokusuyla pasta ve turta yapımının vazgeçilmezi.",
                      image: [
                        "https://sahintarim.com/images/apples/greenapple.jpg",
                      ],
                      url: "https://sahintarim.com/product/1",
                      sku: "NIGDE-GRANNY-001",
                      category: "Elma Fidanı",
                      brand: {
                        "@type": "Brand",
                        name: "Şahintarım",
                      },
                      offers: {
                        "@type": "Offer",
                        price: "185.00",
                        priceCurrency: "TRY",
                        availability: "https://schema.org/InStock",
                        itemCondition: "https://schema.org/NewCondition",
                        url: "https://sahintarim.com/product/1",
                        seller: {
                          "@type": "Organization",
                          name: "Şahintarım",
                          url: "https://sahintarim.com",
                        },
                      },
                      aggregateRating: {
                        "@type": "AggregateRating",
                        ratingValue: "4.6",
                        reviewCount: "18",
                        bestRating: "5",
                        worstRating: "1",
                      },
                    },
                  },
                  {
                    "@type": "ListItem",
                    position: 2,
                    item: {
                      "@type": "Product",
                      "@id": "https://sahintarim.com/product/2",
                      name: "Niğde Starking Elma Fidanı",
                      description:
                        "Niğde'nin meşhur kırmızı elması! Sulu, sert ve lezzetli. Türkiye'nin en kaliteli Starking elma fidanı üretim merkezi Niğde'den.",
                      image: [
                        "https://sahintarim.com/images/apples/redapple1.jpg",
                      ],
                      url: "https://sahintarim.com/product/2",
                      sku: "NIGDE-STARKING-002",
                      category: "Elma Fidanı",
                      brand: {
                        "@type": "Brand",
                        name: "Şahintarım",
                      },
                      offers: {
                        "@type": "Offer",
                        price: "195.00",
                        priceCurrency: "TRY",
                        availability: "https://schema.org/InStock",
                        itemCondition: "https://schema.org/NewCondition",
                        url: "https://sahintarim.com/product/2",
                        seller: {
                          "@type": "Organization",
                          name: "Şahintarım",
                          url: "https://sahintarim.com",
                        },
                      },
                      aggregateRating: {
                        "@type": "AggregateRating",
                        ratingValue: "4.7",
                        reviewCount: "25",
                        bestRating: "5",
                        worstRating: "1",
                      },
                    },
                  },
                  {
                    "@type": "ListItem",
                    position: 3,
                    item: {
                      "@type": "Product",
                      "@id": "https://sahintarim.com/product/3",
                      name: "Niğde Gala Elma Fidanı",
                      description:
                        "Niğde'nin erken hasat şampiyonu! Ağustos ayında hasadı yapılan, tatlı ve aromatik Gala çeşidi. Sofraların yıldızı.",
                      image: ["https://sahintarim.com/images/apples/gala1.jpg"],
                      url: "https://sahintarim.com/product/3",
                      sku: "NIGDE-GALA-003",
                      category: "Elma Fidanı",
                      brand: {
                        "@type": "Brand",
                        name: "Şahintarım",
                      },
                      offers: {
                        "@type": "Offer",
                        price: "175.00",
                        priceCurrency: "TRY",
                        availability: "https://schema.org/InStock",
                        itemCondition: "https://schema.org/NewCondition",
                        url: "https://sahintarim.com/product/3",
                        seller: {
                          "@type": "Organization",
                          name: "Şahintarım",
                          url: "https://sahintarim.com",
                        },
                      },
                      aggregateRating: {
                        "@type": "AggregateRating",
                        ratingValue: "4.5",
                        reviewCount: "15",
                        bestRating: "5",
                        worstRating: "1",
                      },
                    },
                  },
                  {
                    "@type": "ListItem",
                    position: 4,
                    item: {
                      "@type": "Product",
                      "@id": "https://sahintarim.com/product/4",
                      name: "Niğde Golden Delicious Elma Fidanı",
                      description:
                        "Niğde'nin altın elması! Bal tadında aroması ve uzun saklama süresi ile ünlü Golden Delicious. Yüksek kalitede fidan.",
                      image: [
                        "https://sahintarim.com/images/apples/golden.jpg",
                      ],
                      url: "https://sahintarim.com/product/4",
                      sku: "NIGDE-GOLDEN-004",
                      category: "Elma Fidanı",
                      brand: {
                        "@type": "Brand",
                        name: "Şahintarım",
                      },
                      offers: {
                        "@type": "Offer",
                        price: "190.00",
                        priceCurrency: "TRY",
                        availability: "https://schema.org/InStock",
                        itemCondition: "https://schema.org/NewCondition",
                        url: "https://sahintarim.com/product/4",
                        seller: {
                          "@type": "Organization",
                          name: "Şahintarım",
                          url: "https://sahintarim.com",
                        },
                      },
                      aggregateRating: {
                        "@type": "AggregateRating",
                        ratingValue: "4.8",
                        reviewCount: "22",
                        bestRating: "5",
                        worstRating: "1",
                      },
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
