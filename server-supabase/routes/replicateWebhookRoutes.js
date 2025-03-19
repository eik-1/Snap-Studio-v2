import express from "express";

import { replicateWebhook } from "../controllers/replicateController";

const router = express.Router();

router.post("/replicate", replicateWebhook);

export default router;
