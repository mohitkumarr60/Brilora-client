import { Box, LinearProgress, Typography } from "@mui/material";
import React from "react";

type Props = {
  moduleData: any;
};

const CourseProgress = ({ moduleData }: Props) => {
  return (
    <div className="w-full bg-white p-2 rounded-lg border shadow-sm">
      <h6 className="font-Poppins">Course Progress</h6>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ width: "90%", mr: 1 }}>
          <LinearProgress variant="determinate" value={moduleData?.progress} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography
            variant="body2"
            color="text.secondary"
            className="text-base"
          >{`${Math.round(moduleData?.progress)}%`}
            </Typography>
        </Box>
      </Box>
    </div>
  );
};

export default CourseProgress;
