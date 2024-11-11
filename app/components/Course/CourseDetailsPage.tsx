import { useGetCourseDetailsQuery } from "@/redux/features/courses/coursesApi";
import React, { useState } from "react";
import Loader from "../Loader";
import Header from "../Header";
import Heading from "@/app/utils/Heading";
import Footer from "../Footer";
import Credits from "../Credits";
import CourseDetails from "./CourseDetails";

type Props = {
  id: string;
};

const CourseDetailsPage = ({ id }: Props) => {
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useGetCourseDetailsQuery(id);

  return (
    <>
      {isLoading ? (
        <div className="flex h-screen scale-125 items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div>
          <Heading
            title={data?.course?.name + "- Code Connect"}
            description="Code Connect is a platform for students to learn different skills"
            keywords={data?.course?.tags}
          />
          <Header
            route={route}
            setRoute={setRoute}
            open={open}
            setOpen={setOpen}
            activeItem={1}
          />
          <CourseDetails
            data={data?.course}
            setRoute={setRoute}
            setOpen={setOpen}
          />
          <Footer />
          <Credits />
        </div>
      )}
    </>
  );
};

export default CourseDetailsPage;
