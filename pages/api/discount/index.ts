import type { NextApiRequest, NextApiResponse } from "next";
import https from "https";
import cors from "cors";
// import { NextResponse } from "next/server"; // Not needed for API routes

const agent = new https.Agent({
  rejectUnauthorized: false,
});

const corsOptions = {
  origin: "*",
  methods: ["GET"],
  allowedHeaders: ["Content-Type"],
  optionsSuccessStatus: 200,
};

const corsMiddleware = cors(corsOptions);

// eslint-disable-next-line import/no-anonymous-default-export
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  corsMiddleware(req, res, async () => {
    if (req.method === "GET") {
      try {
        const response = await fetch(
          "https://sea-lion-app-bo3ep.ondigitalocean.app/product/getDiscountTypes",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer <YOUR_TOKEN>`, // Add the token here if needed
            },
          }
        );

        const data = await response.json();

        if (response.status === 200) {
          // Disable caching by setting the Cache-Control header to no-store
          res.setHeader("Cache-Control", "no-store");
          res.status(200).json({ status: 200, data });
        } else {
          res.status(response.status).json({ message: "Error" });
        }
      } catch (err: any) {
        console.log(err.message);
        res.status(500).json({ message: err.message });
      }
    } else {
      res.status(405).json({ message: "Method Not Allowed" });
    }
  });
}

export const config = {
  api: {
    responseLimit: false,
  },
};
