import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { useGetAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import SimpleLoader from "../../../components/SimpleLoader";
import { useGetAllOrdersQuery } from "@/redux/features/orders/ordersApi";
import { useGetAllUsersQuery } from "@/redux/features/user/userApi";
import { format } from "timeago.js";

type Props = {
  dash: boolean;
};

const AllInvoices = ({ dash }: Props) => {
  const { isLoading, data } = useGetAllOrdersQuery({});
  const { data: userData } = useGetAllUsersQuery({});
  const { data: courseData } = useGetAllCoursesQuery({});
  const [orderData, setOrderData] = useState<any>([]);

  useEffect(() => {
    if (data) {
      const temp = data.orders.map((item: any) => {
        const user = userData?.users.find(
          (user: any) => user._id === item.userId
        );
        const course = courseData?.courses.find(
          (course: any) => course._id === item.courseId
        );

        return {
          ...item,
          userName: user?.name,
          userEmail: user?.email,
          title: course?.title,
          price: course?.price + "Rs",
        };
      });
      setOrderData(temp);
    }
  }, [data, userData, courseData, setOrderData]);

  const columns: any = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "userName", headerName: "User Name", flex: 0.5 },
    ...(dash
      ? []
      : [
          { field: "userEmail", headerName: "User Email", flex: 1 },
          { field: "title", headerName: "Title", flex: 1 },
        ]),
    { field: "price", headerName: "Price", flex: 0.5 },

    { field: "createdAt", headerName: "Created At", flex: 0.5 },
  ];

  const rows: any = [];

  orderData &&
    orderData.forEach((item: any) => {
      rows.push({
        id: item._id,
        userName: item.userName,
        userEmail: item.userEmail,
        title: item.title,
        price: item.price,
        createdAt: format(new Date(item.createdAt)),
      });
    });
  return (
    <div className={`${dash ? "mt-0" : "mt-[100px]"}`}>
      {isLoading ? (
        <div className="w-full flex justify-center items-center">
          <SimpleLoader />
        </div>
      ) : (
        <Box m={dash ? "0" : "0px"}>
          <Box
            m={dash ? "0" : "0 0 0 0"}
            height={dash ? "350px" : "80vh"}
            sx={{ overflowX: "auto" }}
            borderRadius="24px"
            padding="0px"
            bgcolor="#fff"
            boxShadow={
              "0px 4px 6px rgba(0, 0, 0, 0.1), 0px 1px 3px rgba(0, 0, 0, 0.08)"
            }
          >
            <DataGrid
              checkboxSelection={dash ? false : true}
              rows={rows}
              columns={columns}
              sx={{
                "& .MuiDataGrid-columnHeaders .css-1essi2g-MuiDataGrid-columnHeaderRow":
                  dash
                    ? {
                        backgroundColor: "#3b82f6",
                        color: "#fff",
                      }
                    : {
                        backgroundColor: "#3b82f6",
                        color: "#fff",
                      },
                "& .MuiDataGrid-columnHeaders .MuiCheckbox-root": {
                  color: "#fff",
                },
              }}
            />
          </Box>
        </Box>
      )}
    </div>
  );
};

export default AllInvoices;
