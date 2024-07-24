import { createContext, useState, useEffect, useContext, useCallback } from "react";
import { useReducer } from "react";

const CitiesContext = createContext();

const BASE_URL = "http://localhost:9000";

const initialState = {
  citiesList: [],
  isLoading: false,
  currentCity: {},
};
function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };

    case "cities/loaded":
      return {
        ...state,
        citiesList: action.payload,
        isLoading: false,
      };
    case "city/loaded": {
      return {
        ...state,
        currentCity: action.payload,
        isLoading: false,
      };
    }
    case "city/created":
      return {
        ...state,
        isLoading: false,
        citiesList: [...state.citiesList, action.payload],
        currentCity: action.payload,
      };

    case "city/deleted":
      return {
        ...state,
        citiesList: state.citiesList.filter(
          (city) => city.id !== action.payload
        ),
        isLoading: false,
      };

    case "rejected":
      return { ...state, isLoading: false, error: action.payload };

    default:
      throw new Error(`Uknown action type`);
  }
}

function CitiesProvider({ children }) {
  const [{ citiesList, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );
  useEffect(() => {
    async function fetchCities() {
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch {
        dispatch({ type: "rejected", payload: "No data to load cities" });
      }
    }
    fetchCities();
  }, []);

 const getCity =useCallback(
   async function getCity(id) {
    if (Number(id) === currentCity.id) return;
    dispatch({ type: "loading" });
    {
      try {
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await res.json();
        dispatch({ type: "city/loaded", payload: data });
      } catch (error) {
        dispatch({ type: "rejected", payload: "No data to load the city" });
      }
    }
  },[currentCity.id]
)

  async function createCity(newCity) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      dispatch({ type: "city/created", payload: data });
    } catch (error) {
      dispatch({ type: "rejected", payload: "No data to load" });
    }
  }

  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "city/deleted", payload: id });
    } catch (error) {
      dispatch({ type: "rejected", payload: "No data to delete the city" });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        citiesList,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

const useCities = () => {
  const context = useContext(CitiesContext);
  if (context === undefined) {
    throw new Error("useCities must be used within a CitiesProvider");
  }
  return context;
};
export { CitiesProvider, useCities };
