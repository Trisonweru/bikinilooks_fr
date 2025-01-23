import type { NextApiRequest, NextApiResponse } from "next";
import https from "https";
import cors from "cors";
import { NextResponse } from "next/server";

const agent = new https.Agent({
  rejectUnauthorized: false,
});

const corsOptions = {
  origin: "*",
  methods: ["POST"],
  allowedHeaders: ["Content-Type"],
  optionsSuccessStatus: 200,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  cors(corsOptions)(req, res, async () => {
    if (req.method === "POST") {
      const { id, token } = await req.body;

      let result: any = {};

      try {
        const response = await fetch(
          `https://sea-lion-app-bo3ep.ondigitalocean.app/product/deleteProduct/${id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        console.log("response", data);

        if (response.status === 200) {
          res.setHeader("Cache-Control", "no-store");
          res.status(200).json({ status: 200, data });
        } else {
          return NextResponse.json(
            { message: "Error" },
            { status: response.status }
          );
        }

        // const res = NextResponse.json({ data: result });

        // Disable caching by setting the Cache-Control header to no-store
        // res.headers.set("Cache-Control", "no-store");

        // return res;
      } catch (err: any) {
        console.log(err.message);
        return NextResponse.json({ message: err.message }, { status: 500 });
      }
    } else {
      res.status(405).json({ message: "Method Not Allowed" });
    }
  });
};

export const config = {
  api: {
    responseLimit: false,
  },
};
