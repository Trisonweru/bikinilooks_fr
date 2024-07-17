import { getToken } from '@/lib/fetcher';
import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const productName = formData.get('productName');

    const token = formData.get('token');

        const response = await axios.post('https://sea-lion-app-bo3ep.ondigitalocean.app/product/addProductCategory', { name:productName });

    // Assuming your external API endpoint is:
    // const response = await fetch('https://sea-lion-app-bo3ep.ondigitalocean.app/product/addProductCategory', {
    //   method: 'POST',
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    //   body: JSON.stringify({ "name": productName }),
    // });

    console.log(response)

     if (response.status !== 200) {
      throw new Error('Invalid email or password');
    }
    // const result = await response.json();

        return NextResponse.json({ message: 'Login successful', data: response.data });

    // return NextResponse.json({ status: 'success', data: result });
  } catch (error: any) {
    return NextResponse.json({ status: 'error', message: error.message });
  }
}
