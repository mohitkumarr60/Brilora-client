"use client";
import { useActivationMutation } from "@/redux/features/auth/authApi";
import React, { FC, useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { useSelector } from "react-redux";

type Props = {
  setRoute: (route: string) => void;
};

type VerifyNumber = {
  "0": string;
  "1": string;
  "2": string;
  "3": string;
};

const Verification: FC<Props> = ({ setRoute }) => {
  const { token } = useSelector((state: any) => state.auth);
  const [activation, { isSuccess, error }] = useActivationMutation();
  const [invalidError, setInvalidError] = useState<boolean>(false);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Account activated successfully");
      setRoute("Login");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
        setInvalidError(true);
      } else {
        console.log("Error occurred:", error);
      }
    }
  }, [isSuccess, error, setRoute]);

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const [verifyNumber, setVerifyNumber] = useState<VerifyNumber>({
    "0": "",
    "1": "",
    "2": "",
    "3": "",
  });

  const verificationHandler = async () => {
    const verificationNumber = Object.values(verifyNumber).join("");
    if (verificationNumber.length !== 4) {
      setInvalidError(true);
      return;
    }
    await activation({
      activation_token: token,
      activation_code: verificationNumber,
    });
  };

  const handleInputChange = (index: number, value: string) => {
    setInvalidError(false);
    const newVerifyNumber = { ...verifyNumber, [index]: value };
    setVerifyNumber(newVerifyNumber);

    if (value === "" && index > 0) {
      inputRefs[index - 1].current?.focus();
    } else if (value.length === 1 && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  return (
    <div className="w-full p-8 sm:p-16">
      <h1 className="text-2xl font-bold text-center p-4 mb-5 font-Poppins">
        Verify your account
      </h1>
      <div className="flex justify-center">
        <div className="bg-gradient-to-r from-blue-400 to-blue-600 rounded-full p-5 shadow-md">
          <VscWorkspaceTrusted size={40} className="text-white" />
        </div>
      </div>
      <div className="flex justify-between m-8">
        {Object.keys(verifyNumber).map((key, index) => (
          <input
            type="text"
            key={key}
            ref={inputRefs[index]}
            className={`w-16 h-16 p-2 rounded-full cursor-text text-center text-xl font-semibold ${
              invalidError ? "border-2 border-red-400" : "border shadow-md"
            }`}
            placeholder="0"
            maxLength={1}
            value={verifyNumber[key as keyof VerifyNumber]}
            onChange={(e) => handleInputChange(index, e.target.value)}
          />
        ))}
      </div>
      <div className="flex justify-center mb-10">
        <button
          className="bg-blue-500 text-white px-5 py-3 rounded-sm mx-1 font-medium hover:bg-opacity-80 cursor-pointer hover:bg-gradient-to-r"
          onClick={verificationHandler}
        >
          Verify OTP
        </button>
      </div>
      <h5
        onClick={() => setRoute("LogIn")}
        className="text-center font-medium hover:text-blue-700 hover:underline cursor-pointer"
      >
        Go back to Login?
      </h5>
    </div>
  );
};
export default Verification;
