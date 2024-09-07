import { NextResponse } from 'next/server';

export async function GET() {
  console.log("https://sea-lion-app-bo3ep.ondigitalocean.app/orders/getComments")
  let result= null
  await fetch(`https://sea-lion-app-bo3ep.ondigitalocean.app/orders/getComments`, {
    method: 'GET',
     headers: {
      'Content-Type': 'application/json',
    }
  })
    .then(res => res.json())
    .then(async (resu:any) => {
     console.log("resu", resu)
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
