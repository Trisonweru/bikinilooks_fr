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
        // Parse the request body from form data
        const { token, review, browserId, name } = req.body;

        // Send the POST request to the external API with form data
        const response = await axios.post(
          "https://sea-lion-app-bo3ep.ondigitalocean.app/orders/createBrowserComments",
          {
            browserId: browserId,
            comment: review,
            fullName: name ?? "User",
          },
          {
            httpsAgent: agent,
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        console.log(response.status);

        if (response.status !== 200) {
          throw new Error(response.data?.message || "Failed to add review");
        }

        // Disable caching and return success response
        res.setHeader("Cache-Control", "no-store");
        res.status(200).json({ status: "success", data: response.data });
      } catch (error: any) {
        // Error handling for axios or other errors
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
