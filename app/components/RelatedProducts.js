"use client";
import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import productsData from "../data/products.json";

const RelatedProducts = ({ currentProductId }) => {
  const { addToCart } = useContext(CartContext);

  // products.json'dan veriyi çek ve mevcut ürün hariç diğer ürünlerden 3 tanesini seç
  const relatedProducts = productsData
    .filter((product) => product.id !== currentProductId)
    .slice(0, 3);

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
