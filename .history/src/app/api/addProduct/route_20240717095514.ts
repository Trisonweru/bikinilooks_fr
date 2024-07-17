import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { NextApiRequest, NextApiResponse } from 'next';

export const POST = async (req: Request) => {
  try {
    const data = await req.formData();
    const productName = data.get('productName') as string;
    const productCategory = data.get('productCategory') as string;
    const productDescription = data.get('productDescription') as string;
    const price = data.get('price') as string;
    const availableStock = data.get('availableStock') as string;
    const discount = data.get('discount') as string;
    const discountType = data.get('discountType') as string;
    const image = data.get('image') as File;

    // Process the form data as needed (e.g., save to database, etc.)
    
    // Simulating a successful response
    return NextResponse.json({ success: true, message: 'Product added successfully!' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: 'There was a problem with the submission.' });
  }
};
