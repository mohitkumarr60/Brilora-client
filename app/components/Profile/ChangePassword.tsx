import React, { FC, useEffect, useState } from "react";
import { useUpdateUserPasswordMutation } from "@/redux/features/user/userApi";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import toast from "react-hot-toast";

type Props = {};

const ChangePassword: FC<Props> = (setRoute) => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [updatePassword, { isSuccess, error }] =
    useUpdateUserPasswordMutation();

  const updatePasswordHandler = async (e: any) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      await updatePassword({ oldPassword, newPassword });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Password updated successfully!");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);

  return (
    <>
      <div className="lg:col-span-3 m-auto pt-10 justify-center">
        <h5 className="font-Poppins font-semibold text-3xl text-center mb-5">
          Change Password
        </h5>
      </div>
      <div className="lg:col-span-3 justify-center text-center">
        <form onSubmit={updatePasswordHandler}>
          <div className="w-full flex flex-wrap">
            <div className="w-full block">
              <label className="block font-semibold text-lg pb-1">
                Old Password
              </label>
            </div>
            <div className="w-full flex justify-center ml-5 mb-6">
              <input
                type={!showOldPassword ? "password" : "text"}
                name="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                id="oldPassword"
                required
                placeholder="Enter your old password"
                className="w-[90%] sm:w-[60%] px-3 py-2 rounded shadow  focus:outline-violet-400"
              />
              {!showOldPassword ? (
                <AiOutlineEyeInvisible
                  className="relative right-[32px] self-center z-1 cursor-pointer text-gray-400"
                  size={20}
                  onClick={() => setShowOldPassword(true)}
                />
              ) : (
                <AiOutlineEye
                  className="relative right-[32px] self-center z-1 cursor-pointer text-gray-400"
                  size={20}
                  onClick={() => setShowOldPassword(false)}
                />
              )}
            </div>
          </div>
          <div className="w-full flex flex-wrap">
            <div className="w-full block">
              <label className="block font-semibold text-lg pb-1">
                New Password
              </label>
            </div>
            <div className="w-full flex justify-center ml-5 mb-6">
              <input
                type={!showNewPassword ? "password" : "text"}
                name="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                id="newPassword"
                required
                placeholder="Enter your old password"
                className="w-[90%] sm:w-[60%] px-3 py-2 rounded shadow  focus:outline-violet-400"
              />
              {!showNewPassword ? (
                <AiOutlineEyeInvisible
                  className="relative right-[32px] self-center z-1 cursor-pointer text-gray-400"
                  size={20}
                  onClick={() => setShowNewPassword(true)}
                />
              ) : (
                <AiOutlineEye
                  className="relative right-[32px] self-center z-1 cursor-pointer text-gray-400"
                  size={20}
                  onClick={() => setShowNewPassword(false)}
                />
              )}
            </div>
          </div>
          <div className="w-full flex flex-wrap">
            <div className="w-full block">
              <label className="block font-semibold text-lg pb-1">
                Old Password
              </label>
            </div>
            <div className="w-full flex justify-center ml-5 mb-6">
              <input
                type={!showConfirmPassword ? "password" : "text"}
                name="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                id="confirmPassword"
                required
                placeholder="Enter your old password"
                className="w-[90%] sm:w-[60%] px-3 py-2 rounded shadow  focus:outline-violet-400"
              />
              {!showConfirmPassword ? (
                <AiOutlineEyeInvisible
                  className="relative right-[32px] self-center z-1 cursor-pointer text-gray-400"
                  size={20}
                  onClick={() => setShowConfirmPassword(true)}
                />
              ) : (
                <AiOutlineEye
                  className="relative right-[32px] self-center z-1 cursor-pointer text-gray-400"
                  size={20}
                  onClick={() => setShowConfirmPassword(false)}
                />
              )}
            </div>
          </div>

          <input
            type="submit"
            className="bg-violet-600 text-white font-medium px-4 py-2 rounded hover:bg-violet-700 cursor-pointer active:scale-95"
            value="Update"
          />
        </form>
      </div>
    </>
  );
};

export default ChangePassword;
