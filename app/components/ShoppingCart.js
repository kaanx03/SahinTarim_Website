"use client";

import { useContext, useEffect } from "react";
import { CartContext } from "../contexts/CartContext";

export default function ShoppingCart() {
  const {
    cart,
    isCartOpen,
    totalPrice,
    totalItems,
    toggleCart,
    decreaseQuantity,
    increaseQuantity,
    updateQuantity,
    removeItem,
    handleCheckout,
  } = useContext(CartContext);

  // Sepet açık/kapalı durumuna göre body'ye class ekle/çıkar
  useEffect(() => {
    if (isCartOpen) {
      document.body.classList.add("cart-open");
    } else {
      document.body.classList.remove("cart-open");
    }

    // Cleanup function - component unmount olduğunda class'ı temizle
    return () => {
      document.body.classList.remove("cart-open");
    };
  }, [isCartOpen]);

  return (
    <>
      <div
        className={`cart-overlay ${isCartOpen ? "active" : ""}`}
        onClick={() => toggleCart()}
      ></div>
      <div className={`cart-container ${isCartOpen ? "active" : ""}`}>
        <div className="cart-header">
          <h3>Sepetiniz</h3>
          <div className="close-cart" onClick={() => toggleCart()}>
            <i className="fas fa-times"></i>
          </div>
        </div>
        <div className="cart-items">
          {cart.length === 0 ? (
            <p>Sepetiniz boş</p>
          ) : (
            cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <div
                  className="cart-item-img"
                  style={{ backgroundImage: `url('${item.image}')` }}
                ></div>
                <div className="cart-item-info">
                  <div className="cart-item-title">
                    {item.name || "Ürün İsmi"}
                  </div>
                  <div className="cart-item-price">
                    ₺{item.price.toFixed(2)}
                  </div>
                  <div className="cart-item-quantity">
                    <button
                      className="quantity-btn minus"
                      onClick={() => decreaseQuantity(item.id)}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      className="quantity-input"
                      value={item.quantity}
                      min="1"
                      onChange={(e) =>
                        updateQuantity(item.id, parseInt(e.target.value))
                      }
                    />
                    <button
                      className="quantity-btn plus"
                      onClick={() => increaseQuantity(item.id)}
                    >
                      +
                    </button>
                    <div
                      className="remove-item"
                      onClick={() => removeItem(item.id)}
                    >
                      <i className="fas fa-trash"></i>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="cart-total">
          <div className="cart-total-title">Toplam</div>
          <div className="cart-total-price">₺{totalPrice.toFixed(2)}</div>
          <button className="checkout-btn" onClick={handleCheckout}>
            Ödeme Yap
          </button>
        </div>
      </div>
      <div className="cart-icon" onClick={() => toggleCart()}>
        <i className="fas fa-shopping-cart"></i>
        <span className="cart-count">{totalItems}</span>
      </div>
    </>
  );
}
