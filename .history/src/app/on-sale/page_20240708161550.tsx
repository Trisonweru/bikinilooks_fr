import { useAppCtx } from '@/context/AppContext';
import React, { useEffect } from 'react'

function OnSale() {
  const { addPathname } = useAppCtx();

  useEffect(() => {
    addPathname("/on-sale")
  }, []);

  return (
    <div>OnSale</div>
  )
}

export default OnSale