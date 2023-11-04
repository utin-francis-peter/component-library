import React, { useState } from "react";

const StarRating = () => {
  // on clicking any star, set a stateful Rating value to be the rating value of clicked star
  const [selectedRating, setSelectedRating] = useState(null);
  const [hoveredRating, setHoveredRating] = useState(null);
  //   apply yellow color to stars whose value falls within the selectedRating value

  return (
    <div>
      {[...Array(5)].map((value, i) => {
        const rating = i + 1;

        return (
          <label>
            <button
              onClick={() => setSelectedRating(rating)}
              onMouseEnter={() => setHoveredRating(rating)}
              onMouseLeave={() => setHoveredRating(null)}>
              <i
                className={`fa-solid fa-star text-2xl ${
                  rating <= (hoveredRating || selectedRating)
                    ? "text-yellow-300 transition-all ease-in-out delay-200 duration-200"
                    : "text-gray-300"
                }`}></i>
            </button>
            <input
              type="radio"
              name="rating"
              value={rating}
              className="hidden"
            />
          </label>
        );
      })}
    </div>
  );
};

export default StarRating;
