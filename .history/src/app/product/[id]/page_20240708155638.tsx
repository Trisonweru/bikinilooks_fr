'use client';

import React,{useEffect} from 'react'

function Product() {
  const { addPathname, pathname } = useAppCtx();

  useEffect(() => {
    addPathname("/")
  }, []);
  return (
    <div className='text-black pt-14 min-h-screen'>Product</div>
  )
}

export default Product