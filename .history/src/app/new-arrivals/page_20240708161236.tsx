import { useAppCtx } from '@/context/AppContext';
import React from 'react'

function NewArrivals() {
  const { addPathname } = useAppCtx();

  useEffect(() => {
    addPathname("/cart")
  }, []);
  
  return (
    <div className='pt-14 bg-white min-h-screen'>New Arrivals</div>
  )
}

export default NewArrivals