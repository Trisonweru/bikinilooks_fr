"use client"

import { useAppCtx } from '@/context/AppContext';
import React, { useEffect } from 'react'

function NewArrivals() {
  const { addPathname } = useAppCtx();

  useEffect(() => {
    addPathname("/new-arrivals")
  }, []);

  return (
    <div className='pt-14 bg-white min-h-screen'>New Arrivals</div>
  )
}

export default NewArrivals