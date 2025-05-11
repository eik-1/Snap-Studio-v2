import express from "express";
import {
  generateFashionImage,
  runHeadshotFluxImage,
  runPromptFluxImage,
  runStyleImages,
  trainFluxModel,
} from "../controllers/falController.js";
import upload from "../middlewares/uploadMiddleware.js";
import isUserAuthenticated from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post(
  "/fashion",
  upload.fields([
    { name: "modelImg", maxCount: 1 },
    { name: "dressImg", maxCount: 1 },
  ]),
  generateFashionImage
);
router.post(
  "/trainImageModel",
  isUserAuthenticated,
  upload.single("file"),
  trainFluxModel
);
router.post("/run-custom-prompt", isUserAuthenticated, runPromptFluxImage);
router.post("/run-headshot", isUserAuthenticated, runHeadshotFluxImage);
router.post(
  "/run-styles",
  isUserAuthenticated,
  upload.single("file"),
  runStyleImages
);

export default router;
