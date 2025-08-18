import Image from "next/image";
import React from "react";
import aboutImage from "@/../public/about.png";

export default function AboutSection() {
  return (
    <div className="px-[5%] bg-white">
      <div className="max-w-screen-lg mx-auto  py-10 lg:py-14 px-[5%]">
        <Image
          width={1000}
          height={500}
          alt="about"
          src={aboutImage}
          className="w-full h-fit mb-10"
        />
        <h1 className="text-xl sm:text-2xl lg:text-3xl text-center">
          About Us
        </h1>
        <hr className="my-6 border-t border-gray-300" />
        <p className="text-[#656565] text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum
          <br /> <br />
          dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
          velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          <br /> <br />
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum
          dolor sit amet, consectetur adipiscing{" "}
        </p>
      </div>
    </div>
  );
}
