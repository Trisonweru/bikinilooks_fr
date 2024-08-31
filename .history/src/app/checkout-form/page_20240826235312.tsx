"use client"
import { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';

export default function CheckoutForm() {
  const { items } = useCart();

  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    email: window.localStorage.getItem("email"),
    deliveryLocation: '',
    deliveryNote: '',
    cart_items:items,
  });

  console.log(formData)

  

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  console.log("items",items)
  const handleMpesaCheckout = async () => {

    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (result.success) {
      // Redirect to a success page or handle success state
      window.location.href = `/success?orderId=${result.order_id}`;
    } else {
      alert('Failed to initiate payment. Please try again.');
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
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleInputChange}
            className="mt-1 block w-full  focus:border-[#752A78] focus:outline-none focus:ring-1 focus:ring-[#752A78] rounded-md border-gray-300 shadow-sm"
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
            className="mt-1 block w-full  focus:border-[#752A78] focus:outline-none focus:ring-1 focus:ring-[#752A78] rounded-md border-gray-300 shadow-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Delivery Note(Please leave a note for delivery)
          </label>
          <textarea name="deliveryNote" value={formData.deliveryNote} onChange={handleInputChange} className="mt-1 block w-full  focus:border-[#752A78] focus:outline-none focus:ring-1 focus:ring-[#752A78] rounded-md border-gray-300 shadow-sm">
          </textarea>
        </div>

        <button
          type="button"
          onClick={handleMpesaCheckout}
          className="w-full py-2 flex justify-center items-center text-white bg-[#752A78] rounded shadow-lg hover:bg-[#5b1d5e]"
        >
          <Image src={"/images/mpesa.png"} alt="Mpesa Logo" width={24} height={24} className="mr-2" />
          Checkout with M-pesa
        </button>
      </form>
    </div>
  );
}
