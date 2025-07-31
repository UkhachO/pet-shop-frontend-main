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

const Breadcrumbs = () => {
  const { pathname } = useLocation();
  let parts = pathname.split("/").filter(Boolean);

  if (parts[0] === "products" && parts[1] === "all") {
    parts = ["products"];
  }

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

  const products = useSelector((s) => s.products.list);
  const current = useSelector((s) => s.products.current);

  const crumbs = [{ name: "Main page", to: "/" }];

  parts.forEach((part, idx) => {
    const prev = parts[idx - 1];
    let label;

    if (prev === "categories") {
      label = catsLoading
        ? "Loading..."
        : categoryMap[part] || capitalizeSegment(part);
    } else if (prev === "products" && /^\d+$/.test(part)) {
      const fromList = products.find((p) => String(p.id) === part);
      if (fromList) {
        label = fromList.title || fromList.name;
      } else if (current && String(current.id) === part) {
        label = current.title || current.name;
      } else {
        label = part;
      }
    } else {
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
};

export default Breadcrumbs;
