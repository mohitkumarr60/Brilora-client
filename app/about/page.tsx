"use client";
import React, { useState, useEffect } from "react";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import Footer from "../components/Footer";

type Props = {};

const Page = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("Login");

  return (
    <>
      <Header
        route={route}
        setRoute={setRoute}
        open={open}
        setOpen={setOpen}
        activeItem={2}
      />
      <div className="w-[95%] m-auto min-h-[85vh] ">
        <Heading
          title="All Courses - Code Connect"
          description="Code Connect is a platform for students to learn different skills"
          keywords="Code Connect, Programming, Robotics, Coding, LMS, Learning Management System, Nirman Labs, Artificial Intelligence, Courses"
        />
        <br />
        <div className="w-full px-3 py-10 md:p-10">
          <h2 className="text-3xl font-Exo text-center font-bold">About Us</h2>
          <br />
          <p className="font-Poppins">
            Welcome to Code Connect, where learning meets innovation.
          </p>
          <br />
          <p className="font-Poppins">
            At Code Connect, our mission is to revolutionize education by
            providing an intuitive, flexible, and engaging learning management
            system. We believe that education is a journey, not a destination,
            and our platform is designed to support learners and educators every
            step of the way.
          </p>
          <br />
          <h3 className="text-2xl font-Exo font-semibold">Who We Are?</h3>
          <p className="font-Poppins mt-2">
            We are a team of passionate educators, technologists, and lifelong
            learners committed to transforming the educational landscape. With
            years of experience in both teaching and technology, we understand
            the challenges faced by educators and students alike. Our diverse
            backgrounds allow us to create a platform that addresses the needs
            of a global community.
          </p>
          <br />
          <h3 className="text-2xl font-Exo font-semibold">What We Do?</h3>
          <p className="font-Poppins mt-2">
            Our LMS platform is built to empower educators to deliver
            personalized learning experiences and help students achieve their
            full potential. We offer a wide range of features designed to
            enhance the learning process, including:
          </p>
          <ul className="font-Poppins mt-2">
            <li className="list-disc ml-5 mb-2">
              <span className="font-semibold">User-Friendly Interface:</span>{" "}
              Our intuitive design ensures that users of all ages and technical
              abilities can navigate the platform with ease.
            </li>
            <li className="list-disc ml-5 mb-2">
              <span className="font-semibold">Customizable Courses:</span>{" "}
              Educators can create and tailor courses to meet the specific needs
              of their students.
            </li>
            <li className="list-disc ml-5 mb-2">
              <span className="font-semibold">Interactive Content:</span> Engage
              students with multimedia content and collaborative tools.
            </li>
            <li className="list-disc ml-5 mb-2">
              <span className="font-semibold">Seamless Integration:</span>{" "}
              Easily integrate with other tools and platforms to create a
              cohesive learning environment.
            </li>
          </ul>
          <br />
          <h3 className="text-2xl font-Exo font-semibold">Our Vision</h3>
          <p className="font-Poppins mt-2">
            We envision a world where education is accessible, personalized, and
            inspiring. By leveraging the power of technology, we aim to break
            down barriers to education and create opportunities for learners
            everywhere. Our goal is to be at the forefront of the digital
            learning revolution, continually evolving to meet the changing needs
            of educators and students.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Page;
