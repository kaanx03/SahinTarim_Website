// app/sitemap.js - TAM DÜZELTİLMİŞ VERSİYON
import fs from "fs";
import path from "path";

export default function sitemap() {
  // ✅ TÜRKÇE KARAKTER YOK
  const baseUrl = "https://sahintarim.com";

  // products.json dosyasını güvenli şekilde oku
  let products = [];
  try {
    const filePath = path.join(process.cwd(), "app", "data", "products.json");
    const fileContents = fs.readFileSync(filePath, "utf8");
    const data = JSON.parse(fileContents);
    products = data.products || data || [];
  } catch (error) {
    console.log(
      "Products.json okunamadı, sadece statik sayfalar sitemap'e eklenecek:",
      error.message
    );
    products = [];
  }

  // Ana sayfalar - Contact priority artırıldı
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`, // ✅ Priority artırıldı
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // Dinamik ürün sayfaları
  const productRoutes =
    products.length > 0
      ? products.map((product) => ({
          url: `${baseUrl}/product/${product.id}`,
          lastModified: new Date(),
          changeFrequency: "weekly",
          priority: 0.6,
        }))
      : [];

  // Debug için log
  const allRoutes = [...staticRoutes, ...productRoutes];
  console.log(`✅ Sitemap oluşturuldu: ${allRoutes.length} sayfa`);
  console.log(
    "📄 Sayfalar:",
    allRoutes.map((r) => r.url)
  );

  return allRoutes;
}
