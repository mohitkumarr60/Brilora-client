"use client";
import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import NavItems from "../utils/NavItems";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import Image from "next/image";
import CustomModal from "../utils/CustomModal";
import Login from "../components/Auth/Login";
import Signup from "../components/Auth/SignUp";
import Verification from "../components/Auth/Verification";
import { useSelector } from "react-redux";
import { FaUser } from "react-icons/fa6";
import { useSession } from "next-auth/react";
import {
  useLogOutQuery,
  useSocialAuthMutation,
} from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";
import { NextApiRequest, NextApiResponse } from "next";
import GreetingMessage from "./GreetingMessage";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
  route: string;
  setRoute: (route: string) => void;
};

const Header: FC<Props> = ({ activeItem, route, open, setRoute, setOpen }) => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const { user } = useSelector((state: any) => state.auth);
  const { data } = useSession();
  const [socialAuth, { isSuccess, error }] = useSocialAuthMutation();
  const [logout, setLogout] = useState(false);
  const {} = useLogOutQuery(undefined, { skip: !logout });

  useEffect(() => {
    if (!user) {
      if (data) {
        socialAuth({
          email: data?.user?.email,
          name: data?.user?.name,
          avatar: data?.user?.image,
        });
      }
    }
    if (data === null) {
      if (isSuccess) {
        toast.success("Login Successfully");
      }
    }
  }, [data, isSuccess, socialAuth, user]);

  const SignUp = () => {
    setRoute("SignUp");
    setOpen(true);
  };

  const LogIn = () => {
    setRoute("LogIn");
    setOpen(true);
  };

  return (
    <div className="w-full sticky top-0 z-[1000] font-Poppins text-gray-950 bg-white/70 backdrop-blur border-b">
      <div className="container m-auto">
        <div className="w-full h-auto flex items-center justify-between py-3 px-3 md:px-0">
          <div>
            <Link href={"/"}>
              <Image
                src={"/assets/brilora.svg"}
                width={100}
                height={100}
                alt="Brilora"
                className="m-0"
              />
            </Link>
          </div>

          <div className="flex items-center gap-5">
            <div className="flex items-center justify-end md:justify-center h-12">
              <NavItems activeItem={activeItem} isMobile={false} />
              {/* only for small screens */}
              <div className="md:hidden p-[4px]">
                <HiOutlineMenuAlt3
                  size={35}
                  className="cursor-pointer text-black bg-white rounded-sm"
                  onClick={() => setOpenSidebar(true)}
                />
              </div>
            </div>

            {user ? (
              <div className="hidden md:items-center md:my-3 md:flex border-l pl-5 gap-5">
                <div className="flex items-center">
                  <GreetingMessage openSidebar={openSidebar} />
                </div>
                <Link href={"/profile"}>
                  <div
                    className={`flex items-center justify-center w-10 h-10 border rounded-full ${
                      activeItem === 5 && "shadow border-violet-600 text-violet-600"
                    }`}
                  >
                    {user.avatar ? (
                      <>
                        <Image
                          src={user.avatar.url}
                          width={100}
                          height={100}
                          alt=""
                          className="rounded-full w-full h-full object-cover"
                        />
                      </>
                    ) : (
                      <FaUser size={20} />
                    )}
                  </div>
                </Link>
              </div>
            ) : (
              <div className="hidden md:flex gap-3">
                <button
                  onClick={LogIn}
                  type="button"
                  className="bg-violet-600 font-medium text-white px-3 py-2 rounded hover:bg-violet-500"
                >
                  Log In
                </button>
                <button
                  onClick={SignUp}
                  type="button"
                  className="bg-transparent border border-violet-600 font-medium text-violet-600 px-3 py-2 rounded hover:bg-violet-600 hover:text-white"
                >
                  Create Account
                </button>
              </div>
            )}
          </div>
        </div>

        {/* sidebar for small screens */}
        {openSidebar && (
          <div
            className="fixed top-0 left-0 w-full h-screen bg-black/60 z-[100]"
            onClick={(e: any) => {
              if (e.target.id === "screen") {
                setOpenSidebar(false);
              }
            }}
            id="screen"
          >
            <div className="w-3/4 fixed z-[100] right-0 bg-white h-screen">
              {/* code connect logo and avatar for sidebar */}
              <div className="flex items-center w-full">
                {user ? (
                  <Link href={"/profile"}>
                    <div
                      className={`flex items-center justify-center w-10 h-10 border rounded-full ${
                        activeItem === 5 && "shadow border-violet-600"
                      }`}
                    >
                      {user.avatar ? (
                        <>
                          <Image
                            src={user.avatar.url}
                            width={100}
                            height={100}
                            alt=""
                            className="rounded-full w-full h-full object-cover"
                          />
                        </>
                      ) : (
                        <FaUser size={20} />
                      )}
                    </div>
                  </Link>
                ) : (
                  <div className="flex shadow-md items-center p-5">
                    <Link href={"/"}>
                      <Image
                        src={"/assets/brilora.svg"}
                        width={100}
                        height={100}
                        alt="Brilora"
                      />
                    </Link>
                  </div>
                )}
              </div>
              <NavItems activeItem={activeItem} isMobile={true} />

              {/* sign in and create account button --inside sidebar only visible for small screens*/}
              {!user && (
                <div>
                  <div className="flex md:hidden justify-start m-5">
                    <button
                      onClick={LogIn}
                      type="button"
                      className="bg-violet-600 text-white px-3 py-2 rounded mx-1 hover:bg-violet-500"
                    >
                      Log In
                    </button>
                  </div>
                  <div className="flex md:hidden justify-start m-5">
                    <button
                      onClick={SignUp}
                      type="button"
                      className="bg-white text-violet-600 px-3 border border-violet-600 py-2 rounded mx-1 hover:bg-violet-600"
                    >
                      Create Account
                    </button>
                  </div>
                </div>
              )}
              <p className="text-black text-sm p-4 mt-10 text-center">
                Copyright © 2024 Brilora. Designed and Developed by
                <span>
                  <Link
                    href={"https://www.linkedin.com/in/mohit-saroha/"}
                    className="text-violet-600"
                  >
                    {" "}
                    Mohit Saroha
                  </Link>
                </span>
              </p>
            </div>
          </div>
        )}
      </div>
      {route === "LogIn" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={Login}
            />
          )}
        </>
      )}
      {route === "SignUp" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={Signup}
            />
          )}
        </>
      )}
      {route === "Verification" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={Verification}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Header;
