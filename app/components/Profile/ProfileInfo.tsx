import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import avatarIcon from "../../../public/assets/avatar.jpg";
import { HiOutlineCamera } from "react-icons/hi2";
import {
  useUpdateAvatarMutation,
  useEditProfileMutation,
} from "@/redux/features/user/userApi";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import Modal from "./Modal";
import toast from "react-hot-toast";

type Props = {
  avatar: string | null;
  user: any;
};

const ProfileInfo: FC<Props> = ({ avatar, user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [loadUser, setLoadUser] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const { refetch } = useLoadUserQuery(undefined, { skip: !user });
  const [updateAvatar, { isSuccess, error }] = useUpdateAvatarMutation();
  const [editProfile, { isSuccess: editSuccess }] = useEditProfileMutation();

  useEffect(() => {
    if (user?.avatar) {
      setImageUrl(user.avatar.url);
    }
  }, [user]);

  const handleImageClick = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const imageHandler = async (e: any) => {
    const fileReader = new FileReader();
    fileReader.onload = async () => {
      if (fileReader.readyState === 2) {
        await updateAvatar(fileReader.result);
      }
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (isSuccess || editSuccess) {
      toast.success("Profile updated successfully!");
      refetch();
    }
  }, [editSuccess, isSuccess, refetch]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (name !== "") {
      await editProfile({
        name: name,
      });
    }
  };

  return (
    <>
      <div className="m-auto flex p-10 justify-center">
        <div className="f">
          <Image
            src={imageUrl || avatar || avatarIcon}
            width={500}
            height={500}
            alt=""
            onClick={handleImageClick}
            className="w-32 h-32 object-cover cursor-pointer border-2 border-violet-400 p-1 rounded-full transition-transform duration-100 hover:scale-105 hover:border-violet-600"
          />
          {isOpen && (
            <Modal imageUrl={imageUrl || ""} onClose={handleCloseModal} />
          )}
          <input
            type="file"
            name=""
            id="avatar"
            className="hidden"
            placeholder="photo"
            onChange={imageHandler}
            accept="image/jpg, image/png, image/jpeg, image/webp"
          />
          <label
            htmlFor="avatar"
            className="w-10 h-10 bg-black flex rounded-full items-center relative top-[-128px] left-[128px] justify-center cursor-pointer hover:scale-105"
          >
            <HiOutlineCamera className="text-white text-2xl" />
          </label>
        </div>
      </div>
      <div className="lg:col-span-3 justify-center text-center">
        <form onSubmit={handleSubmit}>
          <div className="w-full">
            <label className="block font-semibold text-lg pb-1">
              Full Name
            </label>
            <input
              type="text"
              className="w-[90%] sm:w-[60%] px-3 py-2 mb-6 rounded shadow  focus:outline-violet-400"
              placeholder="Full Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="w-full">
            <label className="block font-semibold text-lg pb-1">
              Email Address
            </label>
            <input
              type="text"
              className="w-[90%] sm:w-[60%] px-3 py-2 mb-6 rounded shadow focus:outline-violet-400 cursor-not-allowed text-slate-500"
              placeholder="Full Name"
              required
              readOnly
              value={user?.email || ""}
              onChange={(e) => setName(e.target.value)}
            />
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

export default ProfileInfo;
