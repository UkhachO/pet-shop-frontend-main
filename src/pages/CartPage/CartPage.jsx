import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, clearCart, addItem } from "../../redux/cart-slice";
import SectionTitle from "../../shared/components/SectionTitle/SectionTitle";
import Button from "../../shared/components/Button/Button";
import styles from "./CartPage.module.css";

const CartPage = () => {
  const dispatch = useDispatch();
  const items = useSelector((s) => s.cart.items);

  const totalItems = items.length;

  const totalSum = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [modalOpen, setModalOpen] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearCart());
    setModalOpen(true);
  };

  return (
    <main className={styles.page}>
      <div className={styles.header}>
        <SectionTitle title="Shopping cart" />
        <Link to="/products/all" className={styles.backLink}>
          Back to the store
        </Link>
      </div>

      {modalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <button
              className={styles.modalClose}
              onClick={() => setModalOpen(false)}
            >
              ×
            </button>
            <h2>Congratulations!</h2>
            <p>
              Your order has been successfully placed on the website.
              <br />A manager will contact you shortly to confirm your order.
            </p>
          </div>
        </div>
      )}

      {items.length === 0 ? (
        <div className={styles.emptyState}>
          <p className={styles.empty}>
            Looks like you have no items in your basket currently.
          </p>
          <Link to="/products/all" className={styles.continueBtn}>
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className={styles.content}>
          <div className={styles.items}>
            {items.map((item) => {
              const hasDiscount =
                typeof item.originalPrice === "number" &&
                item.originalPrice > item.price;

              return (
                <div key={item.id} className={styles.itemCard}>
                  <img
                    src={`${import.meta.env.VITE_API_URL}${item.image}`}
                    alt={item.name}
                    className={styles.itemImage}
                  />

                  <div className={styles.itemInfo}>
                    <h3 className={styles.itemTitle}>{item.name}</h3>
                    <div className={styles.itemControls}>
                      <button
                        className={styles.qtyBtn}
                        onClick={() =>
                          dispatch(removeItem({ id: item.id, decrement: true }))
                        }
                      >
                        −
                      </button>
                      <span className={styles.qty}>{item.quantity}</span>
                      <button
                        className={styles.qtyBtn}
                        onClick={() =>
                          dispatch(addItem({ ...item, quantity: 1 }))
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className={styles.priceBlock}>
                    <span className={styles.currentPrice}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                    {hasDiscount && (
                      <span className={styles.oldPrice}>
                        ${(item.originalPrice * item.quantity).toFixed(2)}
                      </span>
                    )}
                  </div>

                  <button
                    className={styles.removeBtn}
                    onClick={() =>
                      dispatch(removeItem({ id: item.id, decrement: false }))
                    }
                  >
                    ×
                  </button>
                </div>
              );
            })}
          </div>

          <aside className={styles.orderDetails}>
            <h2>Order details</h2>
            <p className={styles.detailLine}>
              <span>
                {totalItems} item{totalItems !== 1 ? "s" : ""}
              </span>
            </p>
            <p className={styles.detailLine}>
              <span>Total</span>
              <span className={styles.totalSum}>${totalSum.toFixed(2)}</span>
            </p>

            <form className={styles.form} onSubmit={handleSubmit}>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Name"
                required
              />
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone number"
                required
              />
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                required
              />
              <Button type="submit" className={styles.orderBtn}>
                The Order is Placed
              </Button>
            </form>
          </aside>
        </div>
      )}
    </main>
  );
};

export default CartPage;
