"use client";
import React, { useState } from "react";
import AdminSideBar from "../../components/Admin/Sidebar/AdminSideBar";
import Heading from "../../../app/utils/Heading";
import CreateCourse from "../../components/Admin/Course/CreateCourse";
import DashboardHeader from "../../../app/components/Admin/DashboardHeader";
import AdminProtected from "../../hooks/adminProtected";

type Props = {};

const Page = (props: Props) => {
  const [open, setOpen] = useState(4);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <AdminProtected>
      <div>
        <Heading
          title={`Admin Dashboard - Code Connect`}
          description="Code Connect is a platform for students to learn different skills"
          keywords="Code Connect, Programming, Robotics, Coding, LMS, Learning Management System, Nirman Labs, Artificial Intelligence, Courses"
        />
        <DashboardHeader />
        <div className="flex h-screen">
          <div
            className={`sticky scroll-m-5 ${
              isCollapsed ? "z-[999]" : "z-[99999]"
            }`}
          >
            <AdminSideBar
              open={open}
              setOpen={setOpen}
              isCollapsed={isCollapsed}
              setIsCollapsed={setIsCollapsed}
            />
          </div>
          <div className="bg-white flex-1 h-auto overflow-y-auto">
            <div className="w-full mx-auto ">
              <CreateCourse />
            </div>
          </div>
        </div>
      </div>
    </AdminProtected>
  );
};

export default Page;
