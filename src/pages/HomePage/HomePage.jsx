import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import HeroBanner from "./HeroBanner/HeroBanner";
import Section from "../../shared/components/SectionTitle/SectionTitle";
import CategoryCard from "../CategoriesPage/CategoryCard/CategoryCard";
import ProductCard from "../ProductPage/ProductCard/ProductCard";
import FirstOrderBanner from "./FirstOrderBanner/FirstOrderBanner";

import { getCategories, getProducts } from "../../api/api";
import styles from "./HomePage.module.css";

// «Розпаковує» відповідь API, якщо вона приходить обгорнута в { data: […] } чи { categories: […] }
function extractArray(payload) {
  if (Array.isArray(payload)) return payload;
  if (payload.categories && Array.isArray(payload.categories))
    return payload.categories;
  if (payload.data && Array.isArray(payload.data)) return payload.data;
  return [];
}

export default function HomePage() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [catsPayload, prodsPayload] = await Promise.all([
          getCategories(),
          getProducts(),
        ]);
        setCategories(extractArray(catsPayload));
        setProducts(extractArray(prodsPayload));
      } catch (err) {
        console.error("API load error:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return <div className={styles.loader}>Loading...</div>;
  }

  // Перші 4 категорії
  const displayedCategories = categories.slice(0, 4);

  // Перші 4 товари зі знижкою (як у SalePage)
  // Змініть поле `discount` на `discountPercentage` або інше, якщо у вас інакше
  const displayedSale = products.filter((p) => p.discont_price > 0).slice(0, 4);

  return (
    <main className={styles.home}>
      <HeroBanner />

      <div className={styles.container}>
        {/* Categories */}
        <Section
          title="Categories"
          linkText="All categories "
          linkTo="/categories"
        >
          {displayedCategories.length > 0 ? (
            displayedCategories.map((cat) => (
              <Link key={cat.id} to={`/categories/${cat.id}`}>
                <CategoryCard {...cat} />
              </Link>
            ))
          ) : (
            <p>No categories available.</p>
          )}
        </Section>

        {/* 5% off banner */}
        <FirstOrderBanner />

        {/* Sale */}
        <Section title="Sale" linkText="All sales" linkTo="/sale">
          {displayedSale.length > 0 ? (
            displayedSale.map((prod) => (
              <Link key={prod.id} to={`/products/${prod.id}`}>
                <ProductCard {...prod} />
              </Link>
            ))
          ) : (
            <p>No sale items available.</p>
          )}
        </Section>
      </div>
    </main>
  );
}
