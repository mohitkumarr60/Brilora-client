import Ratings from "@/app/utils/Ratings";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import { AiOutlineUnorderedList } from "react-icons/ai";

type Props = {
  item: any;
  isProfile?: boolean;
};

const CoursesCard: FC<Props> = ({ item, isProfile }) => {
  return (
    <>
      <Link href={`/course/${item._id}`}>
        <div
          className={`${
            isProfile ? "bg-white" : "hover:lg:scale-105"
          } bg-white w-auto h-auto sm:w-[300px] sm:h-[300px] border rounded-xl p-1 shadow overflow-hidden transition-transform duration-200`}
        >
          <div className="w-full h-[56%]">
            <Image
              src={item.thumbnail.url}
              width={800}
              height={500}
              objectFit=""
              className="w-full h-full object-cover rounded-lg"
              alt=""
            />
          </div>
          <div className="px-2">
            <div className="w-full overflow-hidden h-[22%]">
              <h1 className="text-[17px] font-semibold mt-2">{item.name}</h1>
            </div>
            <div className="w-full flex items-center justify-between pt-2">
              <Ratings rating={item.ratings} />
              <h5 className="inline text-sm"> {item.purchased} Students</h5>
            </div>
            <div className="w-full flex items-center justify-between pt-2">
              <div className="flex">
                <h4 className="text-lg font-medium">Rs.{item.price}</h4>
                <h5 className="pl-3 text-sm line-through">
                  Rs.{item.estimatedPrice}
                </h5>
              </div>
              <div className="flex items-center">
                <AiOutlineUnorderedList size={20} fill="#000" />
                <h5 className="pl-3 text-sm">
                  {item.courseData?.length} Modules
                </h5>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default CoursesCard;
