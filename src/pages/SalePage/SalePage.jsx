import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SectionTitle from "../../shared/components/SectionTitle/SectionTitle";
import ProductCard from "../ProductPage/ProductCard/ProductCard";
import { fetchProducts } from "../../redux/productsSlice";
import Breadcrumbs from "../../shared/components/Breadcrumbs/Breadcrumbs";
import styles from "./SalePage.module.css";

const SalePage = () => {
  const dispatch = useDispatch();
  const {
    list: products,
    status,
    error,
  } = useSelector((state) => state.products);

  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    if (status === "idle") dispatch(fetchProducts());
  }, [status, dispatch]);

  const saleItems = products.filter((prod) => {
    const price = Number(prod.price);
    const sale = Number(prod.discont_price);
    return sale > 0 && sale < price;
  });

  let filtered = saleItems.slice();
  if (priceFrom !== "") {
    filtered = filtered.filter((p) => p.price >= Number(priceFrom));
  }
  if (priceTo !== "") {
    filtered = filtered.filter((p) => p.price <= Number(priceTo));
  }

  if (sortBy === "price-asc") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-desc") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortBy === "name-asc") {
    filtered.sort((a, b) =>
      (a.title || a.name).localeCompare(b.title || b.name)
    );
  }

  return (
    <main className={styles.page}>
      <Breadcrumbs />

      <SectionTitle title="Discounted items" />

      <div className={styles.filters}>
        <div className={styles.filterItem}>
          <label className={styles.label}>Price</label>
          <input
            type="number"
            placeholder="from"
            value={priceFrom}
            onChange={(e) => setPriceFrom(e.target.value)}
            className={styles.input}
          />
          <input
            type="number"
            placeholder="to"
            value={priceTo}
            onChange={(e) => setPriceTo(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.filterItem}>
          <label className={styles.label}>Sorted</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={styles.select}
          >
            <option value="default">by default</option>
            <option value="price-asc">price: low-high</option>
            <option value="price-desc">price: high-low</option>
            <option value="name-asc">newest</option>
          </select>
        </div>
      </div>

      {status === "loading" && <p>Loading discounted items…</p>}
      {status === "failed" && <p className={styles.error}>Error: {error}</p>}

      {status === "succeeded" && filtered.length > 0 ? (
        <div className={styles.grid}>
          {filtered.map((item) => (
            <ProductCard key={item.id} {...item} />
          ))}
        </div>
      ) : status === "succeeded" ? (
        <p className={styles.empty}>No discounted items available.</p>
      ) : null}
    </main>
  );
};

export default SalePage;
