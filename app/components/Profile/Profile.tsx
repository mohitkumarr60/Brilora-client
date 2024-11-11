"use client";
import React, { FC, useEffect, useState } from "react";
import SideBarProfile from "./SideBarProfile";
import { useLogOutQuery } from "@/redux/features/auth/authApi";
import { signOut } from "next-auth/react";
import ProfileInfo from "./ProfileInfo";
import ChangePassword from "./ChangePassword";
import { redirect } from "next/navigation";
import CoursesCard from "../Course/CoursesCard";
import { useGetUsersAllCoursesQuery } from "@/redux/features/courses/coursesApi";

type Props = {
  user: any;
};

const Profile: FC<Props> = ({ user }) => {
  const [active, setActive] = useState(1);
  const [avatar, setAvatar] = useState("");
  const [logout, setLogout] = useState(false);
  const [courses, setCourses] = useState([]);
  const { data, isLoading } = useGetUsersAllCoursesQuery(undefined, {});
  const {} = useLogOutQuery(undefined, { skip: !logout });

  const logOutHandler = async () => {
    await signOut({
      redirect: false,
    });
    setLogout(true);
    redirect("/");
  };

  useEffect(() => {
    if (data) {
      const filteredCourses = user.courses
        .map((userCourses: any) =>
          data.courses.find(
            (course: any) => course._id === userCourses.courseId
          )
        )
        .filter((course: any) => course !== undefined);
      setCourses(filteredCourses);
    }
  }, [data, user.courses]);

  return (
    <div className="container m-auto">
      <div className="block md:flex md:py-16">
        <div className="flex md:h-[550px] shadow overflow-hidden w-full md:w-[300px] bg-white p-5 md:rounded-3xl sticky">
          <SideBarProfile
            user={user}
            active={active}
            avatar={avatar}
            setActive={setActive}
            logOutHandler={logOutHandler}
          />
        </div>
        {active === 1 && (
          <div className="flex-1 py-10">
            <ProfileInfo avatar={avatar} user={user} />
          </div>
        )}
        {active === 2 && (
          <div className="flex-1 ">
            <ChangePassword />
          </div>
        )}
        {active === 3 && (
          <div className="flex gap-2 md:pl-5 overflow-auto">
            {courses &&
              courses.map((item: any, index: number) => (
                <CoursesCard item={item} key={index} isProfile={true} />
              ))}
            {courses.length === -1 && (
              <h1 className="text-center text-xl">No Courses Yet</h1>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
