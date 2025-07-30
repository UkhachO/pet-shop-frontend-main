// src/shared/components/Breadcrumbs/Breadcrumbs.jsx

import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCategories } from "../../../api/api";
import styles from "./Breadcrumbs.module.css";

const nameMap = {
  products: "All Products",
  categories: "Categories",
  sale: "All Sales",
  cart: "Cart",
};

function capitalizeSegment(seg) {
  return seg
    .split("-")
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");
}

export default function Breadcrumbs() {
  const { pathname } = useLocation();
  let parts = pathname.split("/").filter(Boolean);

  // якщо /products/all – відображаємо лише «products»
  if (parts[0] === "products" && parts[1] === "all") {
    parts = ["products"];
  }

  // підтягуємо категорії
  const [categoryMap, setCategoryMap] = useState({});
  const [catsLoading, setCatsLoading] = useState(true);
  useEffect(() => {
    getCategories()
      .then((cats) => {
        const m = {};
        cats.forEach((c) => {
          m[String(c.id)] = c.title || c.name;
          if (c.slug) m[c.slug] = c.title || c.name;
        });
        setCategoryMap(m);
      })
      .finally(() => setCatsLoading(false));
  }, []);

  // беремо весь список продуктів (якщо він вже є)
  const products = useSelector((s) => s.products.list);
  // і поточний завантажений продукт
  const current = useSelector((s) => s.products.current);

  const crumbs = [{ name: "Main page", to: "/" }];

  parts.forEach((part, idx) => {
    const prev = parts[idx - 1];
    let label;

    if (prev === "categories") {
      // крихта категорії
      label = catsLoading
        ? "Loading..."
        : categoryMap[part] || capitalizeSegment(part);
    } else if (prev === "products" && part !== "all") {
      // крихта продукту
      // спочатку шукаємо в products.list
      const fromList = products.find((p) => String(p.id) === part);
      if (fromList) {
        label = fromList.title || fromList.name;
      } else if (current && String(current.id) === part) {
        // інакше беремо з current
        label = current.title || current.name;
      } else {
        label = part; // fallback
      }
    } else {
      // інші сегменти
      label = nameMap[part] || capitalizeSegment(part);
    }

    const to =
      part === "products"
        ? "/products/all"
        : "/" + parts.slice(0, idx + 1).join("/");

    crumbs.push({ name: label, to });
  });

  return (
    <nav className={styles.breadcrumbs}>
      {crumbs.map((crumb, i) => {
        const isLast = i === crumbs.length - 1;
        return (
          <React.Fragment key={crumb.to}>
            <Link
              to={crumb.to}
              className={`${styles.crumb} ${isLast ? styles.current : ""}`}
            >
              {crumb.name}
            </Link>
            {!isLast && <span className={styles.sep} />}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
