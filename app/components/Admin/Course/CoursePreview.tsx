import React, { FC } from "react";
import CoursePlayer from "../../../utils/CoursePlayer";
import Ratings from "../../../utils/Ratings";
import { GiCheckMark } from "react-icons/gi";

type Props = {
  active: number;
  setActive: (active: number) => void;
  courseData: any;
  handleCourseCreate: any;
  isEdit: boolean;
};

const CoursePreview: FC<Props> = ({
  courseData,
  handleCourseCreate,
  setActive,
  active,
  isEdit,
}) => {
  const discountPercentagePrice =
    Math.round(
      ((courseData?.estimatedPrice - courseData?.price) /
        courseData?.estimatedPrice) *
        100
    ) || 0;

  const prevButton = () => {
    setActive(active - 1);
  };

  const createCourse = () => {
    handleCourseCreate();
  };

  return (
    <div className="w-[100%] md:w-[90%] pr-5 md:m-auto my-20 md:my-24 ">
      <div className="w-full">
        <CoursePlayer
          videoUrl={courseData?.demoUrl}
          title={courseData?.title}
        />
      </div>
      <div className="flex py-4 items-center">
        <h1 className="font-bold text-3xl">
          {courseData?.price === 0 ? "Free" : "₹" + courseData?.price}
        </h1>
        {courseData?.estimatedPrice && (
          <>
            <h5 className="text-lg pl-3 text-slate-600 line-through">
              {"\u20B9" + " " + courseData.estimatedPrice}
            </h5>
            <h4 className="text-lg pl-2">{discountPercentagePrice}% Off</h4>
          </>
        )}
      </div>
      <div className="flex items-center">
        <div className="bg-rose-500 cursor-pointer font-Poppins px-4 py-3 text-white font-medium rounded-full hover:bg-rose-600 hover:shadow-md">
          Buy this course
        </div>
      </div>
      <ul className="my-4 ml-4 list-disc">
        <li className="pb-1">Lifetime Access</li>
        <li className="pb-1">Certificate of completion</li>
        <li className="pb-1">Premium Support</li>
      </ul>
      <div className="w-[90%]">
        <h1 className="text-[30px] font-Poppins font-semibold">
          {courseData?.name}
        </h1>
        <div className="sm:flex ml-3 items-center sm:justify-between pt-3">
          <div className="flex items-center">
            <Ratings rating={0} />
            <h5>0 Reviews</h5>
          </div>
          <h5>0 Students</h5>
        </div>
        <br />
        <h1 className="text-2xl mb-3 font-Poppins font-semibold pt-3">
          What you will learn from this course?
        </h1>
      </div>
      {courseData?.benefits?.map((item: any, index: number) => (
        <div className="w-full flex items-center py-1" key={index}>
          <div className="w-[15px] mr-1">
            <GiCheckMark size={18} />
          </div>
          <p className="pl-2">{item.title}</p>
        </div>
      ))}
      <br />
      {/* prerequisites */}
      <h1 className="text-2xl mb-3 font-Poppins font-semibold pt-3">
        Requirements
      </h1>
      {courseData?.prerequisites?.map((item: any, index: number) => (
        <div className="w-full flex items-center py-1" key={index}>
          <div className="w-[15px] mr-1">
            <GiCheckMark size={18} />
          </div>
          <p className="pl-2">{item.title}</p>
        </div>
      ))}
      <br />

      {/* course description */}
      <div className="w-full">
        <h1 className="text-2xl font-Poppins mb-3 font-semibold">
          Course Details
        </h1>
        <p className="leading-relaxed">{courseData?.description}</p>
      </div>
      <br />
      <div className="w-full flex justify-end">
        <button
          type="button"
          onClick={() => prevButton()}
          className="bg-blue-600 text-white px-3 py-2 rounded-sm mx-1 hover:bg-blue-700"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={() => createCourse()}
          className="bg-blue-600 text-white px-3 py-2 rounded-sm mx-1 hover:bg-blue-700"
        >
          {isEdit ? "Update Course" : "Create Course"}
        </button>
      </div>
    </div>
  );
};

export default CoursePreview;
