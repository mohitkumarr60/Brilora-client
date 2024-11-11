import React, { FC, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Modal } from "@mui/material";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit3 } from "react-icons/fi";
import {
  useAddFeaturedCourseMutation,
  useDeleteFeaturedCourseMutation,
  useGetAllCoursesQuery,
  useGetFeaturedCourseQuery,
} from "@/redux/features/courses/coursesApi";
import SimpleLoader from "../../../components/SimpleLoader";
import { format, parseISO } from "date-fns";
import { useState } from "react";
import { IoAddCircleOutline, IoWarningOutline } from "react-icons/io5";
import toast from "react-hot-toast";
import Link from "next/link";

type Props = {};

const FeaturedCourses = (props: Props) => {
  const { isLoading, data, refetch } = useGetAllCoursesQuery({});
  const [addCourseMutation, { isSuccess: addSuccess, error: addError }] =
    useAddFeaturedCourseMutation({});
  const { data: featuredData, refetch: refetchFeatured } =
    useGetFeaturedCourseQuery({});
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const [newCourseId, setNewCourseId] = useState("");
  const [featuredId, setFeaturedId] = useState("");
  const [deleteCourse, { isSuccess, error: errorDelete }] =
    useDeleteFeaturedCourseMutation();
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5, minWidth: 200 },
    { field: "title", headerName: "Course Title", flex: 1, minWidth: 300 },
    { field: "ratings", headerName: "Ratings", flex: 0.5, minWidth: 120 },
    { field: "purchased", headerName: "Purchased", flex: 0.5, minWidth: 150 },
    {
      field: "created_at",
      headerName: "Created At",
      flex: 0.5,
      minWidth: 210,
    },
    {
      field: "delete",
      headerName: "Delete",
      flex: 0.2,
      minWidth: 120,
      renderCell: (params: any) => {
        return (
          <Button
            onClick={() => {
              setOpen(!open);
              setNewCourseId(params.row.id);
            }}
          >
            <AiOutlineDelete className="text-black text-[20px]" />
          </Button>
        );
      },
    },
  ];

  const featuredCourses =
    data?.courses.filter((course: any) =>
      featuredData?.featuredCourses.featuredCourses.includes(course._id)
    ) || [];

  const rows = featuredCourses.map((item: any) => ({
    id: item._id,
    title: item.name,
    ratings: item.ratings,
    purchased: item.purchased,
    created_at: format(parseISO(item.createdAt), "PPPpp"),
  }));

  useEffect(() => {
    if (addSuccess) {
      toast.dismiss();
      toast.success("Course Added Successfully");
      setActive(false);
      refetch();
      refetchFeatured();
    }
    if (addError) {
      const errorMessage = addError as any;
      toast.dismiss();
      toast.error(errorMessage.data.message);
    }

    if (isSuccess) {
      toast.dismiss();
      toast.success("Course Removed Successfully");
      setOpen(false);
      refetch();
      refetchFeatured();
    }
    if (errorDelete) {
      const errorMessage = errorDelete as any;
      toast.dismiss();
      toast.error(errorMessage.data.message);
    }
  }, [
    isSuccess,
    errorDelete,
    refetch,
    open,
    addSuccess,
    addError,
    refetchFeatured,
  ]);

  const handleDelete = async () => {
    const id = { courseId: newCourseId };
    await deleteCourse(id);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Basic validation
    if (!featuredId.trim()) {
      toast.error("Please enter a course ID");
      return;
    }

    const data = { courseId: featuredId };
    await addCourseMutation(data);
    setActive(false);
    refetch();
  };

  return (
    <div className="mt-[100px]">
      {isLoading ? (
        <div className="w-full flex justify-center items-center">
          <SimpleLoader />
        </div>
      ) : (
        <Box m="20px">
          <div className="w-full flex justify-end">
            <div
              className="bg-white hover:bg-opacity-60 shadow-md rounded-md px-1 flex items-center cursor-pointer"
              onClick={() => setActive(!active)}
            >
              <div className="p-1">
                <IoAddCircleOutline className="text-md" />
              </div>
              <div className="p-1">Add New Featured Course</div>
            </div>
          </div>
          <Box
            m="10px 0 0 0"
            borderRadius="24px"
            height="80vh"
            boxShadow={
              "0px 4px 6px rgba(0, 0, 0, 0.1), 0px 1px 3px rgba(0, 0, 0, 0.08)"
            }
            sx={{
              overflowX: "auto",
              backgroundColor: "#fff",
            }}
          >
            <DataGrid
              checkboxSelection
              rows={rows}
              columns={columns}
              sx={{
                "& .MuiDataGrid-columnHeaders .css-1essi2g-MuiDataGrid-columnHeaderRow":
                  {
                    backgroundColor: "#3b82f6",
                    color: "#fff",
                  },
                "& .MuiDataGrid-columnHeaders .MuiCheckbox-root": {
                  color: "#fff",
                },
              }}
            />
          </Box>

          {open && (
            <Modal
              title=""
              open={open}
              onClose={() => setOpen(!open)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[400px] bg-white px-5 md:px-10 py-10 rounded-3xl shadow outline-none">
                <div className="flex justify-center pt-2">
                  <IoWarningOutline className="text-[60px] text-red-600" />
                </div>
                <h1 className="text-black text-center text-xl font-semibold py-5 font-Poppins">
                  Are you sure you want to delete this course?
                </h1>
                <div className="flex justify-around mt-3 mb-2">
                  <button
                    className="text-white bg-blue-500 px-5 py-2 rounded-sm hover:bg-blue-600 hover:shadow-md"
                    onClick={() => setOpen(!open)}
                  >
                    Cancel
                  </button>
                  <button
                    className="text-white bg-red-500 px-5 py-2 rounded-sm hover:bg-red-600 hover:shadow-md"
                    onClick={handleDelete}
                  >
                    Confirm
                  </button>
                </div>
              </Box>
            </Modal>
          )}

          {active && (
            <Modal
              title=""
              open={active}
              onClose={() => setActive(!active)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[400px] bg-white px-5 md:px-10 py-10 rounded-3xl shadow outline-none">
                <h1 className="text-black text-center text-2xl font-semibold py-5 font-Poppins">
                  Add New Featured Course
                </h1>
                <div className="mt-5">
                  <form onSubmit={handleSubmit}>
                    <input
                      name="id"
                      type="text"
                      value={featuredId}
                      onChange={(e) => setFeaturedId(e.target.value)}
                      placeholder="Enter a Course Id"
                      className="border border-gray-300 rounded-sm p-2 w-full"
                    />
                    <div className="flex justify-center mt-5 mb-2">
                      <button
                        className="text-white bg-blue-500 p-2 rounded-sm hover:bg-blue-600 hover:shadow-md"
                        type="submit"
                      >
                        Add Course
                      </button>
                    </div>
                  </form>
                </div>
              </Box>
            </Modal>
          )}
        </Box>
      )}
    </div>
  );
};

export default FeaturedCourses;
