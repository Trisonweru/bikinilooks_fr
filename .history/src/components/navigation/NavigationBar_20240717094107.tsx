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
import Image from 'next/image';
import { getToken, logoutUser } from '@/lib/fetcher';


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

  const [data, setData] = React.useState<any>([])

  useEffect(() => {
    getCategories()
  }, []);

  const getCategories = async () => {
    const res2 = await fetch('/api/categories');
    const res = await res2.json()

    if (res?.data?.status == 200) {
      setData(res?.data?.payload)
    }
  }

  const { addPathname } = useAppCtx();
  const [tkn, setTkn]=useState<any>(null)

  useEffect(() => {
    addPathname("N")

    const token = getToken()
    setTkn(token)

    // if (!token ) {//|| !isTokenValid(token)
    //   logoutUser();
    //   redirect('/auth/login');
    // } else {
    //   setUser(getUser());
    // }
  }, []);



  return (
    <nav className={`fixed w-4/5 top-0 z-50 transition-all duration-300 ${isScrolled ? 'h-20' : 'h-36'} bg-white shadow-lg`}>
      <div className="h-full flex items-center justify-between px-4">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className='border px-4 py-2 border-slate-600  rounded-full text-sm w-full focus:border-[#752A78] focus:outline-none focus:ring-1 focus:ring-slate-600'
          />
        </div>
        <div className="flex items-center justify-center flex-grow">
          <Link href={"/"}>
            <Image src='/images/logo.png' layout="contain" alt='logo' height={240} width={140} className={`font-bold transition-transform duration-300 ${isScrolled ? 'scale-50' : 'scale-100'}`} />
          </Link>

        </div>
        <div className="flex items-center space-x-4">
          {!tkn?<Link href={"/auth/login"} >
            <button className="border-r pr-4 border-gray-300 text-gray-600 text-sm">Login</button>
          </Link>:<Link href={"/auth/login"} onClick={()=>{
            logoutUser()
          }}</div>>
            <button className="border-r pr-4 border-gray-300 text-gray-600 text-sm">Logout</button>
          </Link>}
          <div className="relative" onMouseEnter={handleClick2} onClick={handleClose2} >
            <Link href={"/cart"}>
              <button className="flex items-center space-x-2 text-gray-600 text-sm hover:text-gray-800" aria-describedby={id}>
                <FaShoppingCart />
                <span>Cart / {formatCurrency(subtotal)}</span>
                <span className="bg-[#752A78] text-white rounded-full h-5 w-5 flex items-center justify-center">{items.length}</span>
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
                      <p className="text-lg font-bold">Subtotal:{formatCurrency(subtotal)}</p>
                      <hr />

                      <div className='flex justify-between w-full'>
                        <button className='mt-2 text-white bg-red-500 px-4 py-1 rounded-md '>Close</button>
                        <Link href="/cart">
                          <button className="mt-2 p-2 bg-green-500 text-white rounded">
                            View Cart
                          </button>
                        </Link>

                      </div>

                    </div>
                  </div>
                )}
              </Box>
            </Popper>
          </div>
        </div>
      </div>
      <div className="bg-[#752A78] h-12 flex items-center justify-center text-white text-sm shadow-left-right">
        <div className="flex space-x-8 items-center">
          <Link href={"/"} className={pathname == "/" ? "border px-4 py-1 rounded-full font-normal" : "px-4 py-2 rounded-full font-normal"}>
            <span>HOME</span>
          </Link>
          <Link href="/new-arrivals" className={pathname == "/new-arrivals" ? "border px-4 py-1 rounded-full font-normal" : "px-4 py-2 rounded-full font-normal"}>NEW ARRIVALS</Link>
          <Link href="/on-sale" className={pathname == "/on-sale" ? "border px-4 py-1 rounded-full font-normal" : "px-4 py-2 rounded-full font-normal"}>ON SALE</Link>
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
              {data?.map((item: any) => {
                return <Link href={`/products/${item?.name?.split(" ").join("_")}/${item?.ID}`} ><MenuItem onClick={() => {
                  addPathname(`/${item?.name?.split(" ").join("_")}/${item?.ID}`)
                  handleClose()
                }}>{item?.name}</MenuItem></Link>
              }
              )}

            </Menu>
          </div>
          <Link href="/contact" className={pathname == "/contact" ? "border px-4 py-1 rounded-full font-normal" : "px-4 py-2 rounded-full font-normal"}>CONTACT US</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
