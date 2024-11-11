"use client";
import React, { useState } from "react";
import AdminSideBar from "../../components/Admin/Sidebar/AdminSideBar";
import Heading from "../../utils/Heading";
import DashboardHeader from "../../components/Admin/DashboardHeader";
import AdminProtected from "../../hooks/adminProtected";
import OrderAnalytics from "../../components/Admin/Analytics/OrdersAnalytics";

type Props = {};

const Page = (props: Props) => {
  const [open, setOpen] = useState(12);
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
          <div className="bg-white flex-1 overflow-hidden">
            <div className="w-[95%] mx-auto h-screen overflow-x-auto">
              <div className="py-10 px-2 sm:p-10 mt-[100px]">
                <OrderAnalytics isDash={false} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminProtected>
  );
};

export default Page;
