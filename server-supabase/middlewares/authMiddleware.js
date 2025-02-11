import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import ApiResponse from "../utils/ApiResponse.js";

dotenv.config();
const SUPABASE_JWT_SECRET = process.env.SUPABASE_JWT_SECRET;

export default async function isUserAuthenticated(req, res, next) {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res.status(401).json(
      new ApiResponse(401, "Unauthorized", {
        error: err.message,
      })
    );
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json(
      new ApiResponse(401, "Unauthorized", {
        error: err.message,
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
    return res.status(401).json(
      new ApiResponse(401, "Unauthorized", {
        error: err.message,
      })
    );
  }
}

// Decoded {
//   iss: 'https://qlyojdnywhpjejyxukld.supabase.co/auth/v1',
//   sub: '65fbfb9f-1c9c-40dc-9c32-3a8a7408dac1',
//   aud: 'authenticated',
//   exp: 1738950263,
//   iat: 1738946663,
//   email: 'rajeev.s.2403@gmail.com',
//   phone: '',
//   app_metadata: { provider: 'email', providers: [ 'email' ] },
//   user_metadata: {
//     email: 'rajeev.s.2403@gmail.com',
//     email_verified: true,
//     first_name: 'Rajeev ',
//     last_name: 'Sharma',
//     name: 'rajeev',
//     phone_verified: false,
//     sub: '65fbfb9f-1c9c-40dc-9c32-3a8a7408dac1'
//   },
//   role: 'authenticated',
//   aal: 'aal1',
//   amr: [ { method: 'password', timestamp: 1738928117 } ],
//   session_id: 'a7da53b1-0d20-452f-b563-86246487e1a8',
//   is_anonymous: false
// }
