"use client";
import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const RelatedProducts = ({ currentProductId }) => {
  const { addToCart } = useContext(CartContext);

  // Tüm ürünler listesi - products.json'dan gelen veriler
  const allProducts = [
    {
      id: 1,
      name: "Domates Tohumu (Cherry)",
      description:
        "Özel seçilmiş Cherry domates tohumları. Yüksek verimli ve lezzetli.",
      price: 15.99,
      image: "/images/tomato.jpg",
    },
    {
      id: 2,
      name: "Salatalık Tohumu (Turşuluk)",
      description: "Turşuluk salatalık tohumları. Dayanıklı ve bol mahsullü.",
      price: 12.5,
      image: "/images/cucumber.jpg",
    },
    {
      id: 3,
      name: "Biber Tohumu (Tatlı)",
      description: "Tatlı biber tohumları. Yüksek A ve C vitamini içerir.",
      price: 14.75,
      image: "/images/pepper.jpg",
    },
    {
      id: 4,
      name: "Maydanoz Tohumu",
      description:
        "Kıvırcık maydanoz tohumları. Kolay yetiştirilebilir ve aromatik.",
      price: 8.99,
      image: "/images/parsley.jpg",
    },
    {
      id: 5,
      name: "Karpuz Tohumu",
      description:
        "Tatlı ve sulu karpuz tohumları. Sıcak iklimler için idealdir.",
      price: 18.5,
      image: "/images/watermelon.jpg",
    },
    {
      id: 6,
      name: "Çilek Tohumu",
      description:
        "Aromalı ve tatlı çilek tohumları. Saksıda da yetiştirilebilir.",
      price: 22.99,
      image: "/images/strawberry.jpg",
    },
    {
      id: 7,
      name: "Lavanta Tohumu",
      description:
        "Aromatik ve dekoratif lavanta tohumları. Balkonlar için idealdir.",
      price: 19.99,
      image: "/images/lavender.jpg",
    },
    {
      id: 8,
      name: "Nane Tohumu",
      description: "Ferahlatıcı nane tohumları. Mutfak bahçeniz için mükemmel.",
      price: 9.5,
      image: "/images/mint.jpg",
    },
  ];

  // Mevcut ürün hariç diğer ürünlerden 4 tanesini seç
  const relatedProducts = allProducts
    .filter((product) => product.id !== currentProductId)
    .slice(0, 4);

  // Animasyon varyantları
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.4,
        ease: "easeOut",
      },
    }),
  };

  return (
    <div className="related-products-container">
      {relatedProducts.map((product, index) => (
        <motion.div
          className="product-card"
          key={product.id}
          custom={index}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
        >
          {/* Ürün görseli ve resim hover efektleri için */}
          <div className="product-img">
            <Link href={`/product/${product.id}`}>
              <Image
                src={product.image}
                alt={product.name}
                width={300}
                height={300}
                className="product-image"
              />
            </Link>
            <div className="product-actions">
              {/* Sepete ekle butonu */}
              <button
                className="quick-add-btn"
                onClick={() => addToCart(product)}
                aria-label="Sepete Ekle"
              >
                <i className="fas fa-cart-plus"></i>
              </button>
              {/* Detay butonu */}
              <Link
                href={`/product/${product.id}`}
                className="view-details-btn"
                aria-label="Ürün Detayını Görüntüle"
              >
                <i className="fas fa-eye"></i>
              </Link>
            </div>
          </div>

          {/* Ürün bilgileri */}
          <div className="product-info">
            <Link
              href={`/product/${product.id}`}
              className="product-title-link"
            >
              <h3 className="product-title">{product.name}</h3>
            </Link>
            <p className="product-desc">{product.description}</p>
            <div className="product-price">₺{product.price.toFixed(2)}</div>
            <button
              className="add-to-cart-btn mobile"
              onClick={() => addToCart(product)}
            >
              Sepete Ekle
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default RelatedProducts;
