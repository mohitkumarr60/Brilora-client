import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import React, { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";

type Props = {
  courseInfo: any;
  setCourseInfo: (courseInfo: any) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseInformation: FC<Props> = ({
  courseInfo,
  setCourseInfo,
  active,
  setActive,
}) => {
  const [dragging, setDragging] = useState(false);
  const { data } = useGetHeroDataQuery("Categories", {});
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (data) {
      setCategories(data.layout.categories);
    }
  }, [data]);

  const validateForm = () => {
    const newErrors = [];
    if (!courseInfo.name.trim()) {
      newErrors.push("name");
      toast.error("Please enter a valid course name");
    }
    if (!courseInfo.description.trim()) {
      newErrors.push("description");
      toast.error("Please enter a valid course description");
    }
    if (!courseInfo.price) {
      newErrors.push("price");
      toast.error("Please enter a valid course price");
    }
    if (!courseInfo.tags.trim()) {
      newErrors.push("tags");
      toast.error("Please enter valid course tags");
    }
    if (!courseInfo.level.trim()) {
      newErrors.push("level");
      toast.error("Please enter valid course level");
    }
    if (!courseInfo.demoUrl.trim()) {
      newErrors.push("demoUrl");
      toast.error("Please enter a valid demo video url");
    }

    if (!courseInfo.thumbnail) {
      newErrors.push("thumbnail");
      toast.error("Please insert a course thumbnail");
    }
    if (courseInfo.estimatedPrice && courseInfo.price) {
      if (Number(courseInfo.estimatedPrice) < Number(courseInfo.price)) {
        newErrors.push("Estimated Price");
        toast.error("Estimated Price cannot be lower than the Course Price.");
      }
    }
    return newErrors.length === 0;
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (validateForm()) {
      setActive(active + 1);
    }
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setCourseInfo({ ...courseInfo, thumbnail: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setCourseInfo({ ...courseInfo, thumbnail: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
    setDragging(false);
  };

  return (
    <div className="w-[90%] md:w-[80%] md:m-auto my-20 md:my-24 p-3 md:pr-3">
      <form>
        <div className="mb-5">
          <label htmlFor="name" className="sm:text-[17px] font-semibold">
            Course Name:
          </label>
          <input
            type="name"
            name=""
            required
            value={courseInfo.name}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, name: e.target.value })
            }
            id="name"
            placeholder=""
            className="w-full mt-1 border border-slate-300 p-2 rounded-sm"
          />
        </div>
        <div className="mb-5">
          <label htmlFor="description" className="sm:text-[17px] font-semibold">
            Course Description:
          </label>
          <textarea
            name=""
            cols={30}
            rows={8}
            required
            value={courseInfo.description}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, description: e.target.value })
            }
            id="description"
            placeholder=""
            className="w-full border border-slate-300 p-2 mt-1 rounded-sm !h-min !py-2"
          />
        </div>
        <div className="w-full mb-5 flex items-center justify-between">
          <div className="w-[45%]">
            <label htmlFor="price" className="sm:text-[17px] font-semibold">
              Course Price (in INR)
            </label>
            <input
              type="number"
              name=""
              required
              value={courseInfo.price}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, price: e.target.value })
              }
              id="price"
              placeholder=""
              className="w-full border border-slate-300 mt-1 p-2 rounded-sm"
            />
          </div>
          <div className="w-[45%]">
            <label
              htmlFor="estimatedPrice"
              className="sm:text-[17px] font-semibold"
            >
              Estimated Price (optional)
            </label>
            <input
              type="number"
              name=""
              value={courseInfo.estimatedPrice}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, estimatedPrice: e.target.value })
              }
              id="estimatedPrice"
              placeholder=""
              className="w-full border border-slate-300 p-2 mt-1 rounded-sm"
            />
          </div>
        </div>
        <div className="w-full mb-5">
          <label htmlFor="tags" className="sm:text-[17px] font-semibold">
            Course Tags
          </label>
          <input
            type="text"
            name=""
            required
            value={courseInfo.tags}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, tags: e.target.value })
            }
            id="tags"
            placeholder=""
            className="w-full border border-slate-300 mt-1 p-2 rounded-sm"
          />
        </div>
        <div className="w-full mb-5">
          <label htmlFor="demoUrl" className="font-semibold sm:text-[17px]">
            Demo Url
          </label>
          <input
            type="text"
            name=""
            required
            value={courseInfo.demoUrl}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, demoUrl: e.target.value })
            }
            id="demoUrl"
            placeholder=""
            className="w-full border border-slate-300 p-2 mt-1 rounded-sm"
          />
        </div>
        <div className="w-full mb-5 flex items-center justify-between">
          <div className="w-[45%]">
            <label htmlFor="level" className="font-semibold sm:text-[17px]">
              Course Level
            </label>
            <input
              type="text"
              name=""
              required
              value={courseInfo.level}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, level: e.target.value })
              }
              id="level"
              placeholder="Beginner/Intermediate/Expert"
              className="w-full border border-slate-300 p-2 mt-1 rounded-sm"
            />
          </div>
          <div className="w-[45%]">
            <label htmlFor="category" className="font-semibold sm:text-[17px]">
              Course Category
            </label>
            <select
              name=""
              id="category"
              className="w-full border border-slate-300 p-2 mt-1 rounded-sm"
              value={courseInfo.categories}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, categories: e.target.value })
              }
            >
              <option value="">Select Category</option>
              {categories.map((item: any) => (
                <option value={item.title} key={item._id}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="w-full pt-5 mb-5">
          <input
            type="file"
            accept="image/*"
            id="file"
            required
            className="hidden"
            onChange={handleFileChange}
          />
          <label
            htmlFor="file"
            className={`w-full min-h-52 border-dashed border border-slate-300 p-2 flex item-center justify-center rounded-sm hover:bg-slate-200 cursor-pointer ${
              dragging ? "bg-gray-300" : ""
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {courseInfo.thumbnail ? (
              <img
                src={courseInfo.thumbnail}
                alt=""
                className="w-full max-h-full object-cover"
              />
            ) : (
              <h5 className="font-semibold self-center text-center w-full">
                Add Thumbnail <br />
                <span className="text-black font-normal">
                  Drag and Drop your Image or Click to browse
                </span>
              </h5>
            )}
          </label>
        </div>
        <div className="w-full flex justify-end">
          <button
            onClick={handleSubmit}
            type="submit"
            className="bg-blue-600 text-white px-3 py-2 rounded-sm mx-1 hover:bg-blue-700"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default CourseInformation;
