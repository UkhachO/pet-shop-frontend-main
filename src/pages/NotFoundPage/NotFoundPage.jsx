import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css";
import puppyImg from "../../assets/puppy.png";

const NotFoundPage = () => {
  return (
    <main className={styles.page}>
      <div className={styles.numbers}>
        <span className={styles.digit}>4</span>
        <img src={puppyImg} alt="Puppy" className={styles.image} />
        <span className={styles.digit}>4</span>
      </div>

      <h1 className={styles.title}>Page Not Found</h1>
      <p className={styles.message}>
        We’re sorry, the page you requested could not be found.
        <br />
        Please go back to the homepage.
      </p>

      <Link to="/" className={styles.button}>
        Go Home
      </Link>
    </main>
  );
};

export default NotFoundPage;
