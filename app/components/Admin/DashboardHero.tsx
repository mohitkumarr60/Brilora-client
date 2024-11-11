import React from "react";
import DashboardHeader from "./DashboardHeader";
import DashboardWidgets from "../../components/Admin/Widgets/DashboardWidgets";

type Props = {};

const DashboardHero = (props: Props) => {
  return (
    <>
      <div>
        <DashboardHeader />
      </div>
      <div className="w-[95%] mx-auto">
        <DashboardWidgets />
      </div>
    </>
  );
};

export default DashboardHero;
