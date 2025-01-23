import type { NextApiRequest, NextApiResponse } from "next";
import https from "https";
import axios from "axios";
import cors from "cors";
import { NextResponse } from "@/node_modules/next/server";

const agent = new https.Agent({
  rejectUnauthorized: false,
});

const corsOptions = {
  origin: "*",
  methods: ["GET"],
  allowedHeaders: ["Content-Type"],
  optionsSuccessStatus: 200,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  cors(corsOptions)(req, res, async () => {
    if (req.method === "GET") {
      try {
        const response = await axios.get(
          "https://sea-lion-app-bo3ep.ondigitalocean.app/product/getProducts",
          {
            httpsAgent: agent,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer `, // Add the token here if needed
            },
          }
        );

        if (response.status !== 200) {
          throw new Error("Failed to fetch products");
        }

        const result = NextResponse.json({ status: 200, data: response.data });

        // Disable caching by setting the Cache-Control header to no-store
        result.headers.set("Cache-Control", "no-store");

        return result;
      } catch (error: any) {
        if (axios.isAxiosError(error) && error.response) {
          return NextResponse.json(
            { message: error.response.data.message || "API Error" },
            { status: error.response.status }
          );
        } else {
          return NextResponse.json(
            { message: error.message || "Server Error" },
            { status: 500 }
          );
        }
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
