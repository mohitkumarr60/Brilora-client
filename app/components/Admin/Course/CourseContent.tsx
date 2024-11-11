import React, { FC } from "react";
import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { MdAddLink } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import toast from "react-hot-toast";

type Props = {
  active: number;
  setActive: (active: number) => void;
  courseContentData: any;
  setCourseContentData: (courseContentData: any) => void;
  handleSubmit: any;
};

const CourseContent: FC<Props> = ({
  courseContentData,
  setCourseContentData,
  active,
  setActive,
  handleSubmit: handleCourseSubmit,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(
    Array(courseContentData.length).fill(false)
  );

  const [activeSection, setActiveSection] = useState(1);

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  const handleCollapseToggle = (index: number) => {
    const updatedCollapsed = [...isCollapsed];
    updatedCollapsed[index] = !updatedCollapsed[index];
    setIsCollapsed(updatedCollapsed);
  };

  const handleRemoveLink = (index: number, linkIndex: number) => {
    const updatedData = [...courseContentData];
    updatedData[index].links.splice(linkIndex, 1);
    setCourseContentData(updatedData);
  };

  const handleAddLink = (index: number) => {
    const updatedData = [...courseContentData];
    updatedData[index].links.push({
      title: "",
      url: "",
    });
    setCourseContentData(updatedData);
  };

  const newContentHandler = (item: any) => {
    if (
      item.title === "" ||
      item.description === "" ||
      item.videoUrl === "" ||
      item.links[0].title === "" ||
      item.links[0].url === ""
    ) {
      toast.error("Please fill all the fields");
    } else {
      let newVideoSection = "";
      if (courseContentData.length > 0) {
        const lastVideoSection =
          courseContentData[courseContentData.length - 1].videoSection;
        if (lastVideoSection) {
          newVideoSection = lastVideoSection;
        }
      }
      const newContent = {
        videoUrl: "",
        title: "",
        description: "",
        videoSection: newVideoSection,
        links: [{ title: "", url: "" }],
      };
      setCourseContentData([...courseContentData, newContent]);
    }
  };

  const addNewSection = () => {
    if (
      courseContentData[courseContentData.length - 1].title === "" ||
      courseContentData[courseContentData.length - 1].description === "" ||
      courseContentData[courseContentData.length - 1].videoUrl === "" ||
      courseContentData[courseContentData.length - 1].links[0].title === "" ||
      courseContentData[courseContentData.length - 1].links[0].url === ""
    ) {
      toast.error("Please fill all the fields");
    } else {
      setActiveSection(activeSection + 1);
      const newContent = {
        videoUrl: "",
        title: "",
        description: "",
        videoSection: `Untitled Section ${activeSection}`,
        links: [{ title: "", url: "" }],
      };
      setCourseContentData([...courseContentData, newContent]);
    }
  };

  const prevButton = () => {
    setActive(active - 1);
  };

  const handleOptions = () => {
    if (
      courseContentData[courseContentData.length - 1].title === "" ||
      courseContentData[courseContentData.length - 1].description === "" ||
      courseContentData[courseContentData.length - 1].videoUrl === "" ||
      courseContentData[courseContentData.length - 1].links[0].title === "" ||
      courseContentData[courseContentData.length - 1].links[0].url === ""
    ) {
      toast.error("Section can't be empty");
    } else {
      setActive(active + 1);
      handleCourseSubmit();
    }
  };

  return (
    <div className="w-[90%] md:w-[80%] md:m-auto my-20 md:my-24 p-3 md:pr-3">
      <form onSubmit={handleSubmit}>
        {courseContentData?.map((item: any, index: number) => {
          const showSectionInput =
            index === 0 ||
            item.videoSection !== courseContentData[index - 1].videoSection;

          return (
            <>
              <div
                className={`w-full border border-slate-300 rounded-sm p-4 ${
                  showSectionInput ? "mt-10" : "mb-0"
                }`}
              >
                {showSectionInput && (
                  <>
                    <div className="flex w-full items-center pb-2">
                      <input
                        type="text"
                        placeholder="Section Title"
                        className={`text-[20px] ${
                          item.videoSection === "Untitled Section"
                            ? "w-[170px]"
                            : "w-max"
                        } font-Poppins cursor-pointer underline text-black bg-transparent outline-none`}
                        value={item.videoSection}
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index].videoSection = e.target.value;
                          setCourseContentData(updatedData);
                        }}
                      />
                      <MdOutlineModeEditOutline className="cursor-pointer text-black text-[22px]" />
                    </div>
                  </>
                )}
                <div className="flex justify-between items-center w-full my-2">
                  {isCollapsed[index] ? (
                    <>
                      {item.title ? (
                        <p className="font-Poppins text-black">
                          {index + 1}.{item.title}
                        </p>
                      ) : (
                        <></>
                      )}
                    </>
                  ) : (
                    <></>
                  )}

                  {/* collapse button for video content */}
                  <div className="flex items-center">
                    <AiOutlineDelete
                      className={`text-[22px] mr-2 text-black ${
                        index > 0 ? "cursor-pointer" : "cursor-no-drop"
                      }`}
                      onClick={() => {
                        if (index > 0) {
                          const updatedData = [...courseContentData];
                          updatedData.splice(index, 1);
                          setCourseContentData(updatedData);
                        }
                      }}
                    />
                    <MdOutlineKeyboardArrowDown
                      className={`text-black text-[22px] ${
                        isCollapsed[index]
                          ? "transform rotate-180"
                          : "transform rotate-0"
                      } `}
                      onClick={() => handleCollapseToggle(index)}
                    />
                  </div>
                </div>
                {!isCollapsed[index] && (
                  <>
                    <div className="my-3">
                      <label
                        htmlFor="title"
                        className="font-semibold sm:text-[17px]"
                      >
                        Video Title
                      </label>
                      <input
                        type="text"
                        id="title"
                        placeholder=""
                        className="w-full border border-slate-300 p-2 mt-1 rounded-sm"
                        value={item.title}
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index].title = e.target.value;
                          setCourseContentData(updatedData);
                        }}
                      />
                    </div>
                    <div className="my-3">
                      <label
                        htmlFor="url"
                        className="font-semibold sm:text-[17px]"
                      >
                        Video Url
                      </label>
                      <input
                        type="text"
                        id="url"
                        placeholder=""
                        className="w-full border border-slate-300 p-2 mt-1 rounded-sm"
                        value={item.videoUrl}
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index].videoUrl = e.target.value;
                          setCourseContentData(updatedData);
                        }}
                      />
                    </div>
                    <div className="my-3">
                      <label
                        htmlFor="duration"
                        className="font-semibold sm:text-[17px]"
                      >
                        Video Length (in minutes)
                      </label>
                      <input
                        type="number"
                        id="duration"
                        placeholder=""
                        className="w-full border border-slate-300 p-2 mt-1 rounded-sm"
                        value={item.videoLength}
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index].videoLength = e.target.value;
                          setCourseContentData(updatedData);
                        }}
                      />
                    </div>
                    <div className="my-3">
                      <label
                        htmlFor="courseDescription"
                        className="font-semibold sm:text-[17px]"
                      >
                        Video Description
                      </label>
                      <textarea
                        id="courseDescription"
                        cols={30}
                        rows={10}
                        className="w-full border border-slate-300 p-2 mt-1 rounded-sm !h-min"
                        value={item.description}
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index].description = e.target.value;
                          setCourseContentData(updatedData);
                        }}
                      />
                      <br />
                    </div>
                    {item?.links.map((link: any, linkIndex: number) => (
                      <div key={linkIndex} className="mb-3 block">
                        <div className="w-full flex items-center justify-between">
                          <label className="font-semibold sm:text-[17px]">
                            Link {linkIndex + 1}
                          </label>
                          <AiOutlineDelete
                            className={`${
                              linkIndex === 0
                                ? "cursor-no-drop"
                                : "cursor-pointer"
                            } text-[22px] text-black cursor-pointer`}
                            onClick={() =>
                              linkIndex === 0
                                ? null
                                : handleRemoveLink(index, linkIndex)
                            }
                          />
                        </div>
                        <input
                          type="text"
                          placeholder="Link Title"
                          className="w-full border border-slate-300 p-2 mt-1 rounded-sm"
                          value={link.title}
                          onChange={(e) => {
                            const updatedData = [...courseContentData];
                            updatedData[index].links[linkIndex].title =
                              e.target.value;
                            setCourseContentData(updatedData);
                          }}
                        />
                        <input
                          type="url"
                          placeholder="Link Url"
                          className="w-full border border-slate-300 p-2 mt-1 rounded-sm"
                          value={link.url}
                          onChange={(e) => {
                            const updatedData = [...courseContentData];
                            updatedData[index].links[linkIndex].url =
                              e.target.value;
                            setCourseContentData(updatedData);
                          }}
                        />
                      </div>
                    ))}

                    {/* link button */}
                    <div className="inline-block mb-4">
                      <p
                        className="flex items-center text-sm] cursor-pointer text-black"
                        onClick={() => handleAddLink(index)}
                      >
                        <MdAddLink className="mx-1 text-xl" />
                        <span className="hover:underline">Add Link</span>
                      </p>
                    </div>
                  </>
                )}
                {/* add new content */}
                {index === courseContentData.length - 1 && (
                  <div className="inline-block md:ml-4">
                    <p
                      className="flex items-center text-base cursor-pointer"
                      onClick={(e: any) => newContentHandler(item)}
                    >
                      <IoIosAddCircleOutline className="mx-1 text-xl" />
                      <span className="hover:underline">Add New Content</span>
                    </p>
                  </div>
                )}
              </div>
            </>
          );
        })}
        <br />
        {/* add new section */}
        <div
          className="flex items-center text-base my-2 text-black cursor-pointer"
          onClick={() => addNewSection()}
        >
          <IoIosAddCircleOutline className="mx-1 text-xl" />
          <span className="hover:underline">Add New Section</span>
        </div>
      </form>
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

export default CourseContent;
