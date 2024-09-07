import { NextResponse } from 'next/server';

export async function GET() {
  let result = null
  await fetch(`https://sea-lion-app-bo3ep.ondigitalocean.app/orders/getComments`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3JpemVkIjp0cnVlLCJlbWFpbCI6ImVxZXFlQGdtYWlsLmNvbSIsImV4cCI6MTcyNTAyMDE1NywicGhvbmUiOiIyNTQxMTQ4ODQyNzUiLCJ1c2VySWQiOiIzIn0.tGo7F1AGh9UIJSCuG61zcFMm5A4IFHeqh6bW5qRqgg8`,
    }
  })
    .then(res => res.json())
    .then(async (resu: any) => {
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
