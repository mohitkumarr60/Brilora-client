"use client";
import React, { useState, useEffect } from "react";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Image from "next/image";
import image1 from "/public/assets/mohitsaroha.jpg";
import image2 from "/public/assets/mohitkumar.jpg";

const members = [
  {
    name: "Mohit Saroha",
    designation: "Full-Stack Developer | Generative AI | UI/UX",
    description: "Former Full Stack Development intern at NirmanLabs.",
    img: image1,
    link: "https://www.linkedin.com/in/mohit-saroha/",
  },
  {
    name: "Mohit Kumar",
    designation: "Front-end Developer | UI/UX",
    description:
      "Former Frontend Development intern at NirmanLabs. Early Frontend Developer at edquest",
    img: image2,
    link: "https://www.linkedin.com/in/mohitkumar282000/",
  },
];

type TeamProps = {
  name: string;
  designation: string;
  description: string;
  img: any;
  link: string;
};

const TeamMember = ({
  name,
  designation,
  description,
  img,
  link,
}: TeamProps) => {
  function handleClick() {
    window.open(link, "_blank");
  }

  return (
    <>
      <div
        className="w-full md:w-[350px] rounded-2xl border overflow-hidden shadow-md hover:scale-105 transition-all duration-200 hover:shadow-lg cursor-pointer bg-white"
        onClick={handleClick}
      >
        <div className="w-full md:h-[350px]">
          <Image
            className="h-[350px] w-full object-cover border-b"
            src={img}
            alt="ProfileImage"
          />
        </div>
        <div className="p-3 text-center">
          <h5 className="font-bold text-lg">{name}</h5>
          <p className=" font-semibold text-zinc-600 text-sm">{designation}</p>
          <p className=" font-normal  text-xs">{description}</p>
        </div>
      </div>
    </>
  );
};

type Props = {};

const Page = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("Login");

  return (
    <>
      <Heading
        title="All Courses - Code Connect"
        description="Code Connect is a platform for students to learn different skills"
        keywords="Code Connect, Programming, Robotics, Coding, LMS, Learning Management System, Nirman Labs, Artificial Intelligence, Courses"
      />
      <Header
        route={route}
        setRoute={setRoute}
        open={open}
        setOpen={setOpen}
        activeItem={2}
      />

      <div className="bg-purple-50 flex items-center py-20">
        <div className="container m-auto">
          <h5 className="font-medium text-3xl md:text-5xl text-center leading-tight">
            We are the people who make up Brilora
          </h5>
          <p className="my-2 text-center tracking-wide mt-5">
            Our philosophy is simple; hire great people and give them the
            resources and support to do their best work
          </p>
          <br />
          <div className="md:flex space-y-8 md:space-y-0 gap-20 justify-center">
            {members &&
              members.map((e) => (
                <TeamMember
                  key={e.name}
                  name={e.name}
                  designation={e.designation}
                  description={e.description}
                  img={e.img}
                  link={e.link}
                />
              ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Page;
