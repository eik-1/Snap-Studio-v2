import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import { client } from "./configs/posthog.js";
import databaseRoutes from "./routes/databaseRoutes.js";
import modelRoutes from "./routes/replicateRoutes.js";
import sseRoutes from "./routes/sseRoutes.js";
import stripeRoutes from "./routes/webhookRoutes.js";
dotenv.config();

const port = process.env.PORT || 3000;
const allowedOrigins = "https://snapstudio.me";

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || origin === allowedOrigins) {
      callback(null, true);
    } else {
      console.warn(`Blocked request from unauthorized origin: ${origin}`);
      client?.capture({
        distinctId: "server",
        event: "unauthorized_cors_attempt",
        properties: { origin },
      });
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: false,
  maxAge: 86400, // 24 hours
  optionsSuccessStatus: 204,
};

const app = express();

//Middlewares
const verifyOrigin = (req, res, next) => {
  const origin = req.headers.origin;
  const referer = req.headers.referer;

  if (req.path.startsWith("/webhook")) {
    return next();
  }

  if (req.path.startsWith("/sse")) {
    return next();
  }

  if (
    origin === "https://snapstudio.me" ||
    (referer && referer.startsWith("https://snapstudio.me/"))
  ) {
    next();
  } else {
    console.warn(
      `Blocked request from unauthorized origin/referer: ${
        origin || referer || "unknown"
      }`
    );
    client?.capture({
      distinctId: "server",
      event: "unauthorized_request",
      properties: { origin, referer, path: req.path },
    });
    res.status(403).json({
      status: 403,
      message: "Access denied",
    });
  }
};

app.use(cors(corsOptions));
app.use("/webhook", express.raw({ type: "application/json" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(verifyOrigin);

//Routes
app.use("/models", modelRoutes);
app.use("/database", databaseRoutes);
app.use("/webhook", stripeRoutes);
app.use("/sse", sseRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    status: 200,
    message: "working",
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const gracefulShutdown = async (signal) => {
  console.log(`\n${signal} received. Shutting down gracefully...`);
  try {
    await client.shutdown();
    console.log("PostHog client shut down successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error during shutdown:", error);
    process.exit(1);
  }
};

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));
