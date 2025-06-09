import React from 'react';
import StarRating from './StarRating';

const Reviews = ({ reviews }) => {
  return (
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
      {reviews.map((review) => {
        return (
          <div className="col" key={review.id}>
            <div
              className="card text-white bg-primary h-100"
              style={{ maxWidth: '18rem' }}
            >
              <div className="card-header d-flex justify-content-between">
                <span>{review.name}</span>
                <span>
                  <StarRating rating={review.rating} />
                </span>
              </div>
              <div className="card-body">
                <p className="card-text">{review.reviews}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Reviews;
