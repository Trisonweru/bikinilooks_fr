import { NextResponse } from 'next/server';

export async function GET() {
  let result 
  await fetch(`https://sea-lion-app-bo3ep.ondigitalocean.app/product/getDiscountTypes`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer `
    }
  })
    .then(res => res.json())
    .then(async resu => {
      if (resu?.status === 200) {
        result = resu

      }

      return NextResponse.json({ message: "Error" });

    })
    .catch(err => {
      console.log(err.message)
      return NextResponse.json({ message: err.message });

    })

    const res = NextResponse.json({ status: 200, data: response.data });

    // Disable caching by setting the Cache-Control header to no-store
    res.headers.set('Cache-Control', 'no-store');

    return res;
  return NextResponse.json({ data: result })

}
