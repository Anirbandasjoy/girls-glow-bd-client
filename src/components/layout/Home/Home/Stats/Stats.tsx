import Image from "next/image";
import React from "react";

export default function Stats() {
  return (
    <div className="px-[5%]">
      <div className="max-w-screen-xl mx-auto py-10">
        <div className="flex justify-between gap-5">
          <div className="flex flex-col justify-center items-center gap-5 flex-1" >
            <Image
              src="/QualityProducts.svg"
              alt="Stat Image"
              width={100}
              height={100}
              className="h-16 sm:h-20 lg:h-40"
            />
            <p className="text-center sm:text-2xl text-[#1A1A1A]" style={{ fontFamily: "SolaimanLipi" }}>
              {/* Quality Products */}
              চমৎকার ডিজাইন
            </p>
          </div>
          <div className="h-40 sm:h-52 py-5 w-[2px] bg-gray-300"></div>
          <div className="flex flex-col justify-center items-center gap-5 flex-1">
            <Image
              src="/Affordable Price.svg"
              alt="Stat Image"
              width={100}
              height={100}
              className="h-16 sm:h-20 lg:h-40"
            />
            <p className="text-center sm:text-2xl text-[#1A1A1A]" style={{ fontFamily: "SolaimanLipi" }}>
              {/* Affordable Price */}
              সাশ্রয়ী মূল্য
            </p>
          </div>
          <div className="h-40 sm:h-52 py-5 w-[2px] bg-gray-300"></div>
          <div className="flex flex-col justify-center items-center gap-5 flex-1">
            <Image
              src="/Amazing Designs.svg"
              alt="Stat Image"
              width={100}
              height={100}
              className="h-16 sm:h-20 lg:h-40"
            />
            <p className="text-center sm:text-2xl text-[#1A1A1A]" style={{ fontFamily: "SolaimanLipi" }}>
              {/* Amazing Designs */}
              মানসম্মত প্রোডাক্ট
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
