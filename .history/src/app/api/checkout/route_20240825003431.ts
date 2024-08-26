/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    // const query = req.url;
    const { category } = await req.json();

  let result 
  await fetch(`https://sea-lion-app-bo3ep.ondigitalocean.app/product/getProductByCategory/${category}`, {//${query?.split("/")[query?.split("/").length-1]}
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer `
    }
  })
    .then(res => res.json())
    .then(async resu => {
      if (resu?.status === 200) {
        result = resu

      }

      return NextResponse.json({ message: "Error" });

    })
    .catch(err => {
      console.log(err.message)
      return NextResponse.json({ message: err.message });

    })

  return NextResponse.json({ data: result })

}


import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function SuccessPage() {
  const router = useRouter();
  const { orderId } = router.query;
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (orderId) {
      fetch(`/api/orders/${orderId}`)
        .then((res) => res.json())
        .then((data) => setOrder(data))
        .catch((err) => console.error(err));
    }
  }, [orderId]);

  if (!order) return <div>Loading...</div>;

  return (
    <div className="max-w-md mx-auto p-4 text-center">
      <h1 className="text-3xl font-bold text-green-500">Payment Successful!</h1>
      <p className="mt-4">Thank you for your order, {order.customer.fullName}!</p>
      <p>Order ID: {order.id}</p>
      <p>Delivery Location: {order.customer.deliveryLocation}</p>
      <p className="mt-4">You will receive your items soon.</p>
    </div>
  );
}
