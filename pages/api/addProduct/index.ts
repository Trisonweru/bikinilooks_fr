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
        // Retrieve form data
        const formData = req.body;
        const {
          productName,
          productCategory,
          productDescription,
          price,
          availableStock,
          discount,
          discountType,
          token,
          image,
        } = formData;

        // Validate required fields
        if (!productName || !productCategory || !price || !token || !image) {
          return res.status(400).json({
            status: "error",
            message: "Missing required fields",
          });
        }

        // Prepare form data for axios
        const form = new FormData();
        form.append("productName", productName);
        form.append("productCategory", productCategory);
        form.append("productDescription", productDescription);
        form.append("price", price);
        form.append("availableStock", availableStock);
        form.append("discount", discount);
        form.append("discountType", discountType);
        form.append("image", image);

        // Make a request to the external API to add the product
        const response = await axios.post(
          "https://sea-lion-app-bo3ep.ondigitalocean.app/product/addProduct",
          form,
          {
            httpsAgent: agent,
            headers: {
              Authorization: `Bearer ${token}`,
              // ...form.getHeaders(), // Proper form data headers
            },
          }
        );

        if (response.status !== 200) {
          throw new Error(response.data?.message || "Failed to add product");
        }

        // Success response with no-store cache control
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
      // Handle unsupported methods
      res.status(405).json({ message: "Method Not Allowed" });
    }
  });
};

// Optional API configuration
export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb", // Set desired body size limit
    },
    responseLimit: false,
  },
};
