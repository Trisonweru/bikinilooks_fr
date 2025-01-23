import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import https from "https";
import cors from "cors";

// Disable SSL certificate validation
const agent = new https.Agent({
  rejectUnauthorized: false,
});

// Configure CORS options
const corsOptions = {
  origin: "*",
  methods: ["POST"],
  allowedHeaders: ["Content-Type"],
  optionsSuccessStatus: 200,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  // Apply CORS middleware
  cors(corsOptions)(req, res, async () => {
    if (req.method === "POST") {
      try {
        // Parse the request body
        const { category } = req.body;

        console.log("category", category);
        // Make the request to the external API
        const response = await axios.get(
          `https://sea-lion-app-bo3ep.ondigitalocean.app/product/getProduct/${category}`,
          {
            httpsAgent: agent,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer `, // You may need to insert the actual token here
            },
          }
        );

        if (response.status !== 200) {
          throw new Error("Error fetching product");
        }

        // Disable caching and send the response
        res.setHeader("Cache-Control", "no-store");
        res.status(200).json({ status: 200, data: response.data });
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
      // Handle unsupported methods
      res.status(405).json({ message: "Method Not Allowed" });
    }
  });
};

// Optional: Exporting configuration if needed for API limits, etc.
export const config = {
  api: {
    responseLimit: false,
  },
};
