import React, { FC } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  LabelList,
  Label,
  Tooltip,
  Legend,
  Line,
} from "recharts";
import SimpleLoader from "../../SimpleLoader";
import { useGetOrdersAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";

type Props = {
  isDash?: boolean;
};

const OrderAnalytics: FC<Props> = ({ isDash }) => {
  const { data, isLoading, isError } = useGetOrdersAnalyticsQuery({});

  const analyticsData: any = [];

  data &&
    data.orders.last12Months.forEach((item: any) => {
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
            isDash ? "h-[250px]" : "h-[750px]"
          } sm:ml-5 mr-5 sm:mr-10`}
        >
          <div className="mb-5">
            <h1 className="text-3xl font-bold">Order Analytics</h1>
            <p className="text-lg font-medium pt-2">Last 12 Months Data</p>
          </div>
          <div className="w-full h-[80%] flex item-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart width={150} height={300} data={analyticsData}>
                <XAxis dataKey="name">
                  <Label offset={0} position="insideBottom" />
                </XAxis>
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="#8b5cf6" />
                <LabelList dataKey="count" position="top" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderAnalytics;
