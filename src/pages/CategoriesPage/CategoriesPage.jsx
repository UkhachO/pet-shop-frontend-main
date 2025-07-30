import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // ← імпорт Link
import CategoryCard from "./CategoryCard/CategoryCard";
import ProductCard from "../ProductPage/ProductCard/ProductCard";
import Section from "../../shared/components/SectionTitle/SectionTitle";
import { getCategories, getProducts } from "../../api/api";
import Breadcrumbs from "../../shared/components/Breadcrumbs/Breadcrumbs";
import styles from "./CategoriesPage.module.css";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [cats, prods] = await Promise.all([
          getCategories(),
          getProducts(),
        ]);
        setCategories(Array.isArray(cats) ? cats : []);
        setProducts(Array.isArray(prods) ? prods : []);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <div className={styles.loader}>Loading...</div>;

  const filteredProducts = selectedCategoryId
    ? products.filter((p) => p.categoryId === selectedCategoryId)
    : [];

  return (
    <main className={styles.page}>
      <Breadcrumbs/>
      <Section title="Categories">
        <div className={styles.categoriesGrid}>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/categories/${cat.id}`} // ← лінк на сторінку категорії
              className={`${styles.catWrapper} ${
                selectedCategoryId === cat.id ? styles.selected : ""
              }`}
              onClick={() => setSelectedCategoryId(cat.id)} // щоб підсвітити в UI
            >
              <CategoryCard {...cat} />
            </Link>
          ))}
        </div>
      </Section>

      {selectedCategoryId && (
        <Section
          title={`Products in ${
            categories.find((c) => c.id === selectedCategoryId)?.name || ""
          }`}
        >
          {filteredProducts.length > 0 ? (
            <div className={styles.productsGrid}>
              {filteredProducts.map((prod) => (
                <ProductCard
                  key={prod.id}
                  id={prod.id}
                  title={prod.title || prod.name}
                  price={prod.price}
                  image={prod.image || prod.imageUrl}
                  discont_price={prod.discont_price}
                />
              ))}
            </div>
          ) : (
            <p className={styles.noItems}>No products available.</p>
          )}
        </Section>
      )}
    </main>
  );
}
