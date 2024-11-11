"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

let interval: any;

type Card = {
  id: number;
  name: string;
  title: string;
  description: string;
};

export const CardStack = ({
  items,
  offset,
  scaleFactor,
}: {
  items: Card[];
  offset?: number;
  scaleFactor?: number;
}) => {
  const CARD_OFFSET = offset || 10;
  const SCALE_FACTOR = scaleFactor || 0.06;
  const [cards, setCards] = useState<Card[]>(items);

  useEffect(() => {
    startFlipping();

    return () => clearInterval(interval);
  }, []);
  const startFlipping = () => {
    interval = setInterval(() => {
      setCards((prevCards: Card[]) => {
        const newArray = [...prevCards]; // create a copy of the array
        newArray.unshift(newArray.pop()!); // move the last element to the front
        return newArray;
      });
    }, 5000);
  };

  return (
    <div className="relative h-[500px] flex justify-center items-center">
      {cards.map((card, index) => {
        return (
          <motion.div
            key={card?.id}
            className="absolute bg-white h-[400px] sm:h-[350px] w-auto max-w-[650px] rounded-[30px] py-20 px-8 shadow-xl border border-neutral-200 shadow-black/[0.1] flex flex-col justify-center"
            style={{
              transformOrigin: "top center",
            }}
            animate={{
              top: index * -CARD_OFFSET,
              scale: 1 - index * SCALE_FACTOR, // decrease scale for cards that are behind
              zIndex: cards.length - index, //  decrease z-index for the cards that are behind
            }}
          >
            <div className="mb-5">
              <h5 className="font-bold font-Poppins text-center text-black text-2xl sm:text-3xl">
                {card?.name}
              </h5>
            </div>
            <div className="mb-8">
              <p className="text-neutral-800 text-center text-xl sm:text-2xl font-medium">
                {card?.title}
              </p>
            </div>
            <div className="">
              <p className="text-base sm:text-lg text-center text-neutral-700 font-normal">
                {card?.description}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
