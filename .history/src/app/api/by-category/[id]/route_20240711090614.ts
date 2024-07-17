import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    const query = req.url;

        console.log(`https://ac5b-41-79-10-98.ngrok-free.app/product/getProductByCategory/${query?.split("/")[query?.split("/").length-1]}`)


  var result 
  await fetch(`https://ac5b-41-79-10-98.ngrok-free.app/product/getProductByCategory/${query?.split("/")[query?.split("/").length-1]}`, {
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
