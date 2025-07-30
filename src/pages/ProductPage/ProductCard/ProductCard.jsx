// src/shared/components/ProductCard/ProductCard.jsx

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../../../redux/cart-slice";
import styles from "./ProductCard.module.css";

function formatPrice(value) {
  return Number.isInteger(value) ? value.toString() : value.toFixed(2);
}

export default function ProductCard({
  id,
  title,
  price,
  image,
  discont_price,
}) {
  const dispatch = useDispatch();
  const BASE = import.meta.env.VITE_API_URL || "";
  const src = image.startsWith("http") ? image : `${BASE}${image}`;

  const hasDiscount =
    typeof discont_price === "number" && discont_price < price;
  const newPrice = hasDiscount ? discont_price : price;
  const percent = hasDiscount
    ? Math.round(((price - discont_price) / price) * 100)
    : 0;

  const [added, setAdded] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(
      addItem({
        id,
        title,
        price: newPrice,
        originalPrice: price,
        image,
        quantity: 1,
      })
    );
    setAdded(true);
    // Повернути кнопку назад через 2 секунди
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <Link to={`/products/${id}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={src} alt={title} className={styles.img} />
        {hasDiscount && <div className={styles.badge}>-{percent}%</div>}

        {!added ? (
          <button className={styles.addToCart} onClick={handleAdd}>
            Add to cart
          </button>
        ) : (
          <button
            className={styles.addedButton}
            onClick={(e) => e.preventDefault()}
          >
            Added
          </button>
        )}
      </div>

      <div className={styles.info}>
        <h4 className={styles.title}>{title}</h4>
        <div className={styles.prices}>
          <span className={styles.currentPrice}>${formatPrice(newPrice)}</span>
          {hasDiscount && (
            <span className={styles.originalPrice}>${formatPrice(price)}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
