"use client";

import { useEffect, useState, useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { useParams } from "next/navigation";
import Link from "next/link";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import Image from "next/image";
import productsData from "../data/products.json";
import RelatedProducts from "../components/RelatedProducts";

// Ürün Detay Sayfası bileşeni
export default function ProductDetail() {
  const { addToCart } = useContext(CartContext);
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("description");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Ürün görselleri (her ürün için farklı açılardan resimler)
  const getProductImages = (productId) => {
    const baseImage = product?.image || "/images/placeholder.jpg";

    // Elma ürünleri için özel klasör yapısı
    if (productId === 1) {
      // Yeşil Elma - tek görsel
      return ["/images/apples/greenapple.jpg"];
    } else if (productId === 2) {
      // Kırmızı Elma - sadece mevcut olanlar
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
    } else {
      // Diğer ürünler için standart yapı
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

  // Sepete ekle fonksiyonu
  const handleAddToCart = () => {
    if (product) {
      // Miktar seçimi kaldırıldığı için quantity her zaman 1 olarak gönderilecek
      addToCart({
        ...product,
        quantity: 1,
      });
    }
  };

  // Görsel navigasyon fonksiyonları
  const nextImage = () => {
    if (product) {
      const images = getProductImages(product.id);
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }
  };

  const previousImage = () => {
    if (product) {
      const images = getProductImages(product.id);
      setCurrentImageIndex(
        (prev) => (prev - 1 + images.length) % images.length
      );
    }
  };

  const selectImage = (index) => {
    setCurrentImageIndex(index);
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

  const productImages = getProductImages(product.id);

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
                <div className="main-image-container">
                  <Image
                    src={productImages[currentImageIndex]}
                    alt={`${product.name} - Görsel ${currentImageIndex + 1}`}
                    width={500}
                    height={500}
                    priority
                    className="product-main-image"
                    onError={(e) => {
                      // Görsel yükleme hatası durumunda ana görseli göster
                      e.target.src = product.image;
                    }}
                  />

                  {/* Görsel Navigasyon Okları - Sadece birden fazla görsel varsa göster */}
                  {productImages.length > 1 && (
                    <>
                      <button
                        className="image-nav-btn prev-btn"
                        onClick={previousImage}
                        aria-label="Önceki Görsel"
                      >
                        <i className="fas fa-chevron-left"></i>
                      </button>
                      <button
                        className="image-nav-btn next-btn"
                        onClick={nextImage}
                        aria-label="Sonraki Görsel"
                      >
                        <i className="fas fa-chevron-right"></i>
                      </button>
                    </>
                  )}

                  {/* Görsel Sayısı Göstergesi - Sadece birden fazla görsel varsa göster */}
                  {productImages.length > 1 && (
                    <div className="image-counter">
                      {currentImageIndex + 1} / {productImages.length}
                    </div>
                  )}
                </div>

                {/* Thumbnail Görseller - Sadece birden fazla görsel varsa göster */}
                {productImages.length > 1 && (
                  <div className="thumbnail-images">
                    {productImages.map((image, index) => (
                      <div
                        key={index}
                        className={`thumbnail-item ${
                          index === currentImageIndex ? "active" : ""
                        }`}
                        onClick={() => selectImage(index)}
                      >
                        <Image
                          src={image}
                          alt={`${product.name} thumbnail ${index + 1}`}
                          width={80}
                          height={80}
                          className="thumbnail-image"
                          onError={(e) => {
                            // Thumbnail yükleme hatası durumunda ana görseli göster
                            e.target.src = product.image;
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}

                <div className="product-badges">
                  <span className="badge organic">Organik</span>
                  {product.isNew && <span className="badge new">Yeni</span>}
                  {product.discount && (
                    <span className="badge discount">-{product.discount}%</span>
                  )}
                </div>
              </div>
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

              {/* Ürün Açıklaması - products.json'dan dinamik olarak gelecek */}
              <div className="product-description">
                <p>{product.description}</p>
                {product.extendedDescription && (
                  <p>{product.extendedDescription}</p>
                )}
              </div>

              {/* Fiyat ve Alt Kısım */}
              <div className="product-info-bottom">
                <div className="product-price">
                  <span className="current-price">
                    ₺{product.price.toFixed(2)}
                  </span>
                  {product.oldPrice && (
                    <span className="old-price">
                      ₺{product.oldPrice.toFixed(2)}
                    </span>
                  )}
                </div>

                <div className="cart-actions">
                  <button
                    className="add-to-cart-btn"
                    onClick={() => handleAddToCart()}
                  >
                    <i className="fas fa-shopping-cart"></i>
                    Sepete Ekle
                  </button>
                </div>

                <div className="product-features">
                  <div className="feature">
                    <i className="fas fa-truck"></i>
                    <span>Hızlı Kargo</span>
                  </div>
                  <div className="feature">
                    <i className="fas fa-leaf"></i>
                    <span>%100 Organik</span>
                  </div>
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
                  <p>
                    {product.description} Bu tohum paketi, %100 organik olarak
                    yetiştirilmiş ve özenle seçilmiş tohumları içerir. Tüm
                    ürünlerimiz, en yüksek kalite standartlarına uygun olarak
                    üretilmekte ve paketlenmektedir.
                  </p>
                  <p>
                    Şahintarım olarak amacımız, evinizde veya bahçenizde
                    sağlıklı ve lezzetli sebzeler yetiştirmenize yardımcı
                    olmaktır. Tohumlarımız GDO içermez ve tamamen doğaldır.
                  </p>
                  <p>
                    Pakette yaklaşık 100 adet tohum bulunmaktadır. Bu miktar,
                    orta büyüklükteki bir bahçe için yeterli olacaktır. Uygun
                    koşullarda saklandığında tohumlarımız 2 yıl boyunca çimlenme
                    özelliğini korumaktadır.
                  </p>
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
                  <div className="product-specifications">
                    <div className="spec-item">
                      <div className="spec-label">Tohum Tipi</div>
                      <div className="spec-value">Organik</div>
                    </div>
                    <div className="spec-item">
                      <div className="spec-label">Çimlenme Süresi</div>
                      <div className="spec-value">7-14 gün</div>
                    </div>
                    <div className="spec-item">
                      <div className="spec-label">Paket İçeriği</div>
                      <div className="spec-value">Yaklaşık 100 tohum</div>
                    </div>
                    <div className="spec-item">
                      <div className="spec-label">Menşei</div>
                      <div className="spec-value">Türkiye</div>
                    </div>
                    <div className="spec-item">
                      <div className="spec-label">Raf Ömrü</div>
                      <div className="spec-value">2 yıl</div>
                    </div>
                    <div className="spec-item">
                      <div className="spec-label">Sertifikalar</div>
                      <div className="spec-value">
                        Organik Tarım Sertifikası
                      </div>
                    </div>
                  </div>
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
                      <p>
                        İlkbahar (Mart-Nisan) veya sonbahar (Ağustos-Eylül)
                        aylarında ekim yapabilirsiniz. Tohumlarımız direkt
                        bahçeye veya saksıya ekilebilir.
                      </p>
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
