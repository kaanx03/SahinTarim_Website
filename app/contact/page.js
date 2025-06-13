"use client";

import { useEffect } from "react";
import { CartProvider } from "../contexts/CartContext";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

// İletişim sayfa bileşeni
function ContactPage() {
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
  function handleContactForm(e) {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const subject = e.target.subject.value;
    const message = e.target.message.value;

    // Success message
    const successMessage = document.createElement("div");
    successMessage.className = "success-message";
    successMessage.innerHTML = `
      <i class="fas fa-check-circle"></i>
      Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.
    `;

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

      {/* Contact Section */}
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
                <h4>Tohumların çimlenme garantisi var mı?</h4>
                <i className="fas fa-plus"></i>
              </div>
              <div className="faq-answer">
                <p>
                  <strong>%98+ çimlenme garantisi:</strong> Tüm tohumlarımız
                  laboratuvar testlerinden geçmiş olup %98+ çimlenme oranı
                  garantisi ile satılmaktadır. Çimlenme sorunu yaşarsanız fatura
                  ve fotoğraf ile birlikte 30 gün içinde tarafımıza
                  başvurduğunuzda ücretsiz değişim yapıyoruz. Ayrıca doğru ekim
                  tekniği için uzman desteğimizden faydalanabilirsiniz.
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
                  üzeri siparişlerde özel %20 indirim uygulanmaktadır. Çiftçi ve
                  kooperatiflere yıllık anlaşma ile %25&apos;e varan özel
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
                  bankalar), banka kartı, havale/EFT, kapıda ödeme, mobil ödeme
                  (Apple Pay, Google Pay), kripto para ve taksitli ödeme
                  seçenekleri mevcuttur. Kurumsal müşteriler için açık hesap ve
                  çek ile ödeme imkanı da sunuyoruz.
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
                  <strong>Optimum saklama koşulları:</strong> Tohumlar serin
                  (15-20°C), kuru (%50-60 nem) ve karanlık yerde saklanmalıdır.
                  Gübreler nemden uzak, kapalı ambalajında muhafaza edilmeli.
                  Organik ürünler için özel saklama kılavuzumuz mevcuttur. Tüm
                  ürünlerimizde detaylı saklama talimatları yer almaktadır.
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
                  alabilirsiniz. Ekim, sulama, gübreleme, hastalık teşhisi ve
                  verim artırıcı konularda profesyonel danışmanlık hizmeti
                  sunuyoruz. WhatsApp, telefon veya e-posta ile ulaşabilirsiniz.
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
                  Çimlenme sorunu yaşanan tohumlarda %100 ücretsiz değişim
                  yapılır. İade kargo masrafları tarafımızdan karşılanır.
                </p>
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

// Wrapper Component
export default function Contact() {
  return (
    <CartProvider>
      <ContactPage />
    </CartProvider>
  );
}
