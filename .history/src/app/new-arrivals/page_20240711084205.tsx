"use client"

import ProductSection from '@/components/home_product_section/home_product_section';
import { useAppCtx } from '@/context/AppContext';
import React, { useEffect } from 'react'

function NewArrivals() {

  const { addPathname } = useAppCtx();
  useEffect(() => {
    addPathname("/new-arrivals")
  }, []);

  const product = [{
    title: "New Arrivals",
    data: [{
      id: "1",
      image: "/images/banner1.jpg",
      category: "Electronics",
      title: "Awesome Gadget",
      price: 5000,
    }, {
      id: "2",
      image: "/images/banner1.jpg",
      category: "Electronics",
      title: "Awesome Gadget",
      price: 5000,
    }, {
      id: "3",
      image: "/images/banner1.jpg",
      category: "Electronics",
      title: "Awesome Gadget",
      price: 5000,
    }, {
      id: "4",
      image: "/images/banner1.jpg",
      category: "Electronics",
      title: "Awesome Gadget",
      price: 5000,
    }, {
      id: "5",
      image: "/images/banner1.jpg",
      category: "Electronics",
      title: "Awesome Gadget",
      price: 5000,
    }]

  }]
  return (
    <div className='pt-14 bg-white min-h-screen'>
      <div className='mt-8 pb-10'>
        {}
        {/* <ProductSection slides={product} /> */}
      </div>
    </div>
  )
}

export default NewArrivals