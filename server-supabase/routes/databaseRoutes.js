import express from "express";

import { getImages, saveImage } from "../controllers/databaseController.js";

const router = express.Router();

router.post("/save-image", saveImage);
router.post("/get-saved-images", getImages);

export default router;
