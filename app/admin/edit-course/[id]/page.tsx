"use client";
import React, { useState } from "react";
import AdminSideBar from "../../../components/Admin/Sidebar/AdminSideBar";
import Heading from "../../../../app/utils/Heading";
import EditCourse from "../../../components/Admin/Course/EditCourse";
import DashboardHeader from "../../../../app/components/Admin/DashboardHeader";
import AdminProtected from "../../../hooks/adminProtected";

type Props = {};

const Page = ({ params }: any) => {
  const [open, setOpen] = useState(5);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const id = params?.id;
  return (
    <AdminProtected>
      <div>
        <Heading
          title={`Admin Dashboard - Code Connect`}
          description="Code Connect is a platform for students to learn different skills"
          keywords="Code Connect, Programming, Robotics, Coding, LMS, Learning Management System, Nirman Labs, Artificial Intelligence, Courses"
        />
        <div className="flex h-screen">
          <div className="sticky z-[999]">
            <AdminSideBar
              open={open}
              setOpen={setOpen}
              isCollapsed={isCollapsed}
              setIsCollapsed={setIsCollapsed}
            />
          </div>
          <div className="bg-white flex-1 ">
            <div className="ml-24 lg:ml-[350px] h-screen">
              <DashboardHeader />
              <EditCourse id={id} />
            </div>
          </div>
        </div>
      </div>
    </AdminProtected>
  );
};

export default Page;
