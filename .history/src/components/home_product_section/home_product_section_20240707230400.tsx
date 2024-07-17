import React from "react";

//@ts-ignore
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, } from "@/components/ui/couresel";
import ServiceCard from "@/components/home_product_section/product_card";


function ProductSection({ title, slides }: any) {
  const product = [{
    title: "New Arrivals",
    data: [{
      id: "1",
      image: "/images/banner1.jpg",
      category: "Electronics",
      title: "Awesome Gadget",
      price: 5000,
    }]

  }, {

    title: "Men Products",
    data: [{
      id: "2",
      image: "/images/og.jpg",
      category: "Women Perfume",
      title: "Salama Intra vaseline",
      price: 3000,

    }]

  }]
  return (
    <>{product?.map(item=>)}</>
  );
}

export default ProductSection;
