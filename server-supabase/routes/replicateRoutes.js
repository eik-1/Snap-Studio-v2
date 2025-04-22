import express from "express";

import {
  getTriggerWord,
  runHeadshotUserModel,
  runUserModel,
  trainOstrisModel,
  trainingTest,
} from "../controllers/replicateController.js";
import isUserAuthenticated from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.post(
  "/train",
  isUserAuthenticated,
  upload.single("file"),
  trainOstrisModel
);
// router.post("/status", isUserAuthenticated, getTrainingStatus);
router.post("/run", isUserAuthenticated, runUserModel);
router.post("/run-headshots", isUserAuthenticated, runHeadshotUserModel);
router.post("/train-test", upload.single("file"), trainingTest);

export default router;
