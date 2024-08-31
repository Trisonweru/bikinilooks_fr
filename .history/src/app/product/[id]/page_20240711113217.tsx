"use client";

import React, { useEffect, useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter, useParams } from 'next/navigation';

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

const ProductDetails: React.FC<ProductDetailsProps> = ({ price, reviews, relatedProducts }: any) => {
  const [quantity, setQuantity] = useState(0);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const { addItemToCart, decrementItemQuantity, incrementItemQuantity } = useCart();

  const router = useParams();

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const [data, setData] = React.useState<any>(null)

  useEffect(() => {
    if (data == null) {
      getProduct()
    }

  }, []);

  const getProduct = async () => {
    const res2 = await fetch(`/api/product/${router?.id}`);
    const res = await res2.json()

    if (res?.data?.status == 200) {
      setData(res?.data?.payload)
    }
  }

  const handleAddToCart = () => {
    addItemToCart({ id: data?.ID.toString(), title: data?.product_name, price: data?.price, quantity: 1, totalPrice: 0, image: data?.product_image });
  };

  return (
    <>
    
    </>
  );
};

export default ProductDetails;
