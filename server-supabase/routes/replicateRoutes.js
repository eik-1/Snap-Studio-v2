import express from "express";

import {
  getTrainingStatus,
  getTriggerWord,
  runHeadshotUserModel,
  runUserModel,
  trainOstrisModel,
} from "../controllers/replicateController.js";
import isUserAuthenticated from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.post("/train", upload.single("file"), trainOstrisModel);
router.post("/status", getTrainingStatus);
router.post("/run", isUserAuthenticated, runUserModel);
router.post("/get-trigger-word", getTriggerWord);
router.post("/run-headshots", runHeadshotUserModel);

export default router;
