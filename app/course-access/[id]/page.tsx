"use client";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import React, { useEffect } from "react";
import Loader from "../../components/Loader";
import { redirect } from "next/navigation";
import CourseContent from "../../components/Course/CourseContent";

type Props = {
  params: any;
};

const Page = ({ params }: Props) => {
  const id = params.id;
  const { isLoading, error, data } = useLoadUserQuery(undefined, {});

  useEffect(() => {
    if (data) {
      const isPurchased = data.user.courses.find(
        (purchase: any) => purchase.courseId === id
      );
      if (!isPurchased) {
        redirect("/");
      }
      if (error) {
        redirect("/");
      }
    }
  }, [data, error, id]);

  return (
    <>
      {isLoading ? (
        <div className="flex h-screen scale-125 items-center justify-center">
          <Loader />
        </div>
      ) : (
        <>
          <CourseContent id={id} user={data.user} />
        </>
      )}
    </>
  );
};

export default Page;
