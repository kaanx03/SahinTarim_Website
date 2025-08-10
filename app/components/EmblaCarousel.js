"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const EmblaCarousel = () => {
  // Carousel içeriği - Niğde Elma Fidanlarına özel
  const slides = [
    {
      id: 1,
      image: "/images/carousel1.jpg",
      title: "Premium Niğde Elma Fidanları",
      mobileTitle: "Premium Fidanlar",
      description:
        "15+ yıl deneyimle Niğde'nin volcans topraklarında yetişen, organik ve kaliteli elma fidanları. Türkiye geneli teslimat.",
      mobileDescription: "Organik ve kaliteli Niğde fidanları.",
    },
    {
      id: 2,
      image: "/images/carousel2.jpg",
      title: "Niğde Golden Delicious Fidanları",
      mobileTitle: "Golden Delicious",
      description:
        "Niğde'nin altın elması! Bal tadında aroması ve 8-9 ay saklama süresi ile ünlü Golden Delicious fidanları.",
      mobileDescription: "Niğde'nin altın elma fidanları.",
    },
    {
      id: 3,
      image: "/images/carousel3.jpg",
      title: "Niğde Granny Smith Fidanları",
      mobileTitle: "Granny Smith",
      description:
        "Niğde'nin 1200m yükseklikteki elma bahçelerinden özel Granny Smith fidanları. Ekşi ve çıtır dokusuyla pasta yapımının vazgeçilmezi.",
      mobileDescription: "Niğde'nin ekşi ve çıtır elma fidanı.",
    },
    {
      id: 4,
      image: "/images/carousel4.jpg",
      title: "Niğde Starking Elma Fidanları",
      mobileTitle: "Starking Elma",
      description:
        "Türkiye'nin kalbi Niğde'den meşhur kırmızı Starking elma fidanları. Sulu, sert ve lezzetli elmaların anahtarı.",
      mobileDescription: "Niğde'nin meşhur kırmızı elması.",
    },
    {
      id: 5,
      image: "/images/carousel5.jpg",
      title: "Niğde Gala Elma Fidanları",
      mobileTitle: "Gala Elma",
      description:
        "Erken hasat şampiyonu! Ağustos ayında hasadı yapılan, tatlı ve aromatik Niğde Gala elma fidanları.",
      mobileDescription: "Erken hasat için Gala fidanları.",
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
                      Elma Fidanlarını Keşfet
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
