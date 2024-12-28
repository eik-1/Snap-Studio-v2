import express from "express";

import {
  trainOstrisModel,
  runUserModel,
  getTrainingStatus,
  getTriggerWord,
} from "../controllers/replicateController.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.post("/train", upload.single("file"), trainOstrisModel);
router.post("/status", getTrainingStatus);
router.post("/run", runUserModel);
router.post("/get-trigger-word", getTriggerWord);

export default router;
