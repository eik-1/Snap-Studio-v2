import express from "express";

import { falWebhook } from "../controllers/falController.js";

const router = express.Router();

router.post("/fal", falWebhook);

export default router;
