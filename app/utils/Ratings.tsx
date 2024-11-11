import React, { FC } from "react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";

type Props = {
  rating: number;
};

const Ratings: FC<Props> = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(
        <BsStarFill
          key={i}
          size={15}
          className="text-yellow-500 mr-2 cursor-pointer"
        />
      );
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      stars.push(
        <BsStarHalf
          key={i}
          size={15}
          className="text-yellow-500 mr-2 cursor-pointer"
        />
      );
    } else {
      stars.push(
        <BsStar
          key={i}
          size={15}
          className="text-yellow-500 mr-2 cursor-pointer"
        />
      );
    }
  }
  return <div className="flex">{stars}</div>;
};

export default Ratings;
