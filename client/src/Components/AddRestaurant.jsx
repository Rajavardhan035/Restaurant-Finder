import React, { useState, useContext } from "react";
import { RestaurantsContext } from "../context/RestaurantsContext";
import RestaurantFinder from "../apis/RestaurantFinder";

const AddRestaurant = () => {
  const { addRestaurants } = useContext(RestaurantsContext);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("Price Range");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await RestaurantFinder.post("/", {
        name,
        location,
        price_range: parseInt(priceRange),
      });
      addRestaurants(response.data.data.restaurant);
      console.log(response);
    } catch (err) {
    }
  };

  return (
    <div className="mb-4">
      <form action="" onSubmit={handleSubmit} style={{ display: "flex", gap: "15px", marginBottom: "20px" }}>
        <div>
          <input
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              background: "linear-gradient(90deg, #e0eafc, #cfdef3)",
            }}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Enter location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            style={{
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              background: "linear-gradient(90deg, #e0eafc, #cfdef3)",
            }}
          />
        </div>
        <div>
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            required
            style={{
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              background: "linear-gradient(90deg, #e0eafc, #cfdef3)",
            }}
          >
            <option value="">Price Range</option>
            <option value="1">₹</option>
            <option value="2">₹₹</option>
            <option value="3">₹₹₹</option>
            <option value="4">₹₹₹₹</option>
            <option value="5">₹₹₹₹₹</option>
          </select>
        </div>
        <div style={{ marginLeft: "15px" }}>
          <button
            onClick={handleSubmit}
            type="submit"
            className="btn-btn-primary"
            style={{ padding: "2px 20px", fontSize: "14px" }}
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRestaurant;