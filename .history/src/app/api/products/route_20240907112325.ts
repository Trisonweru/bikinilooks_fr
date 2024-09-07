import { NextResponse } from 'next/server';
import axios from 'axios';

// GET request handler
export async function GET() {
  try {
    const response = await axios.get('https://sea-lion-app-bo3ep.ondigitalocean.app/product/getProducts', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer `, // Add the token here if needed
      }
    });

    if (response.status === 200) {
      return NextResponse.json({ status: 200, data: response.data });
    }

    // Handle invalid responses from the API
    return NextResponse.json(
      { message: 'Failed to fetch products' },
      { status: response.status }
    );
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return NextResponse.json(
        { message: error.response.data?.message || 'API Error' },
        { status: error.response.status }
      );
    }
    return NextResponse.json(
      { message: (error as Error).message || 'Server Error' },
      { status: 500 }
    );
  }
}
