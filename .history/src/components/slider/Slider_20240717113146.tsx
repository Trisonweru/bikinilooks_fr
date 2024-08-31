import React from 'react';
import Image from 'next/image';

const images = [
  '/images/banner1.jpg',
  // Add more images as needed
];

const Slider: React.FC = ({theme}) => {
  return (
    <div className="relative w-full h-80 overflow-hidden">
      <div className="absolute w-[200%] h-full flex">
        {images.concat(images).map((src, index) => (
          <div key={index} className="w-1/3 h-full flex-shrink-0">
            <Image src={src} alt={`Slide ${index}`} layout="fill" objectFit="fill" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
