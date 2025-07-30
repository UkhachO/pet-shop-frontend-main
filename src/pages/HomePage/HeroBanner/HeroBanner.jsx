import Button from "../../../shared/components/Button/Button";
import styles from "./HeroBanner.module.css";

const HeroBanner = () => (
  <div className={styles.banner}>
    <div className={styles.content}>
      <h1>Amazing Discounts on Pets Products</h1>
      <p>Everything your pet needs in one place.</p>
      <Button variant="primary" to="/products/sale">
        See Sale
      </Button>
    </div>
  </div>
);

export default HeroBanner;
