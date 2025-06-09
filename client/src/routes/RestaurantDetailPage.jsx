import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { RestaurantsContext } from '../context/RestaurantsContext';
import RestaurantFinder from '../apis/RestaurantFinder';
import Reviews from '../Components/Reviews';
import AddReview from '../Components/AddReview';
import StarRating from '../Components/StarRating';

const RestaurantDetailPage = () => {
  const { id } = useParams();
  const { selectedRestaurant, setSelectedRestaurant } = useContext(RestaurantsContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get(`/${id}`);
        setSelectedRestaurant(response.data.data);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchData();
  }, [id]);

  const handleAddReview = (newReview) => {
    setSelectedRestaurant((prev) => ({
      ...prev,
      reviews: [...(prev.reviews || []), newReview],
    }));
  };

  return (
    <div>
      {selectedRestaurant && (
        <>
          <h1 className=' display-1'>{selectedRestaurant.restaurant.name}</h1>
          <div >
            <StarRating rating={selectedRestaurant.restaurant.average_rating} />
            <span className="text-warning ml-1">
              {selectedRestaurant.restaurant.count ? `(${selectedRestaurant.restaurant.count})`: "(0)"}
            </span>
          </div>
          <div className="mt-4">
            <Reviews reviews={selectedRestaurant.reviews} />
            
          </div>
          <AddReview onAddReview={handleAddReview} />
        </>
      )}
    </div>
  );
};

export default RestaurantDetailPage;
