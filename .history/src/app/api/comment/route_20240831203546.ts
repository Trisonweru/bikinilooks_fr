import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const token = formData.get('token');
    const comment = formData.get('comment');
    const browserId = formData.get('browserId');

    console.log(browserId)

    // Assuming your external API endpoint is:
    const response = await fetch('https://sea-lion-app-bo3ep.ondigitalocean.app/orders/createBrowserComments', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    console.log(response.status)

    if (!response.ok) {
      throw new Error('Failed to add review');
    }

    const result = await response.json();

    return NextResponse.json({ status: 'success', data: result });
  } catch (error:any) {
    return NextResponse.json({ status: 'error', message: error.message });
  }
}
