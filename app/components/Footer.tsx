import Link from "next/link";
import React from "react";
import { BsTwitterX } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

type Props = {};

const Footer = (props: Props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 py-[100px] border-t border-slate-300 shadow-sm p-10 bg-gradient-to-br to-violet-700 from-purple-700 text-white">
      <div className="col-span-1 sm:col-span-3 lg:col-span-2 flex gap-5 justify-center">
        <div className="border rounded-full w-[60px] h-[60px] flex justify-center items-center cursor-pointer hover:shadow-md hover:bg-white hover:text-violet-600">
          <FaFacebookF size={35} />
        </div>
        <div className="border rounded-full w-[60px] h-[60px] flex justify-center items-center cursor-pointer hover:shadow-md hover:bg-white hover:text-violet-600">
          <BsTwitterX size={35} />
        </div>
        <div className="border rounded-full w-[60px] h-[60px] flex justify-center items-center cursor-pointer hover:shadow-md hover:bg-white hover:text-violet-600">
          <FaLinkedinIn
            size={35}
            onClick={() => {
              window.open(
                "https://www.linkedin.com/in/mohit-saroha/"
              );
            }}
          />
        </div>
        <div className="border rounded-full w-[60px] h-[60px] flex justify-center items-center cursor-pointer hover:shadow-md hover:bg-white hover:text-violet-600">
          <FaInstagram size={35} />
        </div>
      </div>
      <div className="col-span-1 text-center sm:text-left mt-8">
        <h3 className="text-xl font-bold mb-5">TOP CATEGORIES</h3>
        <ul className="space-y-2 sm:space-y-5">
          <li className="hover:ml-2 transition-all duration-100">
            <Link href="../../courses?page=1&category=Robotics%20%26%20AI">
              Robotics & AI
            </Link>
          </li>
          <li className="hover:ml-2 transition-all duration-100">
            <Link href="../../courses?page=1&category=Coding">STEM</Link>
          </li>
          <li className="hover:ml-2 transition-all duration-100">
            <Link href="../../courses?page=1&category=STEM">Coding</Link>
          </li>
          <li className="hover:ml-2 transition-all duration-100">
            <Link href="../../courses?page=1&category=Drone">Drone</Link>
          </li>
        </ul>
      </div>
      <div className="col-span-1 text-center sm:text-left mt-8">
        <h3 className="text-xl font-bold mb-5">QUICK LINKS</h3>
        <ul className="space-y-2 sm:space-y-5">
          <li className="hover:ml-2 transition-all duration-100">
            <Link href="">Browse Courses</Link>
          </li>
          <li className="hover:ml-2 transition-all duration-100">
            <Link href="">About</Link>
          </li>
          <li className="hover:ml-2 transition-all duration-100">
            <Link href="">Terms & Conditions</Link>
          </li>
          <li className="hover:ml-2 transition-all duration-100">
            <Link href="">Privacy Policy</Link>
          </li>
        </ul>
      </div>
      <div className="col-span-1 text-center sm:text-left mt-8">
        <h3 className="text-xl font-bold mb-5">CONTACT US</h3>
        <span className="flex flex-col space-y-3">
          <input
            type="text"
            placeholder="Email"
            className="bg-white/20 border border-white/25 p-2 rounded placeholder:text-white/70 text-white w-full"
          />
          <textarea
            name="message"
            id="message"
            placeholder="Write your message..."
            className="resize-none bg-white/20 border border-white/25 p-2 rounded placeholder:text-white/70 text-white w-full"
          />
          <button type="button" className="bg-white hover:bg-white/80 transition-all duration-200 active:scale-95 w-full text-black p-2 rounded font-medium">Send</button>
        </span>
      </div>
    </div>
  );
};

export default Footer;
