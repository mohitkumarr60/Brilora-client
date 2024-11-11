import React from "react";

type Props = {};

const LoadingButton = (props: Props) => {
  return (
    <div>
      <button
        className="inline-block rounded-sm bg-blue-500 hover:bg-blue-600 px-3 py-2 font- transition duration-150 ease-in-out text-white focus:outline-none"
        type="button"
      >
        <div
          role="status"
          className="inline-block h-[14px] w-[14px] mr-2 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
        Loading
      </button>
    </div>
  );
};

export default LoadingButton;
