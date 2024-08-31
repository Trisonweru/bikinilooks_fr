"use client"

import ServiceCard from '@/components/home_product_section/product_card';
import { useAppCtx } from '@/context/AppContext';
import axios from 'axios';
import React, { useEffect } from 'react'
import { ImSpinner2 } from 'react-icons/im';

function NewArrivals() {
  const { pathname } = useAppCtx();

  const [data, setData] = React.useState<any>(null)

  useEffect(() => {
    if (data == null) {
      getProduct()
    }

  }, []);

  const [loading, setLoading] = React.useState<any>(false)

  const getProduct = async () => {
    setLoading(true)
    const res = await axios.post('/api/category', { category: pathname?.split("/")[2] });

    if (res?.data?.data?.status == 200) {
      setData(res?.data?.data?.payload)
      setLoading(false)
    }
  }


  return (
    <div className="container mx-auto px-4 pt-32 pb-10 bg-white min-h-screen">
      <div className="relative bg-white px-4 w-fit mx-auto mb-10">
        <h2 className="text-lg font-semibold text-[#752A78] uppercase text-center border-2 border-gray-300 px-4 py-2">
          {pathname?.split("/")[1].split("_").join(" ")}
        </h2>
      </div>

      {!loading ? <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
      </div> : <div className='w-full flex justify-center items-center ' ><ImSpinner2 className='animate-spin' /></div>}

      {data}
    </div>

  )
}

export default NewArrivals