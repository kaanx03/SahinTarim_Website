"use client";

import ProductDetail from "@/app/components/ProductDetail";
import { CartProvider } from "@/app/contexts/CartContext";

export default function ProductPage({ params }) {
  return (
    <CartProvider>
      <ProductDetail />
    </CartProvider>
  );
}
