"use client";
import React, { FC, useState } from "react";
import Protected from "../hooks/useProtected";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import Profile from "../components/Profile/Profile";
import { useSelector } from "react-redux";
import Footer from "../components/Footer";
import Credits from "../components/Credits";

type Props = {};

const Page: FC<Props> = () => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(5);
  const [route, setRoute] = useState("Login");
  const { user } = useSelector((state: any) => state.auth);

  return (
    <div>
      <Protected>
        <Heading
          title={`${user?.name}'s Profile - Code Connect`}
          description="Code Connect is a platform for students to learn different skills"
          keywords="Code Connect, Programming, Robotics, Coding, LMS, Learning Management System, Nirman Labs, Artificial Intelligence, Courses"
        />
        <Header
          open={open}
          setOpen={setOpen}
          activeItem={5}
          setRoute={setRoute}
          route={route}
        />
        <div className="bg-purple-50">
          <Profile user={user} />
        </div>
        <Footer />
        <Credits/>
      </Protected>
    </div>
  );
};

export default Page;
