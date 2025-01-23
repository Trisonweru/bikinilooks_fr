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
    if (req.method === "GET") {
      try {
        // Make the GET request to fetch product categories
        const response = await axios.get(
          "https://sea-lion-app-bo3ep.ondigitalocean.app/product/getProductCategories",
          {
            httpsAgent: agent,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status !== 200) {
          throw new Error("Failed to fetch product categories");
        }

        res.setHeader("Cache-Control", "no-store"); // Disable caching
        res.status(200).json({ status: "success", data: response.data });
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
      res.status(405).json({ message: "Method Not Allowed" });
    }
  });
};

export const config = {
  api: {
    responseLimit: false,
  },
};
