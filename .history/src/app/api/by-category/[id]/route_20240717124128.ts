import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';

export default async function handler(req: any) {
    const query = req.url;

  let result 
  await fetch(`https://sea-lion-app-bo3ep.ondigitalocean.app/product/getProductByCategory/${query?.split("/")[query?.split("/").length-1]}`, {
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

  return NextResponse.json({ data: result })

}
