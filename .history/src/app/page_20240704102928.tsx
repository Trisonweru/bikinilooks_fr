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
      image: "/hippos.jpg",
      title: "LAKE NAIVASHA",
      link: "artisans",
    },
    {
      image: "/maasaimara1.jpg",
      title: "MAASAI MARA",
      link: "",
    },
    {
      image: "/maasaimara2.jpg",
      title: "MAASAI MARA",
      link: "",
    },
    {
      image: "/maasaimara3.jpg",
      title: "MAASAI MARA",
      link: "",
    },
    {
      image: "/cresent1.jpg",
      title: "CRESCENT ISLAND NAIVASHA",
      link: "",
    },
    {
      image: "/cresent2.jpg",
      title: "CRESCENT ISLAND NAIVASHA",
      link: "",
    },
  ];
  
  return (
    <main>
      <section className='bg-white min-h-screen pt-12 px-0'>
       <div className="h-80">
            <Slider />
          </div>
          <div className='mt-10'>
            <ProductSection slides={slides} title="NEW ARRIVALS" />
          </div>
      </section>
    </main>
  );
}
