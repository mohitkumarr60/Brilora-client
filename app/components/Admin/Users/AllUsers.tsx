import React, { FC, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Modal } from "@mui/material";
import { AiOutlineDelete } from "react-icons/ai";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
} from "@/redux/features/user/userApi";
import { format, parseISO } from "date-fns";
import { IoAddCircleOutline } from "react-icons/io5";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { IoWarningOutline } from "react-icons/io5";
import SimpleLoader from "../../SimpleLoader";

type Props = {
  isTeam: boolean;
};

const AllUsers: FC<Props> = ({ isTeam }) => {
  const { isLoading, data, error, refetch } = useGetAllUsersQuery({});
  const [active, setActive] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("admin");
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [updateUserRole, { error: updateError, isSuccess }] =
    useUpdateUserRoleMutation();
  const [deleteUser, { isSuccess: deleteSuccess, error: deleteError }] =
    useDeleteUserMutation({});

  useEffect(() => {
    if (updateError) {
      if ("data" in updateError) {
        const errorMessage = updateError as any;
        toast.error(errorMessage.data.message);
      }
    }
    if (isSuccess) {
      toast.success("User role updated successfully");
      setActive(false);
      refetch();
    }
    if (deleteSuccess) {
      toast.success("User deleted successfully");
      setOpen(false);
      refetch();
    }
    if (deleteError) {
      if ("data" in deleteError) {
        const errorMessage = deleteError as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [updateError, isSuccess, deleteError, deleteSuccess, refetch]);

  const columns = [
    { field: "id", headerName: "ID", flex: 1, minWidth: 200 },
    { field: "name", headerName: "Name", flex: 1, minWidth: 180 },
    { field: "email", headerName: "email", flex: 1, minWidth: 220 },
    { field: "role", headerName: "role", flex: 0.2, minWidth: 100 },
    {
      field: "courses",
      headerName: "Purchased Courses",
      flex: 0.5,
      minWidth: 150,
    },
    {
      field: "created_at",
      headerName: "Created At",
      flex: 1,
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
              setUserId(params.row.id);
            }}
          >
            <AiOutlineDelete className="text-black text-[20px]" />
          </Button>
        );
      },
    },
  ];

  const rows: any = [];

  if (isTeam) {
    const newData =
      data && data.users.filter((item: any) => item.role === "admin");
    console.log(newData);

    newData &&
      newData.forEach((item: any) => {
        rows.push({
          id: item._id,
          name: item.name,
          email: item.email,
          role: item.role,
          courses: item.courses.length,
          created_at: format(parseISO(item.createdAt), "PPPpp"),
        });
      });
  } else {
    data &&
      data.users.forEach((item: any) => {
        rows.push({
          id: item._id,
          name: item.name,
          email: item.email,
          role: item.role,
          courses: item.courses.length,
          created_at: format(parseISO(item.createdAt), "PPPpp"),
        });
      });
  }

  const handleSubmit = async () => {
    await updateUserRole({ email, role });
  };

  const handleDelete = async () => {
    const id = userId;
    await deleteUser(id);
  };

  return (
    <div className="mt-[100px]">
      {isLoading ? (
        <SimpleLoader />
      ) : (
        <Box>
          {isTeam && (
            <div className="w-full flex justify-end">
              <div
                className="bg-white hover:bg-opacity-60 shadow-md shadow-gray-400 rounded-md px-1 flex items-center cursor-pointer"
                onClick={() => setActive(!active)}
              >
                <div className="p-1">
                  <IoAddCircleOutline className="text-md" />
                </div>
                <div className="p-1">Add New Member</div>
              </div>
            </div>
          )}
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
                  Add New Member
                </h1>
                <div className="mt-5">
                  <input
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="border border-gray-300 rounded-sm p-2 w-full"
                  />
                  <select
                    title="options"
                    name=""
                    id=""
                    className="border border-gray-300 rounded-sm p-2 w-full mt-5"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>

                  <div className="flex justify-center mt-5 mb-2">
                    <button
                      className="text-white bg-blue-500 p-2 rounded-sm hover:bg-blue-600 hover:shadow-md"
                      onClick={handleSubmit}
                    >
                      Change Role
                    </button>
                  </div>
                </div>
              </Box>
            </Modal>
          )}
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
                  Are you sure you want to delete this user?
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
        </Box>
      )}
    </div>
  );
};

export default AllUsers;
