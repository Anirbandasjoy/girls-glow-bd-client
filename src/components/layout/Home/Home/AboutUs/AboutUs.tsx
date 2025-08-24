import Image from "next/image";
import React from "react";

export default function AboutUs() {
  return (
    <div className="px-[5%] my-20">
      <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row gap-5">
        <div className="flex flex-col gap-5 h-full flex-1">
          <Image
            src="/glow2.jpg"
            alt="About Us"
            width={500}
            height={500}
            className="w-full rounded-lg"
          />
          <Image
            src="/glow1.jpg"
            alt="About Us"
            width={500}
            height={500}
            className="w-full rounded-lg"
          />
        </div>
        <div className="bg-white p-5 sm:p-10 w-full lg:w-3/5">
          <h1 className="text-2xl sm:text-3xl font-medium">About Us</h1>
          <hr className="my-5" />
          <p className="text-[#656565]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in
            voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>
    </div>
  );
}
