import React from "react";

type RatingStarsProps = { id: number; rate: number; maxStars?: number };

function RatingStars({ id, rate, maxStars = 5 }: RatingStarsProps) {
  const fullStars = Math.floor(rate);
  const hasHalfStar = rate - fullStars >= 0.5;

  return (
    <React.Fragment>
      {Array.from({ length: fullStars }).map((_, i) => (
        <span
          key={`${id}-fullStar-${i}`}
          style={{ fontVariationSettings: "'FILL' 1" }}
          className="material-symbols-outlined text-yellow-500 text-base"
        >
          star
        </span>
      ))}

      {hasHalfStar && (
        <span
          key={`halfStar-${id}`}
          style={{ fontVariationSettings: "'FILL' 1" }}
          className="material-symbols-outlined text-yellow-500 text-base"
        >
          star_half
        </span>
      )}

      {Array.from({ length: maxStars - fullStars - (hasHalfStar ? 1 : 0) }).map(
        (_, i) => (
          <span
            key={`noStar-${id}-${i}`}
            style={{ fontVariationSettings: "'FILL' 1" }}
            className="material-symbols-outlined text-gray-300 dark:text-gray-600 text-base"
          >
            star
          </span>
        )
      )}
    </React.Fragment>
  );
}

export default RatingStars;
