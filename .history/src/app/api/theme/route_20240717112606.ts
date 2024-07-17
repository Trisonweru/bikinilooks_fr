import { NextResponse } from 'next/server';

export async function GET() {
  var result 
  await fetch.d(`https://sea-lion-app-bo3ep.ondigitalocean.app/product/getThemeImage`,)
    .then(res => res.json())
    .then(async resu => {
      console.log("resu",resu)
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
