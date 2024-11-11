import Link from "next/link";
import React from "react";
import Image from "next/image";

export const navItemsData = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Courses",
    url: "/courses",
  },
  {
    name: "About",
    url: "/about",
  },
  {
    name: "Contact",
    url: "/contact",
  },
];

type Props = {
  activeItem: number;
  isMobile: boolean;
};

const NavItems: React.FC<Props> = ({ activeItem, isMobile }) => {
  return (
    <>
      <div className="hidden md:flex gap-5">
        {navItemsData &&
          navItemsData.map((item, index) => (
            <Link href={`${item.url}`} key={index} passHref>
              <span
                className={`${activeItem === index ? "text-violet-600" : "hover:text-violet-600"} font-medium`}
              >
                {item.name}
              </span>
            </Link>
          ))}
      </div>
      {isMobile && (
        <div className="md:hidden">
          {navItemsData &&
            navItemsData.map((item, index) => (
              <Link href={`${item.url}`} passHref key={index}>
                <span
                  className={`${
                    activeItem === index
                      ? "bg-violet-600 text-white shadow-md"
                      : "text-black hover:bg-violet-500 hover:bg-opacity-20"
                  } block py-5 px-6 text-base font-medium`}
                >
                  {item.name}
                </span>
              </Link>
            ))}
        </div>
      )}
    </>
  );
};

export default NavItems;
