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
      title: "Kaliteli Tohumlarla Bahçenizi Yeşillendirin",
      description:
        "Şahintarım, en kaliteli bitki tohumlarını sunmaktadır. İster hobi bahçeniz için, ister profesyonel tarım için tohumlarımız size yüksek verim sağlar.",
    },
    {
      id: 2,
      image: "/images/carousel2.jpg",
      title: "Organik Sebze Tohumları",
      description:
        "Pestisit içermeyen, organik sebze tohumlarımızla sağlıklı ürünler yetiştirin.",
    },
    {
      id: 3,
      image: "/images/carousel3.jpg",
      title: "Çiçek Tohumları",
      description:
        "Balkonunuzu, bahçenizi renklendirmek için çeşitli çiçek tohumlarımızı deneyin.",
    },
    {
      id: 4,
      image: "/images/carousel4.jpg",
      title: "Fide & Fidan Çeşitleri",
      description:
        "Hazır fide ve fidanlarımızla zaman kazanın, hızlı hasata ulaşın.",
    },
    {
      id: 5,
      image: "/images/carousel5.jpg", // Düzeltildi: courasel5 -> carousel5
      title: "Tıbbi ve Aromatik Bitkiler",
      description:
        "Şifalı bitkileri kendi bahçenizde yetiştirmek için özel tohum koleksiyonumuz.",
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
                    <h1>{slide.title}</h1>
                    <p>{slide.description}</p>
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
