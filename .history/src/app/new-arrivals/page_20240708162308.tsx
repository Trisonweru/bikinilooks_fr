"use client"

import ProductSection from '@/components/home_product_section/home_product_section';
import { useAppCtx } from '@/context/AppContext';
import React, { useEffect } from 'react'

function NewArrivals() {
  const { addPathname } = useAppCtx();
  useEffect(() => {
    addPathname("/new-arrivals")
  }, []);

  return (
    <div className='pt-14 bg-white min-h-screen'>
      <div className='mt-16 pb-10'>
        <ProductSection slides={product} />
      </div>
    </div>
  )
}

export default NewArrivals