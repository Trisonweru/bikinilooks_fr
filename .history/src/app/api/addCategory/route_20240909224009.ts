import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const productName = formData.get('productName');

    const token = formData.get('token');

    const response = await axios.post('https://sea-lion-app-bo3ep.ondigitalocean.app/product/addProductCategory', { name: productName }, {
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    });

    if (response.status !== 200) {
      throw new Error('Invalid email or password');
    }

    // return NextResponse.json({ message: 'Request successful', data: response.data });

      const res = NextResponse.json({ status: 'success', data: result });

    // Disable caching by setting the Cache-Control header to no-store
    res.headers.set('Cache-Control', 'no-store');

    return res;
  } catch (error: any) {
    return NextResponse.json({ status: 'error', message: error.message });
  }
}
