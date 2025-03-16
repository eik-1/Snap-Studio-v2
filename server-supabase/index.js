import cors from "cors";
import dotenv from "dotenv";
import express from "express";
dotenv.config();
import databaseRoutes from "./routes/databaseRoutes.js";
import modelRoutes from "./routes/replicateRoutes.js";
import sseRoutes from "./routes/sseRoutes.js";
import stripeRoutes from "./routes/webhookRoutes.js";

const port = process.env.PORT || 3000;
// const corsOptions = {
//   origin: "https://snapstudio.me",
//   methods: "GET,POST",
//   allowedHeaders: ["Content-Type", "Authorization"],
//   credentials: true,
// };

const app = express();

//Middlewares
app.use(cors());
app.use("/webhook", express.raw({ type: "application/json" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
