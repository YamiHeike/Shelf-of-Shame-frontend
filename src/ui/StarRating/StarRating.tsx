import { Rate } from "antd";

type StarRatingProps = {
  baseScore: number;
};

export const StarRating = ({ baseScore }: StarRatingProps) => {
  const starRating = Math.round((baseScore / 2) * 2) / 2;

  return (
    <div>
      <Rate
        disabled
        allowHalf
        count={5}
        value={starRating}
        style={{ color: "#ffd700" }}
        aria-label={`Difficulty rating: ${starRating} stars`}
      />
    </div>
  );
};
