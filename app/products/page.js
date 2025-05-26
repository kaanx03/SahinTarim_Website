// app/products/page.js
"use client";

import ProductsPage from "@/app/components/ProductsPage";
import { CartProvider } from "@/app/contexts/CartContext";

export default function Products() {
  return (
    <CartProvider>
      <ProductsPage />
    </CartProvider>
  );
}
