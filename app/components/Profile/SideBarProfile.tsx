import React, { FC } from "react";
import defaultAvatar from "../../../public/assets/avatar.jpg";
import Image from "next/image";
import { RiLockPasswordLine } from "react-icons/ri";
import { TbCircleLetterC } from "react-icons/tb";
import { RiAdminLine, RiLogoutCircleRLine } from "react-icons/ri";
import Link from "next/link";

type Props = {
  user: any;
  active: number;
  avatar: string | null;
  setActive: (active: number) => void;
  logOutHandler: any;
};

const SideBarProfile: FC<Props> = ({
  user,
  active,
  avatar,
  setActive,
  logOutHandler,
}) => {
  return (
    <div className="w-full text-[17px] font-medium">
      <div
        className={`w-full rounded-xl flex items-center h-14 px-3 cursor-pointer ${
          active == 1
            ? "bg-purple-200 transition-all duration-300"
            : "bg-transparent hover:bg-purple-100"
        }`}
        onClick={() => setActive(1)}
      >
        <Image
          src={
            user.avatar || avatar ? user.avatar.url || avatar : defaultAvatar
          }
          width={50}
          height={50}
          alt=""
          className="w-8 h-8 rounded-full object-cover cursor-pointer"
        />
        <h5 className="font-Poppins text-black ml-2">My Account</h5>
      </div>
      <div
        className={`w-full rounded-xl flex items-center h-14 px-3 cursor-pointer ${
          active == 2
            ? "bg-purple-200 transition-all duration-300"
            : "bg-transparent hover:bg-purple-100"
        }`}
        onClick={() => setActive(2)}
      >
        <RiLockPasswordLine className="text-2xl m-1" />
        <h5 className="font-Poppins text-black ml-2">Change Password</h5>
      </div>
      <div
        className={`w-full rounded-xl flex items-center h-14 px-3 cursor-pointer ${
          active == 3
            ? "bg-purple-200 transition-all duration-300"
            : "bg-transparent hover:bg-purple-100"
        }`}
        onClick={() => setActive(3)}
      >
        <TbCircleLetterC className="text-2xl m-1" />
        <h5 className="font-Poppins  text-black ml-2">Enrolled Courses</h5>
      </div>

      {user.role === "admin" && (
        <Link
          className={`w-full rounded-xl flex items-center h-14 px-3 cursor-pointer ${
            active == 6
              ? "bg-purple-200 transition-all duration-300"
              : "bg-transparent hover:bg-purple-100"
          }`}
          href={"/admin"}
        >
          <RiAdminLine className="text-2xl m-1" />
          <h5 className="font-Poppins  text-black ml-2">Admin Dashboard</h5>
        </Link>
      )}
      <div
        className={`w-full rounded-xl flex items-center h-14 px-3 cursor-pointer ${
          active == 4
            ? "bg-purple-200 transition-all duration-300"
            : "bg-transparent hover:bg-purple-100"
        }`}
        onClick={() => logOutHandler()}
      >
        <RiLogoutCircleRLine className="text-2xl m-1" />
        <h5 className="font-Poppins text-black ml-2">Log Out</h5>
      </div>
    </div>
  );
};

export default SideBarProfile;
