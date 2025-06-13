"use client";

import { useContext } from "react";
import { CartProvider, CartContext } from "./contexts/CartContext";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import EmblaCarousel from "./components/EmblaCarousel";
import productsData from "./data/products.json";
import Link from "next/link";

// Ana sayfa bileşeni
function HomePage() {
  // Context'ten sepet fonksiyonlarını al
  const { addToCart } = useContext(CartContext);

  // Ürün verisi
  const products = productsData;

  // Debug: ürün ekleme işlevi
  const handleAddToCart = (product) => {
    console.log("Ürün sepete eklenecek:", product);
    console.log("Ürün adı:", product.name);

    // Eksik veri kontrolü
    if (!product.name) {
      console.error("HATA: Ürün adı eksik!", product);
      // Ürünü düzelt
      product = {
        ...product,
        name: `Ürün ${product.id}`,
      };
    }

    addToCart(product);
  };

  function handleContactForm(e) {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const subject = e.target.subject.value;
    const message = e.target.message.value;

    // Success message
    const successMessage = document.createElement("div");
    successMessage.textContent =
      "Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.";
    successMessage.style.backgroundColor = "var(--primary-green)";
    successMessage.style.color = "white";
    successMessage.style.padding = "15px";
    successMessage.style.borderRadius = "5px";
    successMessage.style.marginTop = "15px";

    e.target.reset();
    e.target.appendChild(successMessage);

    setTimeout(() => {
      successMessage.remove();
    }, 5000);
  }

  return (
    <main>
      {/* NavBar bileşeni */}
      <NavBar />

      {/* Hero Section - Embla Carousel */}
      <section className="hero" id="home">
        <EmblaCarousel />
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="section-title">
            <h2>Neden Bizi Tercih Etmelisiniz?</h2>
          </div>
          <div className="features-container">
            <div className="feature-box">
              <div className="feature-icon">
                <i className="fas fa-leaf"></i>
              </div>
              <h3>Organik Tohumlar</h3>
              <p>
                Tüm tohumlarımız organik olarak yetiştirilmiş bitkilerden elde
                edilmiştir. GDO içermeyen doğal tohumlar.
              </p>
            </div>
            <div className="feature-box">
              <div className="feature-icon">
                <i className="fas fa-truck"></i>
              </div>
              <h3>Hızlı Teslimat</h3>
              <p>
                Siparişleriniz en kısa sürede paketlenir ve kargoya verilir.
                Türkiye&apos;nin her yerine hızlı teslimat sağlıyoruz.
              </p>
            </div>
            <div className="feature-box">
              <div className="feature-icon">
                <i className="fas fa-medal"></i>
              </div>
              <h3>Kalite Garantisi</h3>
              <p>
                Her bir tohum paketi dikkatle kontrol edilir ve en yüksek
                çimlenme oranına sahip tohumlar seçilir.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="products" id="products">
        <div className="container">
          <div className="section-title">
            <Link href="/products">
              <h2>Popüler Ürünlerimiz</h2>
            </Link>
          </div>
          <div className="products-container">
            {products.map((product) => (
              <div className="product-card" key={product.id}>
                <Link href={`/product/${product.id}`}>
                  <div
                    className="product-img"
                    style={{ backgroundImage: `url('${product.image}')` }}
                  ></div>
                </Link>
                <div className="product-info">
                  <Link
                    href={`/product/${product.id}`}
                    className="product-title-link"
                  >
                    <h3>{product.name}</h3>
                  </Link>
                  <p>{product.description}</p>
                  <div className="product-price">
                    ₺{product.price.toFixed(2)}
                  </div>
                  <button
                    className="add-to-cart"
                    onClick={(e) => {
                      e.preventDefault(); // Tıklamanın bağlantıya gitmesini engelle
                      handleAddToCart(product);
                    }}
                  >
                    Sepete Ekle
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about" id="about">
        <div className="container">
          <div className="about-container">
            <div className="about-img"></div>
            <div className="about-content">
              <h2>Şahintarım Hakkında</h2>
              <p>
                Şahintarım, 15 yıllık tarım deneyimine sahip bir aile
                işletmesidir. Toprağa ve doğaya olan sevgimizi, sizlerle
                kaliteli tohumlar sunarak paylaşıyoruz.
              </p>
              <p>
                Misyonumuz, Türkiye&apos;nin dört bir yanındaki bahçe
                sahiplerine ve çiftçilere en kaliteli tohumları sunarak
                ülkemizin tarımsal üretimine katkıda bulunmaktır.
              </p>
              <p>
                Tüm tohumlarımız özenle seçilir, test edilir ve en yüksek kalite
                standartlarına uygun olarak paketlenir. Şahintarım olarak,
                müşteri memnuniyetini her zaman ön planda tutuyoruz.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section - Yeniden Düzenlendi */}
      <section className="contact" id="contact">
        <div className="container">
          <div className="section-title">
            <h2>Bizimle İletişime Geçin</h2>
          </div>

          {/* Üst Alan: Harita ve Form yanyana */}
          <div className="contact-top-container">
            {/* Sadece Google Maps */}
            <div className="contact-map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50323.09314173468!2d34.67969545!3d37.9726175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1529e7e65b22ed61%3A0xe646b6c110f0ab6f!2zTmnEn2RlLCBOacSfZGUgTWVya2V6L05pxJ9kZQ!5e0!3m2!1str!2str!4v1747354769317!5m2!1str!2str&iwloc=off"
                width="100%"
                height="450"
                style={{
                  border: 0,
                  borderRadius: "10px",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Şahintarım Konum - Google Maps"
              ></iframe>
            </div>

            {/* İletişim Formu */}
            <div className="contact-form">
              <form id="contact-form" onSubmit={handleContactForm}>
                <div className="form-group">
                  <label htmlFor="name">Adınız</label>
                  <input
                    type="text"
                    id="name"
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">E-posta Adresiniz</label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Konu</label>
                  <input
                    type="text"
                    id="subject"
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Mesajınız</label>
                  <textarea
                    id="message"
                    className="form-control"
                    required
                  ></textarea>
                </div>
                <button type="submit" className="submit-btn">
                  Gönder
                </button>
              </form>
            </div>
          </div>

          {/* Alt Alan: İletişim Bilgileri */}
          <div className="contact-info-container">
            <h3>İletişim Bilgilerimiz</h3>

            <div className="contact-info-grid">
              <div className="contact-info-item">
                <a
                  href="https://www.google.com/maps?q=Niğde,+Türkiye"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-info-icon-link"
                >
                  <div className="contact-info-icon">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                </a>
                <div className="contact-info-text">
                  <h4>Adres</h4>
                  <p>Niğde, Türkiye</p>
                </div>
              </div>

              <div className="contact-info-item">
                <a href="tel:+905303993246" className="contact-info-icon-link">
                  <div className="contact-info-icon">
                    <i className="fas fa-phone"></i>
                  </div>
                </a>
                <div className="contact-info-text">
                  <h4>Telefon</h4>
                  <p>+90 530 399 3246</p>
                </div>
              </div>

              <div className="contact-info-item">
                <a
                  href="mailto:info@sahintarim.com"
                  className="contact-info-icon-link"
                >
                  <div className="contact-info-icon">
                    <i className="fas fa-envelope"></i>
                  </div>
                </a>
                <div className="contact-info-text">
                  <h4>E-posta</h4>
                  <p>info@sahintarim.com</p>
                </div>
              </div>

              <div className="contact-info-item">
                <a href="fax:+903882334567" className="contact-info-icon-link">
                  <div className="contact-info-icon">
                    <i className="fas fa-fax"></i>
                  </div>
                </a>
                <div className="contact-info-text">
                  <h4>Fax</h4>
                  <p>+90 388 233 4567</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Float Button */}

      <a
        href="https://wa.me/+905303993246"
        className="whatsapp-float"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fab fa-whatsapp"></i>
      </a>

      {/* Footer Bileşeni */}
      <Footer />
    </main>
  );
}

// Wrapper Component: HomePage bileşenini CartProvider ile sarıyoruz
export default function Home() {
  return (
    <CartProvider>
      <HomePage />
    </CartProvider>
  );
}
