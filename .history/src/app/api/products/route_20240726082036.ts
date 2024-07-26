import { NextResponse } from 'next/server';

export async function GET() {
  let result 
  await fetch(`https://sea-lion-app-bo3ep.ondigitalocean.app/product/getProductCategories`, {
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
      console.log(err.message)
      return NextResponse.json({ message: err.message });

    })

  return NextResponse.json({ data: result })

}
