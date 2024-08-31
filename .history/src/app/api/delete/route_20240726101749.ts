/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    // const query = req.url;
    const { id } = await req.json();

  let result 
  await fetch(`https://sea-lion-app-bo3ep.ondigitalocean.app/product/deleteProduct/${id}`, {//${query?.split("/")[query?.split("/").length-1]}
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer `
    }
  })
    .then(res => res.json())
    .then(async resu => {

      console.log(resu)
      if (resu?.status === 200) {
        result = resu

      }

      return NextResponse.json({ message: "Error" });

    })
    .catch(err => {
      console.log(err.message)
      return NextResponse.json({ message: err.message });

    })

  return NextResponse.json({ data: result })

}
