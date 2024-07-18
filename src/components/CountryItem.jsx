import styles from "./CountryItem.module.css";

function CountryItem({ country }) {
  const { emoji, country: name } = country;
  return (
    <li className={styles.countryItem}>
      <span>{emoji}</span>
      <span>{name}</span>
    </li>
  );
}

export default CountryItem;
