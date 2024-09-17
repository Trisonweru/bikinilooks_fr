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
        // Parse the form data
        const formData = req.body;
        const token = formData.token;

        // Validate token and form data
        if (!token || !formData.image) {
          return res.status(400).json({
            status: "error",
            message: "Token or image is missing",
          });
        }

        // Set up form data for axios
        const form = new FormData();
        form.append("image", formData.image);

        // Send the form data to the external API
        const response = await axios.post(
          "https://sea-lion-app-bo3ep.ondigitalocean.app/product/addThemeImage",
          form,
          {
            httpsAgent: agent,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("response", response.status);

        if (response.status !== 200) {
          throw new Error(response.data?.message || "Failed to add product");
        }

        // Send success response with no-store cache header
        res.setHeader("Cache-Control", "no-store");
        return res.status(200).json({ status: "success", data: response.data });
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
      // Handle unsupported HTTP methods
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
