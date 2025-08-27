"use client";
import Image from "next/image";
import React from "react";
import aboutImage from "@/../public/about.png";

export default function AboutSection() {
  // const { data } = useHandleFindTeamQuery({});
  // Extracting the data list and total pages from the response
  // const allData: IData[] = data?.payload || [];
  return (
    <div className="px-[5%] bg-white pb-20">
      <div className="max-w-screen-xl mx-auto  py-10 lg:py-14">
        <Image
          width={1000}
          height={500}
          alt="about"
          src={aboutImage}
          className="w-full h-fit mb-10 max-w-screen-lg mx-auto"
        />
        <h1 className="text-xl sm:text-3xl lg:text-4xl text-start" style={{ fontFamily: "BellMT" }}>
          About Us
        </h1>
        <hr className="my-6 border-t border-gray-300" />
        <p className="text-[#656565] text-start">
          Girls Glow BD is Bangladesh’s premier destination for exquisite ornaments and jewelry, designed to celebrate every woman’s individuality and elegance. Our journey began with a passion for blending timeless artistry with contemporary fashion, offering a diverse collection that suits both everyday moments and life’s special occasions. Each piece is thoughtfully curated for quality, affordability, and style, ensuring you find something that truly resonates with your personality.
          <br /><br />
          We believe that jewelry is more than just an accessory—it’s a reflection of your story and spirit. That’s why our team is committed to providing a seamless shopping experience, from easy browsing to fast delivery and attentive customer support. Whether you’re gifting a loved one or treating yourself, Girls Glow BD is here to help you shine brighter every day. Join our community and discover the glow within!
        </p>
        {/* <h1 className="text-xl sm:text-2xl lg:text-3xl text-center mt-10">
          Our People
        </h1>
        <hr className="my-6 border-t border-gray-300" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {allData.map((item) => (
            <div key={item._id} className="">
              <Image
                src={item.image}
                alt={item.name}
                width={500}
                height={500}
                className="w-full h-full mb-2 object-cover"
              />
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p className="text-gray-600">{item.designation}</p>
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
}
