//An API to fetch products from a specific endpoint using axios, disabling caching in the response

import type { NextApiRequest, NextApiResponse } from "next";
import https from "https";
import axios from "axios";
import cors from "cors";

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
  // Apply CORS middleware
  cors(corsOptions)(req, res, async () => {
    // Handle GET request
    if (req.method === "GET") {
      try {
        const response = await axios.get(
          "https://sea-lion-app-bo3ep.ondigitalocean.app/product/getProducts",
          {
            httpsAgent: agent,
            headers: {
              "Content-Type": "application/json",
              // 'Authorization': `Bearer ${token}`, // Uncomment and provide the token if required
            },
          }
        );

        if (response.status === 200) {
          res.setHeader("Cache-Control", "no-store"); // Disable caching
          res.status(200).json({ status: 200, data: response.data });
        } else {
          res.setHeader("Cache-Control", "no-store"); // Disable caching
          res.status(response.status).json({
            status: response.status,
            message: "Failed to fetch products",
          });
        }
      } catch (error: any) {
        if (axios.isAxiosError(error) && error.response) {
          res
            .status(error.response.status)
            .json({ message: error.response.data?.message || "API Error" });
        } else {
          res.status(500).json({ message: error.message || "Server Error" });
        }
      }
    } else {
      // Method Not Allowed
      res.status(405).json({ message: "Method Not Allowed" });
    }
  });
};

export const config = {
  api: {
    responseLimit: false,
  },
};
