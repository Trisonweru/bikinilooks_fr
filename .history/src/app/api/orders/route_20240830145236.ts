
/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
  try {
    console.log("orders")
    const response = await axios.get('https://sea-lion-app-bo3ep.ondigitalocean.app/orders/getOrders', {
      headers: {
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3JpemVkIjp0cnVlLCJlbWFpbCI6ImVxZXFlQGdtYWlsLmNvbSIsImV4cCI6MTcyNTAyMDE1NywicGhvbmUiOiIyNTQxMTQ4ODQyNzUiLCJ1c2VySWQiOiIzIn0.tGo7F1AGh9UIJSCuG61zcFMm5A4IFHeqh6bW5qRqgg8`,
        'Content-Type': 'application/json',
      }
    });


    if (response.status !== 200) {
      throw new Error('Internal server error');
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

