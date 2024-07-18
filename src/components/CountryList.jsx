import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import CountryItem from "./CountryItem";
import { useCities } from "../contexts/CitiesContext";

function CountryList() {
  const { citiesList: countriesList, isLoading } = useCities();
  console.log("countriesList:", countriesList);
  if (isLoading) return <Spinner />;
  if (!countriesList)
    return <Message message="Add youd favorite city by clicking on the map" />;

  return (
    <ul className={styles.countryList}>
      {countriesList.map((country, index) => (
        <CountryItem key={index} country={country} />
      ))}
    </ul>
  );
}

export default CountryList;
