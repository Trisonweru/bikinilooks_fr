"use client";

import React, { CSSProperties, useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useCart } from "@/pages/context/CartContext";
import ClipLoader from "react-spinners/ClipLoader";

interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
  description: string;
  reviews: { rating: number; comment: string }[];
  relatedProducts: Product[];
}

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "#752A78",
};

const ProductDetails = ({ reviews, relatedProducts }: any) => {
  const [quantity, setQuantity] = useState(0);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const { addItemToCart, decrementItemQuantity, incrementItemQuantity } =
    useCart();

  const router = useRouter();
  const { id } = router.query;

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const [data, setData] = React.useState<any>(null);

  useEffect(() => {
    getProduct(id);
  }, [id]);

  const getProduct = async (ids: any) => {
    const res = await axios.post(`/api/product`, { category: ids });

    if (res?.data?.data?.status == 200) {
      setData(res?.data?.data?.payload);
    }
  };

  const handleAddToCart = () => {
    addItemToCart({
      id: data?.ID.toString(),
      title: data?.product_name,
      price: data?.price,
      quantity: 1,
      totalPrice: 0,
      image: data?.product_image,
    });
  };

  return (
    <>
      {data ? (
        <div className="container mx-auto p-4 pt-28 text-black">
          <div className="flex mb-8">
            <img
              src={data?.product_image}
              alt={data?.product_name}
              className="w-1/2 object-cover rounded"
            />
            <div className="w-1/2 pl-8">
              <h1 className="text-2xl font-bold mb-2">{data?.product_name}</h1>
              <p className="text-xl text-green-500 mb-4">Ksh{data?.price}</p>
              <p className="mb-4">{data?.product_description}</p>
              <div className="flex items-center mb-4">
                <button
                  onClick={() => {
                    decrementItemQuantity(data?.ID.toString());
                    setQuantity(quantity - 1);
                  }}
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  -
                </button>
                <input
                  type="text"
                  value={quantity}
                  readOnly
                  className="w-12 mx-2 border rounded px-4 py-2 text-center border-slate-600   text-sm focus:border-[#752A78] focus:outline-none focus:ring-1 focus:ring-slate-600"
                />
                <button
                  onClick={() => {
                    incrementItemQuantity(data?.ID.toString());
                    setQuantity(quantity + 1);
                  }}
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  +
                </button>
                <button
                  onClick={() => {
                    handleAddToCart();
                    setQuantity(quantity + 1);
                  }}
                  className="ml-4 px-4 py-2 bg-green-500 text-white rounded"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
          <hr />
          <div className="mb-8 mt-4">
            <h2 className="text-xl font-bold mb-2">Reviews</h2>
            {reviews?.length > 0 ? (
              reviews?.map((review: any, index: number) => (
                <div key={index} className="mb-2">
                  <p className="font-bold">Rating: {review.rating}</p>
                  <p>{review.comment}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No reviews yet</p>
            )}

            <form onSubmit={handleReviewSubmit} className="mt-4 w-full">
              <div className="flex items-center mb-2">
                <label htmlFor="rating" className="mr-2">
                  Rating:
                </label>
                <input
                  type="number"
                  id="rating"
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  min="1"
                  max="5"
                  className="w-16 border px-4 py-2 text-justify border-slate-600  rounded-md text-sm focus:border-[#752A78] focus:outline-none focus:ring-1 focus:ring-slate-600"
                />
              </div>
              <div className="mb-2">
                <label htmlFor="comment" className="block mb-1">
                  Comment:
                </label>
                <textarea
                  id="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="border px-4 py-2 border-slate-600  rounded-md text-sm w-full focus:border-[#752A78] focus:outline-none focus:ring-1 focus:ring-slate-600"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-[#752A78] text-white rounded"
              >
                Submit Review
              </button>
            </form>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-2">Related Products</h2>
            <div className="flex flex-wrap">
              {relatedProducts?.map((relatedProduct: any) => (
                <div key={relatedProduct.id} className="w-1/4 p-2">
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.title}
                    className="object-cover rounded"
                  />
                  <h3 className="text-sm font-semibold">
                    {relatedProduct.title}
                  </h3>
                  <p className="text-sm text-green-500">
                    Ksh{relatedProduct.price}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="container bg-white min-h-screen w-full flex justify-center items-center ">
          <ClipLoader
            color={"#752A78"}
            loading={true}
            cssOverride={override}
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
          />{" "}
        </div>
      )}
    </>
  );
};

export default ProductDetails;
