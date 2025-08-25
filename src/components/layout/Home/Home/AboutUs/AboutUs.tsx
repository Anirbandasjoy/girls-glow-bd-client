import Image from "next/image";
import React from "react";

export default function AboutUs() {
  return (
    <div className="px-[5%] my-20">
      <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row gap-5 ">
        <div className="flex flex-col gap-5 h-full flex-1">
          <Image
            src="/glow2.png"
            alt="About Us"
            width={500}
            height={235}
            className="w-full max-h-[300px] object-cover rounded-lg"
          />
          <Image
            src="/glow1.png"
            alt="About Us"
            width={411}
            height={380}
            className="w-full max-h-[350px] object-cover object-bottom rounded-lg"
          />
        </div>
        <div className="bg-white p-5 sm:p-10 w-full lg:w-3/5">
          <h1 className="text-2xl sm:text-3xl font-medium">About Us</h1>
          <hr className="my-5" />
          <p className="text-[#656565]">
           Girls Glow BD is your trusted destination for elegant and affordable ornaments in Bangladesh. We believe every woman deserves to shine, so we curate a wide range of jewelry and accessories that blend timeless beauty with modern trends. From daily wear to special occasions, our collection is designed to help you express your unique style. With a commitment to quality, customer satisfaction, and fast delivery, Girls Glow BD makes online ornament shopping easy and enjoyable. Discover the glow within—shop with us today!
          </p>
        </div>
      </div>
    </div>
  );
}
