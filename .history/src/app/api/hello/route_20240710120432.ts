import { NextResponse } from 'next/server';

export async function GET() {
   await fetch(`${BASEURL}${endpoint}`, {
        method:'GET',

        //@ts-ignore
        agent,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(async resu => {
          if (resu?.status === 'OK') {
            result = resu
          }
          result = resu
        })
        .catch(err => {
          console.log(err.message)
        })

          return NextResponse.json({ data: result });
}
