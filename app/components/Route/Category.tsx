import React from "react";
import CategoriesCard from "../../components/Hero/card";

type Props = {};

const Category = (props: Props) => {
  return (
    <div className="w-full flex items-center h-auto py-20 md:h-[85vh] bg-white">
      <div className="w-full">
        <h1 className="text-4xl mb-[20px] text-center font-Poppins font-[700]">
          Browse Top{" "}
          <span className="bg-gradient-to-r from-violet-800 to-purple-600 text-transparent bg-clip-text">
            Categories
          </span>
        </h1>
        <CategoriesCard />
      </div>
    </div>
  );
};

export default Category;
