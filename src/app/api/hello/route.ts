
/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
  try {
    const response = await axios.get('https://sea-lion-app-bo3ep.ondigitalocean.app/product/getProducts', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer `,
      }
    });

    if (response.status !== 200) {
      throw new Error('Invalid email or password');
    }

    return NextResponse.json({ status: 200, data: response.data });
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return NextResponse.json({ message: error.response.data.message }, { status: error.response.status });
    } else {
      return NextResponse.json({ message: (error as Error).message }, { status: 500 });
    }
  }
}


