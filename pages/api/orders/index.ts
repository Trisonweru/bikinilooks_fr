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
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  cors(corsOptions)(req, res, async () => {
    if (req.method === "GET") {
      try {
        const response = await axios.get(
          "https://sea-lion-app-bo3ep.ondigitalocean.app/orders/getOrders",
          {
            httpsAgent: agent,
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3JpemVkIjp0cnVlLCJlbWFpbCI6ImVxZXFlQGdtYWlsLmNvbSIsImV4cCI6MTcyNTAyMDE1NywicGhvbmUiOiIyNTQxMTQ4ODQyNzUiLCJ1c2VySWQiOiIzIn0.tGo7F1AGh9UIJSCuG61zcFMm5A4IFHeqh6bW5qRqgg8", // Replace this with a valid token
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status !== 200) {
          throw new Error("Internal server error");
        }

        // Send the response data with caching disabled
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
      res.status(405).json({ message: "Method Not Allowed" });
    }
  });
};

export const config = {
  api: {
    responseLimit: false,
  },
};
