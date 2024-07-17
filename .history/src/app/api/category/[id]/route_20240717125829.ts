// /* eslint-disable @typescript-eslint/no-invalid-void-type */
// import { NextApiRequest, NextApiResponse } from 'next';
// import { NextResponse } from 'next/server';

// export async function GET(req: NextApiRequest, res: NextApiResponse) {
//     const query = req.url;

//   let result 
//   await fetch(`https://sea-lion-app-bo3ep.ondigitalocean.app/product/getProductByCategory/${query?.split("/")[query?.split("/").length-1]}`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer `
//     }
//   })
//     .then(res => res.json())
//     .then(async resu => {
//       if (resu?.status === 200) {
//         result = resu

//       }

//       return NextResponse.json({ message: "Error" });

//     })
//     .catch(err => {
//       console.log(err.message)
//       return NextResponse.json({ message: err.message });

//     })

//   return NextResponse.json({ data: result })

// }


/* eslint-disable @typescript-eslint/no-invalid-void-type */
import {  NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
  try {
    const response = await axios.get('https://sea-lion-app-bo3ep.ondigitalocean.app/product/getProducts');

    if (response.status !== 200) {
      throw new Error('Invalid email or password');
    }

    return NextResponse.json({ status: 200, data: response.data });
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return NextResponse.json({ message: error.response.data.message }, { status: error.response.status });
    } else {
      return NextResponse.json({ message: (error as Error).message }, { status: 500 });
    }
  }
}

