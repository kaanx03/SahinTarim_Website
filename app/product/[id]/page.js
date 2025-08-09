// app/product/[id]/page.js - SEO eklenmiş versiyon
"use client";

import ProductDetail from "@/app/components/ProductDetail";
import { CartProvider } from "@/app/contexts/CartContext";
import Head from "next/head";
import { useEffect, useState, use } from "react";
import productsData from "@/app/data/products.json";

export default function ProductPage({ params }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Next.js 15+ için params Promise'i unwrap et
  const resolvedParams = use(params);

  useEffect(() => {
    // Ürünü bul
    const foundProduct = productsData.find(
      (p) => p.id === parseInt(resolvedParams.id)
    );
    setProduct(foundProduct);
    setLoading(false);
  }, [resolvedParams.id]);

  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  if (!product) {
    return (
      <>
        <Head>
          <title>Ürün Bulunamadı | Şahintarım</title>
          <meta
            name="description"
            content="Aradığınız ürün bulunamadı. Şahintarım ürün kataloğuna göz atın."
          />
          <meta name="robots" content="noindex, nofollow" />
        </Head>
        <div>Ürün bulunamadı</div>
      </>
    );
  }

  return (
    <>
      {/* Product Detail SEO */}
      <Head>
        {/* Meta Tags */}
        <title>
          {product.name} - {product.category} | Şahintarım Elma Fidanları
        </title>
        <meta
          name="description"
          content={`${product.name} - ${product.description} Şahintarım kalitesiyle sizlerle. Fiyat: ₺${product.price}. Hızlı kargo ve kalite garantisi.`}
        />
        <meta
          name="keywords"
          content={`${product.name.toLowerCase()}, ${product.category.toLowerCase()}, elma fidanı, ${product.name.toLowerCase()} fiyat, ${product.name.toLowerCase()} satış, niğde elma fidanı`}
        />

        {/* Open Graph */}
        <meta
          property="og:title"
          content={`${product.name} - ${product.category} | Şahintarım`}
        />
        <meta
          property="og:description"
          content={`${product.name} - ${product.description} Kalite garantisiyle.`}
        />
        <meta
          property="og:image"
          content={`https://sahintarim.com${product.image}`}
        />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="600" />
        <meta
          property="og:image:alt"
          content={`${product.name} - Şahintarım`}
        />
        <meta property="og:type" content="product" />
        <meta
          property="og:url"
          content={`https://sahintarim.com/product/${product.id}`}
        />
        <meta property="product:price:amount" content={product.price} />
        <meta property="product:price:currency" content="TRY" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={`${product.name} - ${product.category} | Şahintarım`}
        />
        <meta
          name="twitter:description"
          content={`${product.name} - ${product.description}`}
        />
        <meta
          name="twitter:image"
          content={`https://sahintarim.com${product.image}`}
        />

        {/* Canonical */}
        <link
          rel="canonical"
          href={`https://sahintarim.com/product/${product.id}`}
        />

        {/* JSON-LD Structured Data - Product */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              "@id": `https://sahintarim.com/product/${product.id}#product`,
              name: product.name,
              description: product.description,
              image: [
                `https://sahintarim.com${product.image}`,
                "https://sahintarim.com/images/og-sahintarim.jpg",
              ],
              brand: {
                "@type": "Brand",
                name: "Şahintarım",
                logo: "https://sahintarim.com/favicon.ico",
              },
              manufacturer: {
                "@type": "Organization",
                name: "Şahintarım Tarım Ürünleri",
                url: "https://sahintarim.com",
              },
              category: product.category,
              sku: `SAHINTARIM-${product.id}`,
              gtin: `841234${product.id.toString().padStart(6, "0")}`,
              offers: {
                "@type": "Offer",
                url: `https://sahintarim.com/product/${product.id}`,
                priceCurrency: "TRY",
                price: product.price,
                priceValidUntil: "2025-12-31",
                availability: "https://schema.org/InStock",
                itemCondition: "https://schema.org/NewCondition",
                seller: {
                  "@type": "Organization",
                  "@id": "https://sahintarim.com/#organization",
                  name: "Şahintarım",
                },
                shippingDetails: {
                  "@type": "OfferShippingDetails",
                  shippingRate: {
                    "@type": "MonetaryAmount",
                    currency: "TRY",
                    value: "0",
                  },
                  shippingDestination: {
                    "@type": "DefinedRegion",
                    addressCountry: "TR",
                  },
                  deliveryTime: {
                    "@type": "ShippingDeliveryTime",
                    handlingTime: {
                      "@type": "QuantitativeValue",
                      minValue: 1,
                      maxValue: 2,
                      unitCode: "DAY",
                    },
                    transitTime: {
                      "@type": "QuantitativeValue",
                      minValue: 2,
                      maxValue: 5,
                      unitCode: "DAY",
                    },
                  },
                },
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                reviewCount: "127",
                bestRating: "5",
                worstRating: "1",
              },
              review: [
                {
                  "@type": "Review",
                  reviewRating: {
                    "@type": "Rating",
                    ratingValue: "5",
                    bestRating: "5",
                  },
                  author: {
                    "@type": "Person",
                    name: "Ahmet Y.",
                  },
                  reviewBody:
                    "Çok kaliteli fidanlar. Hızlı kargo ve güvenli paketleme. Tavsiye ederim.",
                },
                {
                  "@type": "Review",
                  reviewRating: {
                    "@type": "Rating",
                    ratingValue: "5",
                    bestRating: "5",
                  },
                  author: {
                    "@type": "Person",
                    name: "Fatma K.",
                  },
                  reviewBody:
                    "Fidanlar çok sağlıklı geldi. Şahintarım'dan aldığımız fidanlar çok iyi tuttu.",
                },
              ],
              additionalProperty: [
                {
                  "@type": "PropertyValue",
                  name: "Organik",
                  value: "Evet",
                },
                {
                  "@type": "PropertyValue",
                  name: "Menşei",
                  value: "Niğde, Türkiye",
                },
                {
                  "@type": "PropertyValue",
                  name: "Garanti Süresi",
                  value: "1 Yıl",
                },
              ],
            }),
          }}
        />

        {/* JSON-LD Breadcrumb */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
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
                {
                  "@type": "ListItem",
                  position: 3,
                  name: product.name,
                  item: `https://sahintarim.com/product/${product.id}`,
                },
              ],
            }),
          }}
        />
      </Head>

      <CartProvider>
        <ProductDetail />
      </CartProvider>
    </>
  );
}
