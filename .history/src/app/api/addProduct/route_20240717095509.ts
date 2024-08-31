'use client';

import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { getToken, logoutUser } from '@/lib/fetcher';

interface FormData {
  productName: string;
  productCategory: string;
  productDescription: string;
  price: string;
  availableStock: string;
  discount: string;
  discountType: string;
  image: File | null;
}

export default function Form() {
  const [formData, setFormData] = useState<FormData>({
    productName: '',
    productCategory: '',
    productDescription: '',
    price: '',
    availableStock: '',
    discount: '',
    discountType: '',
    image: null,
  });
  const [tkn, setTkn] = useState<string | null>(null);
  const [data, setData] = useState<any[]>([]);
  const [dataDiscountTypes, setDiscountTypes] = useState<any[]>([]);
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, files } = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

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
    data.append('image', formData.image as File);

    try {
      const response = await fetch('/api/product/addProduct', {
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

  useEffect(() => {
    getCategories();
    getDiscountTypes();

    const token = getToken();

    if (!token) {
      logoutUser();
      router.replace('/auth/login');
    } else {
      setTkn(token);
    }
  }, []);

  const getCategories = async () => {
    const res = await fetch('/api/categories');
    const result = await res.json();

    if (result?.data?.status === 200) {
      setData(result?.data?.payload);
    }
  };

  const getDiscountTypes = async () => {
    const res = await fetch('/api/discount');
    const result = await res.json();

    if (result?.data?.status === 200) {
      setDiscountTypes(result?.data?.payload);
    }
  };

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
