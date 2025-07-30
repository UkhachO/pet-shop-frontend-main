// src/pages/ProductsPage/ProductsPage.jsx

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SectionTitle from "../../shared/components/SectionTitle/SectionTitle";
import ProductCard from "../ProductPage/ProductCard/ProductCard";
import Pagination from "../../shared/components/Pagination/Pagination";
import { fetchProducts } from "../../redux/productsSlice";
import Breadcrumbs from "../../shared/components/Breadcrumbs/Breadcrumbs";
import CategoryFilters from "../../shared/components/CategoryFilters/CategoryFilters";
import styles from "./ProductsPage.module.css";

export default function ProductsPage() {
  const dispatch = useDispatch();
  const {
    list: products,
    status,
    error,
  } = useSelector((state) => state.products);

  // стани фільтрів
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");
  const [onlyDiscounted, setOnlyDiscounted] = useState(false);
  const [sortBy, setSortBy] = useState("default");

  // пагінація
  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);

  // завантаження
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  // поки завантажується
  if (status === "loading") {
    return (
      <main className={styles.page}>
        <Breadcrumbs />
        <p>Loading products…</p>
      </main>
    );
  }
  if (status === "failed") {
    return (
      <main className={styles.page}>
        <Breadcrumbs />
        <p className={styles.error}>Error: {error}</p>
      </main>
    );
  }

  // 1. застосовуємо фільтри до всіх продуктів
  let filtered = products.slice();

  if (priceFrom !== "") {
    filtered = filtered.filter((p) => p.price >= Number(priceFrom));
  }
  if (priceTo !== "") {
    filtered = filtered.filter((p) => p.price <= Number(priceTo));
  }
  if (onlyDiscounted) {
    filtered = filtered.filter(
      (p) => typeof p.discont_price === "number" && p.discont_price < p.price
    );
  }

  switch (sortBy) {
    case "price-asc":
      filtered = [...filtered].sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      filtered = [...filtered].sort((a, b) => b.price - a.price);
      break;
    case "name-asc":
      filtered = [...filtered].sort((a, b) =>
        (a.title || a.name).localeCompare(b.title || b.name)
      );
      break;
    default:
      // "default" — без сортування
      break;
  }

  // 2. пагінація вже відфільтрованих
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <main className={styles.page}>
      <Breadcrumbs />

      {/* ФІЛЬТРИ */}
      <CategoryFilters
        priceFrom={priceFrom}
        priceTo={priceTo}
        onlyDiscounted={onlyDiscounted}
        sortBy={sortBy}
        onPriceFromChange={setPriceFrom}
        onPriceToChange={setPriceTo}
        onOnlyDiscountedChange={setOnlyDiscounted}
        onSortByChange={setSortBy}
      />

      <SectionTitle title="All Products" />

      {/* Сітка продуктів */}
      {paginated.length > 0 ? (
        <div className={styles.grid}>
          {paginated.map((prod) => (
            <ProductCard key={prod.id} {...prod} />
          ))}
        </div>
      ) : (
        <p className={styles.noItems}>No products found.</p>
      )}

      {/* ПАГІНАЦІЯ */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </main>
  );
}
