import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "@/redux/features/layout/layoutApi";
import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { HiMinus, HiPlus } from "react-icons/hi";
import { IoMdAddCircleOutline } from "react-icons/io";
import _ from "lodash";
import SimpleLoader from "../../SimpleLoader";

type Props = {};

const EditFeaturing = (props: Props) => {
  const { data, isLoading, refetch } = useGetHeroDataQuery("Featuring", {});

  const [editLayout, { isSuccess, error }] = useEditLayoutMutation();

  const [name, setName] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      setName(data.layout.featuring);
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

  const toggleDetails = (id: any) => {
    setName((prevNames) =>
      prevNames.map((item) =>
        item._id === id ? { ...item, active: !item.active } : item
      )
    );
  };

  const handleNameChange = (id: any, value: string) => {
    setName((prevNames) =>
      prevNames.map((item) =>
        item._id === id ? { ...item, name: value } : item
      )
    );
  };

  const handleTitleChange = (id: any, value: string) => {
    setName((prevNames) =>
      prevNames.map((item) =>
        item._id === id ? { ...item, title: value } : item
      )
    );
  };

  const handleDescriptionChange = (id: any, value: string) => {
    setName((prevNames) =>
      prevNames.map((item) =>
        item._id === id ? { ...item, description: value } : item
      )
    );
  };

  const newFeaturingHandler = () => {
    setName([
      ...name,
      {
        name: "",
        title: "",
        description: "",
      },
    ]);
  };

  // check whether the data is changed or not
  const hasChanges = (originalData: any[], newData: any[]) => {
    return JSON.stringify(originalData) === JSON.stringify(newData);
  };

  const isAnyNameEmpty = (names: any[]) => {
    return names.some(
      (name) =>
        name.name.trim() === "" ||
        name.title.trim() === "" ||
        name.description.trim() === ""
    );
  };

  const handleUpdate = async () => {
    if (!hasChanges(data.layout.featuring, name) && !isAnyNameEmpty(name)) {
      await editLayout({
        type: "Featuring",
        featuring: name,
      });
    }
  };

  return (
    <>
      {isLoading ? (
        <SimpleLoader />
      ) : (
        <div>
          <div className="flex mt-[100px] justify-end mr-8 mb-2">
            <button
              type="button"
              className={`text-white bg-slate-400 px-3 py-2 rounded-sm shadow-md my-5 ${
                hasChanges(data.layout.featuring, name) || isAnyNameEmpty(name)
                  ? "cursor-not-allowed"
                  : "cursor-pointer !bg-blue-500"
              }`}
              onClick={
                hasChanges(data.layout.featuring, name) || isAnyNameEmpty(name)
                  ? () => {}
                  : handleUpdate
              }
            >
              Save
            </button>
          </div>
          <div className="w-[80%] m-auto bg-white p-10 rounded-3xl shadow-md">
            <dl className="space-y-2">
              {name.map((q: any) => (
                <div
                  key={q._id}
                  className={`${
                    q._id !== name[0]?._id && "border-t"
                  } border-slate-500 pt-6`}
                >
                  <dt className="text-lg font-medium">
                    <div
                      className="flex justify-between w-full text-left focus:outline-none items-center"
                      onClick={() => toggleDetails(q._id)}
                    >
                      <input
                        className="w-full mt-1 p-2 rounded-sm mb-3"
                        value={q.name}
                        onChange={(e: any) =>
                          handleNameChange(q._id, e.target.value)
                        }
                        placeholder="Name"
                      />
                      <span className="ml-6 flex-shrink-0">
                        {q.active ? (
                          <HiMinus className="h-6 w-6" />
                        ) : (
                          <HiPlus className="h-6 w-6" />
                        )}
                      </span>
                    </div>
                  </dt>
                  {q.active && (
                    <>
                      <dd className="mt-2 pr-12">
                        <input
                          className="w-full mt-1 p-2 rounded-sm mb-1"
                          value={q.title}
                          onChange={(e: any) =>
                            handleTitleChange(q._id, e.target.value)
                          }
                          placeholder={"Title"}
                        />
                      </dd>
                      <dd className="mt-2 pr-12">
                        <input
                          className="w-full mt-1 p-2 rounded-sm mb-1"
                          value={q.description}
                          onChange={(e: any) =>
                            handleDescriptionChange(q._id, e.target.value)
                          }
                          placeholder={"Write a few Lines"}
                        />
                        <span className="ml-6 flex-shrink-0">
                          <AiOutlineDelete
                            className="h-5 w-5 cursor-pointer"
                            onClick={() => {
                              setName((prevDescriptions) =>
                                prevDescriptions.filter(
                                  (item) => item._id !== q._id
                                )
                              );
                            }}
                          />
                        </span>
                      </dd>
                    </>
                  )}
                </div>
              ))}
            </dl>
            <br />
            <IoMdAddCircleOutline
              className="h-6 w-6 cursor-pointer"
              onClick={newFeaturingHandler}
            />
          </div>
        </div>
      )}
    </>
  );
};
export default EditFeaturing;
