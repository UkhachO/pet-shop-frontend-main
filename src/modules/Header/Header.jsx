import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./Header.module.css";
import Logo from "../../shared/components/icons/Logo";
import Basket from "../../shared/components/icons/Basket";

export default function Header() {
  // Кількість різних товарів у кошику
  const distinctCount = useSelector((state) => state.cart.items.length);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to="/">
          <Logo />
        </Link>
      </div>

      <nav className={styles.nav}>
        <Link to="/">Main Page</Link>
        <Link to="/categories">Categories</Link>
        <Link to="/products/all">All Products</Link>
        <Link to="/products/sale">All Sales</Link>
      </nav>

      <div className={styles.cart}>
        <Link to="/cart" className={styles.cartLink}>
          <Basket />
          {distinctCount > 0 && (
            <span className={styles.badge}>{distinctCount}</span>
          )}
        </Link>
      </div>
    </header>
  );
}
