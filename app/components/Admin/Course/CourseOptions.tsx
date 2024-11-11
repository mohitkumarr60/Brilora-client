"use client";
import React, { FC } from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

type Props = {
  active: number;
  setActive: (active: number) => void;
};

const CourseOptions: FC<Props> = ({ active, setActive }) => {
  const options = [
    "Course Information",
    "Course Options",
    "Course Content",
    "Course Preview",
  ];
  return (
    <div className="h-screen bg-white border-l z-[50] border-slate-300 p-2 md:pl-5 ">
      {options.map((option: any, index: number) => (
        <div key={index} className={`w-full flex items-center py-[18px]`}>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              active + 1 > index
                ? "bg-blue-600 shadow-md shadow-slate-400"
                : "bg-slate-300 shadow-inner shadow-slate-400"
            } relative`}
          >
            <IoMdCheckmarkCircleOutline className="text-xl text-white" />
            {index !== options.length - 1 && (
              <div
                className={`absolute h-[30px] w-1 ${
                  active + 1 > index
                    ? "bg-blue-600"
                    : "bg-slate-300 shadow-inner shadow-slate-400"
                } bottom-[-100%]`}
              />
            )}
          </div>
          <h5 className={`pl-2 hidden md:block cursor-default`}>{option}</h5>
        </div>
      ))}
    </div>
  );
};

export default CourseOptions;
