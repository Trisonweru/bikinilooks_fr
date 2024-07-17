"use client";

import { useAppCtx } from '@/context/AppContext';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import {Map}


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
          ? " bg-[#fff] w-full pt-5 md:pt-10"
          : " bg-[#fff] w-full"
      }
    >
      <MapComponent />
      <div className="max-w-6xl space-y-10 space-x-10 md:space-y-0 flex mr-auto ml-auto py-20  md:flex-row flex-col justify-between px-10 w-full">
        <div className="w-full border rounded-sm md:border-0 p-1 md:p-4  border-gray-300">
          <form method="POST" className='space-y-4'>
            <div className="w-full">
              <label
                className={
                  from == "contact"
                    ? "block text-left text-sm text-[#F5F5F5]"
                    : "block text-left text-sm text-[#2A3759]"
                }
              >
                Full Name
              </label>
              <input
                type="text"
                className="border px-4 py-2 rounded-sm text-black text-sm w-full focus:border-[#4E9CDA] focus:outline-none focus:ring-1 focus:ring-[#4E9CDA]"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex justify-between space-x-2">
              <div className="mt-4 w-[100%]">
                <label
                  className={
                    from == "contact"
                      ? "block text-left text-sm text-[#F5F5F5]"
                      : "block text-left text-sm text-[#2A3759]"
                  }
                >
                  {" "}
                  Phone
                </label>
                <input
                  type="phone"
                  className="border px-4 py-2 rounded-sm text-black text-sm w-full focus:border-[#4E9CDA] focus:outline-none focus:ring-1 focus:ring-[#4E9CDA]"
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="mt-4 w-[100%]">
                <label
                  className={
                    from == "contact"
                      ? "block text-left text-sm text-[#F5F5F5]"
                      : "block text-left text-sm text-[#2A3759]"
                  }
                >
                  {" "}
                  Email
                </label>
                <input
                  type="email"
                  className="border px-4 py-2 rounded-sm text-black text-sm w-full focus:border-[#4E9CDA] focus:outline-none focus:ring-1 focus:ring-[#4E9CDA]"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label
                className={
                  from == "contact"
                    ? "block text-left text-sm text-[#F5F5F5]"
                    : "block text-left text-sm text-[#2A3759]"
                }
              >
                {" "}
                Subject
              </label>
              <input
                className="border px-4 py-2 rounded-sm  text-black text-sm w-full focus:border-[#4E9CDA] focus:outline-none focus:ring-1 focus:ring-[#4E9CDA]"
                placeholder="Subject"
                type="text"
                value={project}
                onChange={(e) => setProject(e.target.value)}
              />
            </div>
            <div>
              <label
                className={
                  from == "contact"
                    ? "block text-left text-sm text-[#F5F5F5]"
                    : "block text-left text-sm text-[#2A3759]"
                }
              >
                {" "}
                Message
              </label>
              <textarea
                className="border px-4 py-2 rounded-sm text-black text-sm w-full focus:border-white focus:outline-none focus:ring-1 focus:ring-[#4E9CDA]"
                placeholder="Your message"
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className={
                from == "contact"
                  ? "bg-[#752A78] block border border-transparent duration-150 font-medium leading-5 mt-4 px-4 py-2 rounded-sm text-center text-sm text-white transition-colors w-full hover:bg-[#631e65] focus:outline-none focus:shadow-outline-blue active:bg-white"
                  : "bg-[#752A78] block border border-transparent duration-150 font-medium leading-5 mt-4 px-4 py-2 rounded-sm text-center text-sm text-white hover:text-white transition-colors w-full hover:bg-[#631e65] focus:outline-none focus:shadow-outline-blue active:bg-white"
              }
            >
              Send
            </button>
          </form>
        </div>
        <div className="space-y-10 mt-3 w-full">
          <div
            className={
              from == "contact"
                ? "text-xl max-w-sm font-semibold text-gray-600"
                : "text-xl max-w-sm font-semibold text-gray-600"
            }
          >
            Contact us
          </div>
          <div
            className={
              from == "contact"
                ? "max-w-sm font-extralight text-slate-700 flex"
                : "max-w-sm font-extralight text-gray-600 flex space-x-5"
            }
          >
            <div><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 text-[#752A78]">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>
            </div>
            <span> P. O. BOX 64243-00620 NAIROBI, off Western Bypass.</span>
          </div>
          <div
            className={
              from == "contact"
                ? "max-w-sm font-extralight text-slate-700 "
                : "max-w-sm font-extralight text-gray-600 flex space-x-5"
            }
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 text-[#752A78]">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
            </svg>

            <Link href="mailto:support@tukojob.co.ke">support@tukojob.com</Link>
          </div>
          <div
            className={
              from == "contact"
                ? "max-w-sm font-extralight underline underline-offset-2 text-slate-700"
                : "max-w-sm font-extralight underline underline-offset-2 text-gray-600 flex space-x-5"
            }
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 text-[#752A78]">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
            </svg>

            <Link href="tel:+254768510515">254 768 510 515</Link>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Contact