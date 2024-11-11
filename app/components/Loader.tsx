import React from "react";
import Image from "next/image";

type Props = {};

const Loader = (props: Props) => {
  return (
    <>
      <div className="flex">
        <div className="relative">
          <div className="h-24 w-24 rounded-full border-t-4 border-b-4 border-gray-200"></div>
          <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-4 border-b-4 border-blue-500 animate-spin"></div>
          <div className="absolute top-[35%] left-[37%] rounded-full animate-ping">
            <Image
              src={"/favicon.ico"}
              width={25}
              height={25}
              alt="Code Connect"
              className=""
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Loader;
