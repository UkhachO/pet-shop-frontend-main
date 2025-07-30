import styles from "./SectionTitle.module.css";
import { Link } from "react-router-dom";

const Section = ({ title, children, linkText, linkTo }) => {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        {linkText && linkTo && (
          <Link to={linkTo} className={styles.link}>
            {linkText}
          </Link>
        )}
      </div>
      <div className={styles.content}>{children}</div>
    </section>
  );
};

export default Section;
