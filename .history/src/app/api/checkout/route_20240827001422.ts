/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';


export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const amount = formData.get('amount');
    const fullName = formData.get('fullName');
    const mobileNumber = formData.get('mobileNumber');
    const email = formData.get('email');
    const deliveryLocation = formData.get('deliveryLocation');
    const deliveryNote = formData.get('deliveryNote');
    const cart_items = formData.get('cart_items');
    const token = formData.get('token');


    const response = await axios.post('https://sea-lion-app-bo3ep.ondigitalocean.app/product/addProductCategory', { amount: 100,fullName }, {
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    });


    if (response.status !== 200) {
      throw new Error('Invalid email or password');
    }
    // const result = await response.json();

    return NextResponse.json({ message: 'Login successful', data: response.data });
  } catch (error: any) {
    return NextResponse.json({ status: 'error', message: error.message });
  }
}

