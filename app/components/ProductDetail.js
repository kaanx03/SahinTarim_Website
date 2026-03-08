"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import Image from "next/image";
import productsData from "../data/products.json";
import RelatedProducts from "../components/RelatedProducts";

const isVideo = (path) => path?.endsWith(".mp4");

// Ürün Detay Sayfası bileşeni
export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("description");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });

  // Ürün görselleri (her ürün için farklı açılardan resimler)
  const getProductImages = (productId, hasMultipleImages) => {
    const baseImage = product?.image || "/images/placeholder.jpg";

    // Sadece birden fazla görseli olan ürünler için ek resimler döndür
    if (!hasMultipleImages) {
      return [baseImage];
    }

    // Kırmızı Elma için
    if (productId === 2) {
      return [
        "/images/apples/redapple1.jpg",
        "/images/apples/redapple2.jpg",
        "/images/apples/redapple3.jpg",
        "/images/apples/redapple4.jpg",
        "/images/apples/redapple5.jpg",
        "/images/apples/redapple6.jpg",
        "/images/apples/redapple7.jpg",
        "/images/apples/redapple8.jpg",
        "/images/apples/redapple9.jpg",
        "/images/apples/redapple10.jpg",
        "/images/apples/redapple11.jpg",
        "/images/apples/redapple12.jpg",
        "/images/apples/redapple13.jpg",
        "/images/apples/redapple14.jpg",
      ];
    }
    // Gala Elma için
    else if (productId === 3) {
      return ["/images/apples/gala1.jpg", "/images/apples/gala2.jpg"];
    }
    // Bahçe Kurulumu için
    else if (productId === 6) {
      return [
        "/images/bahceKurulumu/1.jpeg",
        "/images/bahceKurulumu/2.jpeg",
        "/images/bahceKurulumu/3.jpeg",
        "/images/bahceKurulumu/1.mp4",
        "/images/bahceKurulumu/2.mp4",
        "/images/bahceKurulumu/3.mp4",
      ];
    }
    // Dolu Koruma Filesi için
    else if (productId === 5) {
      return [
        "/images/file/main.webp",
        "/images/file/2.webp",
        "/images/file/3.webp",
        "/images/file/4.webp",
        "/images/file/5.webp",
        "/images/file/6.webp",
        "/images/file/7.webp",
      ];
    }
    // Diğer çoklu görsel ürünler için varsayılan yapı
    else {
      return [
        baseImage,
        baseImage.replace(".jpg", "2.jpg"),
        baseImage.replace(".jpg", "3.jpg"),
        baseImage.replace(".jpg", "4.jpg"),
      ];
    }
  };

  useEffect(() => {
    // Ürün verisini ID'ye göre bul
    const productId = parseInt(id);
    const foundProduct = productsData.find((p) => p.id === productId);

    if (foundProduct) {
      setProduct(foundProduct);
    }

    setLoading(false);

    // Sayfanın en üstüne kaydırma işlemi
    window.scrollTo(0, 0);
  }, [id]);

  const selectImage = (index) => {
    setCurrentImageIndex(index);
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  // Yükleme durumu
  if (loading) {
    return (
      <main className="product-detail-page">
        <NavBar />
        <div className="container loading-container">
          <div className="spinner"></div>
          <p>Ürün yükleniyor...</p>
        </div>
        <Footer />
        <a
          href="https://wa.me/+905303993246"
          className="whatsapp-float"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-whatsapp"></i>
        </a>
      </main>
    );
  }

  // Ürün bulunamadı
  if (!product) {
    return (
      <main className="product-detail-page">
        <NavBar />
        <div className="container not-found-container">
          <h2>Ürün Bulunamadı</h2>
          <p>Aradığınız ürün mevcut değil veya kaldırılmış olabilir.</p>
          <Link href="/#products" className="btn-primary">
            Ürünlere Geri Dön
          </Link>
        </div>
        <Footer />
        <a
          href="https://wa.me/+905303993246"
          className="whatsapp-float"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-whatsapp"></i>
        </a>
      </main>
    );
  }

  const productImages = getProductImages(product.id, product.hasMultipleImages);

  return (
    <main className="product-detail-page">
      <NavBar />

      {/* Ürün Detay Bölümü */}
      <section className="product-detail">
        <div className="container">
          <div className="product-detail-container">
            {/* Ürün Görseli - Scroll Özellikli */}
            <motion.div
              className="product-detail-image"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="product-image-wrapper">
                {/* Ana Görsel */}
                <div
                  className="main-image-container"
                  style={{ overflow: isVideo(productImages[currentImageIndex]) ? "visible" : "hidden", cursor: isVideo(productImages[currentImageIndex]) ? "default" : isZoomed ? "zoom-in" : "default" }}
                  onMouseEnter={() => !isVideo(productImages[currentImageIndex]) && setIsZoomed(true)}
                  onMouseLeave={() => setIsZoomed(false)}
                  onMouseMove={handleMouseMove}
                >
                  {isVideo(productImages[currentImageIndex]) ? (
                    <video
                      key={productImages[currentImageIndex]}
                      src={productImages[currentImageIndex]}
                      controls
                      autoPlay
                      controlsList="nodownload"
                      className="product-main-video"
                    />
                  ) : (
                    <Image
                      src={productImages[currentImageIndex]}
                      alt={`${product.name} - Görsel ${currentImageIndex + 1}`}
                      width={500}
                      height={500}
                      priority
                      className="product-main-image"
                      style={{
                        transform: isZoomed ? "scale(2.5)" : "scale(1)",
                        transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                        transition: "none",
                      }}
                      onError={(e) => {
                        e.target.src = product.image;
                      }}
                    />
                  )}
                </div>

                <div className="product-badges">
                  {product.isOrganic !== false && <span className="badge organic">Organik</span>}
                  {product.isImported ? (
                    <>
                      <span className="badge badge-import">
                        <i className="fas fa-globe-europe"></i> Yurtdışı Üretim
                      </span>
                      <span className="badge badge-dist">
                        🇹🇷 TR Distribütörü
                      </span>
                    </>
                  ) : (
                    product.isNew && <span className="badge new">Yeni</span>
                  )}
                  {product.discount && (
                    <span className="badge discount">-{product.discount}%</span>
                  )}
                </div>
              </div>

              {/* Thumbnail Görseller - product-image-wrapper DIŞINDA */}
              {productImages.length > 1 && (
                <div className={`thumbnail-images${productImages.length > 4 ? " two-row" : ""}`}>
                  {(() => {
                    const N = productImages.length;
                    const numPerRow = Math.ceil(N / 2);
                    const ordered = [];
                    for (let col = 0; col < numPerRow; col++) {
                      ordered.push(col);
                      if (col + numPerRow < N) ordered.push(col + numPerRow);
                    }
                    return ordered.map((origIndex) => (
                      <div
                        key={origIndex}
                        className={`thumbnail-item ${
                          origIndex === currentImageIndex ? "active" : ""
                        }`}
                        onClick={() => selectImage(origIndex)}
                      >
                        {isVideo(productImages[origIndex]) ? (
                          <div className="thumbnail-video-placeholder">
                            <video
                              src={productImages[origIndex]}
                              muted
                              preload="metadata"
                              className="thumbnail-video-preview"
                            />
                            <i className="fas fa-play-circle"></i>
                          </div>
                        ) : (
                        <Image
                          src={productImages[origIndex]}
                          alt={`${product.name} thumbnail ${origIndex + 1}`}
                          width={120}
                          height={120}
                          className="thumbnail-image"
                          onError={(e) => {
                            e.target.src = product.image;
                          }}
                        />
                        )}
                      </div>
                    ));
                  })()}
                </div>
              )}
            </motion.div>

            {/* Ürün Bilgileri */}
            <motion.div
              className="product-detail-info"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Başlık ve Üst Kısım */}
              <div className="product-info-top">
                <h1 className="product-title">{product.name}</h1>

                <div className="product-rating-details">
                  <div className="product-rating">
                    <div className="stars">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star-half-alt"></i>
                    </div>
                    <span className="rating-count">(24 değerlendirme)</span>
                  </div>

                  <div className="product-sku">
                    <span>
                      SKU: SHA-{product.id.toString().padStart(4, "0")}
                    </span>
                  </div>

                  <div className="product-stock">
                    <i className="fas fa-check-circle"></i>
                    <span>Stokta</span>
                  </div>
                </div>
              </div>

              {/* Ürün Açıklaması */}
              {product.category === "elma" ? (
                <div className="product-description product-description-dual">
                  <div className="desc-section">
                    <h4 className="desc-section-title">
                      <i className="fas fa-apple-alt"></i> Elma Meyvesi
                    </h4>
                    <p>{product.meyveDescription}</p>
                  </div>
                  <div className="desc-section">
                    <h4 className="desc-section-title">
                      <i className="fas fa-seedling"></i> Elma Fidanı
                    </h4>
                    <p>{product.fidanDescription}</p>
                  </div>
                </div>
              ) : (
                <div className="product-description">
                  <p>{product.description}</p>
                  {product.extendedDescription && (
                    <p>{product.extendedDescription}</p>
                  )}
                </div>
              )}

              {/* Renkler ve Boyutlar */}
              {(product.colors || product.sizes) && (
                <div className="product-variants-block">
                  {product.colors && (
                    <div className="variant-row">
                      <span className="variant-row-label">Mevcut Renkler:</span>
                      <div className="variant-pills">
                        {product.colors.map((color) => (
                          <span key={color} className={`color-pill color-pill-${color.toLowerCase()}`}>
                            {color}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {product.sizes && (
                    <div className="variant-row">
                      <span className="variant-row-label">Sunulan Boyutlar:</span>
                      {product.customSizeAvailable ? (
                        <span className="custom-size-text">
                          Her ölçüye göre sipariş alıyoruz
                        </span>
                      ) : (
                        <div className="variant-pills">
                          {product.sizes.map((size) => (
                            <span key={size} className="size-pill">{size}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Fiyat ve Alt Kısım */}
              <div className="product-info-bottom">
                {product.price !== 0 && (
                  <div className="product-price">
                    <span className="current-price">{`₺${product.price.toFixed(2)}`}</span>
                    {product.oldPrice && (
                      <span className="old-price">₺{product.oldPrice.toFixed(2)}</span>
                    )}
                  </div>
                )}

                <div className="cart-actions">
                  <a
                    href={`https://wa.me/+905386799995?text=Merhaba, ${encodeURIComponent(product.name)} hakkında fiyat bilgisi almak istiyorum.`}
                    className="contact-price-btn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-whatsapp"></i>
                    Fiyat için iletişime geçin
                  </a>
                </div>

                {/* UV Dayanıklılık Garantisi */}
                {product.isImported && (
                  <div className="uv-guarantee-block">
                    <div className="uv-guarantee-icon">
                      <i className="fas fa-shield-alt"></i>
                      <span className="uv-label">UV-11</span>
                    </div>
                    <div className="uv-guarantee-content">
                      <p className="uv-guarantee-title">UV Dayanıklılık Garantisi</p>
                      <p className="uv-guarantee-desc">
                        UV-11 kimyasal bileşiği sayesinde filenin güneş ışığından erken
                        bozulmayacağını <strong>garanti ediyoruz.</strong>
                      </p>
                      <ul className="uv-durability-list">
                        <li>
                          <i className="fas fa-check-circle"></i>
                          Siyah renkte minimum <strong>7 yıl</strong> dayanıklılık
                        </li>
                        <li>
                          <i className="fas fa-check-circle"></i>
                          Kristal renkte minimum <strong>5 yıl</strong> dayanıklılık
                        </li>
                      </ul>
                    </div>
                  </div>
                )}

                <div className="product-features">
                  <div className="feature">
                    <i className="fas fa-truck"></i>
                    <span>Hızlı Kargo</span>
                  </div>
                  {product.isOrganic !== false ? (
                    <div className="feature">
                      <i className="fas fa-leaf"></i>
                      <span>%100 Organik</span>
                    </div>
                  ) : (
                    <div className="feature">
                      <i className="fas fa-ruler-combined"></i>
                      <span>İstenilen Ölçülerde Üretim</span>
                    </div>
                  )}
                  <div className="feature">
                    <i className="fas fa-shield-alt"></i>
                    <span>Kalite Garantisi</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Ürün Detay Sekmeleri */}
      <section className="product-tabs">
        <div className="container">
          <div className="tabs-container">
            <div className="tabs-header">
              <button
                className={`tab-btn ${
                  activeTab === "description" ? "active" : ""
                }`}
                onClick={() => setActiveTab("description")}
              >
                Ürün Açıklaması
              </button>
              <button
                className={`tab-btn ${activeTab === "details" ? "active" : ""}`}
                onClick={() => setActiveTab("details")}
              >
                Ürün Özellikleri
              </button>
              <button
                className={`tab-btn ${activeTab === "growing" ? "active" : ""}`}
                onClick={() => setActiveTab("growing")}
              >
                Yetiştirme Bilgileri
              </button>
              <button
                className={`tab-btn ${activeTab === "reviews" ? "active" : ""}`}
                onClick={() => setActiveTab("reviews")}
              >
                Değerlendirmeler (24)
              </button>
            </div>

            <div className="tabs-content">
              {/* Açıklama Sekmesi */}
              <div
                className={`tab-panel ${
                  activeTab === "description" ? "active" : ""
                }`}
              >
                <div className="tab-content">
                  <h3>Ürün Açıklaması</h3>
                  {product.category === "elma" ? (
                    <>
                      <p>
                        <strong>Elma Meyvesi:</strong> {product.meyveDescription}
                      </p>
                      <p>
                        <strong>Elma Fidanı:</strong> {product.fidanDescription}
                      </p>
                    </>
                  ) : (
                    <p>{product.description}</p>
                  )}
                </div>
              </div>

              {/* Özellikler Sekmesi */}
              <div
                className={`tab-panel ${
                  activeTab === "details" ? "active" : ""
                }`}
              >
                <div className="tab-content">
                  <h3>Ürün Özellikleri</h3>
                </div>
              </div>

              {/* Yetiştirme Bilgileri Sekmesi */}
              <div
                className={`tab-panel ${
                  activeTab === "growing" ? "active" : ""
                }`}
              >
                <div className="tab-content">
                  <h3>Yetiştirme Bilgileri</h3>
                  <div className="growing-guide">
                    <div className="guide-section">
                      <h4>Ekim Zamanı</h4>
                      <p>Kasım ve Mayıs arası ekim yapabilirsiniz.</p>
                    </div>

                    <div className="guide-section">
                      <h4>Toprak ve Güneş İhtiyacı</h4>
                      <p>
                        Organik gübre ile zenginleştirilmiş, iyi drene olan
                        toprak kullanılmalıdır. Günde en az 6 saat güneş görmesi
                        gerekir.
                      </p>
                    </div>

                    <div className="guide-section">
                      <h4>Sulama</h4>
                      <p>
                        Toprağın yüzeyi kuruduğunda sulayın. Aşırı sulama
                        yapmaktan kaçının. Fidelerin gelişimi için düzenli
                        sulama önemlidir.
                      </p>
                    </div>

                    <div className="guide-section">
                      <h4>Hasat Zamanı</h4>
                      <p>
                        Ekimden yaklaşık 60-80 gün sonra hasat edilebilir duruma
                        gelir. Meyvelerin tam olgunlaşması beklenmelidir.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Değerlendirmeler Sekmesi */}
              <div
                className={`tab-panel ${
                  activeTab === "reviews" ? "active" : ""
                }`}
              >
                <div className="tab-content">
                  <h3>Değerlendirmeler</h3>
                  <div className="reviews-summary">
                    <div className="average-rating">
                      <div className="rating-number">4.7</div>
                      <div className="rating-stars">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star-half-alt"></i>
                      </div>
                      <div className="rating-count">24 değerlendirme</div>
                    </div>

                    <div className="rating-bars">
                      <div className="rating-bar-item">
                        <div className="rating-label">5 Yıldız</div>
                        <div className="rating-bar">
                          <div
                            className="rating-fill"
                            style={{ width: "75%" }}
                          ></div>
                        </div>
                        <div className="rating-percent">75%</div>
                      </div>
                      <div className="rating-bar-item">
                        <div className="rating-label">4 Yıldız</div>
                        <div className="rating-bar">
                          <div
                            className="rating-fill"
                            style={{ width: "20%" }}
                          ></div>
                        </div>
                        <div className="rating-percent">20%</div>
                      </div>
                      <div className="rating-bar-item">
                        <div className="rating-label">3 Yıldız</div>
                        <div className="rating-bar">
                          <div
                            className="rating-fill"
                            style={{ width: "5%" }}
                          ></div>
                        </div>
                        <div className="rating-percent">5%</div>
                      </div>
                      <div className="rating-bar-item">
                        <div className="rating-label">2 Yıldız</div>
                        <div className="rating-bar">
                          <div
                            className="rating-fill"
                            style={{ width: "0%" }}
                          ></div>
                        </div>
                        <div className="rating-percent">0%</div>
                      </div>
                      <div className="rating-bar-item">
                        <div className="rating-label">1 Yıldız</div>
                        <div className="rating-bar">
                          <div
                            className="rating-fill"
                            style={{ width: "0%" }}
                          ></div>
                        </div>
                        <div className="rating-percent">0%</div>
                      </div>
                    </div>
                  </div>

                  <div className="review-list">
                    <div className="review-item">
                      <div className="review-header">
                        <div className="reviewer-avatar">
                          <span>AK</span>
                        </div>
                        <div className="reviewer-info">
                          <div className="reviewer-name">Ali K.</div>
                          <div className="review-date">12 Nisan 2025</div>
                        </div>
                        <div className="review-rating">
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                        </div>
                      </div>
                      <div className="review-content">
                        <p>
                          Gerçekten harika tohumlar! Neredeyse tüm tohumlar
                          çimlendi ve şu an bahçem bu lezzetli sebzelerle dolu.
                          Kesinlikle tavsiye ediyorum.
                        </p>
                      </div>
                    </div>

                    <div className="review-item">
                      <div className="review-header">
                        <div className="reviewer-avatar">
                          <span>MY</span>
                        </div>
                        <div className="reviewer-info">
                          <div className="reviewer-name">Mehmet Y.</div>
                          <div className="review-date">8 Nisan 2025</div>
                        </div>
                        <div className="review-rating">
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="far fa-star"></i>
                        </div>
                      </div>
                      <div className="review-content">
                        <p>
                          Kaliteli ürün. Çok hızlı kargo geldi ve tohumlar
                          sağlıklı görünüyordu. Ekimden 10 gün sonra çimlenmeye
                          başladılar. Bir yıldız eksik vermemin sebebi paket
                          içinde yetiştirme bilgilerinin yetersiz olması.
                        </p>
                      </div>
                    </div>

                    <div className="show-more-reviews">
                      <button className="show-more-btn">
                        Daha Fazla Göster
                      </button>
                    </div>
                  </div>

                  <div className="write-review">
                    <h4>Değerlendirme Yazın</h4>
                    <form className="review-form">
                      <div className="rating-select">
                        <span>Puanınız:</span>
                        <div className="select-stars">
                          <i className="far fa-star"></i>
                          <i className="far fa-star"></i>
                          <i className="far fa-star"></i>
                          <i className="far fa-star"></i>
                          <i className="far fa-star"></i>
                        </div>
                      </div>

                      <div className="form-group">
                        <label htmlFor="review-text">Yorumunuz</label>
                        <textarea
                          id="review-text"
                          className="form-control"
                          placeholder="Bu ürün hakkında düşüncelerinizi buraya yazın..."
                          rows="5"
                        ></textarea>
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="reviewer-name">Adınız</label>
                          <input
                            type="text"
                            id="reviewer-name"
                            className="form-control"
                            placeholder="Adınız"
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="reviewer-email">E-posta</label>
                          <input
                            type="email"
                            id="reviewer-email"
                            className="form-control"
                            placeholder="E-posta adresiniz"
                          />
                        </div>
                      </div>

                      <button type="submit" className="submit-review-btn">
                        Değerlendirme Gönder
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* İlgili Ürünler */}
      <section className="related-products">
        <div className="container">
          <div className="section-title">
            <h2>Benzer Ürünler</h2>
          </div>

          <RelatedProducts currentProductId={product.id} />
        </div>
      </section>

      <Footer />

      {/* WhatsApp Float Button */}
      <a
        href="https://wa.me/+905386799995"
        className="whatsapp-float"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fab fa-whatsapp"></i>
      </a>
    </main>
  );
}
