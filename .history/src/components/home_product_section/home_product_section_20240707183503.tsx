import React from "react";

//@ts-ignore
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, } from "@/components/ui/couresel";
import ServiceCard from "@/components/home_product_section/product_card";


function ProductSection({ title, slides }: any) {
  return (
    <div className="bg-[#fff] py-0 flex flex-col space-y-8 items-center">
      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="border-t border-gray-600 w-full"></div>
        </div>
        <div className="relative bg-white px-4">
          <h2 className="text-lg font-semibold text-[#752A78] text-center border-2 border-gray-300 px-4 py-2">
            {title}
          </h2>
        </div>
      </div>
      <div className="w-full md:w-[90%] flex md:flex-row mb-10 flex-col space-y-4 md:space-y-0 md:space-x-4">
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
            {slides.map((card: any, index: number) => (
              <CarouselItem
                key={index}
                className="pl-1 md:basis-1/2 lg:basis-1/4"
              >
                <ServiceCard image={card?.image} category="Electronics" title="Awesome Gadget" price={999} id={"1"} />
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
