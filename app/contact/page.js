// app/contact/page.js - SEO eklenmiş versiyon
"use client";

import { useEffect, useState } from "react";
import { CartProvider } from "../contexts/CartContext";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Head from "next/head";

// İletişim sayfa bileşeni
function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState({ type: "", text: "" });

  // FAQ Accordion functionality
  useEffect(() => {
    const faqItems = document.querySelectorAll(".faq-item");

    const handleFaqClick = (item) => {
      return () => {
        // Tıklanan item'ı toggle et
        const isActive = item.classList.contains("active");

        // Tüm item'ları kapat
        faqItems.forEach((otherItem) => {
          otherItem.classList.remove("active");
        });

        // Eğer tıklanan item aktif değilse, aç
        if (!isActive) {
          item.classList.add("active");
        }
      };
    };

    // Her FAQ item'a click listener ekle
    const clickHandlers = [];
    faqItems.forEach((item) => {
      const question = item.querySelector(".faq-question");
      if (question) {
        const handler = handleFaqClick(item);
        question.addEventListener("click", handler);
        clickHandlers.push({ question, handler });
      }
    });

    // Cleanup function
    return () => {
      clickHandlers.forEach(({ question, handler }) => {
        question.removeEventListener("click", handler);
      });
    };
  }, []);

  // Form submit handler
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
      {/* Contact Sayfası SEO */}
      <Head>
        {/* Meta Tags */}
        <title>
          İletişim - Şahintarım ile İletişime Geçin | Ovacık Kasabası, Niğde
        </title>
        <meta
          name="description"
          content="Şahintarım ile iletişime geçin. Elma fidanları ve tarım ürünleri hakkında sorularınız için bize ulaşın. Ovacık Kasabası, Niğde. Tel: 0538 679 99 95, 0533 223 46 45"
        />
        <meta
          name="keywords"
          content="şahintarım iletişim, niğde elma fidanı sipariş, tarım ürünleri iletişim, ovacık kasabası, elma fidanı sipariş telefon, şahintarım adres, tarım danışmanlığı"
        />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="İletişim - Şahintarım ile İletişime Geçin"
        />
        <meta
          property="og:description"
          content="Elma fidanları ve tarım ürünleri hakkında sorularınız için bizimle iletişime geçin. 7/24 teknik destek."
        />
        <meta property="og:image" content="/images/og-sahintarim.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Şahintarım İletişim" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sahintarim.com/contact" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="İletişim - Şahintarım" />
        <meta
          name="twitter:description"
          content="Elma fidanları hakkında sorularınız için bizimle iletişime geçin."
        />
        <meta name="twitter:image" content="/images/og-sahintarim.jpg" />

        {/* Canonical */}
        <link rel="canonical" href="https://sahintarim.com/contact" />

        {/* JSON-LD Structured Data - Contact Page */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ContactPage",
              "@id": "https://sahintarim.com/contact#webpage",
              url: "https://sahintarim.com/contact",
              name: "İletişim - Şahintarım",
              description:
                "Şahintarım ile iletişim bilgileri ve sık sorulan sorular",
              isPartOf: {
                "@id": "https://sahintarim.com/#website",
              },
              mainEntity: {
                "@id": "https://sahintarim.com/#organization",
              },
              breadcrumb: {
                "@type": "BreadcrumbList",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: "İletişim",
                    item: "https://sahintarim.com/contact",
                  },
                ],
              },
            }),
          }}
        />

        {/* JSON-LD Structured Data - FAQ Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "Siparişim ne kadar sürede gelir?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Siparişleriniz aynı gün işleme alınır ve 1-3 iş günü içerisinde kargoya teslim edilir. Kargo teslimat süresi bölgenize göre 1-3 gün arasında değişmektedir.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Fidanların kalite garantisi var mı?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Tüm fidanlarımız laboratuvar testlerinden geçmiş olup %98+ kalite oranı garantisi ile satılmaktadır. Kalite sorunu yaşarsanız 30 gün içinde ücretsiz değişim yapıyoruz.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Organik sertifikalarınız var mı?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Tüm organik ürünlerimiz Tarım ve Orman Bakanlığı onaylı organik üretim sertifikalarına sahiptir. ECOCERT ve BCS Öko-Garantie gibi uluslararası sertifikasyon kuruluşları tarafından da onaylanmıştır.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Toplu sipariş indirimi var mı?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "500 TL ve üzeri siparişlerde %10, 1000 TL üzeri siparişlerde %15, 2500 TL üzeri siparişlerde özel %20 indirim uygulanmaktadır.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Hangi ödeme yöntemlerini kabul ediyorsunuz?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Kredi kartı, banka kartı, havale/EFT, kapıda ödeme, mobil ödeme ve taksitli ödeme seçenekleri mevcuttur.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Teknik destek hizmeti veriyor musunuz?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Ziraat mühendisi ve deneyimli tarım uzmanlarımızdan 7/24 ücretsiz teknik destek alabilirsiniz. Dikim, sulama, gübreleme konularında profesyonel danışmanlık sunuyoruz.",
                  },
                },
              ],
            }),
          }}
        />

        {/* JSON-LD Structured Data - ContactPoint */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": "https://sahintarim.com/#contact-info",
              name: "Şahintarım Tarım Ürünleri",
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  telephone: "+905386799995",
                  contactType: "customer service",
                  availableLanguage: "Turkish",
                  areaServed: "TR",
                  hoursAvailable: {
                    "@type": "OpeningHoursSpecification",
                    dayOfWeek: [
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                      "Saturday",
                      "Sunday",
                    ],
                    opens: "08:00",
                    closes: "20:00",
                  },
                },
                {
                  "@type": "ContactPoint",
                  telephone: "+905332234645",
                  contactType: "sales",
                  availableLanguage: "Turkish",
                  areaServed: "TR",
                },
                {
                  "@type": "ContactPoint",
                  email: "sahin.tarim@outlook.com",
                  contactType: "customer support",
                  availableLanguage: "Turkish",
                },
              ],
              address: {
                "@type": "PostalAddress",
                streetAddress: "Ovacık Kasabası",
                addressLocality: "Niğde",
                addressRegion: "Niğde",
                addressCountry: "TR",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: "37.9450",
                longitude: "34.7890",
              },
            }),
          }}
        />
      </Head>

      <main>
        {/* NavBar bileşeni */}
        <NavBar />

        {/* Contact Section */}
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

              {/* İletişim Formu */}
              <div className="contact-form">
                <form id="contact-form" onSubmit={handleContactForm}>
                  <div className="form-group">
                    <label htmlFor="name">Adınız</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="form-control"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">E-posta Adresiniz</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-control"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="subject">Konu</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      className="form-control"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Mesajınız</label>
                    <textarea
                      id="message"
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

        {/* FAQ Section */}
        <section className="contact-faq">
          <div className="container">
            <div className="section-header">
              <h2>Sık Sorulan Sorular</h2>
              <div className="section-line"></div>
              <p>En çok merak edilen sorular ve cevapları</p>
            </div>

            <div className="faq-container">
              <div className="faq-item">
                <div className="faq-question">
                  <h4>Siparişim ne kadar sürede gelir?</h4>
                  <i className="fas fa-plus"></i>
                </div>
                <div className="faq-answer">
                  <p>
                    <strong>Hızlı teslimat garantimiz:</strong> Siparişleriniz
                    aynı gün işleme alınır ve 1-3 iş günü içerisinde kargoya
                    teslim edilir. Kargo teslimat süresi bölgenize göre 1-3 gün
                    arasında değişmektedir. İstanbul, Ankara, İzmir gibi büyük
                    şehirlerde 1-2 gün, diğer illerde 2-3 gün içinde teslim
                    edilir. Acil siparişler için aratıp özel teslimat
                    seçeneklerini değerlendirebilirsiniz.
                  </p>
                </div>
              </div>

              <div className="faq-item">
                <div className="faq-question">
                  <h4>Fidanların kalite garantisi var mı?</h4>
                  <i className="fas fa-plus"></i>
                </div>
                <div className="faq-answer">
                  <p>
                    <strong>%98+ kalite garantisi:</strong> Tüm fidanlarımız
                    laboratuvar testlerinden geçmiş olup %98+ kalite oranı
                    garantisi ile satılmaktadır. Kalite sorunu yaşarsanız fatura
                    ve fotoğraf ile birlikte 30 gün içinde tarafımıza
                    başvurduğunuzda ücretsiz değişim yapıyoruz. Ayrıca doğru
                    dikim tekniği için uzman desteğimizden faydalanabilirsiniz.
                  </p>
                </div>
              </div>

              <div className="faq-item">
                <div className="faq-question">
                  <h4>Organik sertifikalarınız var mı?</h4>
                  <i className="fas fa-plus"></i>
                </div>
                <div className="faq-answer">
                  <p>
                    <strong>Tam organik sertifika:</strong> Tüm organik
                    ürünlerimiz Tarım ve Orman Bakanlığı onaylı organik üretim
                    sertifikalarına sahiptir. ECOCERT ve BCS Öko-Garantie gibi
                    uluslararası sertifikasyon kuruluşları tarafından da
                    onaylanmıştır. Sertifika bilgilerine ürün sayfalarından veya
                    QR kod ile ulaşabilirsiniz.
                  </p>
                </div>
              </div>

              <div className="faq-item">
                <div className="faq-question">
                  <h4>Toplu sipariş indirimi var mı?</h4>
                  <i className="fas fa-plus"></i>
                </div>
                <div className="faq-answer">
                  <p>
                    <strong>Kademeli indirim sistemi:</strong> 500 TL ve üzeri
                    siparişlerde %10, 1000 TL üzeri siparişlerde %15, 2500 TL
                    üzeri siparişlerde özel %20 indirim uygulanmaktadır. Çiftçi
                    ve kooperatiflere yıllık anlaşma ile %25&apos;e varan özel
                    fiyatlar sunuyoruz. Mevsimlik kampanyalarımızı takip etmeyi
                    unutmayın!
                  </p>
                </div>
              </div>

              <div className="faq-item">
                <div className="faq-question">
                  <h4>Hangi ödeme yöntemlerini kabul ediyorsunuz?</h4>
                  <i className="fas fa-plus"></i>
                </div>
                <div className="faq-answer">
                  <p>
                    <strong>Esnek ödeme seçenekleri:</strong> Kredi kartı (tüm
                    bankalar), banka kartı, havale/EFT, kapıda ödeme, mobil
                    ödeme (Apple Pay, Google Pay), kripto para ve taksitli ödeme
                    seçenekleri mevcuttur. Kurumsal müşteriler için açık hesap
                    ve çek ile ödeme imkanı da sunuyoruz.
                  </p>
                </div>
              </div>

              <div className="faq-item">
                <div className="faq-question">
                  <h4>Ürünlerinizin saklama koşulları nelerdir?</h4>
                  <i className="fas fa-plus"></i>
                </div>
                <div className="faq-answer">
                  <p>
                    <strong>Optimum saklama koşulları:</strong> Fidanlar serin
                    (15-20°C), kuru (%50-60 nem) ve karanlık yerde
                    saklanmalıdır. Gübreler nemden uzak, kapalı ambalajında
                    muhafaza edilmeli. Organik ürünler için özel saklama
                    kılavuzumuz mevcuttur. Tüm ürünlerimizde detaylı saklama
                    talimatları yer almaktadır.
                  </p>
                </div>
              </div>

              <div className="faq-item">
                <div className="faq-question">
                  <h4>Teknik destek hizmeti veriyor musunuz?</h4>
                  <i className="fas fa-plus"></i>
                </div>
                <div className="faq-answer">
                  <p>
                    <strong>Uzman teknik destek:</strong> Ziraat mühendisi ve
                    deneyimli tarım uzmanlarımızdan 7/24 ücretsiz teknik destek
                    alabilirsiniz. Dikim, sulama, gübreleme, hastalık teşhisi ve
                    verim artırıcı konularda profesyonel danışmanlık hizmeti
                    sunuyoruz. WhatsApp, telefon veya e-posta ile
                    ulaşabilirsiniz.
                  </p>
                </div>
              </div>

              <div className="faq-item">
                <div className="faq-question">
                  <h4>İade ve değişim politikanız nasıl?</h4>
                  <i className="fas fa-plus"></i>
                </div>
                <div className="faq-answer">
                  <p>
                    <strong>Koşulsuz iade garantisi:</strong> Ürün hatası
                    durumunda 30 gün içinde koşulsuz iade kabul edilir.
                    Kullanılmamış ürünlerde orijinal ambalajında iade mümkündür.
                    Kalite sorunu yaşanan fidanlarda %100 ücretsiz değişim
                    yapılır. İade kargo masrafları tarafımızdan karşılanır.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WhatsApp Float Button - 1. telefon numarasına yönlendirme */}
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
export default function Contact() {
  return (
    <CartProvider>
      <ContactPage />
    </CartProvider>
  );
}
