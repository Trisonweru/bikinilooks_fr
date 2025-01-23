import type { NextApiRequest, NextApiResponse } from "next";
import https from "https";
import axios from "axios";
import cors from "cors";

const agent = new https.Agent({
  rejectUnauthorized: false,
});

const corsOptions = {
  origin: "*",
  methods: ["POST"],
  allowedHeaders: ["Content-Type"],
  optionsSuccessStatus: 200,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  cors(corsOptions)(req, res, async () => {
    if (req.method === "POST") {
      try {
        const { email, password, phoneNumber, fullName } = req.body;

        const response = await axios.post(
          "https://sea-lion-app-bo3ep.ondigitalocean.app/auth/signup",
          { email, password, phoneNumber, fullName },
          {
            httpsAgent: agent,
            headers: {
              "Content-Type": "application/json",
              // Authorization: `Bearer ${token}`, // Add token if needed
            },
          }
        );

        if (response.status !== 200) {
          throw new Error("Failed to sign up");
        }

        res
          .status(200)
          .json({ message: "Signup successful", data: response.data });
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