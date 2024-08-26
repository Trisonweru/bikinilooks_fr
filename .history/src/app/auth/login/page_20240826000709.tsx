// pages/login.tsx
'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';

interface FormData {
  email: string;
  password: string;
}

export default function Login() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string>('');
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/login', formData);

      if (response.data && response.data.data) {
        localStorage.setItem('token', response.data?.data.token);

        console.log(response)

        // Redirect to a different page on successful login
        // router.replace('/23Cs6os58d9E8hT0K8HuA');

      } else {
        throw new Error('Invalid email or password');

      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.message);
      } else {
        setError((error as Error).message);
      }
    }
  };

  return (
    <div className="min-h-screen flex pt-28 items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        {error && <div className="mb-4 text-red-500">{error}</div>}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full rounded-lg"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full rounded-lg"
            required
          />
        </div>
        <button type="submit" className="bg-[#752A78] text-white px-4 py-2 rounded-lg w-full hover:bg-[#5a1f5c]">
          Login
        </button>
        <div className="mt-4 text-center">
          <Link href="/auth/signup" className="text-[#752A78] hover:underline">
            Don't have an account? Sign up
          </Link>
        </div>
      </form>
    </div>
  );
}
