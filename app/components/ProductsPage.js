"use client";

import { useEffect, useState, useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import Link from "next/link";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { motion } from "framer-motion";
import productsData from "../data/products.json";

export default function ProductsPage() {
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    // Simulating data loading
    setTimeout(() => {
      setProducts(productsData);
      setFilteredProducts(productsData);
      setLoading(false);
    }, 800);
  }, []);

  // Handle category filter change
  useEffect(() => {
    let result = [...products];

    // Apply category filter
    if (activeFilter !== "all") {
      result = result.filter((product) => product.category === activeFilter);
    }

    // Apply search filter
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(search) ||
          product.description.toLowerCase().includes(search)
      );
    }

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        // Keep default order
        break;
    }

    setFilteredProducts(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [activeFilter, sortBy, searchTerm, products]);

  // Handle search submit
  const handleSearch = (e) => {
    e.preventDefault();
    // Search is already handled in the effect above
  };

  // Get current products for pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Calculate total pages
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Page change handler
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Scroll to top of product list
    document
      .querySelector(".products-section")
      .scrollIntoView({ behavior: "smooth" });
  };

  // Generate pagination buttons
  const renderPagination = () => {
    const pages = [];

    // Previous button
    pages.push(
      <button
        key="prev"
        className="page-btn prev"
        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      >
        <i className="fas fa-chevron-left"></i> Önceki
      </button>
    );

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          className={`page-btn ${currentPage === i ? "active" : ""}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    // Next button
    pages.push(
      <button
        key="next"
        className="page-btn next"
        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
      >
        Sonraki <i className="fas fa-chevron-right"></i>
      </button>
    );

    return pages;
  };

  // Animation variants for container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Animation variants for items
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <main className="products-page">
      <NavBar />

      {/* Page Header - Sadece Başlık */}
      <section className="page-header">
        <div className="container">
          <h1>Tohum Ürünlerimiz</h1>
        </div>
      </section>

      {/* Products Section */}
      <section className="products-section">
        <div className="container">
          {/* Products Filter */}
          <div className="products-filter">
            <button
              className={`filter-btn ${activeFilter === "all" ? "active" : ""}`}
              onClick={() => setActiveFilter("all")}
            >
              Tümü
            </button>
            <button
              className={`filter-btn ${
                activeFilter === "vegetable" ? "active" : ""
              }`}
              onClick={() => setActiveFilter("vegetable")}
            >
              Sebze Tohumları
            </button>
            <button
              className={`filter-btn ${
                activeFilter === "fruit" ? "active" : ""
              }`}
              onClick={() => setActiveFilter("fruit")}
            >
              Meyve Tohumları
            </button>
            <button
              className={`filter-btn ${
                activeFilter === "flower" ? "active" : ""
              }`}
              onClick={() => setActiveFilter("flower")}
            >
              Çiçek Tohumları
            </button>
            <button
              className={`filter-btn ${
                activeFilter === "herb" ? "active" : ""
              }`}
              onClick={() => setActiveFilter("herb")}
            >
              Aromatik Bitkiler
            </button>
          </div>

          {/* Products Search & Sort */}
          <div className="products-toolbar">
            <div className="products-search">
              <form className="search-form" onSubmit={handleSearch}>
                <input
                  type="text"
                  className="search-input"
                  placeholder="Ürün ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit" className="search-btn">
                  <i className="fas fa-search"></i>
                </button>
              </form>
            </div>

            <div className="products-sort">
              <span className="sort-label">Sırala:</span>
              <select
                className="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="default">Varsayılan Sıralama</option>
                <option value="price-low">Fiyat: Düşükten Yükseğe</option>
                <option value="price-high">Fiyat: Yüksekten Düşüğe</option>
                <option value="name-asc">İsim: A-Z</option>
                <option value="name-desc">İsim: Z-A</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="products-loading">
              <div className="loading-spinner"></div>
              <p>Ürünler yükleniyor...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="no-products">
              <h3>Ürün Bulunamadı</h3>
              <p>
                Arama kriterlerinize uygun ürün bulunamadı. Lütfen farklı bir
                arama terimi deneyin veya filtreleri temizleyin.
              </p>
            </div>
          ) : (
            <motion.div
              className="products-container"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {currentProducts.map((product) => (
                <motion.div key={product.id} variants={itemVariants}>
                  <ProductCard product={product} addToCart={addToCart} />
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Pagination */}
          {!loading && filteredProducts.length > 0 && (
            <div className="pagination">{renderPagination()}</div>
          )}
        </div>
      </section>

      {/* Featured Products or Newsletter Section could go here */}

      <Footer />

      {/* WhatsApp Float Button */}
      <a
        href="https://wa.me/+905332234645?text=Merhaba, ürünleriniz hakkında bilgi almak istiyorum."
        className="whatsapp-float"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fab fa-whatsapp"></i>
      </a>
    </main>
  );
}
