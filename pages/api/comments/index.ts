import type { NextApiRequest, NextApiResponse } from "next";
import https from "https";
import axios from "axios";
import cors from "cors";

// Disable SSL certificate validation
const agent = new https.Agent({
  rejectUnauthorized: false,
});

// Configure CORS options
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
        // Make the request to the external API
        const response = await axios.get(
          "https://sea-lion-app-bo3ep.ondigitalocean.app/orders/getComments",
          {
            httpsAgent: agent,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3JpemVkIjp0cnVlLCJlbWFpbCI6ImVxZXFlQGdtYWlsLmNvbSIsImV4cCI6MTcyNTAyMDE1NywicGhvbmUiOiIyNTQxMTQ4ODQyNzUiLCJ1c2VySWQiOiIzIn0.tGo7F1AGh9UIJSCuG61zcFMm5A4IFHeqh6bW5qRqgg8`,
            },
          }
        );

        // Check if the response is successful
        if (response.status !== 200) {
          throw new Error("Error fetching comments");
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
