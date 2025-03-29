import express from "express";
import { generateFashionImage } from "../controllers/falController.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.post(
  "/fashion",
  upload.fields([
    { name: "modelImg", maxCount: 1 },
    { name: "dressImg", maxCount: 1 },
  ]),
  generateFashionImage
);

export default router;
