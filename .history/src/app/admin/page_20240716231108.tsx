"use client"

import { useState } from 'react';

export default function Form() {
  const [formData, setFormData] = useState({
    productName: '',
    productCategory: '',
    productDescription: '',
    price: '',
    availableStock: '',
    discount: '',
    discountType: '',
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log('Form data:', formData);
    // Handle form submission logic here (e.g., send data to API)
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 ">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Product Form</h2>

        <div className="mb-4">
          <label htmlFor="productName" className="block text-gray-700 font-bold mb-2">Product Name</label>
          <input
            type="text"
            id="productName"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="productCategory" className="block text-gray-700 font-bold mb-2">Product Category</label>
          <select
            id="productCategory"
            name="productCategory"
            value={formData.productCategory}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full rounded-lg"
          >
            <option value="">Select a category</option>
            <option value="electronics">Electronics</option>
            <option value="fashion">Fashion</option>
            <option value="home">Home</option>
            <option value="beauty">Beauty</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="productDescription" className="block text-gray-700 font-bold mb-2">Product Description</label>
          <input
            type="text"
            id="productDescription"
            name="productDescription"
            value={formData.productDescription}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700 font-bold mb-2">Price</label>
          <input
            type="text"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="availableStock" className="block text-gray-700 font-bold mb-2">Available Stock</label>
          <input
            type="text"
            id="availableStock"
            name="availableStock"
            value={formData.availableStock}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="discount" className="block text-gray-700 font-bold mb-2">Discount</label>
          <input
            type="text"
            id="discount"
            name="discount"
            value={formData.discount}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="discountType" className="block text-gray-700 font-bold mb-2">Discount Type</label>
          <select
            id="discountType"
            name="discountType"
            value={formData.discountType}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full rounded-lg"
          >
            <option value="">Select a discount type</option>
            <option value="percentage">Percentage</option>
            <option value="fixed">Fixed Amount</option>
          </select>
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Submit
        </button>
      </form>
    </div>
  );
}
