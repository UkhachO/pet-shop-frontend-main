import styles from "./CategoryFilters.module.css";

const CategoryFilters = ({
  priceFrom,
  priceTo,
  onlyDiscounted,
  sortBy,
  onPriceFromChange,
  onPriceToChange,
  onOnlyDiscountedChange,
  onSortByChange,
}) => {
  return (
    <div className={styles.filters}>
      <div className={styles.filterItem}>
        <label className={styles.label}>Price:</label>
        <input
          type="number"
          placeholder="from"
          value={priceFrom}
          onChange={(e) => onPriceFromChange(e.target.value)}
          className={styles.input}
        />
        <input
          type="number"
          placeholder="to"
          value={priceTo}
          onChange={(e) => onPriceToChange(e.target.value)}
          className={styles.input}
        />
      </div>
      <div className={styles.filterItem}>
        <label className={styles.label}>Discounted items</label>
        <label>
          <input
            type="checkbox"
            checked={onlyDiscounted}
            onChange={(e) => onOnlyDiscountedChange(e.target.checked)}
          />{" "}
        </label>
      </div>
      <div className={styles.filterItem}>
        <label className={styles.label}>Sorted:</label>
        <select
          value={sortBy}
          onChange={(e) => onSortByChange(e.target.value)}
          className={styles.select}
        >
          <option value="default">by default</option>
          <option value="price-asc">price: low-high</option>
          <option value="price-desc">price: high-low</option>
          <option value="name-asc">newest</option>
        </select>
      </div>
    </div>
  );
};

export default CategoryFilters;
