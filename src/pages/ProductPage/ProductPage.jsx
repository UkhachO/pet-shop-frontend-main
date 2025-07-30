// src/pages/ProductPage/ProductPage.jsx

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../../redux/productsSlice";
import { addItem } from "../../redux/cart-slice";
import Button from "../../shared/components/Button/Button";
import Breadcrumbs from "../../shared/components/Breadcrumbs/Breadcrumbs";
import styles from "./ProductPage.module.css";

export default function ProductPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    current: product,
    status,
    error,
  } = useSelector((state) => state.products);

  const [quantity, setQuantity] = useState(1);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [mainImage, setMainImage] = useState(null);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (product) {
      const imgs = product.images?.length
        ? product.images
        : [`${import.meta.env.VITE_API_URL}${product.image}`];
      setMainImage(imgs[0]);
    }
  }, [product]);

  if (status === "loading" || !product) return <p>Loading…</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  const price = Number(product.price);
  const salePrice = Number(product.discont_price ?? product.salePrice ?? price);
  const hasDiscount = salePrice < price;
  const discountPercent = hasDiscount
    ? Math.round(((price - salePrice) / price) * 100)
    : 0;

  const description = product.description || "";
  const shortDesc = description.slice(0, 300);

  const thumbs = product.images?.length
    ? product.images
    : [`${import.meta.env.VITE_API_URL}${product.image}`];

  const handleAdd = () => {
    dispatch(
      addItem({
        id: product.id,
        name: product.title || product.name,
        price: salePrice,
        originalPrice: price,
        image: product.image,
        quantity,
      })
    );
    setAdded(true);
    // скинути назад через 5 секунд
    setTimeout(() => setAdded(false), 5000);
  };

  return (
    <main className={styles.page}>
      <Breadcrumbs />

      <div className={styles.container}>
        <div className={styles.gallery}>
          <div className={styles.thumbs}>
            {thumbs.map((src, idx) => (
              <button
                key={idx}
                className={`${styles.thumbBtn} ${
                  mainImage === src ? styles.active : ""
                }`}
                onClick={() => setMainImage(src)}
              >
                <img src={src} alt={`${product.name} ${idx}`} />
              </button>
            ))}
          </div>
          <div className={styles.mainImageWrap}>
            <img
              src={mainImage}
              alt={product.name}
              className={styles.mainImage}
            />
          </div>
        </div>

        <div className={styles.details}>
          <h1 className={styles.title}>{product.title || product.name}</h1>

          <div className={styles.priceBlock}>
            <span className={styles.currentPrice}>${salePrice.toFixed(2)}</span>
            {hasDiscount && (
              <>
                <span className={styles.oldPrice}>${price.toFixed(2)}</span>
                <span className={styles.discountBadge}>
                  -{discountPercent}%
                </span>
              </>
            )}
          </div>

          <div className={styles.controls}>
            <button
              className={styles.qtyBtn}
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            >
              −
            </button>
            <span className={styles.qty}>{quantity}</span>
            <button
              className={styles.qtyBtn}
              onClick={() => setQuantity((q) => q + 1)}
            >
              +
            </button>

            {added ? (
              <button className={styles.addedButton}>Added</button>
            ) : (
              <Button
                variant="primary"
                className={styles.addButton}
                onClick={handleAdd}
              >
                Add to cart
              </Button>
            )}
          </div>

          <div className={styles.description}>
            <h2>Description</h2>
            <p>
              {showFullDesc
                ? description
                : `${shortDesc}${description.length > 300 ? "…" : ""}`}
            </p>
            {description.length > 300 && (
              <button
                className={styles.readMore}
                onClick={() => setShowFullDesc((v) => !v)}
              >
                {showFullDesc ? "Show less" : "Read more"}
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}