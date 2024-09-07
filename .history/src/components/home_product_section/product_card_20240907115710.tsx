import Modal from '@/components/home_product_section/product-modal';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

interface ServiceCardProps {
  id: string;
  image: string;
  category: string;
  title: string;
  price: number;
}
 const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES' }).format(amount);
  };
const ServiceCard: React.FC<ServiceCardProps> = ({ id, image, category, title, price }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const { addItemToCart, items } = useCart();

  const containsValue = items.some(item => item.id === id);

  const addToCartHandler = () => {
    addItemToCart({ id, title, price, quantity: 1, totalPrice: 0, image });
  };

  return (
    <div
      className="bg-white border rounded-lg shadow-sm overflow-hidden cursor-pointer relative group mb-1"
    >
      <Link href={`/product/${id}`} >
        <div className="relative">
          <Image src={image}
            alt={title}
          width={200} height={300} fill/>
          <button
            className="absolute bottom-0 left-1/2 text-sm w-full transform -translate-x-1/2 bg-[#752A78] text-white px-4 py-2  opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            View Details
          </button>
        </div></Link>
      <div className="p-4">
        <p className="text-xs uppercase text-gray-500">{category}</p>
        <h3 className="text-sm font-semibold text-[#752A78]">{title}</h3>
        <p className="text-gray-700">{formatCurrency(price)}</p>
        {containsValue ? <div className='flex justify-end'><Link href={"/cart"}><span className='underline text-[#752A78] mt-2 px-4 py-1 '>View Cart</span></Link></div> : <button onClick={addToCartHandler} className="mt-2 w-full border border-[#752A78] text-[#752A78] hover:bg-[#752A78] hover:text-white px-4 py-1 text-sm rounded">Add to Cart</button>
        }      </div>
      {isModalOpen && <Modal onClose={handleModalClose} />}
    </div>
  );
};

export default ServiceCard;
