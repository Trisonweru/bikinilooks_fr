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
          ? " bg-[#fff] w-full pt-5 md:pt-10"
          : " bg-[#fff] w-full"
      }
    >
      <div className="max-w-6xl space-y-10 space-x-10 md:space-y-0 flex mr-auto ml-auto py-20  md:flex-row flex-col justify-between px-10 w-full">
        <div className="w-full border rounded-sm md:border-0 p-1 md:p-4  border-gray-300">
          <form method="POST">
            <div className=" w-full">
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
                : "max-w-sm font-extralight text-gray-600 flex space-x-4"
            }
          >
            <div><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>
            </div>
            <span> P. O. BOX 64243-00620 NAIROBI, off Western Bypass.</span>
          </div>
          <div
            className={
              from == "contact"
                ? "max-w-sm font-extralight text-slate-700"
                : "max-w-sm font-extralight text-gray-600"
            }
          >
            <Link href="mailto:support@tukojob.co.ke">support@tukojob.com</Link>
          </div>
          <div
            className={
              from == "contact"
                ? "max-w-sm font-extralight underline underline-offset-2 text-slate-700"
                : "max-w-sm font-extralight underline underline-offset-2 text-gray-600"
            }
          >
            <Link href="tel:+254768510515">254 768 510 515</Link>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Contact