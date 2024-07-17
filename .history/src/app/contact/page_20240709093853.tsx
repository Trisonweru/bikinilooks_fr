"use client";

import { useAppCtx } from '@/context/AppContext';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

function Contact({ from }: any) {

  const { addPathname } = useAppCtx();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [project, setProject] = useState("");
  const [message, setMessage] = useState("");
  // const [, setSuccess] = useState(false);
  // const [, setError] = useState(false);
  useEffect(() => {
    addPathname("/contact")
  }, []);


  return (
    <div
      className={
        from == "contact"
          ? " bg-[#F5F5F5] w-full pt-5 md:pt-10"
          : " bg-[#2A3759] w-full"
      }
    >
      <div className="max-w-6xl space-y-10 md:space-y-0 flex mr-auto ml-auto py-20  md:flex-row flex-col justify-between px-10 w-full">
        <div className="space-y-10 w-full">
          <div
            className={
              from == "contact"
                ? "text-4xl max-w-sm font-semibold text-[#2A3759]"
                : "text-4xl max-w-sm font-semibold text-white"
            }
          >
            Get Professional Artisanal Services Customized for YOU
          </div>
          <div
            className={
              from == "contact"
                ? "max-w-sm font-extralight text-slate-700"
                : "max-w-sm font-extralight text-white"
            }
          >
            Fill out the form, or call us to set up a free consultation.
          </div>
          <div
            className={
              from == "contact"
                ? "max-w-sm font-extralight text-slate-700"
                : "max-w-sm font-extralight text-white"
            }
          >
            P. O. BOX 64243-00620 NAIROBI, off Western Bypass.
          </div>
          <div
            className={
              from == "contact"
                ? "max-w-sm font-extralight text-slate-700"
                : "max-w-sm font-extralight text-white"
            }
          >
            <Link href="mailto:support@tukojob.co.ke">support@tukojob.com</Link>
          </div>
          <div
            className={
              from == "contact"
                ? "max-w-sm font-extralight underline underline-offset-2 text-slate-700"
                : "max-w-sm font-extralight underline underline-offset-2 text-white"
            }
          >
            <Link href="tel:+254768510515">0768 510 515</Link>
          </div>
        </div>
      
      </div>
    </div>
  )
}

export default Contact