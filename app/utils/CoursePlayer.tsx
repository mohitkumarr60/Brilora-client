import React, { FC, useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import SimpleLoader from "../components/SimpleLoader";

type Props = {
  videoUrl: string;
  title: string;
};

const CoursePlayer: FC<Props> = ({ videoUrl }) => {
  const [videoData, setVideoData] = useState({
    otp: "",
    playbackInfo: "",
  });
  useEffect(() => {
    axios
      .post("http://localhost:8000/api/v1/getVdoCipherOTP", {
        videoId: videoUrl,
      })
      .then((res) => {
        setVideoData(res.data);
      });
  }, [videoUrl]);

  return (
    <>
      <div style={{ paddingTop: "50%", position: "relative" }}>
        {videoData.otp && videoData.playbackInfo !== "" ? (
          <iframe
            src={`https://player.vdocipher.com/v2/?otp=${videoData.otp}&playbackInfo=${videoData.playbackInfo}&player=9nTIzka0XOiTUhGd`}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
            allowFullScreen={true}
            allow="encrypted-media"
          ></iframe>
        ) : (
          <div className="flex justify-center relative bottom-[50%] m-auto">
            <SimpleLoader />
          </div>
        )}
      </div>
    </>
  );
};

export default CoursePlayer;
