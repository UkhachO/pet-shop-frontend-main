import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCategories, getProducts } from "../../api/api";
import ProductCard from "../ProductPage/ProductCard/ProductCard";
import Breadcrumbs from "../../shared/components/Breadcrumbs/Breadcrumbs";
import CategoryFilters from "../../shared/components/CategoryFilters/CategoryFilters";
import styles from "./CategoryPage.module.css";

const CategoryPage = () => {
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");
  const [onlyDiscounted, setOnlyDiscounted] = useState(false);
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    async function loadAll() {
      try {
        const [cats, prods] = await Promise.all([
          getCategories(),
          getProducts(),
        ]);
        setCategories(Array.isArray(cats) ? cats : []);
        setProducts(Array.isArray(prods) ? prods : []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadAll();
  }, []);

  if (loading) {
    return <div className={styles.loader}>Loading...</div>;
  }

  const currentCat = categories.find((c) => String(c.id) === id);

  const catName =
    currentCat?.name ?? currentCat?.title ?? currentCat?.label ?? "Category";

  let items = products.filter((p) => String(p.categoryId) === id);

  if (priceFrom !== "") items = items.filter((p) => p.price >= +priceFrom);
  if (priceTo !== "") items = items.filter((p) => p.price <= +priceTo);
  if (onlyDiscounted) {
    items = items.filter(
      (p) => typeof p.discont_price === "number" && p.discont_price < p.price
    );
  }

  if (sortBy === "price-asc") {
    items = [...items].sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-desc") {
    items = [...items].sort((a, b) => b.price - a.price);
  } else if (sortBy === "name-asc") {
    items = [...items].sort((a, b) =>
      (a.title || a.name).localeCompare(b.title || b.name)
    );
  }

  return (
    <main className={styles.page}>
      <Breadcrumbs />

      <h1 className={styles.heading}>{catName}</h1>

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

      {items.length > 0 ? (
        <div className={styles.productsGrid}>
          {items.map((prod) => (
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
        <p className={styles.noItems}>No products found.</p>
      )}
    </main>
  );
};

export default CategoryPage;
