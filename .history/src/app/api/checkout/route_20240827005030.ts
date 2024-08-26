// pages/api/checkout.ts

import type { NextApiRequest, NextApiResponse } from 'next';

export async function POST(req: NextApiRequest, res: NextApiResponse) {
 if (req.method === 'POST') {
    try {
      const token = req.body.token; // Extract the token from the request body

      const response = await fetch('https://sea-lion-app-bo3ep.ondigitalocean.app/orders/createOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Add the Bearer token to the headers
        },
        body: JSON.stringify(req.body),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();

      res.status(200).json({ success: true, order_id: result.order_id });
    } catch (error) {
      console.error('Checkout API error:', error);
      res.status(500).json({ success: false, message: 'Failed to process order' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}
