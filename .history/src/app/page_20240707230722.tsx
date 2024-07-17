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
    {
      image: "/images/banner1.jpg",
      title: "LAKE NAIVASHA",
      link: "artisans",
    },
  ];
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
        id: "1",
        image: "/images/banner1.jpg",
        category: "Electronics",
        title: "Awesome Gadget",
        price: 5000,
      }, {
        id: "1",
        image: "/images/banner1.jpg",
        category: "Electronics",
        title: "Awesome Gadget",
        price: 5000,
      }]

  }, {

    title: "Men Products",
    data: [{
      id: "2",
      image: "/images/og.jpg",
      category: "Women Perfume",
      title: "Salama Intra vaseline",
      price: 3000,

    }]

  }]

  return (
    <main>
      <section className='bg-white min-h-screen pt-12 px-0 shadow-left-right'>
        <div className="h-80">
          <Slider />
        </div>

        {product?.map(item => <div className='mt-16 mb-20'>
          <ProductSection slides={item.data} title={item?.title} />
        </div>)}
      </section>

    </main>
  );
}

//E 00165
