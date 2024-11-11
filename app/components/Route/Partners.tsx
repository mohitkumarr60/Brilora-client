import Image from "next/image";
import React from "react";

type Props = {};

const Partners = (props: Props) => {
  return (
    <div className="w-full">
      <div className="h-[800px]">
        <h4 className="text-3xl pt-[150px] text-center font-bold font-Poppins">
          Our Trusted{" "}
          <span className="bg-gradient-to-r from-blue-700 to-teal-600 text-transparent bg-clip-text">
            Schools
          </span>
        </h4>
      </div>
    </div>
  );
};

export default Partners;
