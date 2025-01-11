import cors from "cors";
import dotenv from "dotenv";
import express from "express";
dotenv.config();

import databaseRoutes from "./routes/databaseRoutes.js";
import modelRoutes from "./routes/replicateRoutes.js";
import stripeRoutes from "./routes/stripeRoutes.js";

const port = process.env.PORT || 3000;
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
app.get("/", (req, res) => {
  res.status(200).json({
    status: 200,
    message: "working",
  });
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
