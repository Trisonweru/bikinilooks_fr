// pages/api/login.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email, password } = req.body;

  try {
    const response = await axios.post('https://sea-lion-app-bo3ep.ondigitalocean.app/auth/login', { email, password });

    if (response.status !== 200) {
      throw new Error('Invalid email or password');
    }

    return res.status(200).json({ message: 'Login successful', data: response.data });
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return res.status(error.response.status).json({ message: error.response.data.message });
    } else {
      return res.status(500).json({ message: (error as Error).message });
    }
  }
}
