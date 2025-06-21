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
      switch (activeFilter) {
        case "erken-hasat":
          result = result.filter(
            (product) =>
              product.harvestTime && product.harvestTime.includes("Ağustos")
          );
          break;
        case "ana-hasat":
          result = result.filter(
            (product) =>
              product.harvestTime &&
              (product.harvestTime.includes("Eylül") ||
                product.harvestTime.includes("Ekim"))
          );
          break;
        case "uzun-saklama":
          result = result.filter((product) => {
            const extendedDescription = (
              product.extendedDescription || ""
            ).toLowerCase();
            return (
              extendedDescription.includes("6 ay") ||
              extendedDescription.includes("8-9 ay") ||
              extendedDescription.includes("uzun") ||
              extendedDescription.includes("saklama")
            );
          });
          break;
        default:
          result = result.filter(
            (product) => product.category === activeFilter
          );
          break;
      }
    }

    // Apply search filter
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(search) ||
          product.description.toLowerCase().includes(search) ||
          (product.extendedDescription &&
            product.extendedDescription.toLowerCase().includes(search))
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
        break;
    }

    setFilteredProducts(result);
    setCurrentPage(1);
  }, [activeFilter, sortBy, searchTerm, products]);

  // Handle search submit
  const handleSearch = (e) => {
    e.preventDefault();
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
    document
      .querySelector(".products-section")
      .scrollIntoView({ behavior: "smooth" });
  };

  // Generate pagination buttons
  const renderPagination = () => {
    const pages = [];

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

      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <h1>Niğde Elma Fidanları</h1>
          <p>Yüksek kaliteli, sertifikalı elma fidanları</p>
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
              Tüm Çeşitler ({products.length})
            </button>
            <button
              className={`filter-btn ${
                activeFilter === "erken-hasat" ? "active" : ""
              }`}
              onClick={() => setActiveFilter("erken-hasat")}
            >
              Erken Hasat (Ağustos)
            </button>
            <button
              className={`filter-btn ${
                activeFilter === "ana-hasat" ? "active" : ""
              }`}
              onClick={() => setActiveFilter("ana-hasat")}
            >
              Ana Hasat (Eylül-Ekim)
            </button>
            <button
              className={`filter-btn ${
                activeFilter === "uzun-saklama" ? "active" : ""
              }`}
              onClick={() => setActiveFilter("uzun-saklama")}
            >
              Uzun Saklama
            </button>
          </div>

          {/* Products Search & Sort */}
          <div className="products-toolbar">
            <div className="products-search">
              <form className="search-form" onSubmit={handleSearch}>
                <input
                  type="text"
                  className="search-input"
                  placeholder="Elma çeşidi ara..."
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

            {/* Sonuç sayısı */}
            <div className="results-count">
              <span>{filteredProducts.length} ürün bulundu</span>
            </div>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="products-loading">
              <div className="loading-spinner"></div>
              <p>Elma fidanları yükleniyor...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="no-products">
              <h3>Ürün Bulunamadı</h3>
              <p>
                Arama kriterlerinize uygun elma fidanı bulunamadı. Lütfen farklı
                bir arama terimi deneyin veya filtreleri temizleyin.
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
          {!loading && filteredProducts.length > 0 && totalPages > 1 && (
            <div className="pagination">{renderPagination()}</div>
          )}
        </div>
      </section>

      <Footer />

      {/* WhatsApp Float Button */}
      <a
        href="https://wa.me/+905386799995?text=Merhaba, elma fidanları hakkında bilgi almak istiyorum."
        className="whatsapp-float"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fab fa-whatsapp"></i>
      </a>
    </main>
  );
}
