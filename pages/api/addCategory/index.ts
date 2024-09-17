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
        // Retrieve form data from the request
        const { productName, token } = req.body;

        // Validate required fields
        if (!productName || !token) {
          return res.status(400).json({
            status: "error",
            message: "Missing required fields",
          });
        }

        // Make a POST request using Axios to add the product category
        const response = await axios.post(
          "https://sea-lion-app-bo3ep.ondigitalocean.app/product/addProductCategory",
          { name: productName },
          {
            httpsAgent: agent,
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in Authorization header
            },
          }
        );

        // Handle non-200 responses
        if (response.status !== 200) {
          throw new Error("Failed to add product category");
        }

        // Return success response
        res.setHeader("Cache-Control", "no-store");
        return res.status(200).json({
          status: "success",
          data: response.data,
        });
      } catch (error: any) {
        if (axios.isAxiosError(error) && error.response) {
          return res.status(error.response.status).json({
            status: "error",
            message: error.response.data?.message || "API Error",
          });
        } else {
          return res.status(500).json({
            status: "error",
            message: error.message || "Server Error",
          });
        }
      }
    } else {
      // Handle unsupported methods
      res.status(405).json({ message: "Method Not Allowed" });
    }
  });
};

// Optional API configuration
export const config = {
  api: {
    responseLimit: false,
  },
};
