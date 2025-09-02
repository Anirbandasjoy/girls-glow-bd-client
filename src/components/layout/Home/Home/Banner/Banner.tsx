"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useHandleFindBannerQuery } from "@/redux/features/banner/bannerApi";
import { Skeleton } from "@/components/ui/skeleton";
import Autoplay from "embla-carousel-autoplay";
import { GoDot, GoDotFill } from "react-icons/go";
// import Link from "next/link";

export default function Banner() {
  const { data, isLoading } = useHandleFindBannerQuery({});
  const images: any = data?.payload || [];

  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }));

  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }
    console.log(api)

    setCount(api.scrollSnapList().length)

    setCurrent(api.selectedScrollSnap() + 1)


    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
    console.log(count)
    console.log(current)
  }, [api, count, current])

  return (
    <div className="sm:px-[5%] mb-20 sm:mb-10 relative z-20">
      <Carousel
        plugins={[plugin.current]}
        opts={{ loop: true }}
        setApi={setApi}
        className="max-w-screen-xl mx-auto pb-10 w-full h-[150px] sm:h-[300px] lg:h-[500px] relative z-50"
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
                    className="w-full h-[200px] sm:h-[300px] lg:h-[500px] object-cover rounded-md"
                  />
                </div>
              </CarouselItem>
            ))
          )}
        </CarouselContent>
        {/* <CarouselPrevious2 />
        <CarouselNext2 /> */}
      </Carousel>
      <div className="flex absolute -bottom-10 left-1/2 -translate-x-1/2">
        {
          Array.from({ length: count }).map((_, i) =>
            i === current - 1 ?
              <GoDotFill key={i} className='text-golden text-xl ml-1 ' /> : <GoDot key={i} className='text-golden text-xl  ml-2' />

          )
        }
      </div>
    </div>
  );
}
