import React from 'react'

function Product() {
  useEffect(() => {
    addPathname("/")
  }, []);
  return (
    <div className='text-black pt-14 min-h-screen'>Product</div>
  )
}

export default Product