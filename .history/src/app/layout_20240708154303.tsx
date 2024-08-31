import { Metadata } from 'next';
import * as React from 'react';

import '@/styles/globals.css';
// !STARTERCONF This is for demo purposes, remove @/styles/colors.css import immediately
import '@/styles/colors.css';

import { siteConfig } from '@/constant/config';
import Navbar from '@/components/navigation/NavigationBar';
import NewsletterSignup from '@/components/signup_newsletter';
import Footer from '@/components/footer/footer';
import CartProvider from '@/context/CartContext';
import AppProvider from '@/context/AppContext';

// !STARTERCONF Change these default meta
// !STARTERCONF Look at @/constant/config to change them
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
  robots: { index: true, follow: true },
  // !STARTERCONF this is the default favicon, you can generate your own from https://realfavicongenerator.net/
  // ! copy to /favicon folder
  icons: {
    icon: '/favicon/favicon.ico',
    shortcut: '/favicon/favicon-16x16.png',
    apple: '/favicon/apple-touch-icon.png',
  },
  manifest: `/favicon/site.webmanifest`,
  openGraph: {
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.title,
    images: [`${siteConfig.url}/images/og.jpg`],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [`${siteConfig.url}/images/og.jpg`],
  },

};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppProvider>
    <CartProvider>
      <html>
        <body className='bg-[#752A78] '>
          <div className="bg-[#752A78] min-h-screen w-full flex flex-col items-center">
            <Navbar />
            <main className="w-[80%] bg-white  h-auto mt-24">
              {children}
            </main>
            <div>
            </div>
          </div>
          <div className='bg-[#752A78] w-[80%] ml-auto mr-auto'>
            <NewsletterSignup />
          </div>
          <div className='bg-[#fff] w-[80%] ml-auto mr-auto'>
            <Footer />
          </div>
        </body>
      </html>
    </CartProvider>
  );
}
