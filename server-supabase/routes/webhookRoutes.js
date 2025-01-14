import express from "express";

import { replicateWebhook } from "../controllers/replicateController.js";
import { stripeWebhook } from "../controllers/stripeController.js";

const router = express.Router();

router.post(
  "/stripe",
  express.raw({ type: "application/json" }),
  stripeWebhook
);
router.post("/replicate", replicateWebhook);

export default router;
