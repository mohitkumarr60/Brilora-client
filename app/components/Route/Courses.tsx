import {
  useGetFeaturedCourseQuery,
  useGetUsersAllCoursesQuery,
} from "@/redux/features/courses/coursesApi";
import React, { useEffect, useState } from "react";
import CoursesCard from "../Course/CoursesCard";

type Props = {};

const Courses = (props: Props) => {
  const { data, isLoading } = useGetUsersAllCoursesQuery({});
  const [courses, setCourses] = useState<any[]>([]);
  const { data: featuredData, refetch: refetchFeatured } =
    useGetFeaturedCourseQuery({});

  const featuredCourses =
    data?.courses.filter((course: any) =>
      featuredData?.featuredCourses.featuredCourses.includes(course._id)
    ) || [];

  useEffect(() => {
    setCourses(data?.courses);
  }, [data]);

  return (
    <div className="w-[90%] sm:w-full m-auto h-auto py-[100px] bg-white">
      <div className="w-full mb-[80px]">
        <h1 className="text-4xl text-center font-Poppins font-[700]">
          Featured{" "}
          <span className="bg-gradient-to-r from-violet-700 to-purple-600 text-transparent bg-clip-text">
            Courses
          </span>
        </h1>
      </div>
      <div className="flex justify-center">
        <div className="grid gap-4 xl:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {featuredCourses &&
            featuredCourses?.map((item: any, index: number) => (
              <CoursesCard item={item} key={index} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
