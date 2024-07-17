/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
//An API to help create a user when they sign up.

import type { NextApiRequest, NextApiResponse } from 'next/types'

import https from 'https'

import cors from 'cors'



// import { createClient } from '@redis/client'

// let client: any
// ;(async () => {
//   client = createClient({
//     password: process.env.REDIS_PASSWORD,
//     socket: {
//       host: process.env.REDIS_HOST,
//       port: 10358,
//       timeout: 10000
//     }
//   })

//   client.on('error', error => console.error(`Error : ${error}`))

//   await client.connect()
// })()

const agent = new https.Agent({
  rejectUnauthorized: false
})

const BASEURL = process.env.BASEURL

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
  optionsSuccessStatus: 200
}

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  cors(corsOptions)(req, res, async () => {
    const { token, endpoint, method } = req.body

    const userAgent = req.headers['user-agent']

    // Check if the user agent header is present in the request
    if (!userAgent) {
      // If the user agent header is not present, return a 400 Bad Request response
      res.status(400).json({ message: 'User agent header is missing' })

      return
    }

    // // Check if the user agent contains a string indicating a mobile device
    // if (userAgent.match(/Mobi/i)) {
    //   // If the user agent indicates a mobile device, decline the request
    //   res.status(403).json({ message: 'Access denied from mobile devices' })

    //   return
    // }

    try {
      let result: any = {}
      const isCached = false

      await fetch(`${BASEURL}${endpoint}`, {
        method: method ? method : 'GET',

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
            await client.set(endpoint, JSON.stringify(resu))
          }
          result = resu
        })
        .catch(err => {
          console.log(err.message)
        })

      res.status(200).json({ data: result, isCached: isCached })
    } catch (err: any) {
      res.status(400).json({ status: 400, message: err })
    }
  })
}

export const config = {
  api: {
    responseLimit: false
  }
}
