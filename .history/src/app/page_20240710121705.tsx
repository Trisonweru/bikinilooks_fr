'use client';

import * as React from 'react';
import '@/lib/env';


/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */
// import Logo from '~/svg/Logo.svg';

import Slider from '@/components/slider/Slider';
import ProductSection from '@/components/home_product_section/home_product_section';
import { useAppCtx } from '@/context/AppContext';
import { useEffect } from 'react';
import { fetcher } from '@/lib/fetcher';
// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function HomePage() {

  const product = [{
    title: "New Arrivals",
    data: [{
      id: "1",
      image: "/images/banner1.jpg",
      category: "Electronics",
      title: "Awesome Gadget",
      price: 5000,
    }, {
      id: "2",
      image: "/images/banner1.jpg",
      category: "Electronics",
      title: "Awesome Gadget",
      price: 5000,
    }, {
      id: "3",
      image: "/images/banner1.jpg",
      category: "Electronics",
      title: "Awesome Gadget",
      price: 5000,
    }, {
      id: "4",
      image: "/images/banner1.jpg",
      category: "Electronics",
      title: "Awesome Gadget",
      price: 5000,
    }, {
      id: "5",
      image: "/images/banner1.jpg",
      category: "Electronics",
      title: "Awesome Gadget",
      price: 5000,
    }]

  }, {

    title: "On Sale",
    data: [{
      id: "1111",
      image: "/images/og.jpg",
      category: "Women Perfume",
      title: "Salama Intra vaseline",
      price: 3000,

    },
    {
      id: "222",
      image: "/images/og.jpg",
      category: "Women Perfume",
      title: "Salama Intra vaseline",
      price: 3000,

    },
    {
      id: "33",
      image: "/images/og.jpg",
      category: "Women Perfume",
      title: "Salama Intra vaseline",
      price: 3000,

    }, {
      id: "33",
      image: "/images/og.jpg",
      category: "Women Perfume",
      title: "Salama Intra vaseline",
      price: 3000,

    }]

  }]

  const { addPathname, pathname } = useAppCtx();

  const [data, setData]



  useEffect(() => {
    addPathname("/")
    getProducts()
  }, []);

  const getProducts = async () => {
    const res2 = await fetch('/api/hello');
    console.log("res2w", res2)
    const res = await res2.json()

   

  }

  return (
    <main>
      <section className='bg-white min-h-screen pt-24 px-0 shadow-left-right'>
        <div className="h-80">
          <Slider />
        </div>

        <div className='mt-8 pb-10'>
          <ProductSection slides={product} />
        </div>
      </section>

    </main >
  );
}

//E 00165
