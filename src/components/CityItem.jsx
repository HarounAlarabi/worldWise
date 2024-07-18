import styles from "./CityItem.module.css";
import { Link } from "react-router-dom";
import { useCities } from "../contexts/CitiesContext";

const formatDate = (date) => {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));
};
function CityItem({ city, index }) {
  const { id, cityName, position, emoji, date } = city;
  const { currentCity, deleteCity } = useCities();

  const handleDeleteCity = (e) => {
    e.preventDefault();
    deleteCity(id);
    console.log("Delete city with id", id);
  };
  return (
    <li key={index}>
      <Link
        className={`${styles.cityItem}
        ${currentCity.id === id ? styles["cityItem--active"] : ""}`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <span className={styles.name}> {cityName}</span>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn} onClick={handleDeleteCity}>
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
