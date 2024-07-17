import { getToken } from '@/lib/fetcher';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const productName = formData.get('productName');

    const token = formData.get('token');

    // Assuming your external API endpoint is:
    const response = await fetch('https://sea-lion-app-bo3ep.ondigitalocean.app/product/addProduct', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: j,
    });

    if (!response.ok) {
      throw new Error('Failed to add product');
    }

    const result = await response.json();

    return NextResponse.json({ status: 'success', data: result });
  } catch (error:any) {
    return NextResponse.json({ status: 'error', message: error.message });
  }
}
