"use client";

import React, { useState } from 'react';

const NewsletterSignup: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to API)
    setIsSubmitted(true);
  };

  return (
    <div className="bg-[#3F3F3F] p-8 text-white  shadow-md w- mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center">Sign Up for Our Newsletter</h2>
      {isSubmitted ? (
        <p className="text-center">Thank you for signing up!</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 w-1/2 ml-auto mr-auto mt-10">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white text-black rounded-md shadow-sm focus:outline-none focus:ring-[#BB4C48] focus:border-[#BB4C48] sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white text-black rounded-md shadow-sm focus:outline-none focus:ring-[#BB4C48] focus:border-[#BB4C48] sm:text-sm"
              required
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-[#752A78] text-white px-4 py-2 rounded-md hover:bg-[#9A3B3B] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#BB4C48]"
            >
              Sign Up
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default NewsletterSignup;
