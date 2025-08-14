// app/sitemap.js - SON DÜZELTİLMİŞ VERSİYON
import fs from "fs";
import path from "path";

export default function sitemap() {
  // ✅ DOĞRU DOMAIN
  const baseUrl = "https://şahintarim.com";

  // products.json dosyasını güvenli şekilde oku - YOLU DÜZELTİLDİ
  let products = [];
  try {
    // Farklı olası yolları dene
    const possiblePaths = [
      path.join(process.cwd(), "app", "data", "products.json"),
      path.join(process.cwd(), "data", "products.json"),
      path.join(process.cwd(), "src", "data", "products.json"),
    ];

    let fileContents = null;
    let usedPath = null;

    for (const filePath of possiblePaths) {
      try {
        if (fs.existsSync(filePath)) {
          fileContents = fs.readFileSync(filePath, "utf8");
          usedPath = filePath;
          break;
        }
      } catch (err) {
        continue;
      }
    }

    if (fileContents) {
      const data = JSON.parse(fileContents);
      // JSON yapısını kontrol et - hem array hem object destekle
      if (Array.isArray(data)) {
        products = data;
      } else if (data.products && Array.isArray(data.products)) {
        products = data.products;
      } else {
        products = [];
      }
      console.log(`✅ Products.json bulundu: ${usedPath}`);
      console.log(`📦 ${products.length} ürün yüklendi`);
    } else {
      console.log("❌ Products.json hiçbir yolda bulunamadı");
    }
  } catch (error) {
    console.log("❌ Products.json okuma hatası:", error.message);
    products = [];
  }

  // Ana sayfalar - SADECE 4 TEMEL SAYFA
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
      url: `${baseUrl}/contact`,
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

  // Dinamik ürün sayfaları - SADECE VARSA EKLE
  const productRoutes =
    products.length > 0
      ? products.slice(0, 4).map((product) => ({
          url: `${baseUrl}/product/${product.id}`,
          lastModified: new Date(),
          changeFrequency: "weekly",
          priority: 0.6,
        }))
      : [];

  // Tüm route'ları birleştir
  const allRoutes = [...staticRoutes, ...productRoutes];

  // Debug bilgisi
  console.log(`✅ Sitemap oluşturuldu: ${allRoutes.length} sayfa`);
  console.log("📄 Sayfalar:");
  allRoutes.forEach((route, index) => {
    console.log(`  ${index + 1}. ${route.url}`);
  });

  return allRoutes;
}
