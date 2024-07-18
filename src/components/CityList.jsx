import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import CityItem from "./CityItem";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";
function CityList() {
  const { citiesList, isLoading } = useCities();
  console.log(citiesList);
  if (isLoading) return <Spinner />;
  if (!citiesList.length)
    return <Message message="Add youd favorite city by clicking on the map" />;
  return (
    <ul className={styles.cityList}>
      {citiesList.map((city, index) => (
        <CityItem key={index} city={city} />
      ))}
    </ul>
  );
}

export default CityList;
