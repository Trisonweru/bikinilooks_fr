import { useAppCtx } from '@/context/AppContext';
import React from 'react'

function OnSale() {
  const { addPathname } = useAppCtx();

  useEffect(() => {
    addPathname("/cart")
  }, []);
  
  return (
    <div>OnSale</div>
  )
}

export default OnSale