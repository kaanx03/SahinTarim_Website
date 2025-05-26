"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ShoppingCart from "./ShoppingCart";

const NavBar = ({ logo = "Şahintarım", links = [] }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Sadece sayfa içi bağlantılar için event listener
    setupAnchorEventListeners();

    // Sayfanın yolu/adresini al
    const pathname = window.location.pathname;
    const isHomePage = pathname === "/" || pathname === "/home";

    // Scroll efekti için event listener
    function handleScroll() {
      const header = document.querySelector("header");
      if (header) {
        if (window.scrollY > 50) {
          header.classList.add("scrolled");
          header.classList.remove("transparent");
        } else {
          // Sadece ana sayfadaysa şeffaf olsun, diğer sayfalarda herzaman renkli kalsın
          if (isHomePage) {
            header.classList.remove("scrolled");
            header.classList.add("transparent");
          } else {
            header.classList.add("scrolled");
            header.classList.remove("transparent");
          }
        }
      }
    }

    // Scroll event listener ekle
    window.addEventListener("scroll", handleScroll);

    // İlk yüklemede sınıfları belirle
    const header = document.querySelector("header");
    if (header) {
      if (isHomePage) {
        // Ana sayfada ise şeffaf başla
        header.classList.add("transparent");
        header.classList.remove("scrolled");
      } else {
        // Diğer sayfalarda direkt renkli başla
        header.classList.remove("transparent");
        header.classList.add("scrolled");
      }
    }

    // İlk yüklemede kontrol et (sayfa ortadan açılırsa)
    handleScroll();

    // Temizleme fonksiyonu
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Sadece sayfa içi bağlantılar için event listener
  function setupAnchorEventListeners() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();

        const targetId = this.getAttribute("href");
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: "smooth",
          });

          if (isMobileMenuOpen) {
            toggleMobileMenu();
          }
        }
      });
    });
  }

  function toggleMobileMenu() {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    document.body.style.overflow = !isMobileMenuOpen ? "hidden" : "";
  }

  // YENİ: Varsayılan linkler - sayfa yönlendirmeleri için düzeltildi
  const defaultLinks = [
    { href: "/", text: "Ana Sayfa" },
    { href: "/products", text: "Ürünlerimiz" },
    { href: "/about", text: "Hakkımızda" },
    { href: "/contact", text: "İletişim" },
  ];

  // Eğer links parametresi boşsa varsayılan linkleri kullan
  const navLinks = links.length > 0 ? links : defaultLinks;

  // Link veya bağlantı türünü belirleyen yardımcı fonksiyon
  const renderNavLink = (link, index) => {
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
    <header>
      <div className="container">
        <div className="header-content">
          {/* Hamburger menü butonu (mobil görünümde görünür) */}
          <div
            id="mobile-menu-btn"
            className={isMobileMenuOpen ? "active" : ""}
            onClick={toggleMobileMenu}
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>

          {/* Logo (solda kalacak) */}
          <div className="logo">
            <Link href="/">
              <i className="fas fa-seedling"></i> {logo}
            </Link>
          </div>

          {/* Navigasyon menüsü */}
          <nav id="navbar" className={isMobileMenuOpen ? "active" : ""}>
            <ul>{navLinks.map((link, index) => renderNavLink(link, index))}</ul>
          </nav>

          {/* Sepet ikonu en sağa */}
          <div className="header-icons">
            <ShoppingCart />
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
