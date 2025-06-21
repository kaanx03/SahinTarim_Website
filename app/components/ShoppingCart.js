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

  // WhatsApp mesajı oluşturma fonksiyonu
  const generateWhatsAppMessage = () => {
    if (cart.length === 0) {
      return "Merhaba, ürünleriniz hakkında bilgi almak istiyorum.";
    }

    let message = "Merhaba, aşağıdaki ürünlerden sipariş vermek istiyorum:\n\n";

    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.name || "Ürün"} - ${
        item.quantity
      } adet (₺${item.price.toFixed(2)})\n`;
    });

    message += `\nToplam: ₺${totalPrice.toFixed(2)}\n\n`;
    message += "Yardımcı olabilir misiniz?";

    return encodeURIComponent(message);
  };

  // WhatsApp'a yönlendirme fonksiyonu
  const handleWhatsAppCheckout = () => {
    const message = generateWhatsAppMessage();
    const whatsappUrl = `https://wa.me/+905386799995?text=${message}`;
    window.open(whatsappUrl, "_blank");

    // Sepeti kapatabilirsiniz (isteğe bağlı)
    toggleCart();
  };

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
          <button
            className="checkout-btn"
            onClick={handleWhatsAppCheckout}
            disabled={cart.length === 0}
          >
            <i className="fab fa-whatsapp" style={{ marginRight: "8px" }}></i>
            WhatsApp ile Sipariş Ver
          </button>
        </div>
      </div>
      <div className="cart-icon" onClick={() => toggleCart()}>
        <i className="fas fa-shopping-cart"></i>
        <span className="cart-count">{totalItems}</span>
      </div>

      {/* WhatsApp Float Button */}
      <a
        href={`https://wa.me/+905386799995?text=${generateWhatsAppMessage()}`}
        className="whatsapp-float"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fab fa-whatsapp"></i>
      </a>
    </>
  );
}
