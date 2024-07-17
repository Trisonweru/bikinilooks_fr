"use client";

import React, { useState, useEffect } from 'react';
import { FaShoppingCart } from 'react-icons/fa';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-4/5 top-0 z-50 transition-all duration-300 ${isScrolled ? 'h-16' : 'h-24'} bg-white shadow-lg`}>
      <div className="h-full flex items-center justify-between px-4">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-300 rounded-md px-3 py-2"
          />
        </div>
        <div className="flex items-center justify-center flex-grow">
          <h1 className={`text-2xl font-bold transition-transform duration-300 ${isScrolled ? 'scale-75' : 'scale-100'}`}>
            BIKINILOOKS
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <button className="border-r pr-4 border-gray-300">Login</button>
          <button className="flex items-center space-x-2">
            <FaShoppingCart />
            <span>Cart</span>
          </button>
        </div>
      </div>
      <div className="bg-[#752A78] h-12 flex items-center justify-center text-white text-sm shadow-left-right">
        <div className="flex space-x-8">
          <a href="#">HOME</a>
          <a href="#" className='font-normal '>NEW ARRIVALS</a>
          <div 
            className="relative" 
            onMouseEnter={() => setIsDropdownOpen(true)} 
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <button className="focus:outline-none">CATEGORIES</button>
            {isDropdownOpen && (
              <div 
                className="absolute left-0 mt-1 w-40 bg-white text-black shadow-lg rounded-md transition-opacity duration-300"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">Category 1</a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">Category 2</a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">Category 3</a>
              </div>
            )}
          </div>
          <a href="#">CONTACT US</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
