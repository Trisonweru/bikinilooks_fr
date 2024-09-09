import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const { token, ...orderData } = await req.json();

    // Make the request to the external API to create the order
    const response = await fetch('https://sea-lion-app-bo3ep.ondigitalocean.app/orders/createOrder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Add the Bearer token to the headers
      },
      body: JSON.stringify(orderData), // Send only the order data without the token
    });


    // if (!response.ok) {
    //   // Handle non-OK responses
    //   const errorResponse = await response.json();
    //   return NextResponse.json({ success: false, message: errorResponse.message }, { status: response.status });
    // }

    // Parse the response from the external API
    const result = await response.json();
    console.log(result)

    // Return success response to the client
    return NextResponse.json({ success: true, order_id: result.order_id }, { status: 200 });

    const res = NextResponse.json({ status: 'success', data: result });

    // Disable caching by setting the Cache-Control header to no-store
    res.headers.set('Cache-Control', 'no-store');

    return res;
    
  } catch (error) {
    console.error('Checkout API error:', error);
    return NextResponse.json({ success: false, message: 'Failed to process order' }, { status: 500 });
  }
}
