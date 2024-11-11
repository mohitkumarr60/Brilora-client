/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from "react";
import {
  useGetHeroDataQuery,
  useEditLayoutMutation,
} from "@/redux/features/layout/layoutApi";
import SimpleLoader from "../../SimpleLoader";
import { toast } from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";

type Props = {};

const EditCategories = (props: Props) => {
  const { data, isLoading, refetch } = useGetHeroDataQuery("Categories", {});

  const [editLayout, { isSuccess, error }] = useEditLayoutMutation();
  const [categories, setCategories] = useState<any>([]);

  useEffect(() => {
    if (data) {
      setCategories(data.layout.categories);
    }
    if (isSuccess) {
      refetch();
      toast.success("Layout updated successfully");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message);
      }
    }
  }, [data, error, isSuccess, refetch]);

  const handleCategoriesAdd = (id: any, value: string) => {
    setCategories((prevCategory: any) =>
      prevCategory.map((i: any) => (i._id === id ? { ...i, title: value } : i))
    );
  };

  const newCategoriesHandler = () => {
    if (categories[categories.length - 1].title === "") {
      toast.error("Please enter a category");
    } else {
      setCategories((prevCategory: any) => [
        ...prevCategory,
        {
          title: "",
        },
      ]);
    }
  };

  const hasChanges = (oldCategories: any[], newCategories: any[]) => {
    return JSON.stringify(oldCategories) === JSON.stringify(newCategories);
  };

  const isAnyCategoryTitleEmpty = (categories: any[]) => {
    return categories.some((category) => category.title === "");
  };

  const editCategoriesHandler = async () => {
    if (
      !hasChanges(data.layout.categories, categories) &&
      !isAnyCategoryTitleEmpty(categories)
    ) {
      await editLayout({
        type: "Categories",
        categories,
      });
    }
  };

  return (
    <>
      {isLoading ? (
        <SimpleLoader />
      ) : (
        <div className="mt-[100px]">
          <div className="flex w-full justify-end my-5">
            <button
              className={`bg-slate-500 text-white mr-[25px] px-3 py-2 rounded-sm mx-1 hover:bg-blue-700
            ${
              hasChanges(data.layout.categories, categories) ||
              isAnyCategoryTitleEmpty(categories)
                ? "cursor-not-allowed"
                : "cursor-pointer !bg-blue-600"
            }`}
              onClick={
                hasChanges(data.layout.categories, categories) ||
                isAnyCategoryTitleEmpty(categories)
                  ? () => {}
                  : editCategoriesHandler
              }
            >
              Save
            </button>
          </div>
          <div className="text-center bg-white max-w-[400px] m-auto py-10 rounded-3xl shadow-md">
            <h1 className="text-3xl font-Poppins font-semibold my-5">
              All Categories
            </h1>
            {categories &&
              categories.map((item: any, index: number) => {
                return (
                  <div className="p-1">
                    <div className="flex items-center gap-10 w-full justify-center">
                      <input
                        className="p-2 rounded-sm mb-1"
                        value={item.title}
                        onChange={(e) =>
                          handleCategoriesAdd(item._id, e.target.value)
                        }
                        placeholder="Name"
                      />
                      <AiOutlineDelete
                        className="text-[18px] cursor-pointer"
                        onClick={() => {
                          setCategories((prevCategory: any) =>
                            prevCategory.filter((i: any) => i._id !== item._id)
                          );
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            <br />
            <div className="w-full flex justify-center">
              <IoMdAddCircleOutline
                className="text-[25px] cursor-pointer"
                onClick={newCategoriesHandler}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditCategories;
