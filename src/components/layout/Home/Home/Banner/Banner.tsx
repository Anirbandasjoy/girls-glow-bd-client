"use client";

import Image from "next/image";
import React, { useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useHandleFindBannerQuery } from "@/redux/features/banner/bannerApi";
import { Skeleton } from "@/components/ui/skeleton";
import Autoplay from "embla-carousel-autoplay";
// import Link from "next/link";

export default function Banner() {
  const { data, isLoading } = useHandleFindBannerQuery({});
  const images: any = data?.payload || [];

  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }));

  return (
    <div className="sm:px-[5%] mb-20 sm:mb-10 sm:mt-6">
      <Carousel
        plugins={[plugin.current]}
        opts={{ loop: true }}
        className="max-w-screen-xl mx-auto pb-10 w-full h-[150px] sm:h-[300px] lg:h-[500px]"
      >
        <CarouselContent>
          {isLoading ? (
            <Skeleton className="w-full h-[150px] bg-gray-300 sm:h-[300px] lg:h-[500px] rounded-md animate-pulse" />
          ) : (
            images.map((image: any) => (
              <CarouselItem key={image?._id}>
                <div>
                  <Image
                    height={1000}
                    width={500}
                    src={image?.photo}
                    alt="Banner Image"
                    className="w-full h-[200px] sm:h-[300px] lg:h-[500px] object-cover"
                  />
                </div>
              </CarouselItem>
            ))
          )}
        </CarouselContent>
        {/* <CarouselPrevious2 />
        <CarouselNext2 /> */}
      </Carousel>
    </div>
  );
}
