import React, { FC } from "react";
import { useSelector } from "react-redux";

interface Props {
  openSidebar: boolean;
}

const GreetingMessage: FC<Props> = ({ openSidebar }) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 4) {
      return "Good night";
    } else if (hour < 12) {
      return "Good morning";
    } else if (hour < 17) {
      return "Good afternoon";
    } else if (hour < 21) {
      return "Good evening";
    } else {
      return "Good night";
    }
  };

  const greeting = getGreeting();
  const { user } = useSelector((state: any) => state.auth);
  const firstName = user.name.split(" ")[0];

  return (
    <div>
      <div className={`${openSidebar && "mt-4"} flex items-center gap-2`}>
        <h4
          className={`font-Poppins  ${
            openSidebar
              ? "text-[20px] font-normal"
              : "text-[18px] font-light"
          } capitalize`}
        >
          {greeting},
        </h4>

        <h4
          className={`font-Poppins text-right ${
            openSidebar
              ? "text-[20px] font-normal ml-1"
              : "text-[24px]"
          } capitalize `}
        >
          {firstName}
        </h4>
      </div>
    </div>
  );
};

export default GreetingMessage;
