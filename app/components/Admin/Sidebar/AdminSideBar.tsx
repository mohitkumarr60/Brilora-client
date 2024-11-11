import React, { FC, useEffect, useState } from "react";
import { GoHome } from "react-icons/go";
import { useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import avatarDefault from "../../../../public/assets/avatar.jpg";
import { HiOutlineUserGroup } from "react-icons/hi";
import { IoReceiptOutline, IoReturnDownBack } from "react-icons/io5";
import { RiHistoryLine, RiTeamLine, RiVideoAddLine } from "react-icons/ri";
import {
  MdLiveTv,
  MdOutlineRateReview,
  MdOutlineReviews,
} from "react-icons/md";
import { AiOutlineLayout, AiOutlineLineChart } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { BsBarChartLine } from "react-icons/bs";
import {
  TbLayoutSidebarLeftCollapse,
  TbLayoutSidebarLeftExpand,
} from "react-icons/tb";

const SidebarItem = ({
  open,
  setOpen,
  link,
  index,
  icon,
  title,
  isCollapsed,
}: {
  open: number;
  setOpen: any;
  link: string;
  index: number;
  isCollapsed: boolean;
  icon: React.ReactNode;
  title: string;
}) => (
  <Link href={link} onClick={() => setOpen(index)}>
    <div
      className={
        isCollapsed
          ? `${
              open === index
                ? "p-5 m-2 text-white bg-white bg-opacity-10 rounded-full cursor-pointer font-medium"
                : "p-5 m-2 text-white cursor-pointer hover:bg-white hover:bg-opacity-5 hover:rounded-full"
            }`
          : `${
              open === index
                ? "p-5 mr-5 text-white mt-2 bg-white bg-opacity-10 rounded-r-full cursor-pointer font-medium"
                : "p-5 mr-5 text-white mt-2 cursor-pointer hover:bg-white hover:bg-opacity-5 hover:rounded-r-full"
            }`
      }
    >
      <div className={isCollapsed ? " " : `flex items-center gap-2 ml-5`}>
        <div className="text-2xl">{icon}</div>
        {!isCollapsed && <h4 className="text-lg font-Poppins">{title}</h4>}
      </div>
    </div>
  </Link>
);

const items = [
  {
    title: "Dashboard",
    link: "/admin",
    icon: <GoHome />,
    index: 1,
  },
  {
    title: "Users",
    link: "/admin/users",
    icon: <HiOutlineUserGroup />,
    index: 2,
  },
  {
    title: "Invoices",
    link: "/admin/invoices",
    icon: <IoReceiptOutline />,
    index: 3,
  },
  {
    title: "Create Course",
    link: "/admin/create-course",
    icon: <RiVideoAddLine />,
    index: 4,
  },
  {
    title: "Courses",
    link: "/admin/courses",
    icon: <MdLiveTv />,
    index: 5,
  },
  {
    title: "Hero",
    link: "/admin/Hero",
    icon: <AiOutlineLayout />,
    index: 6,
  },
  {
    title: "Reviews",
    link: "/admin/Reviews",
    icon: <MdOutlineReviews />,
    index: 7,
  },
  {
    title: "Categories",
    link: "/admin/categories",
    icon: <BiCategory />,
    index: 8,
  },
  {
    title: "Featured Courses",
    link: "/admin/featured-courses",
    icon: <MdOutlineRateReview />,
    index: 9,
  },
  {
    title: "Team",
    link: "/admin/team",
    icon: <RiTeamLine />,
    index: 10,
  },
  {
    title: "Course Analytics",
    link: "/admin/course-analytics",
    icon: <BsBarChartLine />,
    index: 11,
  },
  {
    title: "Order Analytics",
    link: "/admin/order-analytics",
    icon: <AiOutlineLineChart />,
    index: 12,
  },
  {
    title: "User Analytics",
    link: "/admin/users-analytics",
    icon: <RiHistoryLine />,
    index: 13,
  },
];

type Props = {
  open: number;
  setOpen: any;
  isCollapsed: boolean;
  setIsCollapsed: any;
};

const AdminSideBar = ({
  open,
  setOpen,
  isCollapsed,
  setIsCollapsed,
}: Props) => {
  const { user } = useSelector((state: any) => state.auth);
  const [activeItem, setActiveItem] = useState("Dashboard");

  useEffect(() => {
    const handleResize = () => {
      setIsCollapsed(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setIsCollapsed]);

  return (
    <>
      <div className="flex sticky h-full overflow-y-auto">
        <div
          className={`${
            isCollapsed ? "w-auto" : "w-[300px] sm:w-[330px]"
          } overflow-y-auto bg-gradient-to-b to-violet-800 from-violet-600`}
        >
          <div className="flex justify-end mt-5">
            <div
              className="text-white text-3xl p-5 bg-white bg-opacity-5 rounded-l-full cursor-pointer hover:bg-opacity-10"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              {isCollapsed ? (
                <TbLayoutSidebarLeftExpand />
              ) : (
                <TbLayoutSidebarLeftCollapse />
              )}
            </div>
          </div>
          {!isCollapsed && (
            <div className="px-5 w-full">
              <div className="flex items-center justify-center w-full">
                <Link
                  href="../profile"
                  onClick={() => {
                    setActiveItem("Dashboard");
                  }}
                >
                  <Image
                    alt="profile-user"
                    width={150}
                    height={150}
                    src={user.avatar ? user.avatar.url : avatarDefault}
                    className="border-4 w-[120px] h-[120px] object-cover p-1 my-2 border-violet-500 cursor-pointer rounded-full "
                  />
                </Link>
              </div>
              <div className="w-full flex items-center justify-center">
                <h4 className="text-[26px] font-medium font-Poppins text-white">
                  {user?.name}
                </h4>
              </div>
              <div className="w-full flex items-center justify-center">
                <h6 className="text-[18px] font-Poppins font-medium text-white capitalize">
                  - {user?.role}
                </h6>
              </div>
            </div>
          )}
          <div className="my-10">
            {items.map((item) => (
              <SidebarItem
                key={item.index}
                open={open}
                setOpen={setOpen}
                isCollapsed={isCollapsed}
                link={item.link}
                index={item.index}
                icon={item.icon}
                title={item.title}
              />
            ))}
            <Link href={"/"} onClick={() => "/"}>
              <div
                className={
                  isCollapsed
                    ? `${"p-5 m-2 text-white hover:bg-white hover:bg-opacity-5 rounded-full cursor-pointer font-medium"}`
                    : `${"p-5 mr-5 text-white mt-2 hover:bg-white hover:bg-opacity-5 rounded-r-full cursor-pointer font-medium"}`
                }
              >
                <div
                  className={isCollapsed ? " " : `flex items-center gap-2 ml-5`}
                >
                  <IoReturnDownBack size={22} />
                  {!isCollapsed && (
                    <h4 className="text-lg font-Poppins">Return to Homepage</h4>
                  )}
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminSideBar;
