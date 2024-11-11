import React from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  LabelList,
  Label,
} from "recharts";
import SimpleLoader from "../../SimpleLoader";
import { useGetCourseAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";

type Props = {};

const CourseAnalytics = (props: Props) => {
  const { data, isLoading, isError } = useGetCourseAnalyticsQuery({});

  const analyticsData: any = [];

  data &&
    data.courses.last12Months.forEach((item: any) => {
      analyticsData.push({ name: item.month, uv: item.count });
    });

  const minValue = 0;

  return (
    <>
      {isLoading ? (
        <SimpleLoader />
      ) : (
        <div className="h-screen mr-5 sm:ml-5 sm:mr-10">
          <div className="mb-5">
            <h1 className="text-3xl font-bold">Course Analytics</h1>
            <p className="text-lg font-medium pt-2">Last 12 Months Data</p>
          </div>
          <div className="w-full h-[60%] flex item-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart width={150} height={300} data={analyticsData}>
                <XAxis dataKey="name">
                  <Label offset={0} position="insideBottom" />
                </XAxis>
                <YAxis domain={[minValue, "dataMax"]} />
                <Bar dataKey="uv" fill="#bef264">
                  <LabelList dataKey="uv" position="top" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseAnalytics;
