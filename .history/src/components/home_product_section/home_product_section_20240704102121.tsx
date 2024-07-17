import React from "react";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";

//@ts-ignore
import Link from "next/link";

//@ts-ignore
import Autoplay from "embla-carousel-autoplay";
import Service2Card from "../WhyUs/Couresel";
import { Carousel ,CarouselContent, CarouselItem,
   CarouselNext,
CarouselPrevious,} from "@/components/ui/couresel";

function OurService() {
  const slides = [
    {
      image: "/hippos.jpg",
      title: "LAKE NAIVASHA",
      link: "artisans",
    },
    {
      image: "/maasaimara1.jpg",
      title: "MAASAI MARA",
      link: "",
    },
    {
      image: "/maasaimara2.jpg",
      title: "MAASAI MARA",
      link: "",
    },
    {
      image: "/maasaimara3.jpg",
      title: "MAASAI MARA",
      link: "",
    },
    {
      image: "/cresent1.jpg",
      title: "CRESCENT ISLAND NAIVASHA",
      link: "",
    },
    {
      image: "/cresent2.jpg",
      title: "CRESCENT ISLAND NAIVASHA",
      link: "",
    },
  ];
  return (
    <div className="bg-[#fff] py-0 flex flex-col space-y-12 items-center">
      <div>
        <h2 className="text-4xl font-semibold text-[#BB4C48] text-center">
          Destinations
        </h2>
      </div>
      <div className="w-full md:w-[80%] flex md:flex-row mb-10 flex-col space-y-7 md:space-y-0 md:space-x-4">
        <Carousel
          opts={{
            align: "center",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 5000,
            }),
          ]}
          className="w-[80%] md:w-full"
        >
          <CarouselContent className="-ml-1">
            {slides.map((card, index) => (
              <CarouselItem
                key={index}
                className="pl-1 md:basis-1/2 lg:basis-1/3"
              >
                <Service2Card title={card?.title} image={card?.image} link />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>{" "}
      <div className="py-8">
        <Link href="/gallery" legacyBehavior>
          <a className="border border-[#BB4C48] hover:bg-[#AC3E4B] bg-[#BB4C48] text-white text-center hover:text-white px-4 py-2 rounded-sm w-40">
            View Gallery
          </a>
        </Link>
      </div>
    </div>
  );
}

export default OurService;
