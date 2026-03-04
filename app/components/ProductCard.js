"use client";

import Link from "next/link";
import Image from "next/image";

const ProductCard = ({ product }) => {
  if (!product) return null;

  return (
    <div className="product-card">
      {/* Ürün Resmi */}
      <Link href={`/product/${product.id}`} className="product-img-link">
        <div className="product-img">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              className="product-image"
              width={300}
              height={300}
            />
          ) : (
            <div className="placeholder-img">
              <i className="fas fa-seedling"></i>
            </div>
          )}

          {/* Görüntüle Butonu */}
          <div className="product-actions">
            <button
              className="view-details-btn"
              aria-label="Ürün Detayını Görüntüle"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = `/product/${product.id}`;
              }}
            >
              <i className="fas fa-eye"></i>
            </button>
          </div>
        </div>
      </Link>

      {/* Ürün Bilgileri */}
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
    </div>
  );
};

export default ProductCard;
