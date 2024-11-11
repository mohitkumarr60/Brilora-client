"use client";
import React, { FC, useState } from "react";
import Heading from "../utils/Heading";
import AdminSideBar from "../components/Admin/Sidebar/AdminSideBar";
import DashboardHero from "../components/Admin/DashboardHero";
import AdminProtected from "../hooks/adminProtected";

type Props = {};

const Page: FC<Props> = () => {
  const [open, setOpen] = useState(1);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <AdminProtected>
      <div>
        <Heading
          title={`Admin Dashboard - Code Connect`}
          description="Code Connect is a platform for students to learn different skills"
          keywords="Code Connect, Programming, Robotics, Coding, LMS, Learning Management System, Nirman Labs, Artificial Intelligence, Courses"
        />
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
          <div className="bg-slate-200 flex-1">
            <DashboardHero />
          </div>
        </div>
      </div>
    </AdminProtected>
  );
};

export default Page;
