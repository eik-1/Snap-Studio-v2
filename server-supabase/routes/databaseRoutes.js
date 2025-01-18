import express from "express";

import {
  getImages,
  getUserModels,
  saveImage,
} from "../controllers/databaseController.js";

const router = express.Router();

router.post("/save-image", saveImage);
router.post("/get-saved-images", getImages);
router.get("/user-models", getUserModels);

export default router;
