'use client';

import { useAppCtx } from '@/context/AppContext';
import React, { useEffect } from 'react'

function Product() {
  const { addPathname, pathname } = useAppCtx();

  useEffect(() => {
    addPathname("/product")
  }, []);

  return (
    <div className='text-black pt-14 min-h-screen'>Product</div>
  )
}

export default Product