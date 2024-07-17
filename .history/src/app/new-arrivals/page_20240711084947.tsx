"use client"

import ProductSection from '@/components/home_product_section/home_product_section';
import ServiceCard from '@/components/home_product_section/product_card';
import { useAppCtx } from '@/context/AppContext';
import React, { useEffect } from 'react'

function NewArrivals() {

  const { addPathname } = useAppCtx();
  useEffect(() => {
    addPathname("/new-arrivals")
  }, []);
  const [data, setData] = React.useState<any>(null)

  useEffect(() => {
    if (data == null) {
      getProduct()
    }

  }, []);

  const getProduct = async () => {
    const res2 = await fetch(`/api/product/`);
    const res = await res2.json()

    if (res?.data?.status == 200) {
      setData(res?.data?.payload)
    }
  }


  return (
    <div className="container mx-auto px-4 pt-14 bg-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <ServiceCard
            key={card.ID}
            image={card.product_image}
            category={card.product_category}
            title={card.product_name}
            price={card.price}
            id={card.ID}
          />
        ))}
      </div>
    </div>
    // <div className='pt-14 bg-white min-h-screen'>
    //   <div className='mt-8 pb-10'>
    //     {
    //       <ServiceCard image={card?.product_image} category={card?.product_category} title={card?.product_name} price={card?.price} id={card?.ID} />

    //     }
    //     {/* <ProductSection slides={product} /> */}
    //   </div>
    // </div>
  )
}

export default NewArrivals