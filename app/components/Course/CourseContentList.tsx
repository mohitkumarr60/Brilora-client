import {
  useGetCourseProgressQuery,
  useMarkModuleCompleteMutation,
  useMarkModuleInCompleteMutation,
} from "@/redux/features/user/userApi";
import React, { FC, useEffect, useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import CourseProgress from "./CourseProgress";

type Props = {
  data: any;
  id?: string;
  activeVideo: number;
  setActiveVideo?: any;
  isDemo?: boolean;
  user: any;
};

const CourseContentList: FC<Props> = ({
  data,
  id,
  activeVideo,
  setActiveVideo,
  isDemo,
  user,
}) => {
  const [modules, setModules] = useState<any[]>([]);
  const [markModuleComplete] = useMarkModuleCompleteMutation();
  const [markModuleInComplete] = useMarkModuleInCompleteMutation();
  const [visibleSections, setVisibleSections] = useState<Set<string>>(
    new Set<string>()
  );
  const { data: moduleData, refetch } = useGetCourseProgressQuery(id);

  useEffect(() => {
    if (data) {
      const tempModules = user?.courses?.find(
        (course: any) => course.courseId === id
      )?.modules;
      setModules(tempModules || []);
    }
  }, [data, id, user?.courses]);

  const videoSections: string[] = [];
  if (data) {
    const tempSections = data.map((item: any) => item.videoSection);
    tempSections.forEach((section: any) => {
      if (!videoSections.includes(section)) {
        videoSections.push(section);
      }
    });
  }

  let totalCount: number = 0;

  const toggleSection = (section: string) => {
    const newVisibleSections = new Set(visibleSections);
    if (visibleSections.has(section)) {
      newVisibleSections.delete(section);
    } else {
      newVisibleSections.add(section);
    }
    setVisibleSections(newVisibleSections);
  };

  const handleMarkComplete = async (moduleId: string) => {
    try {
      await markModuleComplete({ courseId: id, moduleId }).unwrap();
      setModules((prevModules) => [...prevModules, moduleId]);
      refetch();
    } catch (error) {
      console.error("Error marking module as complete:", error);
    }
  };

  const handleMarkIncomplete = async (moduleId: string) => {
    try {
      await markModuleInComplete({ courseId: id, moduleId }).unwrap();
      setModules((prevModules) => prevModules.filter((id) => id !== moduleId));
      refetch();
    } catch (error) {
      console.error("Error marking module as incomplete:", error);
    }
  };

  return (
    <div className="p-3">
      {!isDemo && <CourseProgress moduleData={moduleData} />}
      <div
        className={`w-full ${
          isDemo
            ? "border-b"
            : "sticky p-3 top-24 left-0 z-30 bg-white rounded-lg mt-5 border shadow-sm"
        }`}
      >
        {videoSections.map((section: string, sectionIndex: number) => {
          const isSectionVisible = visibleSections.has(section);

          // filter videos by section
          const sectionVideos = data?.filter(
            (item: any) => item.videoSection === section
          );
          const sectionVideoCount: number = sectionVideos.length;
          const sectionVideoLength: number = sectionVideos.reduce(
            (totalLength: number, item: any) => totalLength + item.videoLength,
            0
          );
          const sectionStartIndex: number = totalCount;
          totalCount += sectionVideoCount;
          const sectionContentHours: number = sectionVideoLength / 60;
          return (
            <div className={`${!isDemo && `mb-5 border-b`}`} key={section}>
              <div className="w-full flex justify-between items-center">
                <h2 className="text-lg font-medium">{section}</h2>
                <button
                  className="mr-4 cursor-pointer text-black"
                  onClick={() => toggleSection(section)}
                >
                  {isSectionVisible ? (
                    <BsChevronUp size={20} />
                  ) : (
                    <BsChevronDown size={20} />
                  )}
                </button>
              </div>
              <h5 className="text-black mb-2">
                {sectionVideoCount}{" "}
                {sectionVideoCount > 1 ? "Lessons" : "Lesson"}{" "}
                {sectionVideoLength < 60
                  ? sectionVideoLength
                  : sectionContentHours.toFixed(2)}{" "}
                {sectionVideoLength > 60 ? "Hours" : "Minutes"}
              </h5>
              {isSectionVisible && (
                <div className="w-full">
                  {sectionVideos.map((item: any, index: number) => {
                    const videoIndex: number = sectionStartIndex + index;
                    const ContentLength: number = item.videoLength / 60;

                    return (
                      <div
                        className={`w-full ${
                          videoIndex === activeVideo
                            ? "bg-purple-50 shadow-inner rounded-md"
                            : ""
                        } cursor-pointer transition-all p-2 flex`}
                        key={item._id}
                        onClick={() =>
                          isDemo ? null : setActiveVideo(videoIndex)
                        }
                      >
                        {!isDemo && (
                          <div className="flex mb-1 items-center">
                              {modules?.includes(item._id) ? (
                                <MdCheckBox
                                  size={22}
                                  className="mr-2 text-black"
                                  onClick={() => handleMarkIncomplete(item._id)}
                                />
                              ) : (
                                <MdCheckBoxOutlineBlank
                                  size={22}
                                  className="mr-2 text-black"
                                  onClick={() => handleMarkComplete(item._id)}
                                />
                              )}
                          </div>
                        )}
                        <span>
                          <h1 className="text-[17px] inline-block break-words text-black">
                            {item.title}
                          </h1>
                          <h5 className="text-sm text-black">
                            {item.videoLength > 60
                              ? ContentLength.toFixed(2)
                              : item.videoLength}{" "}
                            {item.videoLength > 60 ? "Hours" : "Minutes"}
                          </h5>
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CourseContentList;
