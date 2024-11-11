import Link from "next/link";
import React from "react";

type Props = {};

const Credits = (props: Props) => {
  return (
    <div>
      <h1 className="text-sm text-right p-2 bg-violet-100">
        Designed and Developed by{" "}
        <span className="text-sm text-violet-600">
          <Link href="https://www.linkedin.com/in/mohit-saroha/">
            Mr. Mohit Saroha
          </Link>
        </span>
      </h1>
    </div>
  );
};

export default Credits;
