"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useGetUsersAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import Loader from "../components/Loader";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import CoursesCard from "../components/Course/CoursesCard";
import { FaRegFaceSmileBeam } from "react-icons/fa6";
import Footer from "../components/Footer";
import Credits from "../components/Credits";

type Props = {};

const Page = (props: Props) => {
  const searchParams = useSearchParams();
  const search = searchParams?.get("title");
  const categoryFromQuery = searchParams?.get("category");
  const { data, isLoading } = useGetUsersAllCoursesQuery(undefined, {});
  const { data: categoriesData } = useGetHeroDataQuery("Categories", {});
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [category, setCategory] = useState(categoryFromQuery || "All");

  useEffect(() => {
    if (category === "All") {
      setCourses(data?.courses);
    }
    if (category !== "All") {
      setCourses(
        data?.courses.filter((item: any) => item.categories === category)
      );
    }
    if (search) {
      setCourses(
        data?.courses.filter((item: any) =>
          item.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [category, data, search]);

  const categories = categoriesData?.layout?.categories;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header
            route={route}
            setRoute={setRoute}
            open={open}
            setOpen={setOpen}
            activeItem={1}
          />
          <Heading
            title="All Courses - Code Connect"
            description="Code Connect is a platform for students to learn different skills"
            keywords="Code Connect, Programming, Robotics, Coding, LMS, Learning Management System, Nirman Labs, Artificial Intelligence, Courses"
          />
          <div className="bg-purple-50">
            <div className="m-auto min-h-[95vh] container">
              <br />
              <div className="w-full flex items-center flex-wrap">
                <div
                  className={`px-4 py-2 ${
                    category === "All" ? "bg-violet-500 text-white" : "border"
                  } m-3 rounded-sm flex items-center justify-center font-Poppins cursor-pointer`}
                  onClick={() => setCategory("All")}
                >
                  All
                </div>
                {categories &&
                  categories.map((item: any, index: number) => (
                    <div key={index}>
                      <div
                        className={`px-4 py-2 ${
                          category === item.title
                            ? "bg-violet-500 text-white"
                            : "border"
                        } m-3 rounded-sm flex items-center justify-center font-Poppins cursor-pointer`}
                        onClick={() => setCategory(item.title)}
                      >
                        {item.title}
                      </div>
                    </div>
                  ))}
              </div>
              {courses && courses.length === 0 && (
                <div className="flex justify-center mt-20">
                  {search ? (
                    <p className="text-medium text-2xl font-Exo">
                      No courses found
                    </p>
                  ) : (
                    <div className="flex">
                      <p className="text-2xl font-Exo font-medium mr-3">
                        No courses available yet. Please browse another
                        categories!
                      </p>
                      <FaRegFaceSmileBeam className="text-3xl" />
                    </div>
                  )}
                </div>
              )}
              <br />
              <div className="flex justify-center">
                <div className="grid gap-4 xl:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {courses &&
                    courses?.map((item: any, index: number) => (
                      <CoursesCard item={item} key={index} />
                    ))}
                </div>
              </div>{" "}
            </div>
          </div>
          <Footer />
          <Credits/>
        </>
      )}
    </>
  );
};

export default Page;
