"use client";
import React, { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

type Props = {
  setRoute: (route: string) => void;
  setOpen: (open: boolean) => void;
};

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Please enter your email"),
  password: Yup.string()
    .required("Please enter your password")
    .min(6, "Password must be at least 6 characters long"),
});

const Login: FC<Props> = ({ setRoute, setOpen }) => {
  const [show, setShow] = useState(false);
  const [login, { isSuccess, error }] = useLoginMutation();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: async ({ email, password }) => {
      await login({ email, password });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Login Successful");
      setOpen(false);
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error, setOpen]);

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className="w-full p-8 sm:p-16 m-0">
      <div className="flex justify-center">
        <Image
          src={"/favicon.ico"}
          width={50}
          height={50}
          alt="Code Connect"
          className=""
        />
      </div>
      <h1 className="text-2xl font-bold text-center p-5 mb-4 font-Poppins">
        Login with Code Connect
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="text-base font-medium" htmlFor="email">
            Email:
          </label>
          <input
            type="email"
            name=""
            value={values.email}
            onChange={handleChange}
            id="email"
            placeholder="Enter your Email"
            className={`${
              errors.email && touched.email && "border-red-500"
            } w-full p-4 border border-solid`}
          />
          {errors.email && touched.email && (
            <p className="text-red-500">{errors.email}</p>
          )}
        </div>
        <div className="w-full relative">
          <label className="text-base font-medium" htmlFor="email">
            Password:
          </label>
          <input
            type={!show ? "password" : "text"}
            name="password"
            value={values.password}
            onChange={handleChange}
            id="password"
            placeholder="Enter your Password"
            className={`${
              errors.password && touched.password && "border-red-500"
            } w-full p-4 border border-solid`}
          />
          {!show ? (
            <AiOutlineEyeInvisible
              className="absolute bottom-[20px] right-5 z-1 cursor-pointer text-gray-400"
              size={20}
              onClick={() => setShow(true)}
            />
          ) : (
            <AiOutlineEye
              className="absolute bottom-[20px] right-5 z-1 cursor-pointer text-gray-800"
              size={20}
              onClick={() => setShow(false)}
            />
          )}
        </div>
        {errors.password && touched.password && (
          <p className="text-red-500">{errors.password}</p>
        )}

        <div className="w-full mt-3">
          <input
            type="submit"
            value="Login"
            className="bg-blue-600 text-white px-5 py-3 rounded-sm mx-1 shadow-md font-medium hover:bg-blue-700 cursor-pointer"
          />
        </div>
        <br />
        <h5 className="text-center text-lg pb-3">or</h5>
        <div
          className="flex items-center justify-center border border-sm py-3 hover:shadow-md cursor-pointer transition-all duration-100"
          onClick={() => signIn("google")}
        >
          <h3 className="pr-2">Continue with Google</h3>
          <FcGoogle size={30} />
        </div>
        <h5 className="text-center p-3">
          Don{"'"}t have any account?{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => setRoute("SignUp")}
          >
            Sign up
          </span>
        </h5>
      </form>
    </div>
  );
};

export default Login;
