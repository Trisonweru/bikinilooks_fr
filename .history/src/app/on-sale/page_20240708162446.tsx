"use client";

import ProductSection from '@/components/home_product_section/home_product_section';
import { useAppCtx } from '@/context/AppContext';
import React, { useEffect } from 'react'

function OnSale() {
  const { addPathname } = useAppCtx();


  useEffect(() => {
    addPathname("/on-sale")
  }, []);


  const product = [{
    title: "On Sale",
    data: [{
      id: "1111",
      image: "/images/og.jpg",
      category: "Women Perfume",
      title: "Salama Intra vaseline",
      price: 3000,

    },
    {
      id: "222",
      image: "/images/og.jpg",
      category: "Women Perfume",
      title: "Salama Intra vaseline",
      price: 3000,

    },
    {
      id: "33",
      image: "/images/og.jpg",
      category: "Women Perfume",
      title: "Salama Intra vaseline",
      price: 3000,

    }, {
      id: "33",
      image: "/images/og.jpg",
      category: "Women Perfume",
      title: "Salama Intra vaseline",
      price: 3000,

    }]

  }]
  return (
    <div className='pt-14 bg-white min-h-screen'>
      <div className='mt-8 pb-10'>
        <ProductSection slides={product} />
      </div>
    </div>
  )
}

export default OnSale