"use client";
import { CardStack } from "./card-stack";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import SimpleLoader from "../SimpleLoader";

export default function CardStackDemo() {
  const { data, isLoading } = useGetHeroDataQuery("Featuring", {});

  const CARDS =
    data?.layout?.featuring?.map((card: any, index: number) => ({
      ...card,
      id: index,
    })) || [];

  return isLoading ? (
    <SimpleLoader />
  ) : (
    <div className="w-full bg-white h-[800px]">
      <div className="w-full">
        <h1 className="text-[28px] sm:text-[32px] pt-[150px] text-center font-Poppins font-[700]">
          Here is what the{" "}
          <span className="bg-gradient-to-r from-violet-700 to-purple-600 text-transparent bg-clip-text">
            Parents are saying about us
          </span>
        </h1>
      </div>
      <div className="w-[95%] mx-auto h-[500px] mt-[120px]">
        <CardStack items={CARDS} />
      </div>
    </div>
  );
}
