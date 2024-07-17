import React, { useState } from "react";
// import { fetcher } from "../../lib/fetcher";

//@ts-ignore
import Link from "next/link";

function Contact({ from }: any) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [project, setProject] = useState("");
  const [message, setMessage] = useState("");
  const [, setSuccess] = useState(false);
  const [, setError] = useState(false);

  // const handleMail = async (e: { preventDefault: () => void }) => {
  //   e.preventDefault();
  //   if (
  //     name.length < 1 ||
  //     email.length < 1 ||
  //     project.length < 1 ||
  //     message.length < 1 ||
  //     phone.length < 1
  //   ) {
  //     setError(true);
  //   } else {
  //     const data = {
  //       name,
  //       email,
  //       project,
  //       message,
  //       phone,
  //     };
  //     const { error } = await fetcher("/api/mail", { data });
  //     console.log(error);

  //     if (error) {
  //       setSuccess(false);
  //       setError(true);
  //       setTimeout(() => setError(false), 5000);
  //     }
  //     setError(false);
  //     setSuccess(true);
  //     setTimeout(() => setSuccess(false), 5000);
  //     setName("");
  //     setPhone("");
  //     setEmail("");
  //     setProject("");
  //     setMessage("");
  //   }
  // };

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
        <div className="w-full border rounded-sm md:border-0 p-1 md:p-4  border-gray-300">
          <form method="POST" onSubmit={handleMail}>
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
                  ? "bg-[#4E9CDA] block border border-transparent duration-150 font-medium leading-5 mt-4 px-4 py-2 rounded-sm text-center text-sm text-white transition-colors w-full hover:bg-[#2c6a9d] focus:outline-none focus:shadow-outline-blue active:bg-white"
                  : "bg-white block border border-transparent duration-150 font-medium leading-5 mt-4 px-4 py-2 rounded-sm text-center text-sm text-[#4E9CDA] hover:text-white transition-colors w-full hover:bg-[#4E9CDA] focus:outline-none focus:shadow-outline-blue active:bg-white"
              }
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
