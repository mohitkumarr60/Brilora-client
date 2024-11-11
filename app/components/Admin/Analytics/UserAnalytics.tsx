import React, { FC, useState } from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  LabelList,
  Label,
  AreaChart,
} from "recharts";
import SimpleLoader from "../../SimpleLoader";
import { useGetUsersAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";

type Props = {
  isDash?: boolean;
};

const UserAnalytics: FC<Props> = ({ isDash }) => {
  const { data, isLoading, isError } = useGetUsersAnalyticsQuery({});
  const analyticsData: any = [];

  data &&
    data.users.last12Months.forEach((item: any) => {
      analyticsData.push({ name: item.month, count: item.count });
    });
  const minValue = 0;

  return (
    <>
      {isLoading ? (
        <SimpleLoader />
      ) : (
        <div
          className={`${
            isDash ? "h-[350px]" : "h-[700px]"
          } mr-5 sm:ml-5 sm:mr-10`}
        >
          <div className="mb-5">
            <h1 className="text-3xl font-bold">Users Analytics</h1>
            <p className="text-lg font-medium pt-2">Last 12 Months Data</p>
          </div>
          <div className="w-full h-[80%] flex item-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={analyticsData}
                margin={{
                  top: 20,
                  right: 20,
                  left: 0,
                  bottom: 0,
                }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="#0ea5e9"
                  fill="#2dd4bf"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default UserAnalytics;
