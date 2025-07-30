import styles from "./CategoryCard.module.css";

export default function CategoryCard({ title, image }) {
  const BASE = import.meta.env.VITE_API_URL;
  const src = `${BASE}${image}`;
  return (
    <div className={styles.card}>
      <img src={src} alt={title} className={styles.img} />
      <h4 className={styles.title}>{title}</h4>
    </div>
  );
}
