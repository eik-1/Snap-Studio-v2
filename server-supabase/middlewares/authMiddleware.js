import dotenv from "dotenv";
import { createRemoteJWKSet, jwtVerify } from "jose";

import { client } from "../configs/posthog.js";
import ApiResponse from "../utils/ApiResponse.js";

dotenv.config();

// Supabase signs access tokens with asymmetric keys (ES256). Verify each token
// against the project's published JWKS — jose fetches the key set once and
// caches/refreshes it (handling the `kid` lookup and key rotation) automatically.
const SUPABASE_URL = process.env.SUPABASE_URL?.replace(/\/$/, "");
const JWKS = createRemoteJWKSet(
  new URL(`${SUPABASE_URL}/auth/v1/.well-known/jwks.json`)
);

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
    const { payload } = await jwtVerify(token, JWKS, {
      issuer: `${SUPABASE_URL}/auth/v1`,
    });
    req.userId = payload.sub || undefined;
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
