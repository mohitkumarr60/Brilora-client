"use client";
import React, { FC, useState } from "react";
import { IoArrowDownCircleOutline } from "react-icons/io5";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import SimpleLoader from "../SimpleLoader";

type Props = {};
const Hero: FC<Props> = () => {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [text, setText] = useState("");
  const { data, isLoading } = useGetHeroDataQuery("Banner");
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = (e: any) => {
    if (search === "") {
      return;
    } else {
      router.push(`/courses?title=${search}`);
    }
  };

  // scroll the screen to 95vh
  const handleScreenScroll = () => {
    window.scrollTo({
      top: window.innerHeight * 0.95,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (data) {
      setTitle(data?.layout?.banner.title);
      setSubTitle(data?.layout?.banner.subTitle);
      setText(data?.layout?.banner.text);
      setImage(data?.layout?.banner?.image?.url);
    }
  }, [data]);

  return (
    <>
      {isLoading ? (
        <SimpleLoader />
      ) : (
        <div
          className={`flex w-full h-screen md:h-[95vh] bg-gradient-to-tr from-cyan-200 via-violet-300 to-violet-400 relative`}
        >
          <div className="container m-auto flex">
            <div className="w-full">
              <h1 className="text-6xl md:text-[120px] font-bold text-center">{title}</h1>
              <h4 className="text-2xl md:text-6xl font-medium text-center">{subTitle}</h4>
              <br />
              <p className="px-5 text-center">{text}</p>

              <div className="bg-gradient-to-tr to-indigo-400 from-violet-400 p-2 rounded-full max-w-[600px] m-auto my-20 mx-5 md:mx-0 md:my-0 md:mt-20">
                <div className="search-container">
                  <input
                    className="input"
                    type="text"
                    placeholder="Search Courses..."
                  />
                  <button
                    className="z-[99999]"
                    onClick={handleSearch}
                    title="button"
                    type="button"
                  >
                    <svg viewBox="0 0 24 24" className="search__icon">
                      <g>
                        <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                      </g>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            className="absolute bottom-20 left-[50%] -translate-x-[50%] hover:bottom-16 transition-all duration-200 cursor-pointer hidden md:block"
            onClick={handleScreenScroll}
          >
            <IoArrowDownCircleOutline
              size={50}
              className="text-purple-100 hover:text-white"
            />
          </div>
        </div>
      )}
    </>
  );
};
export default Hero;
