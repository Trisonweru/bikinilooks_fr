"use client"

import { getToken, logoutUser } from '@/lib/fetcher';
import { redirect } from 'next/navigation';
// pages/form.js
import { FormEvent, useEffect, useState } from 'react';

export default function Form() {
  const [formData, setFormData] = useState({
    productName: '',
    productCategory: '',
    productDescription: '',
    price: '',
    availableStock: '',
    discount: '',
    discountType: '',
    image: null,
  });

  const handleChange = (e: any) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };


    const [tkn, setTkn] = useState<any>(null)


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.append('productName', formData.productName);
    data.append('productCategory', formData.productCategory);
    data.append('productDescription', formData.productDescription);
    data.append('price', formData.price);
    data.append('availableStock', formData.availableStock);
    data.append('discount', formData.discount);
    data.append('discountType', formData.discountType);
    data.append('image', formData.image as unknown as File);

    try {
      const response = await fetch('/api/addProduct', {
        method: 'POST',
        body: data,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Success:', result);
      alert('Product added successfully!');
    } catch (error) {
      console.error('Error:', error);
      alert('There was a problem with the submission.');
    }
  };


  const [data, setData] = useState<any>([])
  const [dataDiscountTypes, setDiscountTypes] = useState<any>([])


  useEffect(() => {
    getCategories()
    getDiscountTypes()

      const token = getToken()

     if (!token ) {
      logoutUser();
      redirect('/auth/login');
    } else {
      setTkn(token);
    }
  }, []);

  const getCategories = async () => {
    const res2 = await fetch('/api/categories');
    const res = await res2.json()

    if (res?.data?.status == 200) {
      setData(res?.data?.payload)
    }
  }
  const getDiscountTypes = async () => {
    const res2 = await fetch('/api/discount');
    const res = await res2.json()

    if (res?.data?.status == 200) {
      setDiscountTypes(res?.data?.payload)
    }
  }

  return (
    <div className="min-h-screen flex items-center mx-auto px-4 pt-32 pb-10 justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6">Product Form</h2>
        <div className="flex flex-wrap -mx-3 mb-4 space-y-6">
          <div className="w-full md:w-1/2 px-3 mb-5 md:mb-0">
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
          <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
            <label htmlFor="productCategory" className="block text-gray-700 font-bold mb-2">Product Category</label>
            <select
              id="productCategory"
              name="productCategory"
              value={formData.productCategory}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full rounded-lg"
            >
              <option value="">Select a category</option>
              {data?.map((item: any) => <option value={item?.name}>{item?.name}</option>)}
            </select>
          </div>
          <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
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
          <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
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
          <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
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
          <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
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
          <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
            <label htmlFor="discountType" className="block text-gray-700 font-bold mb-2">Discount Type</label>
            <select
              id="discountType"
              name="discountType"
              value={formData.discountType}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full rounded-lg"
            >
              <option value="">Select a discount type</option>
              {dataDiscountTypes?.map((item: any) => <option value={item?.name}>{item?.name}</option>)}
            </select>
          </div>
          <div className="w-full px-3">
            <label htmlFor="image" className="block text-gray-700 font-bold mb-2">Product Image</label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full rounded-lg"
            />
          </div>
        </div>
        <button type="submit" className="bg-[#752A78] text-white px-4 mt-4 py-2 rounded-lg hover:bg-blue-700">
          Submit
        </button>
      </form>
    </div>
  );
}
