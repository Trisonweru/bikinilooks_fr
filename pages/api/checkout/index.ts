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
        // Parse the request body to extract token and order data
        const { token, ...orderData } = req.body;

        // Make the request to the external API to create the order
        const response = await axios.post(
          "https://sea-lion-app-bo3ep.ondigitalocean.app/orders/createOrder",
          orderData, // Send only the order data without the token
          {
            httpsAgent: agent,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Add the Bearer token to the headers
            },
          }
        );

        if (response.status !== 200) {
          throw new Error(response.data?.message || "Failed to create order");
        }

        // Send a success response with the order_id from the external API
        res.setHeader("Cache-Control", "no-store");
        res
          .status(200)
          .json({ success: true, order_id: response.data.order_id });
      } catch (error: any) {
        // Error handling for axios or other errors
        if (axios.isAxiosError(error) && error.response) {
          res.status(error.response.status).json({
            success: false,
            message: error.response.data?.message || "API Error",
          });
        } else {
          res
            .status(500)
            .json({ success: false, message: error.message || "Server Error" });
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
