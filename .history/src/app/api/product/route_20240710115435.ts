/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
//An API to help create a user when they sign up.

import type { NextApiRequest, NextApiResponse } from 'next/types'

import https from 'https'

import cors from 'cors'



const agent = new https.Agent({
  rejectUnauthorized: false
})

const BASEURL = "https://3fa9-41-79-10-98.ngrok-free.app"

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
  optionsSuccessStatus: 200
}

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  cors(corsOptions)(req, res, async () => {
    const { token, endpoint } = req.body

    console.log("hello")

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
