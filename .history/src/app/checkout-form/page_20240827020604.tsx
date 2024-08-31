'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

export default function CheckoutForm() {
  const { items } = useCart();
  const router = useRouter();

  const [formData, setFormData] = useState({
    amount: 0,
    phone_number: '',
    email: '',
    deliveryLocation: '',
    deliveryNote: '',
    cart_items: items,
    token: ''
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedEmail = localStorage.getItem('email') ?? '';
      const storedToken = localStorage.getItem('token') ?? '';

      setFormData((prevData) => ({
        ...prevData,
        email: storedEmail,
        token: storedToken,
        amount: items.reduce((total, item) => total + item.totalPrice, 0),
      }));
    }
  }, [items]);

  const handleInputChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleMpesaCheckout = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result?.success) {
        // Handle success state without page refresh
         router.push(`/success`);
      } else {
        alert('Failed to initiate payment. Please try again.');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto pt-32 pb-10 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Complete Your Order</h2>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Mobile Number
          </label>
          <input
            type="tel"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleInputChange}
            className="mt-1 block w-full focus:border-[#752A78] focus:outline-none focus:ring-1 focus:ring-[#752A78] rounded-md border-gray-300 shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Delivery Location
          </label>
          <input
            type="text"
            name="deliveryLocation"
            value={formData.deliveryLocation}
            onChange={handleInputChange}
            className="mt-1 block w-full focus:border-[#752A78] focus:outline-none focus:ring-1 focus:ring-[#752A78] rounded-md border-gray-300 shadow-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Delivery Note (Please leave a note for delivery)
          </label>
          <textarea
            name="deliveryNote"
            value={formData.deliveryNote}
            onChange={handleInputChange}
            className="mt-1 block w-full focus:border-[#752A78] focus:outline-none focus:ring-1 focus:ring-[#752A78] rounded-md border-gray-300 shadow-sm"
          ></textarea>
        </div>

        <button
          type="submit"
          onClick={handleMpesaCheckout}
          className="w-full py-2 flex justify-center items-center text-white bg-[#752A78] rounded shadow-lg hover:bg-[#5b1d5e]"
          disabled={loading}
        >
          {loading ? (
            <span>Processing...</span>
          ) : (
            <>
              <Image src="/images/mpesa.png" alt="M-pesa Logo" width={24} height={24} className="mr-2" />
              Checkout with M-pesa
            </>
          )}
        </button>
      </form>
    </div>
  );
}
