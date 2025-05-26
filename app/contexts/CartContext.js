"use client";
import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  // Local storage kullanımı için tarayıcı kontrolü
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  // Component mount edildiğinde local storage'dan sepeti yükle
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        try {
          const parsedCart = JSON.parse(savedCart);
          setCart(parsedCart);
        } catch (error) {
          console.error("Sepet verisi okunurken hata:", error);
          localStorage.removeItem("cart");
        }
      }
    }
  }, []);

  // Cart değiştiğinde hesaplamaları yap ve local storage'a kaydet
  useEffect(() => {
    let price = 0;
    let items = 0;

    cart.forEach((item) => {
      price += item.price * item.quantity;
      items += item.quantity;
    });

    setTotalPrice(price);
    setTotalItems(items);

    // Local storage'ı güncelle
    if (typeof window !== "undefined") {
      if (cart.length > 0) {
        localStorage.setItem("cart", JSON.stringify(cart));
      } else {
        // Sepet boşsa localStorage'dan temizle
        localStorage.removeItem("cart");
      }
    }
  }, [cart]);

  const toggleCart = (forceOpen = false) => {
    if (forceOpen) {
      setIsCartOpen(true);
    } else {
      setIsCartOpen(!isCartOpen);
    }
  };

  const addToCart = (product) => {
    // Ürün verisinin tam olduğundan emin olalım
    console.log("Sepete eklenen ürün:", product); // Hata ayıklama için

    // Ürün objesinin tam olarak kopyalandığından emin ol
    const productToAdd = {
      id: product.id,
      name: product.name || "Ürün " + product.id, // Eğer isim yoksa varsayılan bir isim kullan
      price: product.price,
      image: product.image,
      description: product.description,
    };

    // Konsola eklenen ürünü yazalım
    console.log("Sepete eklenen ürün (düzenlenmiş):", productToAdd);

    const existingItem = cart.find((item) => item.id === productToAdd.id);

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === productToAdd.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...productToAdd, quantity: 1 }]);
    }

    // Show success message
    const successMessage = document.createElement("div");
    successMessage.textContent = "Ürün sepete eklendi!";
    successMessage.style.position = "fixed";
    successMessage.style.bottom = "20px";
    successMessage.style.left = "50%";
    successMessage.style.transform = "translateX(-50%)";
    successMessage.style.backgroundColor = "var(--primary-green)";
    successMessage.style.color = "white";
    successMessage.style.padding = "10px 20px";
    successMessage.style.borderRadius = "5px";
    successMessage.style.zIndex = "1000";

    document.body.appendChild(successMessage);

    setTimeout(() => {
      successMessage.remove();
    }, 2000);

    toggleCart(true);
  };

  const decreaseQuantity = (productId) => {
    const cartItem = cart.find((item) => item.id === productId);
    if (cartItem && cartItem.quantity > 1) {
      setCart(
        cart.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    } else {
      removeItem(productId);
    }
  };

  const increaseQuantity = (productId) => {
    setCart(
      cart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity > 0) {
      setCart(
        cart.map((item) =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    } else {
      removeItem(productId);
    }
  };

  const removeItem = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  // Sepeti tamamen temizle fonksiyonu (isteğe bağlı)
  const clearCart = () => {
    setCart([]);
  };

  const handleCheckout = () => {
    alert("Ödeme işlemi burada gerçekleştirilecek!");
    // Ödeme başarılıysa sepeti temizle
    // clearCart();
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        totalPrice,
        totalItems,
        addToCart,
        toggleCart,
        decreaseQuantity,
        increaseQuantity,
        updateQuantity,
        removeItem,
        clearCart,
        handleCheckout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
