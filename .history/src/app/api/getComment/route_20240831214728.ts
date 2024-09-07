import { NextResponse } from 'next/server';

export async function GET() {
  let result= null
  await fetch(`https://sea-lion-app-bo3ep.ondigitalocean.app/orders/getComments`, {
    method: 'GET',
  })
    .then(res => res.json())
    .then(async resu => {
      
      if (resu?.status === 200) {
        result = resu

      }

      return NextResponse.json({ message: "Error" });

    })
    .catch(err => {
      return NextResponse.json({ message: err.message });

    })

  return NextResponse.json({ data: result })

}
