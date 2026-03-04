"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import productsData from "../data/products.json";

const RelatedProducts = ({ currentProductId }) => {
  const relatedProducts = productsData
    .filter((product) => product.id !== currentProductId)
    .slice(0, 3);

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
              <Link
                href={`/product/${product.id}`}
                className="view-details-btn"
                aria-label="Ürün Detayını Görüntüle"
              >
                <i className="fas fa-eye"></i>
              </Link>
            </div>
          </div>

          <div className="product-info">
            <Link href={`/product/${product.id}`} className="product-title-link">
              <h3 className="product-title">{product.name}</h3>
            </Link>
            <p className="product-desc">{product.description}</p>
            <a
              href={`https://wa.me/+905386799995?text=Merhaba, ${encodeURIComponent(product.name)} hakkında fiyat bilgisi almak istiyorum.`}
              className="add-to-cart whatsapp-contact-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-whatsapp"></i> Fiyat için iletişime geçin
            </a>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default RelatedProducts;
