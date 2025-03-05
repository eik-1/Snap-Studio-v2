import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import { client } from "../configs/posthog.js";
import ApiResponse from "../utils/ApiResponse.js";

dotenv.config();
const SUPABASE_JWT_SECRET = process.env.SUPABASE_JWT_SECRET;

export default async function isUserAuthenticated(req, res, next) {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res.status(401).json(
      new ApiResponse(401, "Unauthorized", {
        error: "Unauthorized",
      })
    );
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json(
      new ApiResponse(401, "Unauthorized", {
        error: "Unauthorized",
      })
    );
  }

  try {
    const decode = jwt.verify(token, SUPABASE_JWT_SECRET);
    if (!decode) {
      throw new Error("Invalid token");
    }
    req.userId = decode.sub || undefined;
    next();
  } catch (err) {
    client.captureException(err);
    return res.status(401).json(
      new ApiResponse(401, "Unauthorized", {
        error: err.message,
      })
    );
  }
}
