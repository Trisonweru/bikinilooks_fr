'use client';

import Head from 'next/head';
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

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function HomePage() {
    const slides = [
    {
      image: "/images/banner1.jpg",
      title: "LAKE NAIVASHA",
      link: "artisans",
    },
    {
      image: "/images/og.jpg",
      title: "MAASAI MARA",
      link: "",
    },
      {
      image: "/images/banner1.jpg",
      title: "LAKE NAIVASHA",
      link: "artisans",
    },
     {
      image: "/images/og.jpg",
      title: "MAASAI MARA",
      link: "",
    },
    
 
  ];
  
  return (
    <main>
      <section className='bg-white h-full pt-12 px-0'>
       <div className="h-80">
            <Slider />
          </div>
          <div className='mt-*'>
            <ProductSection slides={slides} title="NEW ARRIVALS" />
          </div>
          
      </section>
    </main>
  );
}
