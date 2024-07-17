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

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function HomePage() {
  return (
    <main>
      {/* <Head>
        <title>bikinilooks</title>
      </Head> */}
      
      <section className='bg-white min-h-screen pt-12 px-0'>
       <div className="h-80">
            <Slider />
          </div>
    
      </section>
    </main>
  );
}
