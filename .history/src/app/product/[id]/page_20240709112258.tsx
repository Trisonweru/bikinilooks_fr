"use client";

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';

interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
  description: string;
  reviews: { rating: number; comment: string }[];
  relatedProducts: Product[];
}

interface ProductDetailsProps {
  product: Product;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ id, image, category, title, price }) => {
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { addItemToCart } = useCart();

  const handleAddToCart = () => {
    // addItemToCart({ ...product, quantity, totalPrice: product.price * quantity });
    addItemToCart({title:"",id:"" });

  };

  const handleQuantityChange = (amount: number) => {
    setQuantity(prev => Math.max(1, prev + amount));
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add review logic here
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex mb-8">
        <img src={product.image} alt={product.title} className="w-1/2 object-cover rounded" />
        <div className="w-1/2 pl-8">
          <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
          <p className="text-xl text-green-500 mb-4">Ksh{product.price}</p>
          <p className="mb-4">{product.description}</p>
          <div className="flex items-center mb-4">
            <button onClick={() => handleQuantityChange(-1)} className="px-2 py-1 bg-gray-200 rounded">-</button>
            <input
              type="text"
              value={quantity}
              readOnly
              className="w-12 text-center mx-2 border rounded"
            />
            <button onClick={() => handleQuantityChange(1)} className="px-2 py-1 bg-gray-200 rounded">+</button>
            <button
              onClick={handleAddToCart}
              className="ml-4 px-4 py-2 bg-green-500 text-white rounded"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">Reviews</h2>
        {product.reviews.length > 0 ? (
          product.reviews.map((review, index) => (
            <div key={index} className="mb-2">
              <p className="font-bold">Rating: {review.rating}</p>
              <p>{review.comment}</p>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
        <form onSubmit={handleReviewSubmit} className="mt-4">
          <div className="flex items-center mb-2">
            <label htmlFor="rating" className="mr-2">Rating:</label>
            <input
              type="number"
              id="rating"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              min="1"
              max="5"
              className="w-12 text-center border rounded"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="comment" className="block mb-1">Comment:</label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
            Submit Review
          </button>
        </form>
      </div>
      <div>
        <h2 className="text-xl font-bold mb-2">Related Products</h2>
        <div className="flex flex-wrap">
          {product.relatedProducts.map((relatedProduct) => (
            <div key={relatedProduct.id} className="w-1/4 p-2">
              <img src={relatedProduct.image} alt={relatedProduct.title} className="object-cover rounded" />
              <h3 className="text-sm font-semibold">{relatedProduct.title}</h3>
              <p className="text-sm text-green-500">Ksh{relatedProduct.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
