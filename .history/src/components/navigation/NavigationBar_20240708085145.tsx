"use client";

import React, { useState, useEffect } from 'react';
import { FaShoppingCart, FaCaretDown } from 'react-icons/fa';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useRouter } from "next/router";


const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [_, setIsDropdownOpen] = useState(false);



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
  const handleClick: any = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { items } = useCart();


  const [anchorEl2, setAnchorEl2] = React.useState<null | HTMLElement>(null);
  const open2 = Boolean(anchorEl2);
  const handleClick2: any = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
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
          <Link href={"/"}>
            <h1 className={`text-2xl font-bold transition-transform duration-300 ${isScrolled ? 'scale-75' : 'scale-100'}`}>
              Logo
            </h1>
          </Link>

        </div>
        <div className="flex items-center space-x-4">
          <button className="border-r pr-4 border-gray-300">Login</button>
          <div className="relative" onMouseEnter={handleClick2} onClick={hand} >
            <Link href={"/cart"}>
              <button className="flex items-center space-x-2">
                <FaShoppingCart />
                <span>Cart</span>
                <span className="bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center">{items.length}</span>
              </button>
            </Link>
            {open2 && (
              <div className="absolute top-full left-0 mt-2 w-64 p-4 bg-white border rounded shadow-lg z-10">
                <p className="text-sm text-gray-700">Check out the items in your cart!</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="bg-[#752A78] h-12 flex items-center justify-center text-white text-sm shadow-left-right">
        <div className="flex space-x-8">
          <Link href={"/"}>
            HOME
          </Link>
          <a href="#" className='font-normal '>NEW ARRIVALS</a>
          <a href="#" className='font-normal '>ON SALE</a>
          <div
            className="relative"
            onMouseEnter={handleClick}
            onMouseLeave={handleClick}
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
