import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  // const query = req.url;

  const { category } = await req.json();

  let result
  await fetch(`https://sea-lion-app-bo3ep.ondigitalocean.app/product/getProduct/${category}`, {
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

 const res = NextResponse.json({ status: response.status,  message: 'Failed to fetch products'});

    // Disable caching by setting the Cache-Control header to no-store
    res.headers.set('Cache-Control', 'no-store');

    return res;
    })
    .catch(err => {
      console.log(err.message)
      return NextResponse.json({ message: err.message });

    })

  return NextResponse.json({ data: result })

}
