import { Type } from 'lucide-react';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const token = formData.get('token');
    const comment = formData.get('comment');
    const browserId = formData.get('browserId');
    const name = formData.get('name');

    // Assuming your external API endpoint is:
    const response = await fetch('https://sea-lion-app-bo3ep.ondigitalocean.app/orders/createBrowserComments', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        "Context-Type": "application/json"
      },
      body: JSON.stringify({
        "browserId": browserId,
        "comment": comment,
        "full_name": name
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to add review');
    }

    const result = await response.json();

    // return NextResponse.json({ status: 'success', data: result });

     const res = NextResponse.json({ status: 'success', data: result });

  // Disable caching by setting the Cache-Control header to no-store
  res.headers.set('Cache-Control', 'no-store');

  return res;
  } catch (error: any) {
    return NextResponse.json({ status: 'error', message: error.message });
  }
}
