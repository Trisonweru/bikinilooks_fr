// components/ProductForm.js

"use client"

import { useEffect, useState } from 'react';

const ProductForm = () => {
  const [formData, setFormData] = useState({
    productName: '',
    productCategory: '',
    productDescription: '',
    price: '',
    availableStock: '',
    discount: '',
    discountType: ''
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const response = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      // handle success
      alert('Product submitted successfully!');
    } else {
      // handle error
      alert('Failed to submit the product.');
    }
  };

    const [data, setData] = useState<any>([])

  useEffect(() => {
    getCategories()
  }, []);

  const getCategories = async () => {
    const res2 = await fetch('/api/categories');
    const res = await res2.json()

    if (res?.data?.status == 200) {
      setData(res?.data?.payload)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="min-h-screen bg-white pt-5 md:pt-28">
      <div>
        <label>Product Name:</label>
        <input
          type="text"
          name="productName"
          value={formData.productName}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Product Category:</label>
        <input
          type="text"
          name="productCategory"
          value={formData.productCategory}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Product Description:</label>
        <textarea
          name="productDescription"
          value={formData.productDescription}
          onChange={handleChange}
        ></textarea>
      </div>
      <div>
        <label>Price:</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Available Stock:</label>
        <input
          type="number"
          name="availableStock"
          value={formData.availableStock}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Discount:</label>
        <input
          type="number"
          name="discount"
          value={formData.discount}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Discount Type:</label>
        <input
          type="text"
          name="discountType"
          value={formData.discountType}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ProductForm;

