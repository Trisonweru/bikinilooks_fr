import { useAppCtx } from '@/context/AppContext';
import React, { useEffect } from 'react'

function Contact() {

  const { addPathname } = useAppCtx();

  useEffect(() => {
    addPathname("/on-sale")
  }, []);


  return (
    <div className='pt-14 bg-white min-h-screen'>Contact</div>
  )
}

export default Contact