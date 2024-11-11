import React, { FC } from "react";
import toast from "react-hot-toast";
import { IoAddCircleOutline } from "react-icons/io5";

type Props = {
  benefits: { title: string }[];
  setBenefits: (benefits: { title: string }[]) => void;
  prerequisites: { title: string }[];
  setPrerequisites: (prerequisites: { title: string }[]) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseData: FC<Props> = ({
  benefits,
  setBenefits,
  prerequisites,
  setPrerequisites,
  active,
  setActive,
}) => {
  const handleBenefitChange = (index: number, value: any) => {
    const newBenefits = [...benefits];
    newBenefits[index].title = value;
    setBenefits(newBenefits);
  };

  const handleAddBenefit = () => {
    setBenefits([...benefits, { title: "" }]);
  };

  const handlePrerequisitesChange = (index: number, value: any) => {
    const newPrerequisites = [...prerequisites];
    newPrerequisites[index].title = value;
    setPrerequisites(newPrerequisites);
  };

  const handleAddPrerequisites = () => {
    setPrerequisites([...prerequisites, { title: "" }]);
  };

  const prevButton = () => {
    setActive(active - 1);
  };

  const handleOptions = () => {
    if (
      benefits[benefits.length - 1]?.title !== "" &&
      prerequisites[prerequisites.length - 1]?.title !== ""
    ) {
      setActive(active + 1);
    } else {
      toast.error("Please fill all the fields");
    }
  };

  return (
    <div className="w-[90%] md:w-[80%] md:m-auto my-20 md:my-24 p-3 md:pr-3">
      <div className="mb-5">
        <label htmlFor="benefits" className="sm:text-lg font-semibold">
          Please describe the benefits of this course
        </label>
        {benefits.map((benefit: any, index: number) => (
          <input
            key={index}
            type="text"
            name="benefits"
            placeholder="Gain practical skills, enhance your knowledge, and advance your career prospects."
            required
            className="w-full border-2 mt-1 border-gray-300 p-2 rounded-sm mb-3"
            value={benefit.title}
            onChange={(e) => handleBenefitChange(index, e.target.value)}
          />
        ))}
        <IoAddCircleOutline
          className="text-2xl cursor-pointer "
          onClick={handleAddBenefit}
        />
      </div>
      <div>
        <label htmlFor="prerequisites" className="sm:text-lg font-semibold">
          List any prerequisites required for this course...{" "}
        </label>
        {prerequisites.map((prerequisites: any, index: number) => (
          <input
            key={index}
            type="text"
            name="prerequisites"
            placeholder="Basic understanding of programming concepts and familiarity with Python language."
            required
            className="w-full border-2 mt-1 border-gray-300 p-2 rounded-sm mb-3"
            value={prerequisites.title}
            onChange={(e) => handlePrerequisitesChange(index, e.target.value)}
          />
        ))}
        <IoAddCircleOutline
          className="text-2xl cursor-pointer "
          onClick={handleAddPrerequisites}
        />
      </div>
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
          onClick={() => handleOptions()}
          className="bg-blue-600 text-white px-3 py-2 rounded-sm mx-1 hover:bg-blue-700"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CourseData;
