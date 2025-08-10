"use client";

import Link from "next/link";

const Footer = ({
  companyName = "Şahintarım",
  description = "Kaliteli elma fidanları, sağlıklı bitkiler ve bereketli hasat için doğru adres.",
  quickLinks = [],
  categories = [],
  helpLinks = [],
  year = new Date().getFullYear(),
}) => {
  // YENİ: Düzeltilmiş varsayılan hızlı bağlantılar (sayfa yönlendirmeleri)
  const defaultQuickLinks = [
    { href: "/", text: "Ana Sayfa" },
    { href: "/products", text: "Ürünlerimiz" },
    { href: "/about", text: "Hakkımızda" },
    { href: "/contact", text: "İletişim" },
  ];

  // Varsayılan kategoriler - Products sayfasındaki filtrelere uygun
  const defaultCategories = [
    { href: "/products?filter=erken-hasat", text: "Erken Hasat (Ağustos)" },
    { href: "/products?filter=ana-hasat", text: "Ana Hasat (Eylül-Ekim)" },
    { href: "/products?filter=uzun-saklama", text: "Uzun Saklama" },
  ];

  // Varsayılan yardım bağlantıları (farklı sayfalara giden bağlantılar)
  const defaultHelpLinks = [
    { href: "/yardim/siparis-takibi", text: "Sipariş Takibi" },
    { href: "/yardim/iade-politikasi", text: "İade Politikası" },
    { href: "/yardim/gizlilik-politikasi", text: "Gizlilik Politikası" },
    { href: "/yardim/sss", text: "SSS" },
  ];

  // Eğer prop olarak gelen değerler boşsa varsayılanları kullan
  const footerQuickLinks =
    quickLinks.length > 0 ? quickLinks : defaultQuickLinks;
  const footerCategories =
    categories.length > 0 ? categories : defaultCategories;
  const footerHelpLinks = helpLinks.length > 0 ? helpLinks : defaultHelpLinks;

  // Link veya bağlantı türünü belirleyen yardımcı fonksiyon
  const renderLink = (link, index) => {
    // Sayfa içi bağlantı (#) veya isAnchor özelliği için normal <a> kullan
    if (link.href.startsWith("#") || link.isAnchor) {
      return (
        <li key={index}>
          <a href={link.href}>{link.text}</a>
        </li>
      );
    }

    // Diğer tüm bağlantılar için Next.js Link bileşenini kullan
    return (
      <li key={index}>
        <Link href={link.href}>{link.text}</Link>
      </li>
    );
  };

  return (
    <footer>
      <div className="container">
        <div className="footer-container">
          <div className="footer-col">
            <h4>{companyName}</h4>
            <p>{description}</p>
            <div className="social-links">
              <Link
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook-f"></i>
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <i className="fab fa-twitter"></i>
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram"></i>
              </Link>
              <Link
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
              >
                <i className="fab fa-youtube"></i>
              </Link>
            </div>
          </div>

          <div className="footer-col">
            <h4>Hızlı Bağlantılar</h4>
            <ul>
              {footerQuickLinks.map((link, index) => renderLink(link, index))}
            </ul>
          </div>

          <div className="footer-col">
            <h4>Elma Çeşitleri</h4>
            <ul>
              {footerCategories.map((category, index) =>
                renderLink(category, index)
              )}
            </ul>
          </div>

          <div className="footer-col">
            <h4>Yardım</h4>
            <ul>
              {footerHelpLinks.map((link, index) => renderLink(link, index))}
            </ul>
          </div>
        </div>

        <div className="copyright">
          <p>
            &copy; {year} {companyName} - Tüm Hakları Saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
