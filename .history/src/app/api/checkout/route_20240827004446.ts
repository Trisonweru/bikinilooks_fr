// pages/api/checkout.ts

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}
