"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const EmblaCarousel = () => {
  // Carousel içeriği
  const slides = [
    {
      id: 1,
      image: "/images/carousel1.jpg",
      title: "Premium Tohum Çeşitleri",
      mobileTitle: "Premium Tohum",
      description:
        "Niğde'nin verimli topraklarına uygun, yüksek kaliteli tohum çeşitlerimizle bereketli hasatlar elde edin.",
      mobileDescription: "Kaliteli tohumlarla bereketli hasat.",
    },
    {
      id: 2,
      image: "/images/carousel2.jpg",
      title: "Elma Ağacı Fidanları",
      mobileTitle: "Elma Fidanları",
      description:
        "Niğde'nin ünlü elma çeşitleri için özel seçilmiş fidan ve tohum koleksiyonumuz.",
      mobileDescription: "Niğde elması için özel fidanlar.",
    },
    {
      id: 3,
      image: "/images/carousel3.jpg",
      title: "Sebze Tohum Çeşitleri",
      mobileTitle: "Sebze Tohumları",
      description:
        "Patates, soğan, havuç ve diğer sebze tohumlarıyla bahçenizi şenlendirin.",
      mobileDescription: "Taze sebzeler için kaliteli tohum.",
    },
    {
      id: 4,
      image: "/images/carousel4.jpg",
      title: "Meyve Ağacı Fidanları",
      mobileTitle: "Meyve Fidanları",
      description:
        "Elma, armut, vişne ve kiraz fidanlarıyla meyve bahçenizi kurun.",
      mobileDescription: "Meyve bahçesi için fidan çeşitleri.",
    },
    {
      id: 5,
      image: "/images/carousel5.jpg",
      title: "Çiçek & Süs Bitkileri",
      mobileTitle: "Çiçek Tohumları",
      description:
        "Balkon ve bahçenizi güzelleştiren çiçek tohum ve fide çeşitlerimiz.",
      mobileDescription: "Renkli çiçekler için tohum çeşitleri.",
    },
  ];

  // Autoplay seçenekleri - sürekli sağa kaydırma için
  const autoplayOptions = {
    delay: 5000,
    rootNode: (emblaRoot) => emblaRoot.parentElement,
    stopOnInteraction: false,
    stopOnMouseEnter: true,
    direction: "forward", // Sağa doğru kayma ('forward' sağa, 'backward' sola)
  };

  // Embla Carousel hook'u - sonsuz döngü için loop: true
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      slidesToScroll: 1,
      direction: "ltr", // Normalde soldan sağa akış
      dragFree: false, // Serbest sürükleme kapalı
      containScroll: "trimSnaps", // Slaytların düzgün hizalanması için
      speed: 10, // Animasyon hızı - daha yavaş geçiş için
    },
    [Autoplay(autoplayOptions)]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  // State for responsive title and description
  const [isMobile, setIsMobile] = useState(false);

  // Check if screen is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Önceki slayta gitme işlevi
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  // Sonraki slayta gitme işlevi
  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // Belirli bir slayta gitme işlevi
  const scrollTo = useCallback(
    (index) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  // Seçili slayt indeksini güncelleme
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  // Kaydırma noktalarını ve seçili slaytı takip etme
  useEffect(() => {
    if (!emblaApi) return;

    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    onSelect();

    // Temizleme işlevi
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="hero">
      {/* Carousel ana container */}
      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((slide) => (
            <div className="embla__slide" key={slide.id}>
              <div
                className="carousel-item"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="container">
                  <div className="hero-content">
                    <h1>{isMobile ? slide.mobileTitle : slide.title}</h1>
                    <p>
                      {isMobile ? slide.mobileDescription : slide.description}
                    </p>
                    <a href="#products" className="btn btn-primary">
                      Ürünleri Keşfet
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Carousel Kontrolleri */}
      <button className="carousel-control prev" onClick={scrollPrev}>
        <i className="fas fa-chevron-left"></i>
      </button>
      <button className="carousel-control next" onClick={scrollNext}>
        <i className="fas fa-chevron-right"></i>
      </button>

      {/* Carousel Göstergeleri */}
      <div className="carousel-indicators">
        {scrollSnaps.map((_, index) => (
          <span
            key={index}
            className={`indicator ${index === selectedIndex ? "active" : ""}`}
            onClick={() => scrollTo(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default EmblaCarousel;
