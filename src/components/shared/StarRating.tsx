"use client";
import { useState } from "react";

type StarRatingProps = {
  rating?: number;
  onChange?: (rating: number) => void;
};

const StarRating = ({ rating = 0, onChange }: StarRatingProps) => {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex items-center">
      {[...Array(10)].map((_, index) => {
        const value = index + 1;

        return (
          <button
            key={value}
            className={`text-2xl transition-colors ${
              value <= (hover || rating) ? "text-gold" : "text-hover"
            }`}
            onMouseEnter={() => setHover(value)}
            onMouseLeave={() => setHover(0)}
            onClick={() => onChange?.(value)}
          >
            ★
          </button>
        );
      })}
      <div className="ml-3 text-base font-semibold text-muted">
        {rating > 0 ? `${rating}/10` : "0/10"}
      </div>
    </div>
  );
};

export default StarRating;
