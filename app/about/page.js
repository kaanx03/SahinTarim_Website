"use client";

import Image from "next/image";
import { CartProvider } from "../contexts/CartContext";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

// Hakkımızda sayfa bileşeni
function AboutPage() {
  return (
    <main>
      {/* NavBar bileşeni */}
      <NavBar />

      {/* Company Story Section */}
      <section className="company-story">
        <div className="container">
          <div className="story-container">
            <div className="story-content">
              <h2>Hikayemiz</h2>
              <p>
                Şahintarım, 2008 yılında Niğde&apos;de küçük bir aile işletmesi
                olarak kuruldu. Kurucumuz Şahin Bey&apos;in tarıma olan tutkusu
                ve kaliteli fidan arayışı, bugünkü Şahintarım&apos;ın
                temellerini attı.
              </p>
              <p>
                15 yıl boyunca kesintisiz olarak büyüyen şirketimiz, bugün
                Türkiye&apos;nin dört bir yanındaki çiftçilere ve bahçe
                severlere hizmet veriyor. Organik üretim prensiplerine bağlı
                kalarak, doğaya saygılı bir yaklaşımla çalışmalarımızı
                sürdürüyoruz.
              </p>
            </div>
            <div className="story-image">
              <Image
                src="/images/company-history.jpg"
                alt="Şahintarım Geçmişi"
                width={500}
                height={350}
                style={{
                  width: "100%",
                  height: "350px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission Vision Values */}
      <section className="mission-vision">
        <div className="container">
          <div className="mission-vision-container">
            <div className="mission-box">
              <div className="icon">
                <i className="fas fa-bullseye"></i>
              </div>
              <h3>Misyonumuz</h3>
              <p>
                Türkiye&apos;nin her köşesindeki üreticilere en kaliteli, doğal
                ve güvenilir fidanları ulaştırarak ülkemizin tarımsal üretimine
                katkıda bulunmak ve sürdürülebilir tarımı desteklemek.
              </p>
            </div>

            <div className="mission-box">
              <div className="icon">
                <i className="fas fa-eye"></i>
              </div>
              <h3>Vizyonumuz</h3>
              <p>
                Türkiye&apos;nin en güvenilir fidan markası olmak ve
                uluslararası pazarlarda da tanınan, kalite standartlarıyla öne
                çıkan bir şirket haline gelmek.
              </p>
            </div>

            <div className="mission-box">
              <div className="icon">
                <i className="fas fa-heart"></i>
              </div>
              <h3>Değerlerimiz</h3>
              <p>
                Dürüstlük, kalite, müşteri memnuniyeti, çevre bilinci ve
                sürdürülebilirlik ilkelerimizin temelini oluşturur. Her zaman
                doğal ve organik üretimi destekliyoruz.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="statistics">
        <div className="container">
          <h2>Rakamlarla Şahintarım</h2>
          <div className="stats-container">
            <div className="stat-item">
              <div className="stat-number">15+</div>
              <div className="stat-text">Yıllık deneyim</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">50+</div>
              <div className="stat-text">Fidan çeşidi</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">5,000+</div>
              <div className="stat-text">Mutlu müşteri</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">81</div>
              <div className="stat-text">İl geneli teslimat</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section - DÜZELTİLMİŞ VERSİYON */}
      <section className="team">
        <div className="container">
          <div className="section-title">
            <h2>Ekibimiz</h2>
            <p>Deneyimli ve uzman kadromuzla hizmetinizdeyiz</p>
          </div>
          <div className="team-container">
            <div className="team-member">
              <div className="member-image">
                <Image
                  src="/images/man1.jpg"
                  alt="Şahin Bey - Kurucu"
                  width={300}
                  height={300}
                />
              </div>
              <h4>Şahin Yılmaz</h4>
              <p className="position">Kurucu & Genel Müdür</p>
              <p className="description">
                25 yıllık tarım deneyimine sahip, organik üretim uzmanı
              </p>
            </div>

            <div className="team-member">
              <div className="member-image">
                <Image
                  src="/images/woman.jpg"
                  alt="Ayşe Hanım - Kalite Kontrol"
                  width={300}
                  height={300}
                />
              </div>
              <h4>Ayşe Yılmaz</h4>
              <p className="position">Kalite Kontrol Müdürü</p>
              <p className="description">
                Ziraat mühendisi, fidan kalitesi ve test süreçleri uzmanı
              </p>
            </div>

            <div className="team-member">
              <div className="member-image">
                <Image
                  src="/images/man2.jpg"
                  alt="Mehmet Bey - Satış"
                  width={300}
                  height={300}
                />
              </div>
              <h4>Mehmet Kaya</h4>
              <p className="position">Satış Müdürü</p>
              <p className="description">
                15 yıllık satış deneyimi, müşteri ilişkileri uzmanı
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Standards */}
      <section className="quality-standards">
        <div className="container">
          <div className="quality-container">
            <div className="quality-content">
              <h2>Kalite Standartlarımız</h2>
              <div className="quality-list">
                <div className="quality-item">
                  <i className="fas fa-check-circle"></i>
                  <span>ISO 9001 Kalite Yönetim Sistemi</span>
                </div>
                <div className="quality-item">
                  <i className="fas fa-check-circle"></i>
                  <span>Organik Üretim Sertifikası</span>
                </div>
                <div className="quality-item">
                  <i className="fas fa-check-circle"></i>
                  <span>
                    ISTA (International Seed Testing Association) Üyeliği
                  </span>
                </div>
                <div className="quality-item">
                  <i className="fas fa-check-circle"></i>
                  <span>%98+ Çimlenme Oranı Garantisi</span>
                </div>
                <div className="quality-item">
                  <i className="fas fa-check-circle"></i>
                  <span>GDO&apos;suz Doğal Fidan Üretimi</span>
                </div>
                <div className="quality-item">
                  <i className="fas fa-check-circle"></i>
                  <span>Laboratuvar Test Onaylı Ürünler</span>
                </div>
              </div>
            </div>
            <div className="quality-image">
              <Image
                src="/images/quality-control.jpg"
                alt="Kalite Kontrol"
                width={500}
                height={400}
                style={{
                  width: "100%",
                  height: "400px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Facility Section */}
      <section className="facility">
        <div className="container">
          <div className="section-title">
            <h2>Tesislerimiz</h2>
            <p>
              Modern teknoloji ile donatılmış üretim ve depolama tesislerimiz
            </p>
          </div>
          <div className="facility-container">
            <div className="facility-item">
              <div className="facility-image">
                <Image
                  src="/images/production.jpg"
                  alt="Üretim Tesisi"
                  width={400}
                  height={200}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                />
              </div>
              <h4>Üretim Tesisi</h4>
              <p>
                5000 m² kapalı alanda modern makinelerle fidan işleme ve
                paketleme
              </p>
            </div>

            <div className="facility-item">
              <div className="facility-image">
                <Image
                  src="/images/storage.jpg"
                  alt="Depo"
                  width={400}
                  height={200}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                />
              </div>
              <h4>Depolama Tesisi</h4>
              <p>Soğuk hava depot sistemleri ile optimal saklama koşulları</p>
            </div>

            <div className="facility-item">
              <div className="facility-image">
                <Image
                  src="/images/arge.jpg"
                  alt="Laboratuvar"
                  width={400}
                  height={200}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                />
              </div>
              <h4>Ar-Ge Laboratuvarı</h4>
              <p>Kalite kontrol ve fidan geliştirme çalışmaları</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section className="sustainability">
        <div className="container">
          <div className="sustainability-container">
            <div className="sustainability-image">
              <Image
                src="/images/sustainability.jpg"
                alt="Sürdürülebilirlik"
                width={500}
                height={400}
                style={{
                  width: "100%",
                  height: "400px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />
            </div>
            <div className="sustainability-content">
              <h2>Sürdürülebilirlik Yaklaşımımız</h2>
              <p>
                Çevre bilinci ve sürdürülebilir tarım, şirketimizin temel
                değerleri arasındadır. Üretim süreçlerimizde doğa dostu
                yöntemler kullanıyor, su ve enerji tasarrufu sağlıyoruz.
              </p>
              <ul>
                <li>
                  <i className="fas fa-leaf"></i> Organik üretim teknikleri
                </li>
                <li>
                  <i className="fas fa-recycle"></i> Geri dönüştürülebilir
                  ambalaj
                </li>
                <li>
                  <i className="fas fa-water"></i> Su tasarrufu sistemleri
                </li>
                <li>
                  <i className="fas fa-solar-panel"></i> Güneş enerji kullanımı
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Float Button - EKLENDİ */}
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
  );
}

// Wrapper Component
export default function About() {
  return (
    <CartProvider>
      <AboutPage />
    </CartProvider>
  );
}
