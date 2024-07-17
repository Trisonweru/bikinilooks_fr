import { NextResponse } from 'next/server';

export async function GET() {
  await fetch(`https://3fa9-41-79-10-98.ngrok-free.app/product/getProducts`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer `
    }
  })
    .then(res => res.json())
    .then(async resu => {
      if (resu?.status === 'OK') {
        return NextResponse.json({ data: resu });

      }

    })
    .catch(err => {
      console.log(err.message)
    })

}
