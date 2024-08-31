"use client";

import React, { useState, useEffect } from 'react';
import { FaShoppingCart, FaCaretDown } from 'react-icons/fa';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

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

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


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
            Logo
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <button className="border-r pr-4 border-gray-300">Login</button>
          <div className="relative">
            <Link>
              <button className="flex items-center space-x-2">
                <FaShoppingCart />
                <span>Cart</span>
                <span className="bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center">3</span>
              </button></Link>
          </div>
        </div>
      </div>
      <div className="bg-[#752A78] h-12 flex items-center justify-center text-white text-sm shadow-left-right">
        <div className="flex space-x-8">
          <a href="/">HOME</a>
          <a href="#" className='font-normal '>NEW ARRIVALS</a>
          <a href="#" className='font-normal '>ON SALE</a>
          <div
            className="relative"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <div className="flex items-center space-x-2 cursor-pointer" id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}

              //@ts-ignore        
              onClick={handleClick}>

              <span>CATEGORIES</span>
              <FaCaretDown />
            </div>

            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </div>
          <a href="#">CONTACT US</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
