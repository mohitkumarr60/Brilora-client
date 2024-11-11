import { useGetCourseContentQuery } from "@/redux/features/courses/coursesApi";
import React, { useState } from "react";
import Loader from "../Loader";
import Heading from "@/app/utils/Heading";
import CourseContentMedia from "./CourseContentMedia";
import Header from "../Header";
import CourseContentList from "./CourseContentList";
import Footer from "../Footer";

type Props = {
  id: string;
  user: any;
};

const CourseContent = ({ id, user }: Props) => {
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("Login");
  const {
    data: contentData,
    isLoading,
    refetch,
  } = useGetCourseContentQuery(id);
  const data = contentData?.content;
  const [activeVideo, setActiveVideo] = useState(0);

  return (
    <>
      {isLoading ? (
        <div className="flex h-screen scale-125 items-center justify-center">
          <Loader />
        </div>
      ) : (
        <>
          <Heading
            title={data[activeVideo]?.title}
            description="code connect"
            keywords={data[activeVideo]?.tags}
          />
          <Header
            activeItem={1}
            open={open}
            setOpen={setOpen}
            route={route}
            setRoute={setRoute}
          />
          <div className="bg-purple-50">
            <div className="container m-auto">
              <div className="w-full grid md:grid-cols-10">
                <div className="col-span-7">
                  <CourseContentMedia
                    data={data}
                    id={id}
                    activeVideo={activeVideo}
                    setActiveVideo={setActiveVideo}
                    user={user}
                    refetch={refetch}
                  />
                </div>
                <div className="col-span-3 hidden md:block">
                  <CourseContentList
                    id={id}
                    activeVideo={activeVideo}
                    setActiveVideo={setActiveVideo}
                    data={data}
                    user={user}
                  />
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default CourseContent;
