"use client";

import React, { useState, useEffect } from 'react';
import { FaShoppingCart, FaCaretDown } from 'react-icons/fa';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import Popper from '@mui/material/Popper';
import Box from '@mui/material/Box';
import { FaTrash } from "react-icons/fa";
import { useAppCtx } from '@/context/AppContext';


const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

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

  const { items, removeItemFromCart } = useCart();


  const [anchorEl2, setAnchorEl2] = React.useState<null | HTMLElement>(null);
  const open2 = Boolean(anchorEl2);
  const handleClick2: any = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };



  const id = open2 ? 'simple-popper' : undefined;

  const subtotal = items.reduce((total, item) => total + item.totalPrice * item.quantity, 0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES' }).format(amount);
  };


  const { pathname } = useAppCtx();

  console.log("pathname", pathname)



  return (
    <nav className={`fixed w-4/5 top-0 z-50 transition-all duration-300 ${isScrolled ? 'h-16' : 'h-24'} bg-white shadow-lg`}>
      <div className="h-full flex items-center justify-between px-4">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className='border px-4 py-2 border-slate-600  rounded-md text-sm w-full focus:border-[#752A78] focus:outline-none focus:ring-1 focus:ring-slate-600'
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
          <div className="relative" onMouseEnter={handleClick2} onClick={handleClose2} >
            <Link href={"/cart"}>
              <button className="flex items-center space-x-2" aria-describedby={id}>
                <FaShoppingCart />
                <span>Cart</span>
                <span className="bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center">{items.length}</span>
              </button>
            </Link>
            <Popper id={id} open={open2} anchorEl={anchorEl2} className="z-50 mt-4">
              <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper', width: '300px' }}>
                {items.length < 1 ? (
                  <div>
                    <p className='text-gray-400'>No products in the cart.</p>
                    <button className='mt-4 text-white bg-red-500 px-4 py-1 rounded-md '>Close</button>
                  </div>
                ) : (
                  <div>
                    {items?.map(item => (
                      <div key={item.id} className="flex justify-between items-center mb-2">
                        <img src={item.image} alt={item.title} className="w-12 h-12 object-cover mr-2" />
                        <div className="flex-grow">
                          <h3 className="text-sm font-semibold">{item.title}</h3>
                          <p className="text-sm">Quantity: {item.quantity}</p>
                        </div>
                        <button onClick={() => removeItemFromCart(item.id)} className="text-red-500">
                          <FaTrash />
                        </button>
                      </div>
                    ))}
                    <hr />
                    <div className="mt-4">
                      <p className="text-lg font-bold">Subtotal:{formatCurrency(subtotal.toFixed(2))}</p>
                      <hr />

                      <Link href="/cart">
                        <div className='flex justify-between w-full'>
                          <button className='mt-2 text-white bg-red-500 px-4 py-1 rounded-md '>Close</button>
                          <button className="mt-2 p-2 bg-green-500 text-white rounded">
                            View Cart
                          </button>

                        </div>

                      </Link>
                    </div>
                  </div>
                )}
              </Box>
            </Popper>
          </div>
        </div>
      </div>
      <div className="bg-[#752A78] h-12 flex items-center justify-center text-white text-sm shadow-left-right">
        <div className="flex space-x-8">
          <Link href={"/"}>
            <span className={pathname=="/"?"text-":""}>HOME</span> 
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
