// app/sitemap.js -
import fs from "fs";
import path from "path";

export default function sitemap() {
  const baseUrl = "https://şahintarım.com";

  // products.json dosyasını güvenli şekilde oku
  let products = [];
  try {
    const filePath = path.join(process.cwd(), "data", "products.json");
    const fileContents = fs.readFileSync(filePath, "utf8");
    const data = JSON.parse(fileContents);
    products = data.products || data || [];
  } catch (error) {
    console.log(
      "Products.json okunamadı, sadece statik sayfalar sitemap'e eklenecek"
    );
    products = [];
  }

  // Ana sayfalar
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
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  // Dinamik ürün sayfaları - eğer products varsa ekle
  const productRoutes =
    products.length > 0
      ? products.map((product) => ({
          url: `${baseUrl}/product/${product.id}`,
          lastModified: new Date(),
          changeFrequency: "weekly",
          priority: 0.8,
        }))
      : [];

  // Tüm route'ları birleştir
  return [...staticRoutes, ...productRoutes];
}
