
'use client';
import { useRouter } from 'next/navigation';
import {  useState } from 'react';

export default function SuccessPage() {
  const router = useRouter();
  const [orderId, setOrderId] = useState<string | null>(null);


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md">
        <h1 className="text-2xl font-bold text-green-600">Payment Initiated Successfully!</h1>
        {orderId && (
          <p className="mt-4">
            Your order has been successfully placed. Complete payment by entering M-pesa pin on your phone
          </p>
        )}
        <p className="mt-4">
          Thank you for your purchase!
        </p>
        <button
          onClick={() => router.push('/')}
          className="mt-6 w-full py-2 text-white bg-[#752A78] rounded shadow hover:bg-[#5b1d5e]"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}
