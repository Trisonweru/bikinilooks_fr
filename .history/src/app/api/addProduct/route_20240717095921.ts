import { getToken } from '@/lib/fetcher';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const productName = formData.get('productName');
    const productCategory = formData.get('productCategory');
    const productDescription = formData.get('productDescription');
    const price = formData.get('price');
    const availableStock = formData.get('availableStock');
    const discount = formData.get('discount');
    const discountType = formData.get('discountType');
    const image = formData.get('image');

    // Assuming your external API endpoint is:
    const response = await fetch('https://sea-lion-app-bo3ep.ondigitalocean.app/product/addProduct', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getToken()}`,
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
