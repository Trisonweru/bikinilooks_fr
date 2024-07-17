import Modal from '@/components/home_product_section/product-modal';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import React, { useState } from 'react';

interface ServiceCardProps {
  id: string;
  image: string;
  category: string;
  title: string;
  price: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ id, image, category, title, price }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const { addItemToCart, items } = useCart();

  const containsValue = items.some(item => item.id === id);
  console.log("containsValue", containsValue)

  const addToCartHandler = () => {
    addItemToCart({ id, title, price, quantity: 1, totalPrice: 0, image });
  };

  return (
    <div
      className="bg-white border rounded-lg shadow-sm overflow-hidden cursor-pointer relative group mb-1"
    >
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover"
        />
        {containsValue ? <Link href={"/cart"}><span></span></Link> : <button
          className="absolute bottom-0 left-1/2 text-sm w-full transform -translate-x-1/2 bg-[#752A78] text-white px-4 py-2  opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          onClick={(e) => {
            e.stopPropagation();
            handleModalOpen();
          }}
        >
          View Details
        </button>}
      </div>
      <div className="p-4">
        <p className="text-xs uppercase text-gray-500">{category}</p>
        <h3 className="text-sm font-semibold text-[#752A78]">{title}</h3>
        <p className="text-gray-700">Ksh. {price}</p>
        <button onClick={addToCartHandler} className="mt-2 w-full border border-[#752A78] text-[#752A78] hover:bg-[#752A78] hover:text-white px-4 py-1 text-sm rounded">Add to Cart</button>
      </div>
      {isModalOpen && <Modal onClose={handleModalClose} />}
    </div>
  );
};

export default ServiceCard;
