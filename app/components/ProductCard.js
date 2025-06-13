"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const ProductCard = ({ product, addToCart }) => {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product);

    // 2 saniye sonra eklendi bildirimini kaldır
    setTimeout(() => {
      setIsAdding(false);
    }, 2000);
  };

  if (!product) return null;

  return (
    <div className="product-card">
      {/* Ürün Resmi - Link olarak sadece resim kısmı */}
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

          {/* Ürün Aksiyonları - Sadece masaüstü için gösterilecek */}
          <div className="product-actions">
            <button
              className="quick-add-btn"
              aria-label="Sepete Ekle"
              onClick={(e) => {
                e.preventDefault(); // Link yönlendirmesini engelle
                handleAddToCart();
              }}
            >
              <i className="fas fa-cart-plus"></i>
            </button>

            {/* Görüntüle Butonu - onClick ile programatik yönlendirme kullanacağız */}
            <button
              className="view-details-btn"
              aria-label="Ürün Detayını Görüntüle"
              onClick={(e) => {
                e.preventDefault(); // Link yönlendirmesini engelle
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
        {/* Ürün Başlığı */}
        <Link href={`/product/${product.id}`} className="product-title-link">
          <h3 className="product-title">{product.name}</h3>
        </Link>

        {/* Ürün Açıklaması */}
        <p className="product-desc">{product.description}</p>

        {/* Ürün Fiyatı */}
        <div className="product-price">
          ₺{product.price ? product.price.toFixed(2) : "0.00"}
        </div>

        {/* Mobil Sepete Ekle Butonu */}
        <button
          className="add-to-cart"
          onClick={handleAddToCart}
          disabled={isAdding}
        >
          {isAdding ? "Eklendi ✓" : "Sepete Ekle"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
