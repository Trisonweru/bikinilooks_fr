import React from 'react';
import { styled } from '@mui/material/styles';

const SliderContainer = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  height: '300px',
  width: '100%',
  position: 'relative',
}));

const SliderTrack = styled('div')({
  display: 'flex',
  height: '100%',
  width: 'calc(300px * 6)', // Adjust this based on the number of images
  animation: 'scroll 30s linear infinite',
  '@keyframes scroll': {
    '0%': { transform: 'translateX(0)' },
    '100%': { transform: 'translateX(-50%)' }, // Adjust this based on the number of images
  },
});

const SliderItem = styled('div')({
  flex: '0 0 300px', // Adjust this based on the desired image width
  height: '100%',
});

const images = [
  '/images/img1.jpg',
  '/images/img2.jpg',
  '/images/img3.jpg',
  '/images/img4.jpg',
  '/images/img5.jpg',
  '/images/img6.jpg',
];

const Slider: React.FC = () => {
  return (
    <SliderContainer>
      <SliderTrack>
        {images.map((src, index) => (
          <SliderItem key={index}>
            <img src={src} alt={`Image ${index + 1}`} className="w-full h-full object-cover" />
          </SliderItem>
        ))}
        {images.map((src, index) => (
          <SliderItem key={index + images.length}>
            <img src={src} alt={`Image ${index + 1}`} className="w-full h-full object-cover" />
          </SliderItem>
        ))}
      </SliderTrack>
    </SliderContainer>
  );
};

export default Slider;
