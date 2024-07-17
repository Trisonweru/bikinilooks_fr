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
import { Carousel ,CarouselContent, CarouselItem, CarouselNext,CarouselPrevious,} from "@/components/ui/couresel";
import ServiceCard from "@/components/home_product_section/product_card";

function ProductSection({title, slides}:any) {


  return (
    <div className="bg-[#fff] py-0 flex flex-col space-y-6 items-center">
      <div>
        <h2 className="text-2xl font-semibold text-[#BB4C48] text-center">
          {title}
        </h2>
      </div>
      <div className="w-full md:w-[80%] flex md:flex-row mb-10 flex-col space-y-2 md:space-y-0 md:space-x-4">
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
          className="w-[95%] md:w-full"
        >
          <CarouselContent className="-ml-1">
            {slides.map((card:any, index:number) => (
              <CarouselItem
                key={index}
                className="pl-1 md:basis-1/2 lg:basis-1/3"
              >
                <ServiceCard title={card?.title} image={card?.image} link />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>{" "}
    </div>
  );
}

export default ProductSection;
