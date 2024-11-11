import React, { FC, useState } from "react";
import UserAnalytics from "../Analytics/UserAnalytics";
import OrderAnalytics from "../Analytics/OrdersAnalytics";
import AllInvoices from "../Order/AllInvoices";
import numeral from "numeral";
import { useGetTotalUsersQuery } from "@/redux/features/analytics/analyticsApi";
import { useGetTotalOrdersQuery } from "@/redux/features/analytics/analyticsApi";

type Props = {
  open?: boolean;
  value?: number;
};

const DashboardWidgets: FC<Props> = ({ open }) => {
  const { data: totalUsersData } = useGetTotalUsersQuery({});
  const { data: totalOrdersData } = useGetTotalOrdersQuery({});

  const totalUsers = totalUsersData?.users;
  const totalOrders = totalOrdersData?.orders;

  return (
    <div className="h-screen overflow-y-auto">
      <div className="mt-[100px]">
        <div className="grid grid-cols-2 sm:grid-cols-7 sm:grid-rows-7 gap-5">
          <div className="col-span-2 sm:col-span-5 sm:row-span-4 h-[450px] p-5 sm:px-4 sm:pt-8 bg-white rounded-3xl shadow-md">
            <UserAnalytics isDash={true} />
          </div>
          <div className="col-span-2 sm:col-span-2 sm:row-span-2 rounded-3xl shadow-md p-5 sm:p-8 bg-white flex items-center">
            <div>
              <h5 className="text-5xl font-Poppins text-indigo-600 font-semibold mb-2">
                {numeral(totalUsers).format("0.0a")}
              </h5>
              <h5 className="text-2xl font-semibold">Total Users</h5>
            </div>
          </div>
          <div className="sm:col-span-2 col-span-2 sm:row-span-2 rounded-3xl shadow-md p-5 sm:p-8 bg-white flex items-center ">
            <div>
              <h5 className="text-5xl font-Poppins text-indigo-600 font-semibold mb-2">
                {numeral(totalOrders).format("0.0a")}
              </h5>
              <h5 className="text-2xl font-semibold">Total Orders</h5>
            </div>
          </div>
          <div className="col-span-2 sm:col-span-4 sm:row-span-4 rounded-3xl shadow-md p-5 sm:px-4 pt-8 bg-white">
            <OrderAnalytics isDash={true} />
          </div>
          <div className="col-span-2 sm:col-span-3 sm:row-span-4 rounded-3xl shadow-md bg-white overflow-hidden">
            <AllInvoices dash={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardWidgets;
