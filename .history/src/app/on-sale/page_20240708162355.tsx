"use client";

import { useAppCtx } from '@/context/AppContext';
import React, { useEffect } from 'react'

function OnSale() {
  const { addPathname } = useAppCtx();

  useEffect(() => {
    addPathname("/on-sale")
  }, []);

  return (
    <div className='pt-14 bg-white min-h-screen'>
      <div className='mt-16 pb-10'>
        <ProductSection slides={product} />
      </div>
    </div>
  )
}

export default OnSale