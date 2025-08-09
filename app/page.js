// app/page.js - SEO Metadata düzeltilmiş versiyon
"use client";

import { useContext, useState } from "react";
import { CartProvider, CartContext } from "./contexts/CartContext";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import EmblaCarousel from "./components/EmblaCarousel";
import productsData from "./data/products.json";
import Link from "next/link";
import Head from "next/head";

// Ana sayfa bileşeni
function HomePage() {
  // Context'ten sepet fonksiyonlarını al
  const { addToCart } = useContext(CartContext);

  // Form state'leri
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState({ type: "", text: "" });

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

  // Çalışan form submit handler - Contact sayfasındaki ile aynı
  async function handleContactForm(e) {
    e.preventDefault();
    setIsSubmitting(true);
    setFormMessage({ type: "", text: "" });

    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      subject: e.target.subject.value,
      message: e.target.message.value,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setFormMessage({
          type: "success",
          text: "Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.",
        });
        e.target.reset();
      } else {
        setFormMessage({
          type: "error",
          text: data.error || "Bir hata oluştu. Lütfen tekrar deneyiniz.",
        });
      }
    } catch (error) {
      console.error("Form gönderimi hatası:", error);
      setFormMessage({
        type: "error",
        text: "Bağlantı hatası. Lütfen internet bağlantınızı kontrol ediniz.",
      });
    } finally {
      setIsSubmitting(false);

      // Mesajı 5 saniye sonra gizle
      setTimeout(() => {
        setFormMessage({ type: "", text: "" });
      }, 5000);
    }
  }

  return (
    <>
      {/* Ana Sayfa Özel Head - Client-side SEO */}
      <Head>
        {/* Meta Tags */}
        <title>
          Şahintarım - Niğde'nin En Kaliteli Elma Fidanları | Ana Sayfa
        </title>
        <meta
          name="description"
          content="Şahintarım ile bahçenizi bereketli hale getirin! 15+ yıl deneyimle Niğde'den taze elma fidanları, sebze tohumları ve organik ürünler. Hızlı teslimat, kalite garantisi."
        />
        <meta
          name="keywords"
          content="şahintarım, niğde elma fidanı, granny smith fidan, starking elma, gala elma fidanı, golden delicious, organik fidan, elma ağacı, meyve fidanı"
        />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="Şahintarım - Niğde'nin En Kaliteli Elma Fidanları"
        />
        <meta
          property="og:description"
          content="15+ yıl deneyimle kaliteli elma fidanları üretiyoruz. Granny Smith, Starking, Gala ve Golden Delicious çeşitleri stoklarımızda!"
        />
        <meta property="og:image" content="/images/og-sahintarim.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          content="Şahintarım Elma Fidanları - Kaliteli ve Organik"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sahintarim.com" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Şahintarım - Niğde'nin En Kaliteli Elma Fidanları"
        />
        <meta
          name="twitter:description"
          content="15+ yıl deneyimle kaliteli elma fidanları. Türkiye geneli hızlı teslimat!"
        />
        <meta name="twitter:image" content="/images/og-sahintarim.jpg" />

        {/* Canonical */}
        <link rel="canonical" href="https://sahintarim.com" />
        {/* JSON-LD Structured Data - Ana Sayfa İçin */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "@id": "https://sahintarim.com/#webpage",
              url: "https://sahintarim.com",
              name: "Şahintarım Ana Sayfa",
              description:
                "Niğde'nin en kaliteli elma fidanları ve tarım ürünleri",
              isPartOf: {
                "@id": "https://sahintarim.com/#website",
              },
              about: {
                "@id": "https://sahintarim.com/#organization",
              },
              mainEntity: {
                "@type": "ItemList",
                name: "Popüler Elma Fidanları",
                description: "En çok tercih edilen elma fidan çeşitlerimiz",
                numberOfItems: products.length,
                itemListElement: products.slice(0, 6).map((product, index) => ({
                  "@type": "ListItem",
                  position: index + 1,
                  item: {
                    "@type": "Product",
                    "@id": `https://sahintarim.com/product/${product.id}`,
                    name: product.name,
                    description: product.description,
                    image: `https://sahintarim.com${product.image}`,
                    offers: {
                      "@type": "Offer",
                      price: product.price,
                      priceCurrency: "TRY",
                      availability: "https://schema.org/InStock",
                      seller: {
                        "@id": "https://sahintarim.com/#organization",
                      },
                    },
                    brand: {
                      "@type": "Brand",
                      name: "Şahintarım",
                    },
                    category: "Elma Fidanı",
                  },
                })),
              },
            }),
          }}
        />

        {/* FAQ Schema - Sık Sorulan Sorular */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "Elma fidanları ne zaman dikilir?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Elma fidanları en iyi sonbaharda (Ekim-Kasım) ve ilkbaharda (Şubat-Mart) dikilir. Bu dönemlerde fidanlar daha kolay tutunur.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Fidanlarınız organik mi?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Evet, tüm fidanlarımız organik olarak yetiştirilmiş bitkilerden elde edilmiştir. GDO içermeyen doğal fidanlar sunuyoruz.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Kargo ne kadar sürer?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Türkiye'nin her yerine 2-5 iş günü içinde teslimat sağlıyoruz. Özel paketleme ile fidanlarınız güvenle size ulaşır.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Fidan dikim rehberi var mı?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Evet, her sipariş ile birlikte detaylı dikim rehberi gönderiyoruz. Ayrıca WhatsApp destek hattımızdan 7/24 yardım alabilirsiniz.",
                  },
                },
              ],
            }),
          }}
        />
      </Head>

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
                <h3>Organik Fidanlar</h3>
                <p>
                  Tüm fidanlarımız organik olarak yetiştirilmiş bitkilerden elde
                  edilmiştir. GDO içermeyen doğal fidanlar.
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
                  Her bir fidan paketi dikkatle kontrol edilir ve en yüksek
                  kaliteye sahip fidanlar seçilir.
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
                        e.preventDefault();
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
                  kaliteli fidanlar sunarak paylaşıyoruz.
                </p>
                <p>
                  Misyonumuz, Türkiye&apos;nin dört bir yanındaki bahçe
                  sahiplerine ve çiftçilere en kaliteli fidanları sunarak
                  ülkemizin tarımsal üretimine katkıda bulunmaktır.
                </p>
                <p>
                  Tüm fidanlarımız özenle seçilir, test edilir ve en yüksek
                  kalite standartlarına uygun olarak paketlenir. Şahintarım
                  olarak, müşteri memnuniyetini her zaman ön planda tutuyoruz.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section - Tam Çalışan Versiyon */}
        <section className="contact" id="contact">
          <div className="container">
            <div className="section-title">
              <h2>Bizimle İletişime Geçin</h2>
            </div>

            {/* Üst Alan: Harita ve Form yanyana */}
            <div className="contact-top-container">
              {/* Google Maps - Ovacık Kasabası Niğde */}
              <div className="contact-map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12326.397024725798!2d34.7890!3d37.9450!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1529f2c5e5c5c5c5%3A0x5c5c5c5c5c5c5c5c!2sOvac%C4%B1k%2C%20Ni%C4%9Fde%20Merkez%2FNi%C4%9Fde!5e0!3m2!1str!2str!4v1647354769317!5m2!1str!2str&iwloc=off"
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
                  title="Şahintarım Konum - Ovacık Kasabası, Niğde"
                ></iframe>
              </div>

              {/* İletişim Formu - Düzeltilmiş */}
              <div className="contact-form">
                <form onSubmit={handleContactForm}>
                  <div className="form-group">
                    <label htmlFor="homepage-name">Adınız</label>
                    <input
                      type="text"
                      id="homepage-name"
                      name="name"
                      className="form-control"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="homepage-email">E-posta Adresiniz</label>
                    <input
                      type="email"
                      id="homepage-email"
                      name="email"
                      className="form-control"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="homepage-subject">Konu</label>
                    <input
                      type="text"
                      id="homepage-subject"
                      name="subject"
                      className="form-control"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="homepage-message">Mesajınız</label>
                    <textarea
                      id="homepage-message"
                      name="message"
                      className="form-control"
                      required
                      disabled={isSubmitting}
                    ></textarea>
                  </div>

                  {/* Form Mesajı */}
                  {formMessage.text && (
                    <div className={`form-message ${formMessage.type}`}>
                      <i
                        className={`fas ${
                          formMessage.type === "success"
                            ? "fa-check-circle"
                            : "fa-exclamation-triangle"
                        }`}
                      ></i>
                      {formMessage.text}
                    </div>
                  )}

                  <button
                    type="submit"
                    className={`submit-btn ${isSubmitting ? "submitting" : ""}`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <i className="fas fa-spinner fa-spin"></i>
                        Gönderiliyor...
                      </>
                    ) : (
                      "Gönder"
                    )}
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
                    href="https://www.google.com/maps?q=Ovac%C4%B1k+Kasabas%C4%B1+Ni%C4%9Fde"
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
                    <p>Ovacık Kasabası, Niğde</p>
                  </div>
                </div>

                <div className="contact-info-item">
                  <a
                    href="tel:+905386799995"
                    className="contact-info-icon-link"
                  >
                    <div className="contact-info-icon">
                      <i className="fas fa-phone"></i>
                    </div>
                  </a>
                  <div className="contact-info-text">
                    <h4>Telefon</h4>
                    <p>0538 679 99 95</p>
                  </div>
                </div>

                <div className="contact-info-item">
                  <a
                    href="tel:+905332234645"
                    className="contact-info-icon-link"
                  >
                    <div className="contact-info-icon">
                      <i className="fas fa-phone"></i>
                    </div>
                  </a>
                  <div className="contact-info-text">
                    <h4>Telefon 2</h4>
                    <p>0533 223 46 45</p>
                  </div>
                </div>

                <div className="contact-info-item">
                  <a
                    href="mailto:sahin.tarim@outlook.com"
                    className="contact-info-icon-link"
                  >
                    <div className="contact-info-icon">
                      <i className="fas fa-envelope"></i>
                    </div>
                  </a>
                  <div className="contact-info-text">
                    <h4>E-posta</h4>
                    <p>sahin.tarim@outlook.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WhatsApp Float Button */}
        <a
          href="https://wa.me/+905386799995?text=Merhaba, elma fidanları hakkında bilgi almak istiyorum."
          className="whatsapp-float"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-whatsapp"></i>
        </a>

        {/* Footer Bileşeni */}
        <Footer />
      </main>
    </>
  );
}

// Wrapper Component
export default function Home() {
  return (
    <CartProvider>
      <HomePage />
    </CartProvider>
  );
}
