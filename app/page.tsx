"use client";
import React, { FC, useState } from "react";
import Heading from "./utils/Heading";
import Header from "./components/Header";
import Hero from "./components/Route/Hero";
import Category from "./components/Route/Category";
import Courses from "./components/Route/Courses";
import Featuring from "./components/Route/Featuring";
import Partners from "./components/Route/Partners";
import Footer from "./components/Footer";
import Credits from "./components/Credits";
interface Props {}

const Page: FC<Props> = () => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");

  return (
    <div>
      <Heading
        title="Brilora"
        description="Brilora is a platform for students to learn different skills"
        keywords="Brilora, Programming, Robotics, Coding, LMS, Learning Management System, Nirman Labs, Artificial Intelligence, Courses"
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        setRoute={setRoute}
        route={route}
      />
      <Hero />
      <Category />
      <Courses />
      <Featuring />
      <Partners />
      <Footer />
      <Credits />
    </div>
  );
};

export default Page;
