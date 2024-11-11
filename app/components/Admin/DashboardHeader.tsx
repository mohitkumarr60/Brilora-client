"use client";
import Image from "next/image";
import React, { FC, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import avatarDefault from "../../../public/assets/avatar.jpg";
import { useSelector } from "react-redux";
import { redirect } from "next/navigation";
import Link from "next/link";

type Props = {};

const DashboardHeader = (props: Props) => {
  const { user } = useSelector((state: any) => state.auth);

  const [open, setOpen] = useState(false);

  return (
    <div className="w-auto px-5 h-[100px] flex item-center justify-end fixed right-0 z-[9999]">
      <div
        className="relative cursor-pointer my-auto mx-4 bg-white p-3 rounded-full shadow-md hover:scale-105"
        onClick={() => setOpen(!open)}
      >
        <IoMdNotificationsOutline className="text-[30px] cursor-pointer text-black hover:text-gray-600" />
        <span className="absolute top-3 right-3 w-[18px] h-[18px] bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
          2
        </span>
      </div>
      {open && (
        <div className="absolute right-3 sm:right-10 top-16 w-[350px] bg-white shadow-lg border-2 rounded-s-2xl rounded-b-2xl p-4">
          <h5 className="text-center text-xl font-medium font-Exo text-black p-3">
            Notifications
          </h5>
          <div className=" font-Poppins border-b">
            <div className="w-full flex items-center justify-between p-2">
              <p className="text-black text-sm">New Question Received</p>
              <p className="text-black cursor-pointer text-xs font-semibold">
                Mark as read
              </p>
            </div>
            <p className="text-xs p-2">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum,
              obcaecati?
            </p>
          </div>
          <div className=" font-Poppins border-b">
            <div className="w-full flex items-center justify-between p-2">
              <p className="text-black text-sm">New Question Received</p>
              <p className="text-black cursor-pointer text-xs font-semibold">
                Mark as read
              </p>
            </div>
            <p className="text-xs p-2">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum,
              obcaecati?
            </p>
          </div>
          <div className=" font-Poppins border-b">
            <div className="w-full flex items-center justify-between p-2">
              <p className="text-black text-sm">New Question Received</p>
              <p className="text-black cursor-pointer text-xs font-semibold">
                Mark as read
              </p>
            </div>
            <p className="text-xs p-2">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum,
              obcaecati?
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;
