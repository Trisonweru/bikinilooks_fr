import React from 'react';
import Image from 'next/image';

const images = [
  '/og.jpg',
  '/image2.jpg',
  '/image3.jpg',
  // Add more images as needed
];

const Slider: React.FC = () => {
  return (
    <div className="relative w-full h-72 overflow-hidden">
      <div className="absolute w-[300%] h-full flex animate-marquee">
        {images.map((src, index) => (
          <div key={index} className="w-1/3 h-full flex-shrink-0">
            cc
            <Image src={src} alt={`Slide ${index}`} layout="fill" objectFit="cover" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
