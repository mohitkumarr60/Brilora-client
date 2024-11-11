import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "@/redux/features/layout/layoutApi";
import React, { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineCamera } from "react-icons/ai";

type Props = {};

const EditHero: FC<Props> = (props: Props) => {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [text, setText] = useState("");
  const { data, refetch } = useGetHeroDataQuery("Banner");
  const [editLayout, { isLoading, isSuccess, error }] = useEditLayoutMutation();

  useEffect(() => {
    if (data) {
      setTitle(data?.layout?.banner.title);
      setSubTitle(data?.layout?.banner.subTitle);
      setText(data?.layout?.banner.text);
      setImage(data?.layout?.banner?.image?.url);
    }
    if (isSuccess) {
      refetch();
      toast.success("Hero Updated Successfully");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message);
      }
    }
  }, [data, error, refetch, isSuccess]);

  const handleUpdate = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = async () => {
    await editLayout({
      type: "Banner",
      image,
      title,
      subTitle,
      text,
    });
  };

  return (
    <>
      <div className="flex mt-[140px] justify-end mr-5 mb-2">
        <button
          className={`text-white bg-slate-400 px-3 py-2 rounded-sm shadow-md ${
            data?.layout?.banner?.title !== title ||
            data?.layout?.banner?.subTitle !== subTitle ||
            data?.layout?.banner?.text !== text ||
            data?.layout?.banner?.image?.url !== image
              ? "cursor-pointer !bg-blue-500 hover:!bg-blue-600"
              : "cursor-not-allowed"
          }`}
          onClick={
            data?.layout?.banner?.title !== title ||
            data?.layout?.banner?.subTitle !== subTitle ||
            data?.layout?.banner?.text !== text ||
            data?.layout?.banner?.image?.url !== image
              ? handleEdit
              : () => {}
          }
        >
          Save
        </button>
      </div>
      <div
        className={`container flex flex-row w-full flex-wrap sm:h-[500px] py-5 sm:py-0 items-center bg-white rounded-[24px] shadow-md px-5`}
      >
        <div className="basis-[100%] md:basis-[45%] lg:basis-[40%] relative justify-center items-center flex">
          <div className="relative flex items-center rounded-full border-4 border-sky-500 justify-end group">
            <img
              src={image}
              alt=""
              className="object-cover w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] rounded-full"
            />
            <input
              type="file"
              name=""
              id="banner"
              placeholder="image"
              accept="image/*"
              onChange={handleUpdate}
              className="hidden"
            />
            <label
              htmlFor="banner"
              className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-25 opacity-0 group-hover:opacity-100 rounded-full cursor-pointer transition-all duration-200"
            >
              <AiOutlineCamera className="text-[50px] sm:text-[80px] text-white" />
            </label>
          </div>
        </div>
        <div className="basis-[100%] md:basis-[55%] lg:basis-[60%] flex flex-col gap-5">
          <textarea
            className="font-Ubuntu text-[40px] sm:text-[48px] md:text-[52px] lg:text-[58px] leading-[1.2] font-bold bg-gradient-to-r from-blue-700 via-cyan-500 to-teal-500 text-transparent bg-clip-text resize-none outline-none"
            value={title}
            placeholder="Enter a title"
            onChange={(e) => setTitle(e.target.value)}
            rows={2}
            cols={1}
          />
          <textarea
            className="font-Poppins text-[14px] sm:text-[18px] md:text-[22px] lg:text-[26px] font-semibold resize-none outline-none"
            value={subTitle}
            placeholder="Enter a subtitle"
            onChange={(e) => setSubTitle(e.target.value)}
            rows={2}
            cols={1}
          />
          <textarea
            className="font-Poppins text-[12px] lg:text-[14px] resize-none outline-none"
            value={text}
            placeholder="Enter a few lines"
            onChange={(e) => setText(e.target.value)}
            rows={2}
            cols={1}
          />
        </div>
      </div>
    </>
  );
};

export default EditHero;
