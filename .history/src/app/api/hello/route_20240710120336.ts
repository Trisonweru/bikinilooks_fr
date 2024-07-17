import { NextResponse } from 'next/server';

export async function GET() {
   try {
      let result: any = {}
      const isCached = false

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

          return NextResponse.json({ hello: 'Next.js' });

      res.status(200).json({ data: result, isCached: isCached })
    } catch (err: any) {
      res.status(400).json({ status: 400, message: err })
    }
}
