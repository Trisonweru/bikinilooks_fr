import Modal from '@/components/home_product_section/product-modal';
import React, { useState } from 'react';

interface ServiceCardProps {
  image: string;
  category: string;
  title: string;
  price: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ image, category, title, price }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div
      className="bg-white border rounded-lg shadow-md overflow-hidden cursor-pointer relative group"
      onClick={handleModalOpen}
    >
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover"
        />
        <button
          className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-[#752A78] text-white px-4 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          onClick={(e) => {
            e.stopPropagation();
            handleModalOpen();
          }}
        >
          View Details
        </button>
      </div>
      <div className="p-4">
        <p className="text-xs uppercase text-gray-500">{category}</p>
        <h3 className="text-sm font-semibold text-[#752A78]">{title}</h3>
        <p className="text-gray-700">Ksh. {price}</p>
        <button className="mt-2 w-full border border-[#752A78] text-[#752A78] hover:bg-[#] px-4 py-2 rounded">Add to Cart</button>
      </div>
      {isModalOpen && <Modal onClose={handleModalClose} />}
    </div>
  );
};

export default ServiceCard;
