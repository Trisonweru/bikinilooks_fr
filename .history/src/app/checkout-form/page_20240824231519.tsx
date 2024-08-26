"use client"
import { useState } from 'react';
import Image from 'next/image';

export default function CheckoutForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    email: '',
    deliveryLocation: '',
  });

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleMpesaCheckout = async () => {
    // Call the backend API to create order and initiate the IntaSend STK push
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
    <div className="max-w-md mx-auto pt-28 pb-10">
      <h2 className="text-2xl font-bold mb-4">Complete Your Order</h2>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            className="mt-1 block w-full  focus:border-[#752A78] focus:outline-none focus:ring-1 focus:ring-[#752A78] rounded-md border-gray-300 shadow-sm"
            required
          />
        </div>

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
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
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
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            required
          />
        </div>

        <button
          type="button"
          onClick={handleMpesaCheckout}
          className="w-full py-2 flex justify-center items-center text-white bg-blue-500 rounded shadow-lg hover:bg-blue-600"
        >
          <Image src={"/images/mpesa.png"} alt="Mpesa Logo" width={24} height={24} className="mr-2" />
          Checkout with M-pesa
        </button>
      </form>
    </div>
  );
}
