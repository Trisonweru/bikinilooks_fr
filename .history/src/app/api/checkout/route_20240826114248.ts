/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  
  const { email, password } = await req.json();
  
    // const query = req.url;
    const { category } = await req.json();

    console.log("category",category)

  // let result 
  // await fetch(`https://sea-lion-app-bo3ep.ondigitalocean.app/product/getProductByCategory/${category}`, {//${query?.split("/")[query?.split("/").length-1]}
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer `
  //   }
  // })
  //   .then(res => res.json())
  //   .then(async resu => {
  //     if (resu?.status === 200) {
  //       result = resu

  //     }

  //     return NextResponse.json({ message: "Error" });

  //   })
  //   .catch(err => {
  //     console.log(err.message)
  //     return NextResponse.json({ message: err.message });

  //   })

  // return NextResponse.json({ data: result })

}

