import CoursePlayer from "@/app/utils/CoursePlayer";
import Ratings from "@/app/utils/Ratings";
import React, { useState } from "react";
import { IoMdCheckmark } from "react-icons/io";
import { useSelector } from "react-redux";
import { format } from "timeago.js";
import Link from "next/link";
import CourseContentList from "../Course/CourseContentList";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import Image from "next/image";
import { useEffect } from "react";
import axios from "axios";
import Razorpay from "razorpay";

type Props = {
  data: any;
  setOpen: (open: boolean) => void;
  setRoute: (route: string) => void;
};

const CourseDetails = ({ data, setRoute, setOpen }: Props) => {
  const courseId = data._id;
  const { data: userData } = useLoadUserQuery(undefined, {});
  const user = userData?.user;
  const discountPercentage =
    ((data?.estimatedPrice - data.price) / data?.estimatedPrice) * 100;
  const discountPercentagePrice = discountPercentage.toFixed(0);

  const isPurchased =
    user && user?.courses?.find((item: any) => item.courseId === data._id);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleLogin = () => {
    setRoute("LogIn");
    setOpen(true);
  };

  const handleOrder = async () => {
    try {
      const {
        data: { order },
      } = await axios.post("http://localhost:8000/api/v1/create-payment", {
        courseId,
      });

      const {
        data: { key },
      } = await axios.get("http://localhost:8000/api/v1/get-key");

      const options = {
        key_id: key,
        amount: order.amount,
        currency: "INR",
        name: "Code Connect",
        description: "Course Purchasing",
        image: "../../../public/assets/code_connect.png",
        order_id: order.id,
        callback_url: "http://localhost:8000/api/v1/paymentVerification",
        prefill: {
          name: user?.name,
          email: user?.email,
          contact: user?.contact,
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#2563eb",
        },
      };

      if (window.Razorpay) {
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
      } else {
        console.log("Razorpay script not loaded");
      }
    } catch (error) {
      console.error("Failed to create payment: ", error);
    }
  };

  return (
    <div className="bg-violet-50">
      <div className="container m-auto py-5">
        <div className="w-full flex flex-col-reverse md:flex-row gap-10">
          <div className="w-full py-5 md:w-[65%] md:pr-5">
            <h1 className="text-[32px] font-Poppins font-bold text-black mb-3">
              {data.name}
            </h1>
            <div className="flex items-center justify-between pt-3">
              <div className="flex items-center">
                <Ratings rating={data.ratings} />
                <h5 className="text-black">{data.reviews?.length} Reviews</h5>
              </div>
              <h5 className="text-neutral-800">{data.purchased} Students</h5>
            </div>
            <br />
            <div className="w-full">
              <h1 className="text-2xl mb-3 font-bold font-Poppins">
                Course Details
              </h1>
              <p className="text-black">{data.description}</p>
            </div>
            <br />
            <div className="p-8 mb-5 bg-white shadow rounded-xl">
              <h1 className="text-2xl mb-3 font-bold font-Poppins">
                What you&apos;ll learn from this course?
              </h1>
              <div>
                {data.benefits?.map((item: any, index: number) => (
                  <div className="w-full flex md:items-center py-2" key={index}>
                    <div className="mr-1">
                      <IoMdCheckmark size={20} className="text-black" />
                    </div>
                    <p className="pl-2 text-black">{item.title}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-8 bg-white shadow rounded-xl">
              <h1 className="text-2xl mb-3 font-bold font-Poppins">
                Requirements
              </h1>
              <div>
                {data.prerequisites?.map((item: any, index: number) => (
                  <div className="w-full flex md:items-center py-2" key={index}>
                    <div className="mr-1">
                      <IoMdCheckmark size={20} className="text-black" />
                    </div>
                    <p className="pl-2 text-black">{item.title}</p>
                  </div>
                ))}
              </div>
            </div>
            <br />
            <div className="bg-white p-8 shadow rounded-xl">
              <h1 className="text-2xl mb-3 font-bold font-Poppins">
                Course Overview
              </h1>
              <CourseContentList data={data?.courseData} isDemo={true} />
            </div>
            <br />

            <div className="w-full">
              <div className="m-5 flex">
                <h4 className="text-5xl font-semibold font-Poppins">
                  {Number.isInteger(data?.ratings)
                    ? data?.ratings.toFixed(1)
                    : data?.ratings.toFixed(2)}{" "}
                </h4>
                <div className="mb-2 ml-4">
                  <Ratings rating={data?.ratings} />
                  <h5 className="text-lg mt-1 font-Poppins text-black">
                    {data?.reviews?.length} Reviews
                  </h5>
                </div>
              </div>
              {(data?.reviews && [...data.reviews].reverse()).map(
                (item: any, index: number) => (
                  <div className="w-full px-5 py-3" key={index}>
                    <div className="flex">
                      <div className="w-[50px] h-[50px]">
                        <div className="w-[50px] h-[50px] bg-slate-200 rounded-3xl flex items-center justify-center cursor-pointer">
                          {item.user.avatar ? (
                            <Image
                              src={item.user.avatar.url}
                              width={50}
                              height={50}
                              alt="avatar"
                              className="rounded-full w-[50px] h-[50px] object-cover"
                            />
                          ) : (
                            <div className="w-[50px] h-[50px] flex items-center justify-center text-lg bg-gray-300 rounded-full">
                              {item.user.name.slice(0, 2)}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="block ml-2">
                        <div className="w-full">
                          <h5 className="text-black pr-2 text-lg font-medium">
                            {item.user.name}
                          </h5>
                          <Ratings rating={item.rating} />
                        </div>
                        <p className="text-black">{item.comment}</p>
                        <small className="text-black">
                          {format(item.createdAt)}
                        </small>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
          <div className="w-full md:w-[35%] relative">
            <div className="sticky top-[220px] left-0 z-50 w-full">
              <CoursePlayer videoUrl={data?.demoUrl} title={data?.title} />
              <div className="flex items-center">
                <h1 className="pt-5 text-3xl font-semibold text-black">
                  {data.price === 0 ? "Free" : "₹" + data.price}
                </h1>
                <h5 className="pl-3 text-lg pt-2 line-through text-gray-500">
                  {" "}
                  {`₹ ${data.estimatedPrice}`}
                </h5>
                <h4 className="pl-3 pt-2 text-lg text-black">
                  {discountPercentagePrice}% off
                </h4>
              </div>
              <br />
              <div className="flex items-center">
                {user ? (
                  <>
                    {isPurchased ? (
                      <Link
                        href={`/course-access/${data._id}`}
                        className="w-full"
                      >
                        <button
                          type="button"
                          className="w-full py-2 px-3 text-lg bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                        >
                          Continue Course
                        </button>
                      </Link>
                    ) : (
                      <button
                        onClick={handleOrder}
                        type="button"
                        className="w-full py-2 px-3 text-lg bg-rose-500 hover:bg-rose-600 text-white rounded-md"
                      >
                        {`Buy Now Rs. ${data.price}`}{" "}
                      </button>
                    )}
                  </>
                ) : (
                  <button
                    onClick={handleLogin}
                    type="button"
                    className="w-full py-2 px-3 text-lg bg-rose-500 hover:bg-rose-600 text-white rounded-md"
                  >
                    {`Buy Now Rs. ${data.price}`}{" "}
                  </button>
                )}
              </div>
              <ul className="my-4 ml-4 list-disc">
                <li className="pb-1">Lifetime Access</li>
                <li className="pb-1">Certificate of completion</li>
                <li className="pb-1">Premium Support</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
