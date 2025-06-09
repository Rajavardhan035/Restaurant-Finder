import React, { useState } from 'react';
import RestaurantFinder from '../apis/RestaurantFinder';
import { useParams } from 'react-router-dom';

const AddReview = ({ onAddReview }) => {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState("Rating");

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      const response = await RestaurantFinder.post(`/${id}/addReview`, {
        name,
        reviews: reviewText,
        rating,
      });
  
      console.log("Review response:", response.data);
  
      // Check if response contains a review object
      const newReview = response.data?.data?.review || {
        name,
        reviews: reviewText,
        rating,
      };
  
      if (onAddReview) {
        onAddReview(newReview);
      }
  
      // Clear form
      setName("");
      setReviewText("");
      setRating("Rating");
    } catch (err) {
      console.error("Failed to submit review:", err);
    }
  };

  return (
    <div className='mb-4'>
      <form onSubmit={handleSubmitReview}>
        <div className="row mb-3">
          <div className="col-md-9">
            <label htmlFor="name">Name</label>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              type="text"
              placeholder="name"
              className="form-control"
              id="name"
              style={{ height: '45px', fontSize: '1.1rem' }}
            />
          </div>

          <div className="col-md-3">
            <label htmlFor="rating">Rating</label>
            <select
              value={rating}
              onChange={e => setRating(e.target.value)}
              id="rating"
              className="form-control"
              style={{ height: '45px', fontSize: '1.1rem' }}
            >
              <option disabled value="Rating">Choose Rating</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        </div>

        <div className="form-group mb-3">
          <label htmlFor="Review">Review</label>
          <textarea
            value={reviewText}
            onChange={e => setReviewText(e.target.value)}
            id="Review"
            className="form-control"
            rows="4"
          ></textarea>
        </div>

        <button type='submit' className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default AddReview;
