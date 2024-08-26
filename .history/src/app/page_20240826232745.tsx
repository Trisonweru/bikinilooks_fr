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

// import Slider from '@/components/slider/Slider';
import ProductSection from '@/components/home_product_section/home_product_section';
import { useAppCtx } from '@/context/AppContext';
import { useEffect } from 'react';
import { ImSpinner2 } from 'react-icons/im';
// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function HomePage() {
  const { addPathname, pathname } = useAppCtx();

  const [data, setData] = React.useState<any>(null)
  const [theme, setTheme] = React.useState<any>(null)
  const [loading, setLoading] = React.useState<any>(false)

  useEffect(() => {
    addPathname("/")
    if (data == null) {
      getProducts()

    }
    // if (theme == null) {
    //   getTheme()
    // }

  }, []);

  const getProducts = async () => {
    setLoading(true)

    
    const res2 = await fetch('/api/hello');
    console.log("res2", res2)
    const res = await res2?.json()

    if (res?.data?.status == 200) {
      setData(res?.data?.payload)
      setLoading(true)
    }
  }

  // const getTheme = async () => {
  //   const res2 = await fetch('/api/theme');

  //   console.log("res2",res2)
  //   const res = await res2?.json()

  //   if (res?.data?.status == 200) {
  //     setTheme(res?.data?.payload?.url)
  //   }
  // }

  return (
    <main>
      <section className='bg-white min-h-screen pt-24 px-0 shadow-left-right'>
        <div className="h-80">
          <div className=" w-full h-full">
            {theme ? <img src={theme ? theme : ""} alt={`Slide ${theme}`} className="object-cover h-full w-full" /> : <div className='w-full h-80 flex justify-center items-center ' ><ImSpinner2 className='animate-spin' />
            </div>}
          </div>
        </div>

        <div className='mt-8 pb-10'>
          <ProductSection slides={data} loading={loading} />
        </div>
      </section>

    </main >
  );
}

//E 00165
