"use client";

import ProductSection from '@/components/home_product_section/home_product_section';
import ServiceCard from '@/components/home_product_section/product_card';
import { useAppCtx } from '@/context/AppContext';
import React, { useEffect } from 'react'
import { ImSpinner2 } from 'react-icons/im';

function OnSale() {
  const { addPathname } = useAppCtx();


  useEffect(() => {
    addPathname("/on-sale")
  }, []);

  const [data, setData] = React.useState<any>(null)

  useEffect(() => {
    if (data == null) {
      getProduct()
    }

  }, []);

  const getProduct = async () => {
    const res2 = await fetch(`/api/by-category/5`);
    const res = await res2.json()

    if (res?.data?.status == 200) {
      setData(res?.data?.payload)
    }
  }



  // const product = [{
  //   title: "On Sale",
  //   data: [{
  //     id: "1111",
  //     image: "/images/og.jpg",
  //     category: "Women Perfume",
  //     title: "Salama Intra vaseline",
  //     price: 3000,

  //   },
  //   {
  //     id: "222",
  //     image: "/images/og.jpg",
  //     category: "Women Perfume",
  //     title: "Salama Intra vaseline",
  //     price: 3000,

  //   },
  //   {
  //     id: "33",
  //     image: "/images/og.jpg",
  //     category: "Women Perfume",
  //     title: "Salama Intra vaseline",
  //     price: 3000,

  //   }, {
  //     id: "33",
  //     image: "/images/og.jpg",
  //     category: "Women Perfume",
  //     title: "Salama Intra vaseline",
  //     price: 3000,

  //   }]

  // }]
  return (
    <div className="container mx-auto px-4 pt-32 pb-10 bg-white min-h-screen">
      <div className="relative bg-white px-4 w-fit mx-auto mb-10">
        <h2 className="text-lg font-semibold text-[#752A78] uppercase text-center border-2 border-gray-300 px-4 py-2">
          On Sale
        </h2>
      </div>

      {data ? <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data?.map((card: any) => (
          <ServiceCard
            key={card.ID}
            image={card.product_image}
            category={card.product_category}
            title={card.product_name}
            price={card.price}
            id={card.ID}
          />
        ))}
      </div> : <div className='w-full flex justify-center items-center ' ><ImSpinner2 className='animate-spin text' /></div>}
    </div>
  )
}

export default OnSale