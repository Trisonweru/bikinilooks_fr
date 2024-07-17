// import { NextResponse } from 'next/server';

// export async function GET() {
//   var result 
//   await fetch(`https://sea-lion-app-bo3ep.ondigitalocean.app/product/getThemeImage`, {
//     method: 'GET',
//   })
//     .then(res => res.json())
//     .then(async resu => {
//       console.log("resu",resu)
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

import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST() {
  try {
    const response = await axios.get('https://sea-lion-app-bo3ep.ondigitalocean.app/product/getThemeImage');

    if (response.status !== 200) {
      throw new Error('Invalid email or password');
    }

    return NextResponse.json({ message: 'Login successful', data: response.data });
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return NextResponse.json({ message: error.response.data.message }, { status: error.response.status });
    } else {
      return NextResponse.json({ message: (error as Error).message }, { status: 500 });
    }
  }
}

