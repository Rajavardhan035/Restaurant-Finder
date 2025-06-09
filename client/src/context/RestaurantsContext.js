// RestaurantsContext.js
import React, { useState, createContext } from "react";

export const RestaurantsContext = createContext();

export const RestaurantsContextProvider = (props) => {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null); // (null) not [null]

  const addRestaurants = (restaurant) => {
    setRestaurants(prevRestaurants => [...prevRestaurants, restaurant]);
  };

  return (
    <RestaurantsContext.Provider
      value={{
        restaurants,
        setRestaurants,
        selectedRestaurant,
        setSelectedRestaurant,
        addRestaurants, // <<< You forgot this
      }}
    >
      {props.children}
    </RestaurantsContext.Provider>
  );
};
