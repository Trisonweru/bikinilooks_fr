import { getToken } from '@/lib/fetcher';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const token = formData.get('token');
    const image = formData.get('image');

    // Assuming your external API endpoint is:
    const response = await fetch('https://sea-lion-app-bo3ep.ondigitalocean.app/product/addThemeImage', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
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
